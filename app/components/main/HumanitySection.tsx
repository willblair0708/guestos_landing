// HumanitySection.tsx
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
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

import { useCooldown } from '@/hooks/use-cooldown';
import { useScrollControl, useScrollForce } from '@/hooks/use-scroll-control';

interface HumanitySectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

// Signal to keep track of the current slide index
const slideIndex = signal(0);

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const textVariants = {
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

// Add this common style object at the top of the file, after the imports
const cardStyle = {
  background:
    'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6))',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

// Slide Component
const Slide = memo(
  ({
    progressX,
    index,
    isFallback,
  }: {
    progressX?: MotionValue<number>;
    index?: number;
    isFallback: boolean;
  }) => {
    useSignals();

    const id = useId();
    const slide = useComputed(() => slides[index ?? slideIndex.value]);

    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: true,
    });

    const getStepCards = () => {
      switch (slide.value.label) {
        case 'Step 1: Generate AI Concierge':
          return (
            <>
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='absolute left-4 top-4 z-10 w-[90vw] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl sm:left-8 sm:top-8 md:left-1/2 md:w-[min(90vw,560px)] md:-translate-x-1/2 lg:left-8 lg:w-[360px] lg:translate-x-0'
                style={cardStyle}
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
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='absolute left-4 top-[540px] z-10 w-[90vw] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl sm:left-40 sm:top-[380px] md:left-1/2 md:w-[min(90vw,600px)] md:-translate-x-1/2 lg:left-40 lg:w-[380px] lg:translate-x-0'
                style={cardStyle}
              >
                <div className='space-y-5'>
                  <div>
                    <h4 className='text-sm font-medium text-white'>
                      Step 2: Personality Configuration
                    </h4>
                    <p className='mt-1 text-xs text-white/60'>
                      Define how your AI assistant will interact
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <div className='rounded-lg bg-white/5 p-4'>
                      <label className='text-xs text-white/80'>
                        Assistant Name
                      </label>
                      <div className='mt-2 rounded-md bg-white/10 p-3'>
                        <span className='text-sm text-[#03E87A]'>Sierra</span>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <div className='rounded-lg bg-white/5 p-4'>
                        <label className='text-xs text-white/80'>
                          Communication Style
                        </label>
                        <div className='mt-2 space-y-2'>
                          {['Professional', 'Friendly', 'Formal'].map(
                            (style, i) => (
                              <div key={i} className='flex items-center gap-2'>
                                <div className='h-2 w-2 rounded-full bg-[#03E87A]' />
                                <span className='text-xs text-white/60'>
                                  {style}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className='rounded-lg bg-white/5 p-4'>
                        <label className='text-xs text-white/80'>
                          Knowledge Base
                        </label>
                        <div className='mt-2 space-y-2'>
                          {['Hospitality', 'Local Area', 'Services'].map(
                            (knowledge, i) => (
                              <div key={i} className='flex items-center gap-2'>
                                <div className='h-2 w-2 rounded-full bg-[#03E87A]' />
                                <span className='text-xs text-white/60'>
                                  {knowledge}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Integration Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='absolute bottom-4 left-4 z-10 w-[90vw] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl sm:bottom-8 sm:left-8 md:bottom-12 md:left-1/2 md:w-[min(90vw,640px)] md:-translate-x-1/2 lg:bottom-20 lg:left-1/4 lg:w-[400px] lg:translate-x-0'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-medium text-white'>
                      Available Integrations
                    </h4>
                    <span className='rounded-full bg-[#03E87A]/20 px-3 py-1 text-xs text-[#03E87A]'>
                      12 Systems
                    </span>
                  </div>

                  <div className='grid grid-cols-3 gap-3'>
                    {[
                      'Booking System',
                      'Payment Gateway',
                      'CRM',
                      'Phone System',
                      'Chat Platform',
                      'Email Service',
                      'PMS',
                      'Analytics',
                      'Calendar',
                    ].map((integration, i) => (
                      <div
                        key={i}
                        className='rounded-lg bg-white/5 p-3 text-center transition-all hover:bg-white/10'
                      >
                        <span className='text-xs text-white/80'>
                          {integration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          );

        case 'Step 2: Meet "Sierra"':
          return (
            <>
              {/* Sierra Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='absolute left-8 top-20 z-10 w-[90vw] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl md:left-1/2 md:w-[min(90vw,560px)] md:-translate-x-1/2 lg:left-8 lg:w-[320px] lg:translate-x-0'
                style={cardStyle}
              >
                <div className='flex h-[500px] flex-col'>
                  {/* Header */}
                  <div className='border-b border-white/10 p-4'>
                    <div className='flex items-center gap-4'>
                      <div className='relative h-12 w-12'>
                        <div className='absolute -inset-1 animate-pulse rounded-full bg-[#03E87A]/20 blur-md' />
                        <div className='relative h-full w-full rounded-full bg-gradient-to-br from-[#03E87A] to-[#03E87A]/80' />
                      </div>
                      <div>
                        <h4 className='text-sm font-medium text-white'>
                          Sierra
                        </h4>
                        <p className='text-xs text-white/60'>
                          Your Elite AI Concierge
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className='flex-1 space-y-4 overflow-y-auto p-4'>
                    <div className='flex justify-start'>
                      <div className='max-w-[80%] rounded-lg rounded-tl-none bg-white/10 p-3'>
                        <p className='text-sm text-white/80'>
                          Hello! I'm Sierra, your dedicated hospitality AI. How
                          may I assist you today?
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      <div className='max-w-[80%] rounded-lg rounded-tr-none bg-[#03E87A]/20 p-3'>
                        <p className='text-sm text-white/80'>
                          I'd like to plan a birthday celebration for my sister
                          during our stay.
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-start'>
                      <div className='max-w-[80%] rounded-lg rounded-tl-none bg-white/10 p-3'>
                        <p className='text-sm text-white/80'>
                          Wonderful. I would suggest the private picnic by the
                          river or s'mores by the fire. What sounds good?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className='border-t border-white/10 p-4'>
                    <div className='flex items-center gap-2 rounded-lg bg-white/5 p-2'>
                      <input
                        type='text'
                        placeholder='Type your message...'
                        className='flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none'
                      />
                      <button className='rounded-full bg-[#03E87A] p-2 text-black hover:bg-[#03E87A]/90'>
                        <svg
                          className='h-4 w-4'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M22 2L11 13'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M22 2L15 22L11 13L2 9L22 2Z'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Capabilities Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='absolute left-40 top-[500px] z-10 w-[30vw] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium text-white'>
                    Core Capabilities
                  </h4>
                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      'Multilingual Support',
                      'Voice Recognition',
                      'Emotion Analysis',
                      'Context Memory',
                      'Real-time Translation',
                      'Proactive Assistance',
                      'Cultural Awareness',
                      'Privacy-First Design',
                    ].map((capability, i) => (
                      <div
                        key={i}
                        className='rounded-lg bg-white/5 px-3 py-2 text-center transition-colors hover:bg-white/10'
                      >
                        <span className='text-xs text-white/80'>
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Services Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='absolute bottom-24 left-80 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium text-white'>
                    Guest Services
                  </h4>
                  <div className='space-y-3'>
                    {[
                      {
                        service: 'Personalized Recommendations',
                        rating: '98%',
                      },
                      {
                        service: 'Instant Booking & Reservations',
                        rating: '99%',
                      },
                      { service: 'Special Requests Handling', rating: '97%' },
                      { service: '24/7 Guest Support', rating: '100%' },
                    ].map((item, i) => (
                      <div key={i} className='space-y-1'>
                        <div className='flex justify-between text-xs'>
                          <span className='text-white/80'>{item.service}</span>
                          <span className='text-[#03E87A]'>{item.rating}</span>
                        </div>
                        <div className='h-1 rounded-full bg-white/10'>
                          <div
                            className='h-full rounded-full bg-[#03E87A]'
                            style={{ width: item.rating }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          );

        case 'Step 3: Explore Features':
          return (
            <>
              {/* AI Concierge Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='absolute left-8 top-20 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='relative h-12 w-12'>
                      <div className='absolute -inset-1 animate-pulse rounded-full bg-[#03E87A]/20 blur-md' />
                      <div className='relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#03E87A] to-[#03E87A]/80'>
                        <span className='text-lg font-medium text-white'>
                          S
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-white'>Sierra</h4>
                      <p className='text-xs text-white/60'>Core AI Concierge</p>
                    </div>
                  </div>

                  <div className='grid gap-3'>
                    {[
                      {
                        feature: '24/7 Multilingual Support',
                        status: 'Active',
                      },
                      { feature: 'Hotel Information', status: 'Active' },
                      { feature: 'Trip Planning', status: 'Active' },
                      { feature: 'Guest Services', status: 'Active' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                      >
                        <span className='text-sm text-white/80'>
                          {item.feature}
                        </span>
                        <span className='rounded-full bg-[#03E87A]/20 px-2 py-1 text-xs text-[#03E87A]'>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Experience Curator Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='absolute left-40 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='relative h-12 w-12'>
                      <div className='absolute -inset-1 animate-pulse rounded-full bg-[#C6A87C]/20 blur-md' />
                      <div className='relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#C6A87C] to-[#C6A87C]/80'>
                        <span className='text-lg font-medium text-white'>
                          N
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-white'>Noah</h4>
                      <p className='text-xs text-white/60'>
                        Experience Curator
                      </p>
                    </div>
                  </div>

                  <div className='grid gap-3'>
                    {[
                      { feature: 'Activity Bookings', status: 'Active' },
                      { feature: 'Payment Processing', status: 'Active' },
                      { feature: 'Local Experiences', status: 'Active' },
                      { feature: 'Revenue Generation', status: 'Active' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                      >
                        <span className='text-sm text-white/80'>
                          {item.feature}
                        </span>
                        <span className='rounded-full bg-[#C6A87C]/20 px-2 py-1 text-xs text-[#C6A87C]'>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Revenue Optimizer Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='absolute bottom-20 left-60 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl'
                style={cardStyle}
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='relative h-12 w-12'>
                      <div className='absolute -inset-1 animate-pulse rounded-full bg-[#9B6FDF]/20 blur-md' />
                      <div className='relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#9B6FDF] to-[#9B6FDF]/80'>
                        <span className='text-lg font-medium text-white'>
                          R
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-white'>Riley</h4>
                      <p className='text-xs text-white/60'>Revenue Optimizer</p>
                    </div>
                  </div>

                  <div className='grid gap-3'>
                    {[
                      { feature: 'Upsell Opportunities', status: 'Active' },
                      { feature: 'Dynamic Pricing', status: 'Active' },
                      { feature: 'Package Creation', status: 'Active' },
                      { feature: 'Analytics & Insights', status: 'Active' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                      >
                        <span className='text-sm text-white/80'>
                          {item.feature}
                        </span>
                        <span className='rounded-full bg-[#9B6FDF]/20 px-2 py-1 text-xs text-[#9B6FDF]'>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          );

        default:
          return null;
      }
    };

    return (
      <section
        id={id}
        className='flex h-screen items-center justify-center overflow-hidden'
      >
        <motion.div
          className='relative flex h-full w-full flex-col items-center justify-center gap-24 px-12 lg:flex-row'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          ref={ref}
        >
          {/* Enhanced Glassmorphic Background */}
          <div className='pointer-events-none absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-black/80' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.12),transparent_70%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
            <motion.div
              className='absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-[#03E87A]/15 via-[rgba(255,200,87,0.1)] to-transparent blur-3xl'
              variants={floatingGradientVariants}
              animate='animate'
            />
          </div>

          {/* Enhanced Progress Indicator */}
          <motion.div
            className='absolute right-16 top-12 z-50 flex flex-col items-center gap-4'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className='h-20 w-[3px] overflow-hidden rounded-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl'>
              <motion.div
                className='h-full w-full bg-gradient-to-b from-[#03E87A]/80 via-[#03E87A]/60 to-[#C6A87C]/60'
                style={{
                  scaleY: useTransform(
                    progressX || useMotionValue(0),
                    [0, 1],
                    [0, 1]
                  ),
                  originY: 0,
                }}
              />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span className='font-light text-sm tracking-wider text-white/90'>
                {`0${(index ?? slideIndex.value) + 1}`}
              </span>
              {/* <span className='h-px w-3 bg-white/20' />
              <span className='font-light text-xs tracking-wider text-white/40'>
                {`0${slides.length}`}
              </span> */}
            </div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div
            variants={imageVariants}
            className='relative z-10 flex flex-1 items-center justify-center px-8'
          >
            <motion.div
              className='group relative h-[450px] w-[450px] overflow-hidden rounded-[2.5rem] lg:h-[600px] lg:w-[600px]'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.5, ease: 'easeOut' },
              }}
            >
              {/* <Image
                src={slide.value.image}
                alt={slide.value.label}
                layout='fill'
                objectFit='cover'
                className='bg-transparent transition-all duration-700 ease-out group-hover:scale-110'
                priority
                quality={100}
              /> */}
              {/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40' /> */}

              {/* Enhanced Floating Label */}
              {/* <motion.div
                className='absolute bottom-10 left-10 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-xl'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className='relative flex items-center gap-4 px-6 py-3'>
                  <span className='h-2 w-2 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
                  <span className='font-light text-sm tracking-wide text-white'>
                    {slide.value.label}
                  </span>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            variants={textVariants}
            className='flex-2 relative z-10 flex flex-col justify-center space-y-10'
          >
            <motion.div
              className='inline-block overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 to-transparent px-2 py-3'
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className='relative flex items-center gap-4'>
                <span className='h-2.5 w-2.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
                <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light tracking-wide text-transparent'>
                  {slide.value.label}
                </span>
              </div>
            </motion.div>

            <motion.h2
              className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light text-5xl leading-[1.1] tracking-tight text-transparent'
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h2>

            <motion.p
              className='max-w-xl font-light text-lg leading-relaxed text-white/80'
              variants={textVariants}
            >
              {slide.value.description}
            </motion.p>

            <motion.button
              className='group relative mt-6 flex w-fit items-center gap-4 overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 via-[#03E87A]/5 to-transparent px-10 py-5 transition-all'
              whileHover={{
                scale: 1.02,
                x: 5,
                background:
                  'linear-gradient(to right, rgba(3,232,122,0.2), rgba(198,168,124,0.1))',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const nextIndex = (index ?? slideIndex.value) + 1;
                slideIndex.value = nextIndex < slides.length ? nextIndex : 0;
              }}
            >
              <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light tracking-wide text-transparent'>
                {slide.value.buttonText}
              </span>
              <motion.span
                className='inline-block text-white'
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Dynamic Step Cards */}
          {getStepCards()}
        </motion.div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';

// Slides Data Array
const slides = [
  {
    image: '/assets/main/generating_ai.svg',
    label: 'Step 1: Generate AI Concierge',
    tagline: 'Create Your Personalized Concierge',
    description:
      'Customize your AI concierge to reflect your hotel’s unique brand and persona, ensuring a personalized guest experience.',
    buttonText: 'Customize Now',
  },
  {
    image: '/assets/main/woman1.svg',
    label: 'Step 2: Meet "Sierra"',
    tagline: 'Introducing Your Core AI Concierge',
    description:
      '"Sierra" provides 24/7 multilingual support for all your guests’ inquiries and trip planning needs.',
    buttonText: 'Meet Sierra',
  },
  {
    image: '/assets/main/features.svg',
    label: 'Step 3: Explore Features',
    tagline: 'Unlock Advanced Capabilities',
    description:
      'Enhance guest experiences with features like "Experience Curator" for booking and payment processing of onsite activities.',
    buttonText: 'Discover Features',
  },
  // Add more slides as needed
];

const FORCE_THRESHOLD = 700;

// Main HumanitySection Component
function HumanitySection({ id, bgColor, isMobile }: HumanitySectionProps) {
  // Determine if fallback (static) rendering is needed based on device type
  const shouldFallback = useMemo(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024),
    []
  );

  if (!shouldFallback)
    return <ScrollingSection id={id} bgColor={bgColor} isMobile={isMobile} />;

  return (
    <motion.section
      id={id}
      className='relative h-screen overflow-hidden text-white'
      style={{ backgroundColor: bgColor }}
    >
      {slides.map((_, index) => (
        <Slide index={index} key={index} isFallback={true} />
      ))}
    </motion.section>
  );
}

// ScrollingSection Component for Enhanced Interactivity
function ScrollingSection({ id, bgColor, isMobile }: HumanitySectionProps) {
  useSignals();

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollForce, scrollTotal, addScrollEvent, resetScrollForce } =
    useScrollForce();

  // Use a cooldown to prevent rapid scroll events
  const cooldown = useCooldown(100);

  const { isLocked, lockScroll, unlockScroll } = useScrollControl({
    onWheel: (e: WheelEvent, scroll: (y: number, relock?: boolean) => void) => {
      addScrollEvent(e);

      const force = scrollForce.get();

      if (force > FORCE_THRESHOLD) {
        if (slideIndex.value < slides.length - 1) {
          gotoNextSection(1);
        } else {
          leaveSection(scroll, 1);
        }
      } else if (force < 0) {
        if (slideIndex.value > 0) {
          gotoNextSection(-1);
        } else {
          leaveSection(scroll, -1);
        }
      }
    },
    onKeyDown: (ev, scroll) => {
      if (ev.key === 'ArrowDown') {
        if (slideIndex.value < slides.length - 1) {
          gotoNextSection(1);
        } else {
          leaveSection(scroll, 1);
        }
      } else if (ev.key === 'ArrowUp') {
        if (slideIndex.value > 0) {
          gotoNextSection(-1);
        } else {
          leaveSection(scroll, -1);
        }
      }
    },
  });

  // Transform scroll total to a progress value
  const progressX = useTransform(
    scrollTotal,
    [0, FORCE_THRESHOLD * slides.length],
    [0, 1]
  );

  // Function to navigate to the next or previous section
  const gotoNextSection = useCallback(
    (direction: number) => {
      slideIndex.value += direction;

      if (direction === 1) {
        resetScrollForce(0, slideIndex.value * FORCE_THRESHOLD);
      } else if (direction === -1) {
        resetScrollForce(
          FORCE_THRESHOLD - 1,
          (slideIndex.value + 1) * FORCE_THRESHOLD
        );
      }
    },
    [resetScrollForce]
  );

  // Function to handle leaving the current section
  const leaveSection = useCallback(
    (scroll: (y: number) => void, direction: number) => {
      unlockScroll();
      cooldown.trigger();
      if (direction === 1) {
        scroll(window.scrollY + window.innerHeight);
        resetScrollForce(FORCE_THRESHOLD, FORCE_THRESHOLD * slides.length);
      } else {
        scroll(window.scrollY - window.innerHeight);
        resetScrollForce(0, 0);
      }
    },
    [resetScrollForce, cooldown, unlockScroll, slides.length]
  );

  useLayoutEffect(() => {
    const ref = sectionRef.current;

    // Intersection Observer to detect when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isInView = entry.isIntersecting;

        if (cooldown.isValid && isInView && !isLocked) {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          lockScroll();
        }

        if (!isInView && isLocked) {
          unlockScroll();
        }
      },
      { threshold: 0.98 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [isLocked, lockScroll, unlockScroll, cooldown]);

  // Add touch event handling
  useEffect(() => {
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0) {
          // Swipe up
          if (slideIndex.value < slides.length - 1) {
            gotoNextSection(1);
          }
        } else {
          // Swipe down
          if (slideIndex.value > 0) {
            gotoNextSection(-1);
          }
        }
      }
    };

    const element = sectionRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
      element.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [gotoNextSection]);

  // Update section styles for mobile
  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className='relative h-screen touch-none overflow-hidden text-white'
      style={{ backgroundColor: bgColor }}
      initial={{ padding: '0' }}
      // animate={{
      //   padding: isMobile
      //     ? '1rem'
      //     : window.innerWidth < 1024
      //       ? '1.5rem'
      //       : '2rem',
      // }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.9, once: true }}
    >
      <AnimatePresence>
        <Slide progressX={progressX} isFallback={false} />
      </AnimatePresence>
    </motion.section>
  );
}

export default dynamic(() => Promise.resolve(HumanitySection), {
  ssr: false,
});
