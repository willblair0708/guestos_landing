import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import Navbar from '../../components/Navbar';

interface PricingHeroProps {
  isMobile?: boolean;
}

const SPRING_CONFIG = { stiffness: 120, damping: 25, restDelta: 0.001 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const floatingGradientVariants = {
  animate: {
    x: [0, 200, 0],
    y: [-100, 100, -100],
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Background Component
const Background = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-black/80" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,87,0.12),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
    <motion.div
      className="absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-accent-gold-light/15 via-[rgba(255,200,87,0.1)] to-transparent blur-3xl"
      variants={floatingGradientVariants}
      animate="animate"
    />
  </div>
);

const features = [
  'No hidden fees',
  'Cancel anytime',
  'Free 14-day trial',
  'Dedicated support',
];

export default function PricingHero({ isMobile }: PricingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 5]);
  const ySpring = useSpring(y, SPRING_CONFIG);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative h-screen overflow-hidden text-white"
    >
      <Background />

      <motion.div
        className="relative z-20 flex h-full flex-col"
        style={{
          opacity,
          scale,
          y: ySpring,
          filter: `blur(${blur}px)`,
        }}
      >
        <Navbar isFixed={false} />
        
        <div className="relative grid h-full grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`col-span-12 flex items-center ${
              isMobile ? 'justify-center pb-24' : ''
            }`}
            style={{ opacity, scale }}
          >
            <div className={`w-full space-y-10 ${isMobile ? 'text-center' : ''}`}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="relative inline-block overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base backdrop-blur-sm"
                >
                  <div className={`relative flex items-center gap-3 ${isMobile ? 'justify-center' : ''}`}>
                    <span className="h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold" />
                    <span className="bg-gradient-to-r from-primary-gold to-accent-gold-light bg-clip-text text-transparent">
                      Choose Your Plan
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className={`text-hero font-book ${
                    isMobile ? 'text-4xl sm:text-5xl' : 'sm:text-5xl lg:text-6xl'
                  }`}
                >
                  <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text font-light tracking-tight text-transparent">
                    Simple, transparent pricing
                  </span>
                </motion.h1>

                <motion.div variants={itemVariants} className="mx-auto w-24">
                  <div className="h-px w-full bg-gradient-to-r from-primary-gold to-transparent" />
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className={`font-light ${
                    isMobile ? 'mx-auto max-w-sm text-lg' : 'max-w-xl text-xl'
                  } leading-relaxed text-white/60`}
                >
                  Choose the perfect plan for your business needs. All plans include our
                  core AI technology and dedicated support.
                </motion.p>

                {/* Features Grid */}
                <motion.div
                  variants={containerVariants}
                  className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      variants={itemVariants}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm"
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {isMobile && (
                  <motion.div
                    variants={itemVariants}
                    className="mx-auto max-w-sm"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                      <div className="h-px w-3 bg-gradient-to-r from-primary-gold to-transparent" />
                      <span className="text-sm font-light text-white/80">
                        Transparent pricing, no hidden fees
                      </span>
                      <div className="h-px w-3 bg-gradient-to-l from-primary-gold to-transparent" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
} 