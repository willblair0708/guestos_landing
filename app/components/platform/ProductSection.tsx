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

const PRODUCT_DESCRIPTION =
  'Too many people make decisions based on no data, or worse, bad data. Meet a family of simulation engines, built by our researchers alongside our category-defining partners. Engineered to provide clairvoyance for those who need it most.';

// Update gradient constants
const ACCENT_GRADIENT =
  'from-primary-gold/10 via-primary-gold/5 to-transparent';
const ACCENT_BORDER = 'border-white/10';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
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
  const [ref, inView] = useInView({
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
      className='relative flex flex-col text-white'
    >
      <div
        className={`sm:flex-1 sm:py-6 lg:px-6 ${id === 'dynamo-section' ? 'mt-24' : ''}`}
      >
        {id === 'dynamo-section' && (
          <motion.h3
            variants={itemVariants}
            className='relative mb-32 max-w-md rounded-3xl border border-white/5 bg-gradient-to-br from-surface-dark via-black/80 to-black/60 px-8 py-6 text-left text-base font-book leading-relaxed tracking-[-0.02em] text-neutral-300 shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-white/10 hover:shadow-xl sm:px-8'
          >
            {PRODUCT_DESCRIPTION}
          </motion.h3>
        )}

        <div className='flex min-h-[900px] w-full flex-col items-stretch overflow-hidden rounded-3xl bg-gradient-to-br from-black via-neutral-900/95 to-neutral-900 shadow-2xl md:flex-row'>
          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className='group relative h-[400px] w-full overflow-hidden md:h-auto md:w-1/2'
          >
            <div className='relative h-full w-full'>
              <Image
                src={imageSrc}
                alt={`${productName} Visualization`}
                layout='fill'
                objectFit='cover'
                quality={90}
                priority
                placeholder='blur'
                blurDataURL='...'
                className='rounded-3xl transition-all duration-700 will-change-transform'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent' />
              <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className='flex w-full flex-col justify-center p-8 sm:p-16 md:w-1/2'
          >
            <div className='space-y-6'>
              <h2 className='relative mb-[30px] bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light font-pantheon text-[64px] leading-tight tracking-tight text-transparent'>
                {productName}
                <div className='absolute -bottom-2 left-0 h-px w-1/4 bg-gradient-to-r from-primary-gold to-transparent' />
              </h2>
              <h2 className='text-2xl font-book leading-snug tracking-tight text-neutral-200'>
                {productDescription}
              </h2>
            </div>

            <div className='mt-[100px] sm:mt-[200px]'>
              <ul className='space-y-6'>
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className='group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:border-white/10 hover:from-white/[0.03] hover:to-white/[0.01] hover:shadow-xl'
                  >
                    <div className='via-white/2 absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

                    <div className='relative flex flex-col items-start sm:flex-row'>
                      <div className='mb-2 flex items-center sm:mb-0 sm:w-1/3'>
                        <div className='relative mr-2'>
                          <div className='h-2 w-2 rounded-full bg-gradient-to-r from-white via-white/80 to-white/60 shadow-sm' />
                          <div className='absolute -inset-1 rounded-full [animation-duration:3s]' />
                        </div>
                        <h3 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-xs font-bold uppercase tracking-tight text-transparent'>
                          {feature.title}
                        </h3>
                      </div>
                      <div className='w-full text-neutral-200 sm:w-2/3'>
                        <p className='font-book'>{feature.description}</p>
                        {feature.bulletPoints && (
                          <ul className='mt-4 space-y-2 pl-2'>
                            {feature.bulletPoints.map((point, i) => (
                              <li
                                key={i}
                                className='group/item flex items-start'
                              >
                                <span className='mr-2 text-primary-gold transition-colors duration-300 group-hover/item:text-white'>
                                  •
                                </span>
                                <span className='font-book text-neutral-300 transition-colors duration-300 group-hover/item:text-white/90'>
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
