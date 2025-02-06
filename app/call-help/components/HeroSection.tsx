import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function HeroSection({ isMobile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen">
      <Navbar isFixed={false} />

      <div className="relative grid min-h-[calc(100vh-80px)] grid-cols-12 gap-4 px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-12 flex flex-col items-center justify-center lg:col-span-8 lg:items-start"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-primary-gold" />
            <span className="text-primary-gold">Call-Help: Access Verified Info Anytime</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-center text-4xl font-light leading-tight text-white lg:text-left lg:text-6xl"
          >
            <span className="block">Critical Information,</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              When You Need It Most.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-8 text-center text-xl text-neutral-400 lg:text-left"
          >
            24/7 AI-Powered Phone Line
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-400 lg:text-left"
          >
            The Palisades Fire, which started on January 7, 2025, has become one of the most destructive fires in California history. In response, we've partnered with the Malibu Foundation and Aid Arena to provide verified information and critical resources to those in need — all accessible through a single phone call.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light px-8 py-3 text-black transition-colors hover:bg-accent-gold-medium"
              >
                <span>Get Help Now</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </motion.svg>
              </motion.button>
            </Link>
            <Link href="#learn-more">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-8 py-3 text-primary-gold transition-colors hover:bg-accent-gold-light/20"
              >
                <span>Learn More</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
      </div>
    </section>
  );
} 