import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface MissionSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function MissionSection({
  id,
  bgColor,
  isMobile,
  inView: parentInView,
}: MissionSectionProps) {
  const [ref, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      variants={containerVariants}
      className={`relative min-h-screen overflow-hidden ${
        isMobile ? 'py-20' : 'py-32'
      }`}
    >
      {/* Modern gradient background */}
      <div className='absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.08),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.05),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-16 lg:grid-cols-2 lg:gap-24'>
          {/* Left Column - Story */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col justify-center space-y-12'
          >
            <div className='space-y-10'>
              <div className='relative space-y-4'>
                <motion.div
                  className='inline-flex items-center gap-3 rounded-full bg-gray-100/80 px-4 py-1.5 backdrop-blur-sm'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
                  <span className='text-xs font-medium tracking-widest text-gray-600'>
                    OUR STORY
                  </span>
                </motion.div>

                <h2
                  className={`font-book ${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} tracking-tight text-gray-900`}
                >
                  A Legacy of{' '}
                  <span className='relative inline-block'>
                    <span className='bg-gray-900 bg-clip-text text-transparent'>
                      Hospitality
                    </span>
                    <motion.span
                      className='absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-primary-gold to-primary-gold/30'
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                </h2>
              </div>

              <div className={`space-y-8 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                <motion.blockquote
                  variants={itemVariants}
                  className='relative rounded-2xl border-l-2 border-primary-gold/30 bg-white/50 p-6 pl-8 italic shadow-sm backdrop-blur-sm'
                >
                  <div className='absolute -left-1 top-0 h-2 w-2 rounded-full bg-primary-gold' />
                  <div className='absolute -left-1 bottom-0 h-2 w-2 rounded-full bg-primary-gold' />
                  <p className='text-gray-700'>
                    &ldquo;I remember watching my parents greet guests at
                    Yosemite View Lodge like they were welcoming old friends
                    into their home. That warmth, that personal touch –
                    it&apos;s something technology alone can never
                    replicate.&rdquo;
                  </p>
                </motion.blockquote>

                <motion.div
                  variants={itemVariants}
                  className='space-y-6 text-gray-600'
                >
                  <p className='leading-relaxed'>
                    Growing up in the family business, every summer was a new
                    lesson in hospitality. From helping at the front desk to
                    listening to guest stories over breakfast, I learned that
                    true service comes from genuine human connection.
                  </p>
                  <p className='leading-relaxed'>
                    After a decade in the startup world, I realized we could
                    enhance these personal moments, not replace them.
                    That&apos;s why we built GuestOS – to give hoteliers the
                    tools to focus on what matters most: creating memorable
                    experiences for their guests.
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className='flex items-center justify-between border-t border-gray-200/80 pt-8'
            >
              <div className='flex items-center space-x-4'>
                <div className='h-px w-12 bg-gradient-to-r from-primary-gold to-transparent' />
                <span className='text-sm font-book text-gray-500'>
                  Est. 1996
                </span>
              </div>

              {/* <motion.button
                className='group flex items-center space-x-3 rounded-full bg-gray-50/80 px-6 py-3 shadow-sm transition-all hover:bg-white hover:shadow-md'
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className='bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-sm font-medium text-transparent'>
                  Our Journey
                </span>
                <motion.svg
                  className='h-4 w-4 text-gray-900 transition-transform duration-300 group-hover:translate-x-1'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12H19M19 12L12 5M19 12L12 19' />
                </motion.svg>
              </motion.button> */}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div
            variants={imageVariants}
            className='relative lg:h-[800px]'
          >
            <div className='sticky top-8 h-full w-full'>
              <div className='group relative h-full w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-xl transition-all duration-500 hover:shadow-2xl'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-gradient-gold-start to-gradient-gold-end opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                />
                <Image
                  src='/assets/about/story.jpg'
                  alt='Yosemite View Lodge in the 1980s'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  style={{ objectPosition: '42% center' }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/20' />
                <div className='absolute bottom-0 left-0 right-0 p-8'>
                  <p className='font-light text-sm tracking-wide text-neutral-50'>
                    Yosemite View Lodge, Spring of 1996
                  </p>
                </div>
                <div className='absolute right-4 top-4 rounded-full border border-accent-gold-light bg-surface-gold px-4 py-2 backdrop-blur-md'>
                  <span className='font-light text-xs tracking-wider text-primary-gold'>
                    Historical Photo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
