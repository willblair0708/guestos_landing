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
      <section
        id={id}
        className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-bg-light via-bg-cream to-bg-light'
      >
        <motion.div
          className='flex w-full max-w-6xl flex-col items-center justify-between p-8 lg:flex-row'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            variants={imageVariants}
            className={`flex w-full items-center justify-center p-4 lg:w-1/2 ${
              isFallback && index !== 0 ? 'border-r lg:border-r-0' : ''
            }`}
          >
            <motion.div
              className='m-auto h-fit w-fit p-2'
              key={`${slideIndex.value}:image`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={slide.value.image}
                alt='Woman Aaru'
                width={500}
                height={500}
                className='h-80 lg:h-full'
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={textVariants}
            className='flex w-full flex-col justify-center p-4 lg:w-1/2'
          >
            <motion.div
              className='mb-4 text-lg font-semibold uppercase tracking-wide text-neutral-700'
              key={`${slideIndex.value}:tagline`}
              variants={textVariants}
            >
              {slide.value.label}
            </motion.div>
            <motion.h3
              className='font-serif text-3xl leading-tight tracking-tight text-neutral-900 lg:text-4xl'
              key={`${slideIndex.value}:description`}
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h3>
            <motion.p
              className='mt-4 text-base text-neutral-700'
              key={`${slideIndex.value}:desc`}
              variants={boxVariants}
            >
              {slide.value.description}
            </motion.p>
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
      'Leverage hundreds of traits across demographics, psychographics and more to recreate any population, group, or geography in moments.',
    description: 'If you can describe it, Aaru can simulate it.',
    buttonText: 'Build your World',
  },
  {
    image: '/assets/main/pixelated_earth.svg',
    label: 'See the future, change the present',
    tagline:
      'Configure worlds with hypothetical news, information, and stories to measure the impact of events that haven’t yet happened.',
    description:
      "Whether it is a Vice Presidential nomination, a brand launch, or a terrorist attack, proactively identifying the impact of events is core to Aaru's operations.",
    buttonText: 'See the Future',
  },
  {
    image: '/assets/main/pixelated_stopwatch.svg',
    label: 'Infinite Scale in Minimal Time',
    tagline:
      'Reduce 4 weeks of research into 40 seconds with higher accuracy than any survey, poll, or focus group in 1/1000th of the time.',
    description:
      "Humans don't scale. They don't tell the truth, they have biases, and they frequently don't respond. Worst of all, they're slow.",
    buttonText: 'Learn more',
  },
  {
    image: '/assets/main/pixelated_tree.svg',
    label: 'Converge on Reality',
    tagline:
      'With an increasing number of agents, variance decreases. Simulations get closer and closer to reality until Aaru reaches convergence.',
    description:
      'Aaru researchers work on complex challenges daily. We tackle questions on the scale of humanity. What we build provides more accurate and detailed understandings of the world. We build clarity in chaos.',
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
      className='relative min-h-screen text-black'
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
      <Slide progressX={progressX} isFallback={false} />
    </motion.section>
  );
}

export default dynamic(() => Promise.resolve(HumanitySection), {
  ssr: false,
});
