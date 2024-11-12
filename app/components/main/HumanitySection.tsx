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
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.4,
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

    return (
      <section id={id} className='flex h-screen items-center justify-center'>
        <motion.div
          className='relative flex h-full w-full flex-col items-center justify-center gap-20 px-8 lg:flex-row'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          ref={ref}
        >
          {/* Enhanced Background Effects */}
          <div className='pointer-events-none absolute inset-0'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.18),transparent_80%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,168,124,0.15),transparent_80%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]' />
            <motion.div
              className='absolute -left-[600px] top-1/2 h-[1200px] w-[1200px] rounded-full bg-gradient-to-r from-[#03E87A]/25 via-[#C6A87C]/20 to-transparent blur-[120px]'
              variants={floatingGradientVariants}
              animate='animate'
            />
          </div>

          {/* Progress Indicator - Modernized */}
          <motion.div
            className='absolute right-12 top-32 z-50 flex flex-col items-center gap-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='h-16 w-1.5 overflow-hidden rounded-full bg-black/5 backdrop-blur-xl'>
              <motion.div
                className='h-full w-full bg-gradient-to-b from-[#03E87A] via-[#03E87A]/80 to-[#C6A87C]'
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
            <span className='font-light text-sm tracking-wider text-black/70'>
              {`0${(index ?? slideIndex.value) + 1}/0${slides.length}`}
            </span>
          </motion.div>

          {/* Image Section - Modernized */}
          <motion.div
            variants={imageVariants}
            className='relative z-10 flex flex-1 items-center justify-center'
          >
            <motion.div
              className='group relative h-[400px] w-[400px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-xl lg:h-[500px] lg:w-[500px]'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <Image
                src={slide.value.image}
                alt={slide.value.label}
                layout='fill'
                objectFit='cover'
                className='transition-all duration-700 ease-out group-hover:scale-110'
                priority
                quality={95}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40' />

              {/* New: Floating label */}
              <div className='absolute bottom-8 left-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md'>
                <span className='font-light text-sm tracking-wide text-white'>
                  {slide.value.label}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section - Modernized */}
          <motion.div
            variants={textVariants}
            className='relative z-10 flex flex-1 flex-col justify-center space-y-8 lg:pl-20'
          >
            <motion.span
              className='inline-block overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 to-transparent px-5 py-2 backdrop-blur-xl'
              whileHover={{ scale: 1.02 }}
            >
              <div className='relative flex items-center gap-3'>
                <span className='h-2 w-2 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
                <span className='relative font-light tracking-wide text-gray-800'>
                  {slide.value.label}
                </span>
              </div>
            </motion.span>

            <motion.h2
              className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text font-light text-5xl leading-tight tracking-tight text-transparent sm:text-6xl'
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h2>

            <motion.p
              className='max-w-xl font-light text-lg leading-relaxed text-gray-600'
              variants={textVariants}
            >
              {slide.value.description}
            </motion.p>

            <motion.button
              className='group relative mt-4 flex w-fit items-center gap-4 overflow-hidden rounded-full border border-[#03E87A]/20 bg-gradient-to-r from-[#03E87A]/10 via-[#03E87A]/5 to-transparent px-8 py-4 backdrop-blur-xl transition-all'
              whileHover={{
                scale: 1.02,
                background:
                  'linear-gradient(to right, rgba(3,232,122,0.2), rgba(198,168,124,0.1))',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const nextIndex = (index ?? slideIndex.value) + 1;
                slideIndex.value = nextIndex < slides.length ? nextIndex : 0;
              }}
            >
              <span className='font-light tracking-wide text-gray-800'>
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
