import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useIsomorphicLayoutEffect,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import * as icons from '@/app/icons';
import ArrowIcon from '@/public/assets/ui/Arrow';
import GuestOSIcon from '@/public/assets/ui/GuestOSIcon';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

export default function SimulationSection({
  id,
  bgColor,
  isMobile,
}: SimulationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      ref={sectionRef}
      id={id}
      className='relative flex min-h-screen items-center overflow-hidden bg-[#F1EFED] text-black sm:px-8'
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.div className='w-full' style={{ y: ySpring, opacity }}>
        <motion.div
          className='mx-auto mt-[100px] flex max-w-6xl flex-col items-start justify-between gap-x-12 gap-y-12 px-4 sm:mt-32 sm:flex-row sm:gap-x-24'
          variants={containerVariants}
        >
          <motion.div className='w-full space-y-6 sm:w-1/2'>
            <motion.h2
              variants={itemVariants}
              className='text-[32px] font-book leading-[1.2] tracking-[-0.01em] text-[#18181B] sm:text-[40px]'
            >
              {isMobile ? (
                'The AI Concierge Platform for Modern Hospitality'
              ) : (
                <>
                  The AI Concierge Platform <br />
                  for Modern Hospitality
                </>
              )}
            </motion.h2>
          </motion.div>

          <motion.div
            className='w-full space-y-8 sm:w-1/2'
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className='text-[16px] font-book leading-relaxed tracking-tight text-black/80'
            >
              Enhance guest experiences with 24/7 multilingual support,
              personalized recommendations, and streamlined operations - all
              powered by advanced AI technology.
            </motion.p>

            <motion.div variants={itemVariants} className='flex gap-4'>
              <motion.div className='group flex cursor-pointer items-center'>
                <Link
                  className='flex items-center rounded-full bg-black px-6 py-3 text-sm font-book text-white transition-all hover:bg-black/90'
                  href='/demo'
                >
                  Book Demo
                </Link>
              </motion.div>
              <motion.div className='group flex cursor-pointer items-center'>
                <Link
                  className='flex items-center text-sm font-book uppercase tracking-wide transition-all'
                  href='/products'
                >
                  <ArrowIcon
                    className='mr-2 inline-block rotate-[-90deg] transition-transform'
                    color='black'
                    opacity={0.8}
                  />
                  <motion.span
                    className='text-xs font-book uppercase tracking-wide'
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Platform Preview Section */}
        <div className={`mx-auto ${isMobile ? '-mt-[200px]' : 'mt-16'}`}>
          {isMobile ? <ProductPreviewMobile /> : <PlatformPreview />}
        </div>

        {/* Key Features Section */}
        <motion.div
          className='mx-auto mt-32 max-w-6xl px-4'
          variants={containerVariants}
        >
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className='space-y-4 rounded-xl bg-white/50 p-6 backdrop-blur-sm'
              >
                <feature.icon className='h-8 w-8 text-[#03E87A]' />
                <h3 className='text-lg font-medium'>{feature.title}</h3>
                <p className='text-sm text-black/70'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Add features data
const features = [
  {
    title: '24/7 AI Concierge',
    description:
      'Multilingual guest support powered by advanced AI voice and SMS technology.',
    icon: icons.Message,
  },
  {
    title: 'Smart Operations',
    description:
      'Streamline workflows and empower staff to focus on meaningful guest interactions.',
    icon: icons.Settings,
  },
  {
    title: 'Guest Insights',
    description:
      'Deep analytics to understand preferences and deliver personalized experiences.',
    icon: icons.Chart,
  },
];

// Update ProductPreview component to show more relevant UI
function PlatformPreview() {
  return (
    <div className='relative mx-auto mt-16 h-[600px] w-full max-w-screen-2xl rounded-t-[40px] bg-black p-4 pb-0'>
      <div className='flex h-full w-full flex-col'>
        <nav className='flex w-full items-center justify-between rounded-xl bg-black px-8 pb-4 text-white'>
          <GuestOSIcon className='mt-2 h-14 w-14' />
          <div className='flex items-center gap-4 text-sm'>
            <Image
              src='/assets/main/avatar.png'
              alt='Avatar'
              width={24}
              height={24}
              className='rounded-full'
            />
            <span>Mark</span>
          </div>
        </nav>

        <div className='relative h-full w-full overflow-hidden'>
          <Image
            src='/assets/main/main_hero_poster.webp'
            alt='GuestOS Platform'
            fill
            className='object-cover'
            priority
            quality={95}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20' />
        </div>
      </div>
    </div>
  );
}

const DistributionBar = ({
  heights,
  label,
}: {
  heights: number[];
  label: string;
}) => {
  const colors = ['#010365', '#1019EC', '#2553FA', '#398CFF'];
  return (
    <div className='relative flex flex-col items-center'>
      <p className='absolute inset-2 select-none text-xs uppercase tracking-wide text-white'>
        {label}
      </p>
      {heights.map((h, index) => (
        <div
          key={index}
          style={{ height: `${h}%`, backgroundColor: colors[index] }}
          className='w-12 sm:w-24'
        />
      ))}
    </div>
  );
};

function FloatingCard({
  children,
  style,
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const cardRef = useRef(null);
  const [hasAppeared, setHasAppeared] = useState(false);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: '-100px 0px -100px 0px',
  });

  useEffect(() => {
    if (isInView && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute h-fit w-fit rounded-xl bg-white/80 shadow-lg backdrop-blur-md transition-colors duration-300 hover:z-10 hover:bg-white/85 sm:px-8 sm:py-8 ${className}`}
      style={{
        ...style,
        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
        pointerEvents: hasAppeared ? 'auto' : 'none',
      }}
      initial={false}
      animate={{
        opacity: hasAppeared ? 1 : 0,
        y: hasAppeared ? 0 : 20,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        },
      }}
      whileHover={{
        scale: hasAppeared ? 1.01 : 1,
        transition: { duration: 0.15 },
      }}
    >
      {children}
    </motion.div>
  );
}

const PercentageDial = ({ percentage = 60 }) => {
  const tickCount = 80;
  const size =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 256;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element || !isInView) return;

    element.textContent = '0%';

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.textContent = `${percentage}%`;
      return;
    }

    const controls = animate(0, percentage, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(value) {
        element.textContent = `${value.toFixed(0)}%`;
      },
    });

    return () => controls.stop();
  }, [ref, isInView, percentage]);

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <div
        className='absolute inset-0 overflow-hidden rounded-full'
        style={{}}
      />
      {ticks.map((tick, index) => {
        const inPercentage = index / tickCount <= percentage / 100;
        const lastInPercentage =
          inPercentage && (index + 1) / tickCount > percentage / 100;

        const relativeHeight = inPercentage
          ? lastInPercentage
            ? 0.25
            : 0.15
          : 0.05;
        return (
          <motion.div
            key={tick}
            transition={{ duration: 0.2, delay: index * (1 / tickCount) }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: inPercentage ? 0.4 : 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className='absolute origin-bottom'
            style={{
              width: size * 0.006,
              height: size * relativeHeight,
              left: '50%',
              bottom: '50%',
              opacity: inPercentage ? (lastInPercentage ? 1.0 : 0.3) : 0.1,
              backgroundColor: lastInPercentage ? '#07E77A' : 'black',
              transform: `translateX(-50%) rotate(${tick * 4.5}deg) translateY(${inPercentage ? size * 0.5 : size * 0.4}px)`,
            }}
          />
        );
      })}
      <div
        className='absolute inset-0 flex select-none items-center justify-center text-3xl font-book'
        ref={ref}
      />
    </div>
  );
};

// Add ProductPreviewMobile component
function ProductPreviewMobile() {
  return (
    <div className='relative mx-auto mt-8 h-[400px] w-full max-w-screen-lg rounded-t-[20px] bg-black p-4 pb-0'>
      <div className='flex h-full w-full flex-col'>
        <nav className='flex w-full items-center justify-between rounded-xl bg-black px-4 pb-4 text-white'>
          <GuestOSIcon className='mt-2 h-10 w-10' />
          <div className='flex items-center gap-2 text-xs'>
            <Image
              src='/assets/main/avatar.png'
              alt='Avatar'
              width={20}
              height={20}
              className='rounded-full'
            />
            <span>Mark</span>
          </div>
        </nav>

        <div className='relative h-full w-full overflow-hidden'>
          <Image
            src='/assets/main/main_hero_poster.webp'
            alt='GuestOS Platform'
            fill
            className='object-cover'
            priority
            quality={90}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20' />
        </div>
      </div>
    </div>
  );
}
