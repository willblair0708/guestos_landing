'use client';

import Script from 'next/script';
import React, { useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import HeroSection from '../components/contact/HeroSection';
import Footer from '../components/Footer';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <AnimatePresence mode='wait'>
      <Script src='https://www.google.com/recaptcha/enterprise.js?render=6LexbW8qAAAAAIr7IhfsTb0UMA8gqigbZIY1sHrY' />
      <motion.div
        key='contact-page'
        // className='relative w-screen overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200'
      >
        {/* <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.15),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.1),transparent_50%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.8),transparent_10%,transparent_90%,rgba(255,255,255,0.8))]' /> */}

        <motion.main
          ref={containerRef}
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='relative flex flex-col justify-between'
        >
          <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-[2px]' />
          <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-[2px]' />

          <HeroSection
            id='section-0'
            bgColor='bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200'
            isMobile={isMobile}
          />
          <Footer />
        </motion.main>
      </motion.div>
    </AnimatePresence>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.8,
    },
  },
};
