import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

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

const Background = () => (
  <motion.div
    className='absolute inset-0 z-0'
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  >
    <Image
      src='/assets/about/about_header.webp'
      alt='About GuestOS'
      fill
      priority
      quality={100}
      className='h-full w-full object-cover'
      sizes='100vw'
    />
    <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.15),transparent_70%)]' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.12),transparent_70%)]' />
    <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.2)_100%)]' />
  </motion.div>
);

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
