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
      className='relative overflow-hidden bg-gradient-to-b from-[#141516] via-[#161718] to-[#181919] py-24 text-white sm:py-32'
    >
      {/* Simplified Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,180,67,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]' />
      </div>

      <div className='relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        {/* Refined Section Header */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='mb-16 space-y-6 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs backdrop-blur-sm'
          >
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
            <span className='text-white/80'>OUR VISION</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='mx-auto max-w-2xl text-4xl font-light tracking-tight sm:text-5xl'
          >
            Shaping the Future of Hospitality Technology
          </motion.h2>
        </motion.div>

        {/* Refined Founder Card */}
        <motion.div
          variants={itemVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl'>
            <div className='relative grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12'>
              {/* Left Column - Image */}
              <motion.div
                className='relative aspect-[4/5] overflow-hidden rounded-xl lg:aspect-[3/4]'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src='/assets/about/jessie.jpeg'
                  alt='Jessie Fischer'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
              </motion.div>

              {/* Right Column - Content */}
              <div className='flex flex-col justify-between'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='text-2xl font-medium sm:text-3xl'>
                      Jessie Fischer
                    </h3>
                    <p className='mt-1 text-sm text-[#03E87A]'>
                      Founder & CEO
                    </p>
                  </div>

                  <blockquote className='text-lg font-light italic text-white/80 sm:text-xl'>
                    <span className='text-[#03E87A]/20'>"</span>
                    We're not just building another AI tool – we're crafting the
                    future of hospitality experiences, where technology enhances
                    rather than replaces human connection.
                    <span className='text-[#03E87A]/20'>"</span>
                  </blockquote>
                </div>

                {/* Simplified Social Links */}
                <div className='mt-8 flex items-center gap-4'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rounded-full bg-white/5 p-3 transition-all hover:bg-white/10'
                  >
                    <LinkedIn width={20} height={20} className='text-white' />
                  </Link>
                  <Link
                    href='/careers'
                    className='group inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm transition-all hover:bg-white/10'
                  >
                    View Open Positions
                    <ArrowIcon className='rotate-[-90deg] transition-transform group-hover:translate-x-1' />
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
