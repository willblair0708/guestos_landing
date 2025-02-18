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
            <div className='h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-primary-gold' />
            <div className='absolute -inset-0.5 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-primary-gold/30' />
          </div>
          <span className='text-sm font-medium text-primary-gold'>CALL-HELP INITIATIVE</span>
        </div>
        {!isMobile && (
          <>
            <div className='h-4 w-px bg-white/10' />
            <div className='text-sm text-white/90'>
              Empowering communities with AI-powered support systems
            </div>
          </>
        )}
      </div>

      {/* Right side with stats and CTA */}
      <div className='flex items-center gap-6'>
        {!isMobile && (
          <div className='flex items-center gap-6 border-r border-white/10 pr-6'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-white/90'>24/7</span>
              <span className='text-sm text-white/60'>Assistance</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-white/90'>100+</span>
              <span className='text-sm text-white/60'>Partners</span>
            </div>
          </div>
        )}
        
        <Link
          href="/contact"
          className='group relative flex items-center gap-2 overflow-hidden rounded-full border border-primary-gold/20 bg-primary-gold/5 px-4 py-1.5 text-sm backdrop-blur-sm transition-all hover:border-primary-gold/40 hover:bg-primary-gold/10'
        >
          <span className='text-primary-gold group-hover:text-primary-gold'>
            Learn More
          </span>
          <motion.span
            className='inline-block text-primary-gold'
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <div className='absolute inset-0 -z-10 bg-gradient-to-r from-primary-gold/0 via-primary-gold/5 to-primary-gold/0 opacity-0 transition-opacity group-hover:opacity-100' />
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
      className={`relative z-50 w-full border-b border-white/10 bg-black/90 text-white backdrop-blur-xl ${
        isMobile ? 'h-[40px] px-4 py-2' : 'h-[48px] px-[30px] py-[10px]'
      }`}
    >
      {/* Ambient background effects */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-gold/5' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,200,87,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,200,87,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
      </div>
      
      <BannerContent {...props} isMobile={isMobile} />
    </motion.div>
  );
} 