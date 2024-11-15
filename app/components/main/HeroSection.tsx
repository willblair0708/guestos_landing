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

// Constants
const PARTICLE_COUNT = 35;
const SPRING_CONFIG = { stiffness: 120, damping: 25, restDelta: 0.001 };

// Enhanced animation variants
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

// Enhanced particle animation with more dynamic movement
const particleAnimation = (i: number) => ({
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.3 + 0.1,
    scale: Math.random() * 0.7 + 0.3,
  },
  animate: {
    y: [0, -40, 0],
    x: [0, Math.sin(i) * 20, 0],
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.3, 1],
  },
  transition: {
    duration: Math.random() * 5 + 4,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: Math.random() * 2,
  },
});

// New text animation variant
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Components
const Background = ({ isMobile }: { isMobile?: boolean }) => (
  <motion.div
    className='absolute inset-0 z-0'
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  >
    <Image
      src={
        isMobile
          ? '/assets/main/main_hero_poster.webp'
          : '/assets/main/main_hero_poster.jpg'
      }
      alt='Hero background'
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

const InfoCard = () => (
  <motion.div
    variants={fadeInVariants}
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true }}
    className='absolute bottom-12 right-8 w-[400px] space-y-8 rounded-2xl border border-[#03E87A]/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-8 backdrop-blur-xl sm:bottom-20 sm:right-12'
    whileHover={{
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' },
    }}
  >
    <div className='relative space-y-6'>
      <div className='absolute -left-14 top-0 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/10 to-transparent blur-3xl' />
      <div className='absolute -right-14 -top-10 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/5 to-transparent blur-3xl' />

      <div className='relative space-y-4'>
        <div className='flex items-center space-x-3'>
          <h2 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light text-3xl text-transparent'>
            Enhancing Human Connection
          </h2>
        </div>
        <div className='h-px w-12 bg-gradient-to-r from-primary-gold to-transparent' />
      </div>

      <p className='relative font-light text-lg leading-relaxed text-white/70'>
        Born from a family of hoteliers, GuestOS helps you focus on what matters
        most - creating memorable experiences for your guests.
      </p>

      {/* <div className='relative flex items-center justify-between'>
        <motion.button
          className='group flex items-center space-x-3 rounded-full border border-primary-gold/10 bg-primary-gold/5 px-6 py-3 backdrop-blur-sm transition-all'
          whileHover={{
            scale: 1.05,
            backgroundColor: 'rgba(255,200,87,0.15)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className='text-sm text-white/90'>Learn More</span>
          <motion.span
            className='inline-block text-white/90'
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div> */}
    </div>
  </motion.div>
);

// Main Component
export default function HeroSection({ id, isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 5]);
  const ySpring = useSpring(y, SPRING_CONFIG);

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

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background isMobile={isMobile} />

      <motion.div
        className='relative z-20 flex h-full flex-col'
        style={{
          opacity,
          scale,
          y: ySpring,
          filter: `blur(${blur}px)`,
        }}
      >
        <Navbar isFixed={false} />
        <div className='relative grid h-full grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8'>
          <motion.div
            className={`col-span-12 flex items-center ${
              isMobile ? 'justify-center pb-24' : 'lg:col-span-7'
            }`}
            style={{ opacity, scale }}
          >
            <div
              className={`w-full space-y-10 ${isMobile ? 'text-center' : ''}`}
            >
              <motion.div
                variants={fadeInVariants}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                className='space-y-6'
              >
                <motion.span
                  className='group inline-block overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base backdrop-blur-sm'
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`relative flex items-center gap-3 ${isMobile ? 'justify-center' : ''}`}
                  >
                    <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
                    <span className='relative'>
                      Welcome to the Future of Hospitality
                      <div className='absolute inset-0 animate-[shimmer_3s_infinite] to-transparent' />
                    </span>
                  </div>
                </motion.span>

                <h1 className='text-hero font-book'>
                  <motion.span
                    className={`block font-light tracking-tight ${
                      isMobile
                        ? 'text-4xl sm:text-5xl'
                        : 'sm:text-5xl lg:text-6xl'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    The AI Concierge for Hospitality
                  </motion.span>
                </h1>

                <motion.p
                  className={`font-light text-xl leading-relaxed text-white/60 ${
                    isMobile ? 'mx-auto max-w-sm' : 'max-w-xl'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Experience the perfect blend of AI technology and human touch,
                  designed to elevate your guest experience to new heights.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
          {!isMobile && <InfoCard />}
        </div>
      </motion.div>

      <motion.div
        className='pointer-events-none absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        {[...Array(PARTICLE_COUNT)].map((_, i) => {
          const { style, animate, transition } = particleAnimation(i);
          return (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-white'
              style={style}
              animate={animate}
              transition={transition}
            />
          );
        })}
      </motion.div>
    </motion.section>
  );
}
