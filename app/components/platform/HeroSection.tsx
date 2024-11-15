import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  motion,
  useSpring as useFramerSpring,
  useScroll,
  useTransform,
} from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  onScrollToNext: () => void;
}

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
      src='/assets/platform/platform_header1.jpg'
      alt='Platform background'
      fill
      priority
      quality={100}
      className='h-full w-full object-cover'
      sizes='100vw'
    />
    <div className='absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-black/80' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.12),transparent_70%)]' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]' />
    <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
    <motion.div
      className='absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-[#03E87A]/15 via-[rgba(255,200,87,0.1)] to-transparent blur-3xl'
      variants={floatingGradientVariants}
      animate='animate'
    />
  </motion.div>
);

const floatingGradientVariants = {
  animate: {
    x: [0, 200, 0],
    y: [-100, 100, -100],
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function HeroSection({
  id,
  bgColor,
  onScrollToNext,
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
                  <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light text-base tracking-wider text-transparent'>
                    OUR PLATFORM
                  </span>
                </motion.div>

                <motion.h1
                  className='max-w-4xl bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text pb-1 font-light text-5xl leading-[1.2] tracking-tight text-transparent sm:text-6xl lg:text-6xl'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  The Future of Hospitality is Here
                </motion.h1>

                <motion.p
                  className='max-w-xl font-light text-xl leading-relaxed text-white/90'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Discover our suite of AI-powered tools designed to transform
                  guest experiences and streamline operations.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className='flex items-center gap-8'
              >
                {/* <motion.button
                  onClick={onScrollToNext}
                  className='group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/10'
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className='font-light text-base text-white'>
                    Explore Products
                  </span>
                  <ArrowIcon className='h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1' />
                </motion.button> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
