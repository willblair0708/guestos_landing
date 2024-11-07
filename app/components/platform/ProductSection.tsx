import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface ProductSectionProps {
  id: string;
  bgColor: string;
  productName: string;
  productDescription: string;
  imageSrc: string;
  features: Array<{
    title: string;
    description: string;
    bulletPoints?: string[];
  }>;
}

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Floating gradient animation
const floatingGradientVariants = {
  animate: {
    x: [0, 50, 0],
    y: [0, 30, 0],
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.7, 0.5],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export default function ProductSection({
  id,
  bgColor,
  productName,
  productDescription,
  imageSrc,
  features,
}: ProductSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='relative min-h-screen overflow-hidden py-24 text-white'
    >
      {/* Enhanced background effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.03),transparent_70%)]' />
        <motion.div
          className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px]'
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* Floating gradient orbs */}
        <motion.div
          variants={floatingGradientVariants}
          animate='animate'
          className='absolute -left-[300px] top-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-gold/10 via-white/5 to-transparent blur-3xl'
        />
        <motion.div
          variants={floatingGradientVariants}
          animate='animate'
          className='absolute -right-[300px] top-2/3 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-primary-gold/10 via-white/5 to-transparent blur-3xl'
        />

        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Product Header with enhanced animations */}
        <motion.div variants={itemVariants} className='mb-24 max-w-3xl'>
          <motion.div
            className='mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm'
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              transition: { duration: 0.2 },
            }}
          >
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-gold opacity-75'></span>
              <span className='relative inline-flex h-2 w-2 rounded-full bg-primary-gold'></span>
            </span>
            <span className='font-light text-sm tracking-wide text-white/80'>
              Product Overview
            </span>
          </motion.div>

          <div className='relative space-y-6'>
            <h2 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light text-6xl tracking-tight text-transparent'>
              {productName}
            </h2>
            <motion.div
              className='h-px w-32 bg-gradient-to-r from-primary-gold to-transparent'
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className='font-light text-xl leading-relaxed tracking-wide text-white/70'>
              {productDescription}
            </p>
          </div>
        </motion.div>

        {/* Enhanced Content Grid */}
        <div className='relative mt-32 grid gap-24 lg:grid-cols-2'>
          {/* Image Section with enhanced effects */}
          <motion.div
            variants={imageVariants}
            className='group relative aspect-[3/2] overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-[1px]'
          >
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-white/10 to-transparent opacity-60 blur-2xl transition-all duration-500 group-hover:opacity-80 group-hover:blur-3xl' />
            </div>

            <div className='relative h-full w-full overflow-hidden rounded-3xl'>
              <Image
                src={imageSrc}
                alt={`${productName} Visualization`}
                fill
                className='rounded-3xl object-cover transition-all duration-700 will-change-transform group-hover:scale-105'
                quality={95}
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-primary-gold/20 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-300'
                whileHover={{ opacity: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Features Grid with enhanced cards */}
          <motion.div variants={itemVariants} className='space-y-8'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:from-white/[0.05]'
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className='absolute inset-0'>
                  <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                  <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay" />
                </div>

                <div className='relative space-y-4'>
                  <div className='flex items-center gap-4'>
                    <motion.div
                      className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm'
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className='h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary-gold to-primary-gold/80' />
                    </motion.div>
                    <h3 className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-sm font-medium uppercase tracking-wider text-transparent'>
                      {feature.title}
                    </h3>
                  </div>

                  <p className='font-light text-lg leading-relaxed tracking-wide text-white/70'>
                    {feature.description}
                  </p>

                  {feature.bulletPoints && (
                    <ul className='mt-6 space-y-3'>
                      {feature.bulletPoints.map((point, i) => (
                        <li
                          key={i}
                          className='group/item flex items-start gap-3 text-white/60 transition-colors duration-300 hover:text-white/90'
                        >
                          <span className='relative mt-1.5 flex h-2 w-2'>
                            <span className='absolute inline-flex h-full w-full rounded-full bg-primary-gold/40 transition-colors duration-300 group-hover/item:bg-primary-gold'></span>
                          </span>
                          <span className='font-light tracking-wide'>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
