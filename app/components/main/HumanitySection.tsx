// HumanitySection.tsx
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  memo,
  useCallback,
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
        case 'Step 1: Onboarding':
          return (
            <>
              {/* AI Concierge Setup Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='absolute left-8 top-20 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
                style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
              >
                <div className='relative space-y-4'>
                  <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/10 blur-3xl' />
                  <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/5 blur-3xl' />

                  <div className='relative space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-sm font-medium text-white'>
                        AI Concierge Setup
                      </h4>
                      <div className='rounded-full bg-[#03E87A]/20 px-2 py-1'>
                        <span className='text-xs text-[#03E87A]'>Step 1/4</span>
                      </div>
                    </div>

                    <div className='space-y-3'>
                      {[
                        { phase: 'Brand Profile', status: 'Pending' },
                        { phase: 'Service Catalog', status: 'Pending' },
                        { phase: 'Language Selection', status: 'Pending' },
                        { phase: 'Personality Design', status: 'Pending' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                        >
                          <span className='text-xs text-white/60'>
                            {item.phase}
                          </span>
                          <span className='flex items-center gap-1.5'>
                            <span className='h-1.5 w-1.5 rounded-full bg-amber-400' />
                            <span className='text-xs text-amber-400'>
                              {item.status}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Revenue Potential Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='absolute left-20 top-1/2 z-10 w-[320px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
              >
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-medium text-white'>
                      Revenue Potential
                    </h4>
                    <div className='rounded-full bg-[#03E87A]/20 px-2 py-1'>
                      <span className='text-xs text-[#03E87A]'>
                        $6B+ Market
                      </span>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    {[
                      { source: 'Experience Bookings', share: '45%' },
                      { source: 'Dining & Events', share: '30%' },
                      { source: 'Concierge Services', share: '25%' },
                    ].map((item, i) => (
                      <div key={i} className='space-y-1'>
                        <div className='flex justify-between text-xs'>
                          <span className='text-white/60'>{item.source}</span>
                          <span className='text-[#03E87A]'>{item.share}</span>
                        </div>
                        <div className='h-1.5 rounded-full bg-white/10'>
                          <div
                            className='h-full rounded-full bg-[#03E87A]'
                            style={{ width: item.share }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AI Concierge Features Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='absolute bottom-20 left-32 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
              >
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='relative h-12 w-12'>
                      <div className='absolute -inset-1 animate-pulse rounded-full bg-[#03E87A]/20 blur-md' />
                      <div className='relative h-full w-full rounded-full bg-gradient-to-br from-[#03E87A] to-[#03E87A]/80' />
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-white'>
                        Core Features
                      </h4>
                      <p className='text-xs text-white/60'>
                        Customizable AI Suite
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      'Multi-lingual Support',
                      'Brand Personality',
                      'Payment Processing',
                      'Experience Booking',
                      'Local Recommendations',
                      'Guest Analytics',
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-2 rounded-lg bg-white/5 p-2'
                      >
                        <span className='h-1.5 w-1.5 rounded-full bg-[#03E87A]' />
                        <span className='text-xs text-white/80'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          );

        case 'Step 2: Generate AI Concierge':
          return (
            <>
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='absolute left-8 top-8 z-10 w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
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
                className='absolute right-8 top-1/4 z-10 w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
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
                className='absolute bottom-8 left-1/2 z-10 w-[400px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
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

        case 'Step 3: Meet "Sierra"':
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='absolute left-8 top-1/2 z-10 w-[320px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
            >
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='relative h-12 w-12'>
                    <div className='absolute -inset-1 animate-pulse rounded-full bg-[#03E87A]/20 blur-md' />
                    <div className='relative h-full w-full rounded-full bg-gradient-to-br from-[#03E87A] to-[#03E87A]/80' />
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-white'>Sierra</h4>
                    <p className='text-xs text-white/60'>AI Concierge</p>
                  </div>
                </div>
                <div className='space-y-3'>
                  {[
                    'Natural Language Processing',
                    'Contextual Understanding',
                    'Personalized Responses',
                    'Multi-channel Support',
                  ].map((feature, i) => (
                    <div key={i} className='flex items-center gap-2'>
                      <span className='h-1.5 w-1.5 rounded-full bg-[#03E87A]' />
                      <span className='text-xs text-white/80'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );

        case 'Step 4: Explore Features':
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='absolute left-8 top-1/2 z-10 w-[320px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
            >
              <div className='space-y-4'>
                <h4 className='text-sm font-medium text-white'>
                  Available Features
                </h4>
                <div className='grid gap-3'>
                  {[
                    { name: 'Experience Curator', status: 'Active' },
                    { name: 'Payment Processing', status: 'Active' },
                    { name: 'Booking Engine', status: 'Active' },
                    { name: 'Analytics Dashboard', status: 'Active' },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between rounded-lg bg-white/5 p-3'
                    >
                      <span className='text-sm text-white/80'>
                        {feature.name}
                      </span>
                      <span className='rounded-full bg-[#03E87A]/20 px-2 py-1 text-xs text-[#03E87A]'>
                        {feature.status}
                      </span>
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
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.2),transparent_85%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,168,124,0.18),transparent_85%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]' />
            <motion.div
              className='absolute -left-[800px] top-1/2 h-[1400px] w-[1400px] rounded-full bg-gradient-to-r from-[#03E87A]/30 via-[#C6A87C]/25 to-transparent blur-[150px]'
              variants={floatingGradientVariants}
              animate='animate'
            />
          </div>

          {/* Enhanced Progress Indicator */}
          <motion.div
            className='absolute right-16 top-32 z-50 flex flex-col items-center gap-4'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className='h-20 w-[3px] overflow-hidden rounded-full bg-gradient-to-b from-black/10 to-black/5 backdrop-blur-2xl'>
              <motion.div
                className='h-full w-full bg-gradient-to-b from-[#03E87A] via-[#03E87A]/90 to-[#C6A87C]'
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
              <span className='font-light text-sm tracking-wider text-black/70'>
                {`0${(index ?? slideIndex.value) + 1}`}
              </span>
              {/* <span className='h-px w-3 bg-black/20' />
              <span className='font-light text-xs tracking-wider text-black/40'>
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
              className='group relative h-[450px] w-[450px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-xl lg:h-[600px] lg:w-[600px]'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.5, ease: 'easeOut' },
              }}
            >
              <Image
                src={slide.value.image}
                alt={slide.value.label}
                layout='fill'
                objectFit='cover'
                className='transition-all duration-700 ease-out group-hover:scale-110'
                priority
                quality={100}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40' />

              {/* Enhanced Floating Label */}
              <motion.div
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            variants={textVariants}
            className='relative z-10 flex flex-1 flex-col justify-center space-y-10 lg:pl-24'
          >
            <motion.div
              className='inline-block overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 to-transparent px-6 py-3 backdrop-blur-xl'
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className='relative flex items-center gap-4'>
                <span className='h-2.5 w-2.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
                <span className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text font-light tracking-wide text-transparent'>
                  {slide.value.label}
                </span>
              </div>
            </motion.div>

            <motion.h2
              className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text font-light text-6xl leading-[1.1] tracking-tight text-transparent sm:text-7xl'
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h2>

            <motion.p
              className='max-w-xl font-light text-lg leading-relaxed text-gray-600/90'
              variants={textVariants}
            >
              {slide.value.description}
            </motion.p>

            <motion.button
              className='group relative mt-6 flex w-fit items-center gap-4 overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 via-[#03E87A]/5 to-transparent px-10 py-5 backdrop-blur-xl transition-all'
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
              <span className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text font-light tracking-wide text-transparent'>
                {slide.value.buttonText}
              </span>
              <motion.span
                className='inline-block text-gray-800'
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
    image: '/assets/main/onboarding.svg',
    label: 'Step 1: Onboarding',
    tagline: 'Get Started with GuestOS',
    description:
      'Easily integrate GuestOS into your hotel’s existing systems with our seamless onboarding process.',
    buttonText: 'Learn More',
  },
  {
    image: '/assets/main/generating_ai.svg',
    label: 'Step 2: Generate AI Concierge',
    tagline: 'Create Your Personalized Concierge',
    description:
      'Customize your AI concierge to reflect your hotel’s unique brand and persona, ensuring a personalized guest experience.',
    buttonText: 'Customize Now',
  },
  {
    image: '/assets/main/introducing_sierra.svg',
    label: 'Step 3: Meet "Sierra"',
    tagline: 'Introducing Your Core AI Concierge',
    description:
      '"Sierra" provides 24/7 multilingual support for all your guests’ inquiries and trip planning needs.',
    buttonText: 'Meet Sierra',
  },
  {
    image: '/assets/main/features.svg',
    label: 'Step 4: Explore Features',
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

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className='relative h-screen overflow-hidden text-white'
      style={{ backgroundColor: bgColor }}
      initial={{ padding: '0' }}
      animate={{ padding: '2rem' }}
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
