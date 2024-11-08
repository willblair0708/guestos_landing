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
      className='relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F1EFED] to-[#E9E7E5] text-black'
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.div className='w-full' style={{ y: ySpring, opacity }}>
        {/* Hero Content */}
        <motion.div
          className='mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 sm:px-8'
          variants={containerVariants}
        >
          <div className='grid grid-cols-1 gap-16 lg:grid-cols-2'>
            {/* Left Column */}
            <motion.div className='flex flex-col justify-center space-y-8'>
              <motion.div variants={itemVariants} className='space-y-2'>
                <span className='inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-sm'>
                  <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
                  AI-Powered Platform
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className='text-[40px] font-book leading-[1.1] tracking-[-0.02em] text-[#18181B] sm:text-[56px]'
              >
                The Future of
                <br />
                <span className='bg-gradient-to-r from-[#18181B] to-[#18181B]/80 bg-clip-text text-transparent'>
                  Guest Experience
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className='max-w-xl text-lg font-book leading-relaxed tracking-tight text-black/70'
              >
                Enhance guest experiences with 24/7 multilingual support,
                personalized recommendations, and streamlined operations - all
                powered by advanced AI technology.
              </motion.p>

              <motion.div variants={itemVariants} className='flex gap-4 pt-4'>
                <Link
                  className='group flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-book text-white transition-all hover:bg-black/90'
                  href='/demo'
                >
                  <span>Book Demo</span>
                  <ArrowIcon
                    className='h-4 w-4 rotate-[-90deg] transition-transform group-hover:translate-x-1'
                    color='white'
                  />
                </Link>
                <Link
                  className='flex items-center gap-2 rounded-full border border-black/10 px-8 py-4 text-sm font-book text-black transition-all hover:bg-black/5'
                  href='/products'
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              variants={itemVariants}
              className='relative flex items-center justify-center'
            >
              <div className='grid grid-cols-2 gap-6'>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className='rounded-2xl border border-black/5 bg-white/50 p-6 backdrop-blur-sm'
                    whileHover={{ scale: 1.02 }}
                  >
                    <stat.icon
                      className='mb-4 h-8 w-8'
                      color={stat.iconColor || '#ffffff'}
                    />
                    <p className='text-3xl font-medium tracking-tight'>
                      {stat.value}
                    </p>
                    <p className='text-sm text-black/60'>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Platform Preview */}
        <div className='mx-auto px-4 sm:px-8'>
          {isMobile ? <ProductPreviewMobile /> : <PlatformPreview />}
        </div>
      </motion.div>
    </motion.section>
  );
}

// Update stats data with proper color handling
const stats = [
  {
    icon: icons.Message,
    label: 'Languages Supported',
    value: '95+',
    iconColor: '#000000',
  },
  {
    icon: icons.Chart,
    label: 'Guest Satisfaction',
    value: '95%',
    iconColor: '#000000',
  },
  {
    icon: icons.Settings,
    label: 'Response Time',
    value: '<1min',
    iconColor: '#000000',
  },
  {
    icon: icons.Message,
    label: 'Support Coverage',
    value: '24/7',
    iconColor: '#000000',
  },
];

// Update floatingElements with proper color handling
const floatingElements = [
  {
    icon: icons.Message,
    label: 'Live Chat',
    value: '24/7',
    iconColor: '#03E87A',
  },
  {
    icon: icons.Chart,
    label: 'Guest Satisfaction',
    value: '95%',
    iconColor: '#03E87A',
  },
  {
    icon: icons.Settings,
    label: 'Response Time',
    value: '<1min',
    iconColor: '#03E87A',
  },
];

// Update features with richer content and better organization
const features = [
  {
    title: 'AI-Powered Experience',
    description: 'Seamless multilingual support with natural conversations.',
    icon: icons.Message,
    stats: '24/7 Support',
    gradient: 'from-[#03E87A] to-[#03E87A]/5',
    metrics: [
      { label: 'Languages', value: '95+' },
      { label: 'Response Time', value: '<1min' },
    ],
  },
  {
    title: 'Smart Operations',
    description: 'Automate workflows and enhance staff productivity.',
    icon: icons.Settings,
    stats: '85% Efficiency',
    gradient: 'from-[#FFB443] to-[#FFB443]/5',
    metrics: [
      { label: 'Tasks Automated', value: '75%' },
      { label: 'Time Saved', value: '12hrs/day' },
    ],
  },
  {
    title: 'Guest Intelligence',
    description: 'Deep insights for personalized experiences.',
    icon: icons.Chart,
    stats: '2x Revenue',
    gradient: 'from-[#3B82F6] to-[#3B82F6]/5',
    metrics: [
      { label: 'Guest Satisfaction', value: '95%' },
      { label: 'Repeat Visits', value: '+40%' },
    ],
  },
];

// Add PlatformPreview component with modern UI
function PlatformPreview() {
  return (
    <div className='relative mx-auto h-[650px] w-full max-w-screen-2xl rounded-t-[40px] bg-gradient-to-b from-black to-black/95 p-6 shadow-2xl'>
      <div className='flex h-full w-full flex-col'>
        {/* Enhanced Navigation */}
        <nav className='flex w-full items-center justify-between rounded-xl px-8 pb-6'>
          <div className='flex items-center gap-6'>
            <GuestOSIcon className='h-14 w-14' />
            <div className='h-8 w-px bg-white/10' />
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-[#03E87A]' />
                <span className='font-light text-sm text-white/70'>
                  Live Platform
                </span>
              </div>
              <p className='font-light text-xs text-white/40'>
                Powering next-gen hospitality
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className='flex items-center gap-8'>
            {floatingElements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className='flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm'
              >
                <item.icon
                  className='h-4 w-4'
                  color={item.iconColor || '#ffffff'}
                />
                <div className='flex flex-col'>
                  <span className='font-light text-xs text-white/60'>
                    {item.label}
                  </span>
                  <span className='text-sm font-medium text-white'>
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className='relative h-full w-full overflow-hidden rounded-t-3xl'>
          <Image
            src='/assets/main/main_hero_poster.webp'
            alt='GuestOS Platform'
            fill
            className='object-cover transition-transform duration-700 hover:scale-105'
            priority
            quality={95}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40' />

          {/* Live Guest Interaction Card */}
          <FloatingCard
            className='left-100 top-8 max-w-sm backdrop-blur-2xl'
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              top: '2%',
              left: '20%',
            }}
          >
            <div className='space-y-4 p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='relative'>
                    <div className='absolute -inset-1 animate-pulse rounded-full bg-[#03E87A]/20 blur-md' />
                    <div className='relative h-10 w-10 rounded-full bg-gradient-to-br from-[#03E87A] to-[#03E87A]/80' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Live Interaction
                    </p>
                    <div className='flex items-center gap-1.5'>
                      <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
                      <p className='text-xs text-white/60'>
                        Multilingual Support
                      </p>
                    </div>
                  </div>
                </div>
                <div className='rounded-full bg-white/10 px-2 py-1'>
                  <span className='text-xs text-white/80'>24/7</span>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex gap-2'>
                  <div className='h-8 w-8 rounded-full bg-white/10' />
                  <div className='flex-1 space-y-2'>
                    <p className='text-sm text-white/80'>
                      "Could you recommend some local restaurants for dinner
                      tonight? Looking for something authentic."
                    </p>
                    <div className='flex items-center gap-1.5'>
                      <span className='text-xs text-white/40'>
                        Guest • Just now
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#03E87A]/10'>
                    <icons.Message className='h-4 w-4' color='#ffffff' />
                  </div>
                  <div className='space-y-1.5'>
                    <div className='flex items-center gap-2'>
                      <div className='h-1 w-1 animate-pulse rounded-full bg-[#03E87A]' />
                      <div className='h-1 w-1 animate-pulse rounded-full bg-[#03E87A] delay-75' />
                      <div className='h-1 w-1 animate-pulse rounded-full bg-[#03E87A] delay-150' />
                    </div>
                    <p className='text-xs text-white/40'>
                      AI Assistant crafting personalized recommendations...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Guest Insights Card */}
          <FloatingCard
            className='right-8 top-8 backdrop-blur-2xl'
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div className='relative p-6'>
              <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/10 blur-3xl' />
              <div className='relative space-y-4'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-sm font-medium text-white'>
                    Guest Intelligence
                  </h4>
                  <div className='rounded-full bg-white/10 px-2 py-1'>
                    <span className='text-xs text-white/80'>Real-time</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/60'>
                        Satisfaction
                      </span>
                      <span className='text-sm font-medium text-[#03E87A]'>
                        95%
                      </span>
                    </div>
                    <div className='h-1.5 rounded-full bg-white/10'>
                      <div className='h-full w-[95%] rounded-full bg-[#03E87A]' />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/60'>
                        Response Rate
                      </span>
                      <span className='text-sm font-medium text-[#03E87A]'>
                        &lt;1m
                      </span>
                    </div>
                    <div className='h-1.5 rounded-full bg-white/10'>
                      <div className='h-full w-[98%] rounded-full bg-[#03E87A]' />
                    </div>
                  </div>
                </div>

                <div className='mt-4 rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-2'>
                    <icons.Chart className='h-4 w-4' color='#ffffff' />
                    <span className='text-xs text-white/80'>
                      Trending Preferences
                    </span>
                  </div>
                  <div className='mt-2 flex gap-2'>
                    {['Local Dining', 'Activities', 'Transport'].map(
                      (tag, i) => (
                        <span
                          key={i}
                          className='rounded-full bg-white/10 px-2 py-1 text-xs text-white/60'
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Response Time Card - Enhanced */}
          <FloatingCard
            className='bottom-8 left-8 backdrop-blur-2xl'
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
            }}
          >
            <div className='relative p-6'>
              <div className='absolute -left-10 -top-10 h-20 w-20 rounded-full bg-[#03E87A]/10 blur-2xl' />
              <div className='relative flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#03E87A]/20 to-[#03E87A]/5'>
                  <icons.Message className='h-5 w-5' color='#ffffff' />
                </div>
                <div>
                  <p className='text-sm font-medium text-white'>
                    Average Response Time
                  </p>
                  <div className='mt-1 flex items-center gap-2'>
                    <span className='bg-gradient-to-r from-[#03E87A] to-[#03E87A]/80 bg-clip-text text-lg font-medium text-transparent'>
                      &lt; 1m
                    </span>
                    <span className='text-xs text-white/40'>
                      across all channels
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Distribution Chart Card - Enhanced */}
          <FloatingCard
            className='bottom-8 right-8 backdrop-blur-2xl'
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
              bottom: '15%',
              right: '20%',
            }}
          >
            <div className='relative p-6'>
              <div className='absolute -right-10 -top-10 h-20 w-20 rounded-full bg-[#03E87A]/10 blur-2xl' />
              <div className='relative space-y-4'>
                <div className='flex justify-between'>
                  <h4 className='text-sm font-medium text-white'>
                    Guest Interactions
                  </h4>
                  <span className='text-xs text-white/40'>Today</span>
                </div>
                <div className='flex gap-3'>
                  <DistributionBar
                    heights={[60, 80, 40, 90]}
                    label='SMS'
                    color='#03E87A'
                  />
                  <DistributionBar
                    heights={[80, 40, 90, 60]}
                    label='Voice'
                    color='#FFB443'
                  />
                  <DistributionBar
                    heights={[40, 90, 60, 80]}
                    label='Chat'
                    color='#3B82F6'
                  />
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
}

// Add interface for feature card props
interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: any;
    stats: string;
    gradient: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
  index: number;
}

// Update FeatureCard component with enhanced design
function FeatureCard({ feature, index }: FeatureCardProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const inView = useInView(elementRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className='group relative overflow-hidden rounded-2xl bg-white/[0.02] p-1 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]'
    >
      <div
        className={`h-full w-full rounded-xl bg-gradient-to-br ${feature.gradient} p-6 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.05]`}
      />
      <div className='absolute inset-0 p-6'>
        <div className='flex h-full flex-col justify-between'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <feature.icon className='h-8 w-8 text-black/80' />
              <div className='flex items-center gap-2 rounded-full bg-black/5 px-3 py-1'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#03E87A]' />
                <span className='text-xs font-medium'>{feature.stats}</span>
              </div>
            </div>
            <div>
              <h3 className='mb-2 text-lg font-medium tracking-tight'>
                {feature.title}
              </h3>
              <p className='text-sm text-black/60'>{feature.description}</p>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-4 border-t border-black/5 pt-4'>
            {feature.metrics.map((metric, i) => (
              <div key={i} className='space-y-1'>
                <p className='text-xs text-black/40'>{metric.label}</p>
                <p className='text-sm font-medium'>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Update DistributionBar component to include color prop
const DistributionBar = ({
  heights,
  label,
  color,
}: {
  heights: number[];
  label: string;
  color: string;
}) => {
  return (
    <div className='relative flex flex-col items-center'>
      <p className='absolute inset-2 select-none text-xs uppercase tracking-wide text-white'>
        {label}
      </p>
      {heights.map((h, index) => (
        <div
          key={index}
          style={{
            height: `${h}%`,
            backgroundColor: color,
            opacity: 1 - index * 0.2, // Creates a gradient effect
          }}
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

// Update ProductPreviewMobile with matching design
function ProductPreviewMobile() {
  return (
    <div className='relative mx-auto mt-8 h-[400px] w-full max-w-screen-lg rounded-t-[20px] bg-gradient-to-b from-black to-black/95 p-4 pb-0 shadow-2xl'>
      <div className='flex h-full w-full flex-col'>
        <nav className='flex w-full items-center justify-between rounded-xl px-4 pb-4 text-white'>
          <div className='flex items-center gap-3'>
            <GuestOSIcon className='mt-2 h-10 w-10' />
            <span className='font-light text-xs tracking-wide text-white/70'>
              AI Concierge
            </span>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm'>
            <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
            <span className='font-light text-xs'>Live</span>
          </div>
        </nav>

        <div className='relative h-full w-full overflow-hidden rounded-t-2xl'>
          <Image
            src='/assets/main/main_hero_poster.webp'
            alt='GuestOS Platform'
            fill
            className='object-cover'
            priority
            quality={90}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40' />
        </div>
      </div>
    </div>
  );
}
