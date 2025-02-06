import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import Navbar from '../../components/Navbar';

interface HeroSectionProps {
  isMobile?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
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

const stats = [
  { value: 24, unit: '7', label: 'Support Available', prefix: '/', suffix: '' },
  { value: 1000, label: 'People Helped', prefix: '', suffix: '+' },
  { value: 100, label: 'Verified Info', prefix: '', suffix: '%' },
];

export default function HeroSection({ isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen">
      <Navbar isFixed={false} />

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

      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,87,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.1),transparent_70%)]" />
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-neutral-900" />
        </div>
      </motion.div>

      <div className="relative grid min-h-[calc(100vh-80px)] grid-cols-12 gap-4 px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-12 flex flex-col items-center justify-center lg:col-span-7 lg:items-start"
        >
          {/* Title Badge */}
          <motion.div
            variants={itemVariants}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="text-primary-gold">Call-Help: Access Verified Info Anytime</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-center text-4xl font-light leading-tight text-white lg:text-left lg:text-7xl"
          >
            <span className="block">Critical Information,</span>
            <span className="relative mt-2 block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              When You Need It Most.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="group inline-flex items-center gap-3 rounded-full border border-accent-gold-light/20 bg-accent-gold-light/5 px-4 py-2">
              <span className="text-xl text-primary-gold">24/7 AI-Powered Phone Line</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-400 lg:text-left"
          >
            The Palisades Fire, which started on January 7, 2025, has become one of the most destructive fires in California history, leaving hundreds of thousands without homes, food, or shelter. In response, we've partnered with the Malibu Foundation and Aid Arena to provide verified information and critical resources to those in need — all accessible through a single phone call.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mb-12 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-2xl"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold-light/50 hover:bg-neutral-900/80"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent"
                  animate={{
                    x: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <div className="relative">
                  <div className="flex items-baseline text-2xl font-bold text-primary-gold">
                    <span>{stat.prefix}</span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border-2 border-accent-gold-light bg-accent-gold-light/10 px-8 py-4 text-primary-gold transition-all duration-300 hover:border-accent-gold-light hover:bg-accent-gold-light/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </motion.svg>
                  <span>Get Help Now</span>
                </span>
              </motion.button>
            </Link>
            <Link href="#learn-more">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-8 py-4 text-primary-gold transition-all duration-300 hover:border-accent-gold-light hover:bg-accent-gold-light/20"
              >
                <span>Learn More</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Image/Video Placeholder */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 hidden lg:col-span-5 lg:flex"
        >
          <div className="group relative h-[600px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
              Add hero image/video here
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 