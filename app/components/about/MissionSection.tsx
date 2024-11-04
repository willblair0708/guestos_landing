import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface MissionSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

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

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      animate={parentInView && sectionInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#F5F5F5] ${
        isMobile ? 'px-4 py-12' : 'px-8 py-24 lg:px-24'
      }`}
    >
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-16 lg:grid-cols-2 lg:gap-24'>
          {/* Left Column - Story */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col justify-center space-y-8'
          >
            <div className='space-y-6'>
              <h2
                className={`font-book ${
                  isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'
                } tracking-tight text-gray-900`}
              >
                A Legacy of <br />
                Hospitality
              </h2>
              <div
                className={`space-y-6 text-gray-600 ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}
              >
                <p className='leading-relaxed'>
                  "I remember watching my parents greet guests at Yosemite View
                  Lodge like they were welcoming old friends into their home.
                  That warmth, that personal touch – it's something technology
                  alone can never replicate."
                </p>
                <p className='leading-relaxed'>
                  Growing up in the family business, every summer was a new
                  lesson in hospitality. From helping at the front desk to
                  listening to guest stories over breakfast, I learned that true
                  service comes from genuine human connection.
                </p>
                <p className='leading-relaxed'>
                  After a decade in the startup world, I realized we could
                  enhance these personal moments, not replace them. That's why
                  we built GuestOS – to give hoteliers the tools to focus on
                  what matters most: creating memorable experiences for their
                  guests.
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-4 pt-6'>
              <div className='h-px flex-grow bg-gray-200'></div>
              <span className='text-sm font-book text-gray-400'>Est. 1976</span>
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div variants={itemVariants} className='relative lg:h-[800px]'>
            <div className='sticky top-8 h-full w-full'>
              <div className='relative h-full w-full overflow-hidden rounded-2xl'>
                <Image
                  src='/assets/about/story.png'
                  alt='Yosemite View Lodge in the 1980s'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white'>
                  <p className='font-light text-sm tracking-wide'>
                    Yosemite View Lodge, Summer of 1986
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
