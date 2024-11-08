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
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.15),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.12),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.2)_100%)]' />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Updated Section Header */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='mb-24 space-y-10 pt-32 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='group inline-flex items-center gap-3 rounded-full border border-primary-gold/20 bg-white/5 px-5 py-2 backdrop-blur-sm'
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
            <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light text-sm tracking-wider text-transparent'>
              OUR VISION
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='mx-auto max-w-3xl bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text pb-1 font-light text-4xl leading-[1.2] tracking-tight text-transparent sm:text-5xl lg:text-5xl'
          >
            Shaping the Future of Hospitality Technology
          </motion.h2>
        </motion.div>

        {/* Updated Founder Card */}
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
              <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.02] mix-blend-overlay' />
            </div>

            {/* Card Content */}
            <div className='relative grid overflow-hidden rounded-[23px] bg-gradient-to-br from-[#141516]/95 to-black/90 p-8 backdrop-blur-xl lg:grid-cols-2 lg:gap-12 lg:p-12'>
              {/* Left Column - Image */}
              <motion.div
                className='relative aspect-[3/4] w-full overflow-hidden rounded-2xl'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src='/assets/about/jessie.jpeg'
                  alt='Jessie Fischer'
                  fill
                  className='object-cover transition-all duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
              </motion.div>

              {/* Right Column - Content */}
              <div className='flex flex-col justify-between py-8'>
                <div className='space-y-8'>
                  <div className='space-y-2'>
                    <h3 className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-3xl font-medium text-transparent'>
                      Jessie Fischer
                    </h3>
                    <p className='font-light tracking-wide text-primary-gold'>
                      Founder & CEO
                    </p>
                  </div>

                  <blockquote className='relative space-y-4 font-light text-2xl italic leading-relaxed text-white/80'>
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

                {/* Updated Social Links */}
                <div className='flex items-center gap-8 pt-8'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative rounded-full bg-white/5 p-4 transition-all hover:bg-white/10'
                  >
                    <LinkedIn
                      width={24}
                      height={24}
                      className='relative text-white transition-transform group-hover:scale-110'
                    />
                  </Link>
                  <div className='h-10 w-px bg-white/10' />
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
