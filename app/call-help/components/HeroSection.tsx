import Image from 'next/image';
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

      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-neutral-900" /> {/* Placeholder until image is added */}
          {/* Add actual image here */}
          {/* <Image
            src="/assets/call-help/hero-bg.jpg"
            alt="Wildfire background"
            fill
            className="object-cover"
            priority
          /> */}
        </div>
      </div>

      <div className="relative grid min-h-[calc(100vh-80px)] grid-cols-12 gap-4 px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-12 flex flex-col items-center justify-center lg:col-span-7 lg:items-start"
        >
          {/* Emergency Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-500/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-red-500" />
            <span className="text-red-500">Emergency Response Active</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-center text-4xl font-light leading-tight text-white lg:text-left lg:text-7xl"
          >
            <span className="block">Critical Information,</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              When You Need It Most.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-accent-gold-light/20 bg-accent-gold-light/5 px-4 py-2">
              <span className="text-xl text-primary-gold">24/7 AI-Powered Phone Line</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-400 lg:text-left"
          >
            The Palisades Fire, which started on January 7, 2025, has become one of the most destructive fires in California history. In response, we've partnered with the Malibu Foundation and Aid Arena to provide verified information and critical resources to those in need — all accessible through a single phone call.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mb-12 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-2xl"
          >
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-gold">24/7</div>
              <div className="text-sm text-neutral-400">Support Available</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-gold">1000+</div>
              <div className="text-sm text-neutral-400">People Helped</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-gold">100%</div>
              <div className="text-sm text-neutral-400">Verified Info</div>
            </div>
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
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border-2 border-red-500 bg-red-500 px-8 py-4 text-white transition-colors hover:bg-red-600"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Get Help Now</span>
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </Link>
            <Link href="#learn-more">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-8 py-4 text-primary-gold transition-colors hover:bg-accent-gold-light/20"
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

        {/* Right Side Image/Video Placeholder */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 hidden lg:col-span-5 lg:flex"
        >
          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
              Add hero image/video here
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 