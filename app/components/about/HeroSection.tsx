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
  return (
    <motion.div
      className='absolute inset-0 z-0'
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/assets/holiday-hotel-bg.webp"
          alt="Holiday Special Offer"
          fill
          priority
          quality={100}
          className='duration-[1.2s] h-full w-full object-cover transition-transform ease-out'
          sizes='100vw'
        />
        <motion.div
          className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Snowfall effect */}
      <div className='absolute inset-0 animate-snowfall bg-[url("/assets/snowflakes.png")] opacity-30' />

      {/* Enhanced gradient overlays */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.1),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,0,0.1),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]' />
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
            <div className='w-full space-y-8'>
              <motion.div
                className='group inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-white/5 px-5 py-2 backdrop-blur-sm'
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.2 }}
              >
                <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-red-400' />
                <span className='bg-gradient-to-r from-red-400 to-green-400 bg-clip-text font-light text-base tracking-wider text-transparent'>
                  HOLIDAY SPECIAL OFFER
                </span>
              </motion.div>

              <motion.h1
                className='max-w-4xl bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text pb-1 font-light text-5xl leading-[1.2] tracking-tight text-transparent sm:text-6xl lg:text-6xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Transform Your Hotel with AI for Just $50/month
              </motion.h1>

              <motion.div
                className='space-y-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <p className='max-w-xl font-light text-xl leading-relaxed text-white/90'>
                  Get your personalized AI Concierge for an exclusive rate of $50/month for the first 3 months. Lock in this special price today!
                </p>
                
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                  <motion.button
                    onClick={() => window.location.href = '#signup-form'}
                    className='group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-green-500 px-8 py-4 text-white transition-all hover:brightness-110'
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span className='font-medium'>Get Started Now</span>
                    <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <path d='M5 12H19M19 12L12 5M19 12L12 19' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </motion.button>
                  <span className='text-white/60'>
                    Offer valid until Dec 31, 2024
                  </span>
                </div>
              </motion.div>

              <motion.div
                className='mt-8 flex flex-wrap gap-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-white/10 p-2'>
                    <svg className='h-5 w-5 text-primary-gold' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <path d='M5 13l4 4L19 7' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </div>
                  <span className='text-white/80'>Personalized AI Concierge</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-white/10 p-2'>
                    <svg className='h-5 w-5 text-primary-gold' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <path d='M5 13l4 4L19 7' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </div>
                  <span className='text-white/80'>Dedicated Phone Number</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-white/10 p-2'>
                    <svg className='h-5 w-5 text-primary-gold' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <path d='M5 13l4 4L19 7' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </div>
                  <span className='text-white/80'>Core Dashboard Access</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}