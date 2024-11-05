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
      className='from-primary-black relative min-h-screen overflow-hidden bg-gradient-to-b via-[#0D0D0E] to-[#0F1112] px-5 pb-32 text-white sm:px-8'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.08),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.4))]' />
        <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />

        {/* Animated Grid Pattern */}
        <motion.div
          className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px]'
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 100%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='mb-20 space-y-6 pt-32 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='inline-block rounded-full border border-primary-green/10 bg-primary-green/5 px-6 py-2 backdrop-blur-sm'
          >
            <span className='bg-gradient-to-r from-white/90 to-white/70 bg-clip-text font-light text-sm text-transparent'>
              Our Vision
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='mx-auto max-w-3xl bg-gradient-to-b from-white via-white/90 to-white/80 bg-clip-text font-light text-4xl leading-tight text-transparent sm:text-5xl'
          >
            Shaping the Future of Hospitality Technology
          </motion.h2>
        </motion.div>

        {/* Enhanced Founder Card */}
        <motion.div
          variants={itemVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='relative mx-auto max-w-5xl'
        >
          <div className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-[1px]'>
            {/* Card Glow Effects */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-glow-green via-glow-teal to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-80' />
              <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />
            </div>

            {/* Card Content */}
            <div className='relative flex flex-col gap-8 rounded-[23px] bg-gradient-to-br from-gray-900/95 to-black/95 p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:p-12'>
              {/* Image Section with Enhanced Hover Effects */}
              <motion.div
                className='relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl lg:w-2/5'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src='/assets/about/jessie.jpeg'
                  alt='Jessie Fischer'
                  fill
                  className='object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110'
                  sizes='(max-width: 768px) 100vw, 40vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                <motion.div
                  className='absolute inset-0 bg-gradient-to-b from-primary-green/20 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-300'
                  whileHover={{ opacity: 0.5 }}
                />
              </motion.div>

              {/* Enhanced Text Content */}
              <div className='flex flex-1 flex-col justify-between gap-8 lg:py-8'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-4'>
                    <h3 className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-2xl font-medium text-transparent'>
                      Jessie Fischer
                    </h3>
                    <div className='h-px flex-1 bg-gradient-to-r from-primary-green/20 to-transparent' />
                  </div>
                  <p className='font-light tracking-wide text-primary-green/80'>
                    Founder & CEO
                  </p>
                  <blockquote className='relative font-light text-xl italic leading-relaxed text-white/80'>
                    <span className='absolute -left-4 top-0 text-3xl text-primary-green/20'>
                      "
                    </span>
                    We're not just building another AI tool – we're crafting the
                    future of hospitality experiences, where technology enhances
                    rather than replaces human connection.
                    <span className='absolute -bottom-4 right-0 text-3xl text-primary-green/20'>
                      "
                    </span>
                  </blockquote>
                </div>

                {/* Enhanced Social Links */}
                <div className='flex items-center gap-6'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative rounded-full bg-white/5 p-3 transition-all hover:bg-white/10'
                  >
                    <div className='absolute inset-0 rounded-full bg-primary-green/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100' />
                    <LinkedIn
                      width={20}
                      height={20}
                      className='relative transition-transform group-hover:scale-110'
                    />
                  </Link>
                  <div className='h-8 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5' />
                  <Link
                    href='/careers'
                    className='group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-white'
                  >
                    <span className='relative'>
                      View Open Positions
                      <span className='absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary-green to-transparent transition-all group-hover:w-full' />
                    </span>
                    <motion.span
                      className='inline-block text-primary-green'
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
