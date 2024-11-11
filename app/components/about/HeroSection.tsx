import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnimatePresence } from 'framer-motion';
import {
  motion,
  useSpring as useFramerSpring,
  useScroll,
  useTransform,
} from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const HERO_IMAGE_DIMENSIONS = {
  width: 1920,
  height: 1080,
  mobileWidth: 828,
  mobileHeight: 1792,
};

const SPRING_CONFIG = { stiffness: 120, damping: 25, restDelta: 0.001 };

const fadeInVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
    },
  },
};

const Background = () => {
  const [currentImage, setCurrentImage] = useState(
    '/assets/about/about_header.webp'
  );
  const [progress, setProgress] = useState(0);
  const [isReversing, setIsReversing] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const TRANSITION_DURATION = 6000; // Faster: 6 seconds total
  const PROGRESS_INTERVAL = 16; // Smoother: ~60fps

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        const increment = (PROGRESS_INTERVAL / TRANSITION_DURATION) * 100;
        const newProgress = isReversing ? prev - increment : prev + increment;

        if (newProgress >= 100) {
          setIsReversing(true);
          setCurrentImage('/assets/about/about_header2.webp');
          return 100;
        } else if (newProgress <= 0) {
          setIsReversing(false);
          setCurrentImage('/assets/about/about_header.webp');
          return 0;
        }

        return newProgress;
      });
    };

    progressRef.current = setInterval(updateProgress, PROGRESS_INTERVAL);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isReversing]);

  return (
    <motion.div
      className='absolute inset-0 z-0'
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Progress indicator */}
      <motion.div
        className='absolute right-8 top-32 z-50 flex items-center gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className='flex flex-col items-end gap-2'>
          <span className='font-light text-xs text-white/60'>Then</span>
          <span className='font-light text-xs text-white/60'>Now</span>
        </div>
        <div className='h-12 w-[2px] overflow-hidden rounded-full bg-white/10'>
          <motion.div
            className='h-full w-full bg-primary-gold'
            style={{
              y: `${progress - 100}%`,
              transition: 'y 0.1s linear',
            }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage}
          className='absolute inset-0'
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src={currentImage}
            alt='About GuestOS'
            fill
            priority
            quality={100}
            className='duration-[1.2s] h-full w-full object-cover transition-transform ease-out'
            sizes='100vw'
          />
          {/* Enhanced gradient overlay with smoother transition */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Modern grain effect */}
      <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.02] mix-blend-overlay' />

      {/* Enhanced gradient overlays */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.18),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.15),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.25)_100%)]' />
    </motion.div>
  );
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const ySpring = useFramerSpring(y, SPRING_CONFIG);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background />

      <motion.div
        className='relative z-20 flex h-full flex-col'
        style={{
          opacity,
          scale,
          y: ySpring,
        }}
      >
        <Navbar isFixed={false} />

        <div className='relative grid h-full grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8'>
          <motion.div
            ref={inViewRef}
            className='col-span-12 flex items-center lg:col-span-7'
            variants={fadeInVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className='w-full space-y-12'>
              <div className='space-y-8'>
                <motion.div
                  className='group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm'
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
                  <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light text-sm tracking-wider text-transparent'>
                    OUR STORY
                  </span>
                </motion.div>

                <motion.h1
                  className='max-w-4xl bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text pb-1 font-light text-4xl leading-[1.2] tracking-tight text-transparent sm:text-5xl lg:text-5xl'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  A Long-Standing Family History
                </motion.h1>

                <motion.p
                  className='max-w-xl font-light text-lg leading-relaxed text-white/90'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  For over four decades, our family has been at the forefront of
                  hospitality innovation, crafting exceptional experiences that
                  blend tradition with technology.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className='flex items-center gap-8'
              >
                <motion.button
                  className='group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/10'
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className='font-light text-sm text-white'>
                    Learn More
                  </span>
                  <motion.svg
                    className='h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M5 12H19M19 12L12 5M19 12L12 19' />
                  </motion.svg>
                </motion.button>

                <div className='h-px w-12 bg-gradient-to-r from-primary-gold to-transparent' />
                <span className='font-light text-sm text-white/60'>
                  Est. 1976
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
