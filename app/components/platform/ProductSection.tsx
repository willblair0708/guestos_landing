import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion, useScroll, useTransform } from 'framer-motion';

interface ProductSectionProps {
  id: string;
  bgColor: string;
  productName: string;
  productDescription: string;
  imageSrc: string;
  features: Array<{
    title: string;
    description: string;
    bulletPoints: string[];
  }>;
  overlayContent?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.2, 0.1, 0.3, 1],
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.2, 0.1, 0.3, 1],
    },
  },
};

const imageVariants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.2, 0.1, 0.3, 1],
    },
  },
};

const floatingGradientVariants = {
  animate: {
    x: [0, 60, 0],
    y: [0, 40, 0],
    scale: [1, 1.15, 1],
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 18,
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
  overlayContent,
}: ProductSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: '50px',
  });

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='relative min-h-screen overflow-hidden py-32 text-white'
    >
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_75%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.04),transparent_75%)]' />

        <motion.div
          className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]'
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 35%, transparent 85%)',
          }}
        />

        <motion.div
          variants={floatingGradientVariants}
          animate='animate'
          className='via-white/8 absolute -left-[400px] top-1/3 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-primary-gold/15 to-transparent blur-[120px]'
        />
        <motion.div
          variants={floatingGradientVariants}
          animate='animate'
          className='via-white/8 absolute -right-[400px] top-2/3 h-[800px] w-[800px] rounded-full bg-gradient-to-l from-primary-gold/15 to-transparent blur-[120px]'
        />

        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.025] mix-blend-overlay" />
      </div>

      <div className='max-w-8xl relative mx-auto px-6 sm:px-8 lg:px-12'>
        <motion.div variants={itemVariants} className='mb-32 max-w-4xl'>
          <motion.div
            className='mb-10 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 backdrop-blur-xl'
            whileHover={{
              scale: 1.03,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              transition: { duration: 0.3 },
            }}
          >
            <span className='relative flex h-2.5 w-2.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-gold opacity-75'></span>
              <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-gold'></span>
            </span>
            <span className='font-light text-base tracking-wider text-white/90'>
              Product Overview
            </span>
          </motion.div>

          <div className='relative space-y-8'>
            <h2 className='bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text font-light text-7xl tracking-tight text-transparent'>
              {productName}
            </h2>
            <motion.div
              className='h-px w-40 bg-gradient-to-r from-primary-gold to-transparent'
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <p className='font-light text-2xl leading-relaxed tracking-wide text-white/75'>
              {productDescription}
            </p>
          </div>
        </motion.div>

        <div className='relative grid gap-32 lg:grid-cols-2'>
          <motion.div
            variants={imageVariants}
            className='group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-[1px]'
          >
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/25 via-white/15 to-transparent opacity-60 blur-3xl transition-all duration-700 group-hover:opacity-90 group-hover:blur-[100px]' />
            </div>

            <div className='relative h-full w-full overflow-hidden rounded-[2rem]'>
              <Image
                src={imageSrc}
                alt={`${productName} Visualization`}
                fill
                className='rounded-[2rem] object-cover transition-all duration-1000 will-change-transform group-hover:scale-110'
                quality={100}
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-primary-gold/25 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500'
                whileHover={{ opacity: 0.6 }}
              />
              {overlayContent}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className='space-y-10'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='border-white/8 group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/[0.04] to-transparent p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:from-white/[0.08]'
                whileHover={{
                  scale: 1.02,
                  y: -6,
                  transition: { duration: 0.3 },
                }}
              >
                <div className='absolute inset-0'>
                  <div className='via-white/8 absolute inset-0 bg-gradient-to-r from-primary-gold/15 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100' />
                  <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.04] mix-blend-overlay" />
                </div>

                <div className='relative space-y-6'>
                  <div className='flex items-center gap-5'>
                    <motion.div
                      className='bg-white/8 flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-xl'
                      whileHover={{ scale: 1.15 }}
                    >
                      <div className='h-3 w-3 rounded-full bg-gradient-to-r from-primary-gold to-primary-gold/85' />
                    </motion.div>
                    <h3 className='bg-gradient-to-r from-white to-white/85 bg-clip-text text-base font-medium uppercase tracking-widest text-transparent'>
                      {feature.title}
                    </h3>
                  </div>

                  <p className='font-light text-xl leading-relaxed tracking-wide text-white/75'>
                    {feature.description}
                  </p>

                  {feature.bulletPoints && (
                    <ul className='mt-8 space-y-4'>
                      {feature.bulletPoints.map((point, i) => (
                        <li
                          key={i}
                          className='group/item flex items-start gap-4 text-white/65 transition-colors duration-500 hover:text-white/95'
                        >
                          <span className='relative mt-2 flex h-2.5 w-2.5'>
                            <span className='absolute inline-flex h-full w-full rounded-full bg-primary-gold/45 transition-colors duration-500 group-hover/item:bg-primary-gold'></span>
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
