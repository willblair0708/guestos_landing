import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';
import LinkedIn from '@/public/assets/ui/LinkedIn';

interface FutureSectionProps {
  id: string;
  bgColor: string;
}

export default function FutureSection({ id, bgColor }: FutureSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const router = useRouter();

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
  const ySpring = useSpring(y, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden bg-[#0A0A0B] px-5 pb-32 text-white sm:px-8'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,232,122,0.15),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(3,232,122,0.08),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5))]' />
      <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />

      {/* Animated Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]' />

      <div className='container relative z-10 mx-auto mt-[120px] lg:mt-[160px]'>
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='mb-32 flex flex-col items-center'
        >
          {/* Hiring Badge */}
          <motion.div
            variants={itemVariants}
            className='group relative mb-8 overflow-hidden rounded-full border border-white/5 bg-white/5 p-1 backdrop-blur-md'
            whileHover={{ scale: 1.02 }}
          >
            <div className='relative flex items-center gap-2 px-4 py-1.5'>
              <span className='h-2 w-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
              <span className='text-xs font-medium tracking-wider'>
                WE'RE HIRING
              </span>
              <div className='absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent' />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={itemVariants}
            className='relative space-y-8 text-center'
          >
            <h2 className='mx-auto max-w-4xl text-5xl font-book tracking-tight lg:text-7xl'>
              Join us in shaping the{' '}
              <span className='relative inline-block'>
                future
                <motion.div
                  className='absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-[#03E87A] via-[#03E87A]/50 to-transparent'
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </span>{' '}
              of hospitality
            </h2>
            <p className='mx-auto max-w-2xl font-light text-lg leading-relaxed text-white/60'>
              Where cutting-edge AI technology meets genuine human connection to
              create unforgettable guest experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          variants={itemVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='relative mx-auto mb-40 max-w-5xl'
        >
          <div className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]'>
            {/* Card Background Effects */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#03E87A]/20 via-white/5 to-transparent blur-xl' />
            <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />

            {/* Card Content */}
            <div className='relative flex flex-col gap-8 rounded-[23px] bg-gradient-to-br from-gray-900/95 to-black p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:p-12'>
              {/* Image Section */}
              <motion.div
                className='relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl lg:w-2/5'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src='/assets/about/jessie.jpeg'
                  alt='Jessie Fischer'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 40vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </motion.div>

              {/* Text Content */}
              <div className='flex flex-1 flex-col justify-between gap-8 lg:py-8'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-4'>
                    <h3 className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-2xl font-medium text-transparent'>
                      Jessie Fischer
                    </h3>
                    <div className='h-px flex-1 bg-gradient-to-r from-white/20 to-transparent' />
                  </div>
                  <p className='tracking-wide text-white/60'>Founder & CEO</p>
                  <blockquote className='font-light text-xl italic leading-relaxed text-white/80'>
                    "We're not just building another AI tool – we're crafting
                    the future of hospitality experiences, where technology
                    enhances rather than replaces human connection."
                  </blockquote>
                </div>

                {/* Social Links */}
                <div className='flex items-center gap-6'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group rounded-full bg-white/5 p-3 transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-[#03E87A]/10'
                  >
                    <LinkedIn
                      width={20}
                      height={20}
                      className='transition-transform group-hover:scale-110'
                    />
                  </Link>
                  <div className='h-8 w-px bg-white/10' />
                  <Link
                    href='/careers'
                    className='group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white'
                  >
                    View Open Positions
                    <motion.span
                      className='inline-block'
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
