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
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.35,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingGradientVariants = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.1, 1],
    transition: {
      duration: 60,
      repeat: Infinity,
      ease: 'linear',
      scale: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
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

// First, add the cardStyle constant at the top with other constants
const cardStyle = {
  background:
    'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6))',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

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
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className='group w-full overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-2xl transition-all duration-300'
              style={{ ...cardStyle, zIndex: 100 }}
            >
              <div className='space-y-6'>
                <div>
                  <h4 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-xl font-medium text-white'>
                    Welcome to AI Concierge Setup
                  </h4>
                  <p className='mt-2 font-light text-sm leading-relaxed text-white/60'>
                    Follow these simple steps to configure your AI assistant
                  </p>
                </div>

                <div className='space-y-3'>
                  {[
                    {
                      step: '1',
                      title: 'Basic Configuration',
                      status: 'Completed',
                      color: '#03E87A',
                    },
                    {
                      step: '2',
                      title: 'Personality Setup',
                      status: 'In Progress',
                      color: '#C6A87C',
                    },
                    {
                      step: '3',
                      title: 'Integration Setup',
                      status: 'Pending',
                      color: '#7C3AED',
                    },
                    {
                      step: '4',
                      title: 'Final Review',
                      status: 'Pending',
                      color: '#F43F5E',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      className='group flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'
                    >
                      <div
                        className='flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110'
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <span
                          className='text-sm font-medium'
                          style={{ color: item.color }}
                        >
                          {item.step}
                        </span>
                      </div>
                      <div className='flex flex-1 items-center justify-between'>
                        <span className='font-light text-sm text-white/90 transition-all duration-300 group-hover:text-white'>
                          {item.title}
                        </span>
                        <span className='text-xs' style={{ color: item.color }}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Personality Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
              }}
              className='group mt-4 w-full overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-white/20'
              style={cardStyle}
            >
              <div className='space-y-6'>
                <div>
                  <h4 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-sm font-medium text-transparent'>
                    Step 2: Personality Configuration
                  </h4>
                  <p className='mt-2 font-light text-xs leading-relaxed text-white/60'>
                    Define how your AI assistant will interact
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='group rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'>
                    <label className='font-light text-xs text-white/80'>
                      Assistant Name
                    </label>
                    <div className='mt-2 rounded-md bg-white/10 p-3'>
                      <span className='text-sm font-medium text-[#03E87A]'>
                        Sierra
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <div className='group rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'>
                      <label className='font-light text-xs text-white/80'>
                        Language
                      </label>
                      <div className='mt-2 rounded-md bg-white/10 p-3'>
                        <span className='text-sm font-medium text-[#03E87A]'>
                          English
                        </span>
                      </div>
                    </div>
                    <div className='group rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'>
                      <label className='font-light text-xs text-white/80'>
                        Style
                      </label>
                      <div className='mt-2 rounded-md bg-white/10 p-3'>
                        <span className='text-sm font-medium text-[#03E87A]'>
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className='group w-full overflow-hidden rounded-3xl border border-white/10 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/20'
            style={cardStyle}
          >
            {/* Avatar and Header */}
            <div className='flex items-center gap-4 border-b border-white/10 pb-6'>
              <div className='relative flex h-16 w-16 items-center justify-center'>
                {/* Outer ring */}
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#03E87A] via-[#C6A87C] to-[#7C3AED] opacity-20' />
                {/* Inner circle */}
                <div className='absolute inset-1 rounded-full bg-black/40 backdrop-blur-xl' />
                {/* Decorative elements */}
                <div className='absolute inset-3 rounded-full bg-gradient-to-br from-[#03E87A]/40 via-[#C6A87C]/30 to-transparent' />
                <div className='absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#03E87A] blur-[1px]' />
                <div className='absolute -bottom-0.5 -left-0.5 h-2 w-2 rounded-full bg-[#C6A87C] blur-[1px]' />
                {/* AI symbol */}
                <div className='relative h-6 w-6'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='h-4 w-[1px] rotate-45 bg-gradient-to-b from-[#03E87A] to-[#C6A87C]' />
                    <div className='h-4 w-[1px] -rotate-45 bg-gradient-to-b from-[#03E87A] to-[#C6A87C]' />
                  </div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='h-[1px] w-4 bg-gradient-to-r from-[#03E87A] to-[#C6A87C]' />
                  </div>
                </div>
              </div>
              <div>
                <h4 className='text-xl font-medium text-white'>Meet Sierra</h4>
                <p className='mt-1 text-sm text-white/60'>
                  Your AI-Powered Hotel Concierge
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='mt-6 grid grid-cols-2 gap-3'>
              {[
                {
                  title: 'Languages',
                  value: '10+',
                  subtitle: 'Major Languages',
                  color: '#03E87A',
                  icon: (
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-[#03E87A]/20' />
                      <div className='relative flex h-full w-full items-center justify-center'>
                        <div className='h-3.5 w-3.5 rounded-full border-2 border-[#03E87A]/60'>
                          <div className='absolute -right-1 -top-1 h-2 w-2 rounded-full border border-[#03E87A]/60' />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: 'Response Time',
                  value: '< 1s',
                  subtitle: 'Average',
                  color: '#C6A87C',
                  icon: (
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-[#C6A87C]/20' />
                      <div className='relative flex h-full w-full items-center justify-center'>
                        <div className='h-[2px] w-4 bg-gradient-to-r from-transparent via-[#C6A87C] to-[#C6A87C]/60' />
                        <div className='absolute right-0 h-2.5 w-[2px] -rotate-45 bg-[#C6A87C]' />
                      </div>
                    </div>
                  ),
                },
                {
                  title: 'Knowledge',
                  value: '24/7',
                  subtitle: 'Availability',
                  color: '#7C3AED',
                  icon: (
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-[#7C3AED]/20' />
                      <div className='relative flex h-full w-full items-center justify-center'>
                        <div className='h-3.5 w-3.5 rounded-md border-2 border-[#7C3AED]/60 [transform:rotate(45deg)]'>
                          <div className='absolute inset-0 m-auto h-1.5 w-1.5 rounded-sm bg-[#7C3AED]/40' />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: 'Accuracy',
                  value: '99%',
                  subtitle: 'Response Rate',
                  color: '#F43F5E',
                  icon: (
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-[#F43F5E]/20' />
                      <div className='relative flex h-full w-full items-center justify-center'>
                        <div className='relative h-3.5 w-3.5'>
                          <div className='absolute inset-x-0 top-0 h-[2px] w-full bg-[#F43F5E]' />
                          <div className='absolute bottom-0 left-1/2 h-3.5 w-[2px] -translate-x-1/2 bg-[#F43F5E]' />
                          <div className='absolute right-0 top-0 h-[2px] w-2 rotate-45 bg-[#F43F5E]' />
                        </div>
                      </div>
                    </div>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='group rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'
                >
                  <div className='mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-transparent'>
                    {item.icon}
                  </div>
                  <p className='font-light text-sm text-white/60'>
                    {item.title}
                  </p>
                  <p
                    className='text-lg font-medium'
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </p>
                  <p className='text-xs text-white/40'>{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className='mt-6 space-y-3'>
              <h5 className='text-sm font-medium text-white/80'>
                Key Capabilities
              </h5>
              {[
                {
                  title: 'Natural Conversations',
                  description: 'Fluid, context-aware dialogue',
                  color: '#03E87A',
                },
                {
                  title: 'Local Expert Knowledge',
                  description: 'Curated recommendations',
                  color: '#C6A87C',
                },
                {
                  title: 'Smart Automation',
                  description: 'Efficient request handling',
                  color: '#7C3AED',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='group flex items-start gap-3 rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'
                >
                  <div
                    className='mt-1 h-2 w-2 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className='text-sm font-medium text-white/90'>
                      {item.title}
                    </p>
                    <p className='text-xs text-white/50'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Step 3: Explore Features':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className='group w-full overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-white/20'
            style={cardStyle}
          >
            <div className='space-y-6'>
              <div>
                <h4 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-lg font-medium text-transparent'>
                  Available Features
                </h4>
                <p className='mt-2 font-light text-sm leading-relaxed text-white/60'>
                  Enhance guest experiences with these capabilities
                </p>
              </div>

              <div className='grid gap-3'>
                {[
                  {
                    title: 'Experience Curator',
                    description:
                      'Book and process payments for activities onsite',
                    status: 'Active',
                  },
                  {
                    title: 'Smart Concierge',
                    description: 'Personalized recommendations',
                    status: 'Active',
                  },
                  {
                    title: 'Local Explorer',
                    description:
                      'Discover and book nearby attractions, tours, and hidden gems',
                    status: 'Coming Soon',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className='group rounded-2xl bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06]'
                  >
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
        {/* <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.2)_0%,transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,168,124,0.18)_0%,transparent_50%)]' /> */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10' />
        <motion.div
          // className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.1)_0%,transparent_70%)]'
          variants={floatingGradientVariants}
          animate='animate'
        />
      </div>

      {/* Content Section */}
      <motion.div
        variants={cardVariants}
        className='relative z-10 mt-16 flex w-full flex-col items-start space-y-8'
      >
        <motion.div
          className='inline-block overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 via-[#03E87A]/5 to-transparent px-5 py-2.5 backdrop-blur-xl'
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className='relative flex items-center gap-3'>
            <span className='relative h-2 w-2'>
              <span className='absolute h-full w-full animate-[ping_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]/60' />
              <span className='absolute h-full w-full rounded-full bg-[#03E87A]' />
            </span>
            <span className='font-light tracking-wide text-gray-900'>
              {slide.value.label}
            </span>
          </div>
        </motion.div>

        <motion.h2
          className='font-light text-5xl leading-[1.1] tracking-tight text-gray-900'
          variants={cardVariants}
        >
          {slide.value.tagline}
        </motion.h2>

        <motion.p
          className='max-w-xl font-light leading-relaxed text-gray-600'
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
