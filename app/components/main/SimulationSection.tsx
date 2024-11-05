import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useRef } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Enhanced floating gradient animation
const floatingGradientVariants = {
  animate: {
    x: [0, 200, 0],
    y: [-100, 100, -100],
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function SimulationSection({
  id,
  bgColor,
  isMobile,
}: SimulationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-[#0A0A0A] text-white'
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Enhanced background effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.08),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.05),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
      </div>

      <motion.div
        className='relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'
        style={{ y: ySpring, opacity, scale: scaleSpring }}
      >
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Left column */}
          <motion.div className='space-y-8' variants={itemVariants}>
            <motion.h2
              className='font-light text-4xl tracking-tight text-white sm:text-5xl'
              variants={itemVariants}
            >
              {isMobile ? (
                'Revolutionizing hospitality with AI-powered guest experiences'
              ) : (
                <>
                  Revolutionizing hospitality <br />
                  with AI-powered <br />
                  guest experiences
                </>
              )}
            </motion.h2>

            <motion.p
              className='max-w-xl text-lg leading-relaxed text-white/60'
              variants={itemVariants}
            >
              Our advanced AI technology seamlessly integrates with your
              existing systems, providing personalized recommendations and
              automated assistance while maintaining the human touch that makes
              hospitality special.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href='/products'
                className='group inline-flex items-center space-x-4 text-white/90'
              >
                <span className='text-sm uppercase tracking-wider'>
                  Explore Our Solutions
                </span>
                <motion.span
                  className='inline-block'
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Statistics */}
          <motion.div
            className='relative grid gap-8 sm:grid-cols-2'
            variants={containerVariants}
          >
            {[
              { value: '95%', label: 'Guest Satisfaction' },
              { value: '3x', label: 'Faster Response Time' },
              { value: '24/7', label: 'Always Available' },
              { value: '50%', label: 'Operational Efficiency' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className='relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg'
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transition: { duration: 0.2 },
                }}
              >
                <div className='absolute -right-4 -top-4 h-24 w-24 bg-gradient-to-br from-[#03E87A]/20 via-[rgba(255,200,87,0.1)] to-transparent blur-2xl' />
                <h3 className='mb-2 font-light text-3xl text-white'>
                  {stat.value}
                </h3>
                <p className='text-sm text-white/60'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
