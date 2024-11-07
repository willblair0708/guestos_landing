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

import Slide from './HumanitySection/Slide';

interface HumanitySectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const slideIndex = signal(0);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, x: -10, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const slides = [
  {
    image: '/assets/main/pixelated_woman.svg',
    label: 'The AI Concierge for Hospitality',
    tagline:
      'Improve your guest experience with GuestOS, the leading AI concierge platform designed for the hospitality industry.',
    description:
      '24/7 multilingual support with advanced AI voice and SMS technology.',
    buttonText: 'Book Demo',
  },
  {
    image: '/assets/main/pixelated_earth.svg',
    label: 'Who uses GuestOS?',
    tagline:
      'GuestOS equips boutique hotels and resorts with an advanced AI concierge, streamlining operations while enhancing guest experiences.',
    description:
      'Enhance your boutique hotel or resort experience with GuestOS.',
    buttonText: 'Learn More',
  },
  {
    image: '/assets/main/pixelated_stopwatch.svg',
    label: 'How does GuestOS AI work?',
    tagline:
      "GuestOS's advanced AI seamlessly integrates with your hotel systems, anticipating guest needs and enabling personalized interactions.",
    description:
      'Offer tailored suggestions based on guest preferences and behavior.',
    buttonText: 'Discover More',
  },
  {
    image: '/assets/main/pixelated_tree.svg',
    label: 'Why Hoteliers love GuestOS',
    tagline:
      'Automate Workflow and empower your hotel staff with GuestOS to better understand and fulfill guest needs.',
    description:
      "Boost your bottom line with GuestOS' proven ability to generate revenue.",
    buttonText: 'Contact Us',
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
      className='relative min-h-screen text-black'
      style={{ backgroundColor: bgColor }}
    >
      {slides.map((_, index) => (
        <Slide
          index={index}
          key={index}
          isFallback={true}
          slideIndex={slideIndex}
          slides={slides}
        />
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
      className='relative h-screen p-[30px] text-black'
      style={{ backgroundColor: bgColor }}
      initial={{ padding: '0' }}
      whileInView={{ padding: '2rem' }}
      viewport={{ amount: 0.9, once: true }}
    >
      <Slide
        progressX={progressX}
        isFallback={false}
        slideIndex={slideIndex}
        slides={slides}
      />
    </motion.section>
  );
}

export default dynamic(() => Promise.resolve(HumanitySection), {
  ssr: false,
});

type Axis = 'left' | 'right' | 'bottom' | 'top';

const Scrollbar = memo(
  ({
    range,
    value,
    axis,
  }: {
    range: number[];
    value: MotionValue<number>;
    axis: { primary: Axis; secondary: Axis };
  }) => {
    const segment = useTransform(value, range, ['0%', '100%']);
    const display = useTransform(value, (value) => {
      const [start, end] = range;

      if (value > start && value <= end) {
        return 'initial';
      } else if (start === 0 && value <= 0) {
        return 'initial';
      } else {
        return 'none';
      }
    });

    // TODO: clean this up
    const position =
      axis.secondary === 'top'
        ? '-top-1'
        : axis.secondary === 'bottom'
          ? '-bottom-1'
          : axis.secondary === 'left'
            ? '-left-1'
            : '-right-1';

    const padding =
      axis.primary === 'top'
        ? 'pb-8'
        : axis.primary === 'bottom'
          ? 'pt-8'
          : axis.primary === 'left'
            ? 'pr-8'
            : 'pl-8';

    const dimensions =
      axis.primary === 'left' || axis.primary === 'right'
        ? 'w-8 h-2'
        : 'w-2 h-8';

    return (
      <div className={`absolute h-full w-full ${padding}`}>
        <div className='relative h-full w-full'>
          <motion.div
            className={`absolute ${dimensions} rounded-md bg-black ${position}`}
            style={{ [axis.primary]: segment, display }}
          />
        </div>
      </div>
    );
  }
);

Scrollbar.displayName = 'Scrollbar';
