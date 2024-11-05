import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  isMobile?: boolean;
}

export default function HeroSection({ id, isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '10%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const [headerSize, setHeaderSize] = useState('text-[32px]');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setHeaderSize('text-[42px]');
      } else if (window.innerWidth > 390) {
        setHeaderSize('text-[36px]');
      } else {
        setHeaderSize('text-[32px]');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className='absolute inset-0 z-0'>
        <Image
          src='/assets/main/main_hero_poster.png'
          alt='Hero background'
          fill
          priority
          quality={90}
          className='h-full w-full object-cover'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.15),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(3,232,122,0.08),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]' />
        <motion.div
          className='absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/10 to-transparent blur-3xl'
          animate={{
            x: [0, 200, 0],
            y: [-100, 100, -100],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />
        <div className='relative grid h-full grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='col-span-12 flex items-center lg:col-span-7'
            style={{ opacity, scale }}
          >
            <div className='w-full space-y-8'>
              <motion.div
                variants={fadeInVariants}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                className='space-y-4'
              >
                <span className='inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm'>
                  Welcome to the Future of Hospitality
                </span>
                <h1 className='text-hero font-book'>
                  <span className='block font-light text-6xl tracking-tight sm:text-7xl lg:text-8xl'>
                    The AI Concierge
                  </span>
                  <span className='mt-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl text-transparent sm:text-5xl lg:text-6xl'>
                    For Hospitality
                  </span>
                </h1>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='absolute bottom-12 right-8 w-[400px] space-y-8 rounded-2xl border border-[#03E87A]/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-8 backdrop-blur-xl sm:bottom-20 sm:right-12'
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className='relative space-y-6'>
              <div className='absolute -left-14 top-0 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/10 to-transparent blur-3xl' />
              <div className='absolute -right-14 -top-10 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/5 to-transparent blur-3xl' />

              <div className='relative space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
                  <h2 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light text-2xl text-transparent'>
                    Enhancing Human Connection
                  </h2>
                </div>
                <div className='h-px w-12 bg-gradient-to-r from-[#03E87A] to-transparent' />
              </div>

              <p className='relative font-light text-lg leading-relaxed text-white/70'>
                Born from a family of hoteliers, GuestOS helps you focus on what
                matters most - creating memorable experiences for your guests.
              </p>

              <div className='relative flex items-center justify-between'>
                <motion.button
                  className='group flex items-center space-x-3 rounded-full border border-[#03E87A]/10 bg-[#03E87A]/5 px-6 py-3 backdrop-blur-sm transition-all hover:border-[#03E87A]/20 hover:bg-[#03E87A]/10'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='text-white/90'>Learn More</span>
                  <motion.span
                    className='inline-block text-white/90'
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.div
                  className='flex items-center space-x-2 text-sm text-[#03E87A]/60'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className='h-1 w-1 rounded-full bg-[#03E87A]/60' />
                  <span>AI Powered</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className='pointer-events-none absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-1 w-1 rounded-full bg-white'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
