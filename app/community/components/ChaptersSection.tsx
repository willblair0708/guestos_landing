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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function ChaptersSection() {
  return (
    <section className="relative px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-book text-gray-900 md:text-5xl"
          >
            Upcoming Chapters
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
          >
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-500">✓</span>
                <div>
                  <span className="font-medium text-gray-900">San Francisco, CA</span>
                  <span className="text-gray-600"> – September 10, 2025</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-500">✓</span>
                <div>
                  <span className="font-medium text-gray-900">Yosemite, CA</span>
                  <span className="text-gray-600"> – September 2025</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-500">✓</span>
                <div>
                  <span className="font-medium text-gray-900">Toronto</span>
                  <span className="text-gray-600"> – October 2025</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-500">✓</span>
                <div>
                  <span className="font-medium text-gray-900">Los Angeles, CA</span>
                  <span className="text-gray-600"> – November 2025</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-500">✓</span>
                <div>
                  <span className="font-medium text-gray-900">More cities on the way</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}