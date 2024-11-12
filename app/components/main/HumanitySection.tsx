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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
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
      <section id={id}>
        <motion.div
          className='relative flex min-h-screen w-full flex-col bg-primary-cream px-8 py-16 lg:flex-row lg:py-20'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className='mb-12 flex flex-1 items-center justify-center lg:mb-0'
          >
            <motion.div
              className='relative h-80 w-80 overflow-hidden rounded-full shadow-lg lg:h-96 lg:w-96'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={slide.value.image}
                alt={slide.value.label}
                layout='fill'
                objectFit='cover'
                className='object-center'
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={textVariants}
            className='flex flex-1 flex-col justify-center lg:pl-12'
          >
            <motion.div
              className='mb-4 text-lg uppercase tracking-wider text-primary-gold'
              key={`${slideIndex.value}:label`}
              variants={textVariants}
            >
              {slide.value.label}
            </motion.div>
            <motion.h3
              className='mb-6 text-3xl font-semibold text-primary-navy'
              key={`${slideIndex.value}:tagline`}
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h3>
            <motion.p
              className='mb-8 text-base text-primary-sand'
              key={`${slideIndex.value}:description`}
              variants={textVariants}
            >
              {slide.value.description}
            </motion.p>
            <motion.button
              className='hover:bg-primary-gold-dark self-start rounded-full bg-primary-gold px-6 py-3 font-medium text-primary-navy transition-colors'
              key={`${slideIndex.value}:button`}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              {slide.value.buttonText}
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
    image: '/assets/main/pixelated_woman.svg',
    label: 'Humanity at Scale',
    tagline:
      'Recreate any population, group, or geography in moments with hundreds of traits across demographics and psychographics.',
    description: 'If you can describe it, Aaru can simulate it.',
    buttonText: 'Build Your World',
  },
  {
    image: '/assets/main/pixelated_earth.svg',
    label: 'See the Future, Change the Present',
    tagline:
      'Configure worlds with hypothetical events to measure their impact before they happen.',
    description:
      "Whether it's a vice presidential nomination or a brand launch, proactively identify the impact of future events.",
    buttonText: 'See the Future',
  },
  {
    image: '/assets/main/pixelated_stopwatch.svg',
    label: 'Infinite Scale in Minimal Time',
    tagline:
      'Transform weeks of research into seconds with unparalleled accuracy and efficiency.',
    description:
      'Humans are slow, biased, and unreliable. Aaru delivers faster and more accurate insights.',
    buttonText: 'Learn More',
  },
  {
    image: '/assets/main/pixelated_tree.svg',
    label: 'Converge on Reality',
    tagline:
      'Simulations become indistinguishable from reality as variance decreases with more agents.',
    description:
      'Aaru provides clarity in chaos, offering detailed understandings of complex global challenges.',
    buttonText: 'Design Tomorrow',
  },
];

const FORCE_THRESHOLD = 700;

function HumanitySection({ id, bgColor, isMobile }: HumanitySectionProps) {
  const shouldFallback = useMemo(
    () =>
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 1024,
    []
  );

  if (!shouldFallback)
    return <ScrollingSection id={id} bgColor={bgColor} isMobile={isMobile} />;

  return (
    <motion.section
      id={id}
      className='relative min-h-screen text-primary-navy'
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
      className='relative h-screen p-8 text-primary-navy'
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
