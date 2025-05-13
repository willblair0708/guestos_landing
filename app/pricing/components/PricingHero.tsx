import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import { useCheckout } from '../../hooks/useCheckout';

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
  { 
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'No hidden fees',
    description: 'Transparent pricing, always'
  },
  {
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    text: '1-year contracts',
    description: 'Predictable annual pricing'
  },
  {
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    text: 'Dedicated support',
    description: '24/7 expert assistance'
  }
];

export default function PricingHero({ isMobile }: PricingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { startCheckout, isLoading } = useCheckout();

  const handleGetStarted = () => {
    startCheckout({
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC || '',
    });
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative min-h-screen text-white"
    >
      {/* Enhanced Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,200,87,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,87,87,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,200,87,0.05),rgba(255,87,87,0.05),rgba(255,200,87,0.05))]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,200,87,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,200,87,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary-gold/30"
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

      <motion.div className="relative z-20 flex h-full flex-col">
        <Navbar isFixed={false} />
        
        <div className="relative grid min-h-[calc(100vh-80px)] grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`col-span-12 flex items-center ${
              isMobile ? 'justify-center pb-24' : ''
            }`}
          >
            <div className={`w-full space-y-12 ${isMobile ? 'text-center' : ''}`}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-8"
              >
                {/* Enhanced Badge */}
                <motion.div
                  variants={itemVariants}
                  className="relative inline-flex overflow-hidden rounded-full border border-primary-gold/20 bg-primary-gold/5 p-1 backdrop-blur-sm"
                >
                  <div className={`relative flex items-center gap-3 rounded-full bg-neutral-900/50 px-4 py-2 ${isMobile ? 'justify-center' : ''}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-gold opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-gold"></span>
                    </span>
                    <span className="text-primary-gold">
                      Choose Your Plan
                    </span>
                  </div>
                </motion.div>

                {/* Enhanced Title */}
                <div className="space-y-4">
                  <motion.h1
                    variants={itemVariants}
                    className={`text-hero font-book ${
                      isMobile ? 'text-4xl sm:text-5xl' : 'sm:text-6xl lg:text-7xl'
                    }`}
                  >
                    <span className="block font-light tracking-tight text-white">
                      Simple, transparent
                    </span>
                    <span className="mt-2 block bg-gradient-to-r from-primary-gold via-primary-gold to-white bg-clip-text font-light tracking-tight text-transparent">
                      pricing for all
                    </span>
                  </motion.h1>

                  <motion.div variants={itemVariants} className="mx-auto w-32">
                    <div className="h-px w-full bg-gradient-to-r from-primary-gold via-primary-gold to-transparent" />
                  </motion.div>
                </div>

                {/* Enhanced Description */}
                <motion.p
                  variants={itemVariants}
                  className={`font-light ${
                    isMobile ? 'mx-auto max-w-sm text-lg' : 'max-w-xl text-xl'
                  } leading-relaxed text-neutral-300`}
                >
                  Choose the perfect plan for your business needs. All plans include our
                  core AI technology and dedicated support.
                </motion.p>

                {/* Enhanced Features Grid */}
                <motion.div
                  variants={containerVariants}
                  className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-primary-gold/50 hover:bg-neutral-900/80"
                    >
                      {/* Hover gradient effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-gold/0 via-primary-gold/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        animate={{
                          x: ['0%', '100%'],
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />

                      <div className="relative space-y-3 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary-gold/20 bg-primary-gold/5">
                          <feature.icon className="h-5 w-5 text-primary-gold" />
                        </div>
                        <h3 className="text-lg font-medium text-white">{feature.text}</h3>
                        <p className="text-sm text-neutral-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced CTA */}
                <motion.div
                  variants={itemVariants}
                  className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetStarted}
                    disabled={isLoading}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-gold to-primary-gold px-8 py-4 text-white shadow-lg shadow-primary-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {isLoading ? 'Loading...' : 'Get Started Now'}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-gold via-white/10 to-primary-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-8 py-4 text-neutral-300 backdrop-blur-sm transition-all duration-300 hover:border-primary-gold/50 hover:bg-neutral-900/80 hover:text-white"
                  >
                    <span>Compare Plans</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
} 