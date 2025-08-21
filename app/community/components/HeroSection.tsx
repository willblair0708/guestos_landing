'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const glowAnimation = {
  animate: {
    opacity: [
      1,
      0.7,
      1,
    ],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

interface HeroSectionProps {
  isMobile?: boolean;
}

export default function HeroSection({ isMobile }: HeroSectionProps) {
  return (
    <section className="relative px-6 pt-32 pb-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-left"
        >
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-5xl font-book tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
        >
          Next Chapter
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-xl font-light text-gray-600 md:text-2xl lg:text-3xl"
        >
          A GuestOS Community
        </motion.p>
        
        <motion.div
          variants={fadeInUp}
          className="relative max-w-3xl"
        >
          <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-primary-gold/60 via-primary-gold/30 to-transparent" />
          <div className="space-y-3 italic text-gray-700">
            <p className="text-base leading-relaxed md:text-lg">
              Hospitality has always been about people.
            </p>
            <p className="text-base leading-relaxed md:text-lg">
              I grew up in hotels near Yosemite, where I learned what it means to welcome guests, solve problems, and create moments they never forget.
            </p>
            <p className="text-base leading-relaxed md:text-lg">
              The GuestOS Community exists to carry that spirit forward, bridging the traditions that make hospitality timeless with the tools that will define its future.
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="mt-8">
          <a
            href="mailto:jessie@guestos.ai?subject=Interested in GuestOS Community"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
          >
            Join the Community
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}