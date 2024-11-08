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
      className='relative min-h-screen overflow-hidden bg-gradient-to-b from-[#141516] via-[#161718] to-[#181919] px-5 pb-32 text-white sm:px-8'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,200,87,0.08),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]' />

        {/* Animated Grid Pattern */}
        <motion.div
          className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]'
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 20%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Enhanced Floating Particles */}
        <motion.div
          className='absolute inset-0'
          initial={false}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,200,87,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Enhanced Section Header */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='mb-24 space-y-10 pt-32 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='inline-block rounded-full border border-primary-gold/20 bg-primary-gold/[0.03] px-6 py-2.5 backdrop-blur-sm'
          >
            <span className='bg-gradient-to-r from-primary-gold to-primary-gold/70 bg-clip-text font-light text-sm tracking-wider text-transparent'>
              Our Vision
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='mx-auto max-w-3xl bg-gradient-to-b from-white via-white/90 to-white/80 bg-clip-text font-light text-4xl leading-tight text-transparent sm:text-5xl lg:text-6xl'
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
          <div className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.11] to-white/[0.05] p-[1px] shadow-2xl'>
            {/* Enhanced Card Glow Effects */}
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-primary-gold/10 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-80' />
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-primary-gold/15 via-white/10 to-transparent'
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.02] mix-blend-overlay' />
            </div>

            {/* Card Content with Enhanced Layout */}
            <div className='relative flex flex-col gap-12 rounded-[23px] bg-gradient-to-br from-[#141516]/95 to-black/90 p-10 backdrop-blur-xl lg:flex-row lg:items-center lg:p-14'>
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
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                <motion.div
                  className='absolute inset-0 bg-gradient-to-b from-primary-gold/10 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-300'
                  whileHover={{ opacity: 0.6 }}
                />
              </motion.div>

              {/* Enhanced Text Content */}
              <div className='flex flex-1 flex-col justify-between gap-10 lg:py-8'>
                <div className='space-y-8'>
                  <div className='flex items-center gap-4'>
                    <h3 className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-3xl font-medium text-transparent'>
                      Jessie Fischer
                    </h3>
                    <div className='h-px flex-1 bg-gradient-to-r from-primary-gold/20 to-transparent' />
                  </div>
                  <p className='font-light tracking-wide text-primary-gold/90'>
                    Founder & CEO
                  </p>
                  <blockquote className='relative font-light text-2xl italic leading-relaxed text-white/80'>
                    <span className='absolute -left-4 top-0 text-4xl text-primary-gold/20'>
                      "
                    </span>
                    We're not just building another AI tool – we're crafting the
                    future of hospitality experiences, where technology enhances
                    rather than replaces human connection.
                    <span className='absolute -bottom-4 right-0 text-4xl text-primary-gold/20'>
                      "
                    </span>
                  </blockquote>
                </div>

                {/* Enhanced Social Links */}
                <div className='flex items-center gap-8'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative rounded-full bg-white/5 p-4 transition-all hover:bg-white/10'
                  >
                    <div className='absolute inset-0 rounded-full bg-primary-gold/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100' />
                    <LinkedIn
                      width={24}
                      height={24}
                      className='relative transition-transform group-hover:scale-110'
                    />
                  </Link>
                  <div className='h-10 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5' />
                  <Link
                    href='/careers'
                    className='group flex items-center gap-3 text-base text-white/60 transition-all hover:text-white'
                  >
                    <span className='relative'>
                      View Open Positions
                      <span className='absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary-gold to-transparent transition-all group-hover:w-full' />
                    </span>
                    <motion.span
                      className='inline-block text-primary-gold'
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
