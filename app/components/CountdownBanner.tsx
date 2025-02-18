'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/use-is-mobile';
import Link from 'next/link';

interface CountdownBannerProps {
  countdown?: string;
}

function BannerContent({
  isMobile,
}: CountdownBannerProps & { isMobile: boolean }) {
  return (
    <div className='sticky top-0 flex h-full w-full items-center justify-between'>
      {/* Left side with status and main message */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <div className='h-2 w-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-accent-gold-light' />
            <div className='absolute -inset-1 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-accent-gold-light/40' />
          </div>
          <span className='text-sm font-semibold tracking-wide text-accent-gold-light'>AI ASSISTANCE</span>
        </div>
        {!isMobile && (
          <>
            <div className='h-4 w-px bg-white/20' />
            <div className='text-sm font-medium text-white'>
              Empowering communities with 24/7 AI-powered support and guidance
            </div>
          </>
        )}
      </div>

      {/* Right side with stats and CTA */}
      <div className='flex items-center gap-6'>
        {!isMobile && (
          <div className='flex items-center gap-6 border-r border-white/20 pr-6'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-semibold text-accent-gold-light'>Instant</span>
              <span className='text-sm font-medium text-white/80'>Response</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-semibold text-accent-gold-light'>Always</span>
              <span className='text-sm font-medium text-white/80'>Available</span>
            </div>
          </div>
        )}
        
        <Link
          href="/contact"
          className='group relative flex items-center gap-2 overflow-hidden rounded-full border-2 border-accent-gold-light/30 bg-accent-gold-light/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-accent-gold-light/50 hover:bg-accent-gold-light/20'
        >
          <span className='text-accent-gold-light'>
            Learn More
          </span>
          <motion.span
            className='inline-block text-accent-gold-light'
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <div className='absolute inset-0 -z-10 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/10 to-accent-gold-light/0 opacity-0 transition-opacity group-hover:opacity-100' />
        </Link>
      </div>
    </div>
  );
}

export default function CountdownBanner(props: CountdownBannerProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      initial='hidden'
      animate='visible'
      className={`relative z-50 w-full border-b border-white/20 bg-black text-white backdrop-blur-xl ${
        isMobile ? 'h-[40px] px-4 py-2' : 'h-[48px] px-[30px] py-[10px]'
      }`}
    >
      {/* Ambient background effects */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-r from-accent-gold-light/10 via-transparent to-accent-gold-light/10' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,200,87,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,200,87,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
      </div>
      
      <BannerContent {...props} isMobile={isMobile} />
    </motion.div>
  );
} 