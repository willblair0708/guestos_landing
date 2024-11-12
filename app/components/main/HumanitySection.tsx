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

import { signal } from '@preact/signals-react';
import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { motion, type MotionValue, useTransform } from 'framer-motion';

import { useCooldown } from '@/hooks/use-cooldown';
import { useScrollControl, useScrollForce } from '@/hooks/use-scroll-control';

interface HumanitySectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const slideIndex = signal(0);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Add new floating gradient animation
const floatingGradientVariants = {
  animate: {
    x: [0, 200, 0],
    y: [-100, 100, -100],
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

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

    return (
      <section id={id} className='h-screen'>
        <motion.div
          className='relative flex h-full w-full flex-col items-center justify-center gap-16 bg-black px-8 lg:flex-row'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Enhanced Background Effects */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.12),transparent_70%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
            <motion.div
              className='absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-[#03E87A]/15 via-[rgba(255,200,87,0.1)] to-transparent blur-3xl'
              variants={floatingGradientVariants}
              animate='animate'
            />
          </div>

          {/* Progress indicator */}
          <motion.div
            className='absolute right-8 top-32 z-50 flex items-center gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='h-12 w-[2px] overflow-hidden rounded-full bg-white/10'>
              <motion.div
                className='h-full w-full bg-primary-gold'
                style={{
                  y: `${((index ?? slideIndex.value) / (slides.length - 1)) * 100 - 100}%`,
                }}
              />
            </div>
            <span className='font-light text-xs text-white/60'>
              0{(index ?? slideIndex.value) + 1}/0{slides.length}
            </span>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className='relative z-10 mb-12 flex flex-1 items-center justify-center lg:mb-0'
          >
            <motion.div
              className='group relative h-[400px] w-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-black/40 via-black/20 to-black/10 shadow-2xl backdrop-blur-xl lg:h-[500px] lg:w-[500px]'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <Image
                src={slide.value.image}
                alt={slide.value.label}
                layout='fill'
                objectFit='cover'
                className='transition-all duration-700 ease-out group-hover:scale-105'
                quality={100}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

              {/* New floating elements */}
              <div className='absolute -left-20 top-1/2 h-40 w-40 rounded-full bg-primary-gold/10 blur-3xl' />
              <div className='absolute -right-20 top-1/3 h-40 w-40 rounded-full bg-[#03E87A]/10 blur-3xl' />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={textVariants}
            className='relative z-10 flex flex-1 flex-col justify-center lg:pl-16'
          >
            <motion.div
              className='group mb-6 inline-flex w-fit items-center gap-3 rounded-full bg-white/5 px-5 py-2 backdrop-blur-sm'
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
              <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light text-sm tracking-wider text-transparent'>
                {slide.value.label}
              </span>
            </motion.div>

            <motion.h3
              className='mb-6 bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text font-light text-4xl leading-[1.2] tracking-tight text-transparent sm:text-5xl'
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h3>

            <motion.p
              className='mb-10 max-w-xl font-light text-lg leading-relaxed text-white/70'
              variants={textVariants}
            >
              {slide.value.description}
            </motion.p>

            <motion.button
              className='group flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-primary-gold/20 to-primary-gold/5 px-6 py-3 backdrop-blur-sm transition-all hover:from-primary-gold/30 hover:to-primary-gold/10'
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light text-sm tracking-wider text-transparent'>
                {slide.value.buttonText}
              </span>
              <motion.svg
                className='h-4 w-4 text-white/70 transition-transform duration-300 group-hover:translate-x-1'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12H19M19 12L12 5M19 12L12 19' />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';

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
    label: 'Step 2: Generating AI Concierge',
    tagline: 'Create Your Personalized Concierge',
    description:
      'Customize your AI concierge to reflect your hotel’s unique brand and persona, ensuring a personalized guest experience.',
    buttonText: 'Customize Now',
  },
  {
    image: '/assets/main/introducing_sierra.svg',
    label: 'Step 3: Introducing "Sierra"',
    tagline: 'Meet Your Core AI Concierge',
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
];

const FORCE_THRESHOLD = 700;

function HumanitySection({ id, bgColor, isMobile }: HumanitySectionProps) {
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
      className='relative h-screen overflow-hidden text-primary-navy'
      style={{ backgroundColor: bgColor }}
    >
      {slides.map((_, index) => (
        <Slide index={index} key={index} isFallback={true} />
      ))}
    </motion.section>
  );
}

function ScrollingSection({ id, bgColor, isMobile }: HumanitySectionProps) {
  useSignals();

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollForce, scrollTotal, addScrollEvent, resetScrollForce } =
    useScrollForce();

  // Use a cooldown so we don't immediately relock scroll when trying to scroll
  // past the section
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

  const progressX = useTransform(
    scrollTotal,
    [0, FORCE_THRESHOLD * slides.length],
    [0, 1]
  );

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

    // Use a raw intersection observer here because we want to react to the events,
    // not just whenever we happen to rerender.
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isInView = entry.isIntersecting;

        if (cooldown.isValid && isInView && !isLocked) {
          sectionRef.current?.scrollIntoView({ behavior: 'instant' });
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
      className='relative h-screen overflow-hidden text-primary-navy'
      style={{ backgroundColor: bgColor }}
      initial={{ padding: '0' }}
      animate={{ padding: '2rem' }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.9, once: true }}
    >
      <Slide progressX={progressX} isFallback={false} />
    </motion.section>
  );
}

export default dynamic(() => Promise.resolve(HumanitySection), {
  ssr: false,
});
