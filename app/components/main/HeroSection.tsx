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
      <motion.div
        className='absolute inset-0 z-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src='/assets/main/main_hero_poster.png'
          alt='Hero background'
          fill
          priority
          quality={90}
          className='h-full w-full object-cover'
          sizes='100vw'
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </motion.div>
      <motion.div
        className='absolute inset-0 z-10'
        style={{ y: ySpring }}
        initial={{ backgroundPosition: '0 0' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className='h-full w-full opacity-20'></div>
      </motion.div>
      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />
        <motion.div
          className={`mr-auto flex max-w-7xl flex-grow items-center px-4 sm:px-6 sm:pt-0 lg:px-8 ${
            isMobile ? 'mt-[-100px]' : ''
          }`}
          style={{ opacity, scale }}
        >
          <div className='w-full'>
            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className={`mb-6 text-hero font-book text-white`}
            >
              <span className='whitespace-nowrap'>The AI Concierge </span>
              <wbr />
              <span className='whitespace-nowrap'>For Hospitality</span>
            </motion.h1>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className={`absolute ${
            isMobile ? 'bottom-[30px]' : 'bottom-[60px]'
          } right-[30px] flex w-[270px] flex-col items-start space-y-4 border-t border-white sm:bottom-20 sm:right-24`}
        >
          <div className='flex flex-col items-start py-3'>
            <p className='mb-[60px] font-book leading-tight tracking-tight text-white sm:mb-20'>
              Enhancing Human <br />
              Connection
            </p>
          </div>
          <div>
            <p className='text-white text-opacity-60'>
              Born from a family of hoteliers, GuestOS helps you focus on what
              matters most - creating memorable experiences for your guests.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
