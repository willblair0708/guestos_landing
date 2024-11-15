import dynamic from 'next/dynamic';
import { memo, useId } from 'react';
import { useInView } from 'react-intersection-observer';

import { signal } from '@preact/signals-react';
import { useComputed, useSignals } from '@preact/signals-react/runtime';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface HumanitySectionMobileProps {
  id: string;
  bgColor: string;
}

// Signal to keep track of the current slide index
const slideIndex = signal(0);

// Animation Variants optimized for mobile
const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const floatingGradientVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 60,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Mobile-optimized slide data
const slides = [
  {
    label: 'Step 1: Generate AI Concierge',
    tagline: 'Create Your Personalized Concierge',
    description:
      "Customize your AI concierge to match your hotel's brand and provide personalized guest experiences.",
  },
  {
    label: 'Step 2: Meet "Sierra"',
    tagline: 'Introducing Your Core AI Concierge',
    description:
      '24/7 multilingual support for guest inquiries and trip planning needs.',
  },
  {
    label: 'Step 3: Explore Features',
    tagline: 'Unlock Advanced Capabilities',
    description:
      'Book activities, process payments, and enhance guest experiences with advanced AI features.',
  },
];

// Mobile-optimized Slide Component
const SlideMobile = memo(({ index }: { index?: number }) => {
  useSignals();
  const id = useId();
  const slide = useComputed(() => slides[index ?? slideIndex.value]);

  const getStepCards = () => {
    switch (slide.value.label) {
      case 'Step 1: Generate AI Concierge':
        return (
          <>
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-4 backdrop-blur-xl'
            >
              <div className='space-y-4'>
                <div>
                  <h4 className='text-lg font-medium text-white'>
                    Welcome to AI Concierge Setup
                  </h4>
                  <p className='mt-1 text-sm text-white/60'>
                    Follow these simple steps to configure your AI assistant
                  </p>
                </div>

                <div className='space-y-3'>
                  {[
                    {
                      step: '1',
                      title: 'Basic Configuration',
                      status: 'Completed',
                    },
                    {
                      step: '2',
                      title: 'Personality Setup',
                      status: 'In Progress',
                    },
                    {
                      step: '3',
                      title: 'Integration Setup',
                      status: 'Pending',
                    },
                    { step: '4', title: 'Final Review', status: 'Pending' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-4 rounded-lg bg-white/5 p-3'
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#03E87A]/20'>
                        <span className='text-sm font-medium text-[#03E87A]'>
                          {item.step}
                        </span>
                      </div>
                      <div className='flex flex-1 items-center justify-between'>
                        <span className='text-sm text-white/80'>
                          {item.title}
                        </span>
                        <span className='text-xs text-[#03E87A]'>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Personality Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mt-4 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-4 backdrop-blur-xl'
            >
              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-white'>
                    Step 2: Personality Configuration
                  </h4>
                  <p className='mt-1 text-xs text-white/60'>
                    Define how your AI assistant will interact
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <label className='text-xs text-white/80'>
                      Assistant Name
                    </label>
                    <div className='mt-2 rounded-md bg-white/10 p-3'>
                      <span className='text-sm text-[#03E87A]'>Sierra</span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <div className='rounded-lg bg-white/5 p-3'>
                      <label className='text-xs text-white/80'>Language</label>
                      <div className='mt-2 rounded-md bg-white/10 p-3'>
                        <span className='text-sm text-[#03E87A]'>English</span>
                      </div>
                    </div>
                    <div className='rounded-lg bg-white/5 p-3'>
                      <label className='text-xs text-white/80'>Style</label>
                      <div className='mt-2 rounded-md bg-white/10 p-3'>
                        <span className='text-sm text-[#03E87A]'>
                          Professional
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );

      case 'Step 2: Meet "Sierra"':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-4 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div>
                <h4 className='text-lg font-medium text-white'>
                  Meet Your AI Concierge
                </h4>
                <p className='mt-1 text-sm text-white/60'>
                  Sierra is ready to assist your guests
                </p>
              </div>

              <div className='space-y-3'>
                {[
                  {
                    title: 'Multilingual Support',
                    value: '24/7 Available',
                    color: '#03E87A',
                  },
                  {
                    title: 'Response Time',
                    value: '< 1 second',
                    color: '#C6A87C',
                  },
                  {
                    title: 'Knowledge Base',
                    value: 'Customized',
                    color: '#7C3AED',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                  >
                    <span className='text-sm text-white/80'>{item.title}</span>
                    <span
                      className='text-sm font-medium'
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'Step 3: Explore Features':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-4 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div>
                <h4 className='text-lg font-medium text-white'>
                  Available Features
                </h4>
                <p className='mt-1 text-sm text-white/60'>
                  Enhance guest experiences with these capabilities
                </p>
              </div>

              <div className='grid gap-3'>
                {[
                  {
                    title: 'Experience Curator',
                    description: 'Book and process payments for activities',
                    status: 'Active',
                  },
                  {
                    title: 'Smart Concierge',
                    description: 'Personalized recommendations',
                    status: 'Active',
                  },
                  {
                    title: 'Room Service',
                    description: 'Automated order processing',
                    status: 'Coming Soon',
                  },
                ].map((item, i) => (
                  <div key={i} className='rounded-lg bg-white/5 p-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-white'>
                        {item.title}
                      </span>
                      <span className='text-xs text-[#03E87A]'>
                        {item.status}
                      </span>
                    </div>
                    <p className='mt-1 text-xs text-white/60'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className='flex min-h-screen flex-col items-center justify-start px-4 py-8'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Enhanced Glassmorphic Background */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.2),transparent_85%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,168,124,0.18),transparent_85%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]' />
        <motion.div
          className='absolute -left-[400px] top-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-[#03E87A]/30 via-[#C6A87C]/25 to-transparent blur-[100px]'
          variants={floatingGradientVariants}
          animate='animate'
        />
      </div>

      {/* Content Section */}
      <motion.div
        variants={cardVariants}
        className='relative z-10 mt-12 flex w-full flex-col items-start space-y-6'
      >
        <motion.div
          className='inline-block overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 to-transparent px-4 py-2 backdrop-blur-xl'
          whileTap={{ scale: 0.98 }}
        >
          <div className='relative flex items-center gap-3'>
            <span className='h-2 w-2 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
            <span className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text font-light tracking-wide text-transparent'>
              {slide.value.label}
            </span>
          </div>
        </motion.div>

        <motion.h2
          className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text font-light text-4xl leading-[1.1] tracking-tight text-transparent'
          variants={cardVariants}
        >
          {slide.value.tagline}
        </motion.h2>

        <motion.p
          className='max-w-xl font-light leading-relaxed text-gray-600/90'
          variants={cardVariants}
        >
          {slide.value.description}
        </motion.p>
      </motion.div>

      {/* Step Cards */}
      <motion.div variants={cardVariants} className='relative mt-20 w-full'>
        {getStepCards()}
      </motion.div>

      {/* Progress Indicator */}
    </motion.div>
  );
});

SlideMobile.displayName = 'SlideMobile';

// Main Mobile Section Component
const HumanitySectionMobile = memo(
  ({ id, bgColor }: HumanitySectionMobileProps) => {
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    return (
      <motion.section
        id={id}
        className='relative min-h-screen overflow-hidden'
        style={{ backgroundColor: bgColor }}
        ref={ref}
      >
        <AnimatePresence mode='wait'>
          {slides.map((_, index) => (
            <SlideMobile key={index} index={index} />
          ))}
        </AnimatePresence>
      </motion.section>
    );
  }
);

HumanitySectionMobile.displayName = 'HumanitySectionMobile';

export default dynamic(() => Promise.resolve(HumanitySectionMobile), {
  ssr: false,
});
