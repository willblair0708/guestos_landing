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
    <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.12),transparent_70%)]' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.08),transparent_70%)]' />
    <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
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
            <div className='w-full space-y-10'>
              <div className='space-y-6'>
                <motion.span
                  className='group inline-block overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm'
                  whileHover={{ scale: 1.02 }}
                >
                  <div className='relative flex items-center gap-3'>
                    <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
                    <span className='text-sm text-white'>Our Story</span>
                  </div>
                </motion.span>

                <motion.h1
                  className='max-w-3xl font-light text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  A Long-Standing Family Affair.
                </motion.h1>

                <motion.p
                  className='max-w-xl font-light text-lg leading-relaxed text-white/80'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  For over four decades, our family has been at the forefront of
                  hospitality innovation, crafting exceptional experiences that
                  blend tradition with technology.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
