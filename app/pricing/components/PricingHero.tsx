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

// Predefined particle positions to avoid hydration mismatch
const floatingParticles = [
  { id: 1, size: 3, x: 15, y: 25, duration: 15, delay: 0 },
  { id: 2, size: 2, x: 35, y: 45, duration: 20, delay: 1 },
  { id: 3, size: 4, x: 55, y: 15, duration: 18, delay: 2 },
  { id: 4, size: 2.5, x: 75, y: 65, duration: 22, delay: 3 },
  { id: 5, size: 3.5, x: 25, y: 85, duration: 16, delay: 4 },
  { id: 6, size: 2, x: 85, y: 35, duration: 19, delay: 0.5 },
  { id: 7, size: 3, x: 45, y: 55, duration: 21, delay: 1.5 },
  { id: 8, size: 2.5, x: 65, y: 75, duration: 17, delay: 2.5 },
  { id: 9, size: 4, x: 95, y: 25, duration: 23, delay: 3.5 },
  { id: 10, size: 3, x: 5, y: 95, duration: 20, delay: 4.5 },
];

const particleVariants = {
  animate: (custom: { duration: number, delay: number }) => ({
    y: [0, -50, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      repeat: Infinity,
      ease: "linear"
    }
  })
};

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
      className="relative h-screen text-white"
    >
      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent-gold-light/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={{ duration: particle.duration, delay: particle.delay }}
          />
        ))}
      </div>

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
                  className="relative inline-block overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
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
                      className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-300 hover:border-accent-gold-light/50 hover:bg-white/10"
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
                      <span className="text-white/80 transition-colors duration-300 group-hover:text-primary-gold">
                        {feature}
                      </span>
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