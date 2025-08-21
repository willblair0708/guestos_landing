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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function ContentSection() {
  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Why We're Here */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl font-book text-gray-900 md:text-5xl">
              Why We're Here
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-2 text-xl font-medium text-gray-900">Inspire</h3>
                <p className="text-base text-gray-600">
                  With real stories, bold ideas, and honest conversations.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-2 text-xl font-medium text-gray-900">Connect</h3>
                <p className="text-base text-gray-600">
                  Across borders, brands, and backgrounds.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-2 text-xl font-medium text-gray-900">Collaborate</h3>
                <p className="text-base text-gray-600">
                  On solutions that keep hospitality human in a rapidly changing world.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Who Should Join */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl font-book text-gray-900 md:text-5xl">
              Who Should Join
            </h2>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-700">
                Hoteliers, tour operators, destination leaders, and experience makers who believe 
                technology should elevate, not replace, the human touch.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                If you want to shape the future of our industry while protecting what makes it 
                special, you belong here.
              </p>
              <div className="relative mt-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-gold/60 via-primary-gold/30 to-transparent" />
                <p className="pl-6 text-xl italic text-gray-800">
                  The next era of hospitality will not be written by one person or one company. 
                  It will be built by a community.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Join Us */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl font-book text-gray-900 md:text-5xl">
              Join Us
            </h2>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <p className="text-lg text-gray-700">
                Email{' '}
                <a
                  href="mailto:jessie@guestos.ai"
                  className="text-gray-900 font-medium underline decoration-gray-400 underline-offset-4 transition-all hover:text-gray-700 hover:decoration-gray-600"
                >
                  jessie@guestos.ai
                </a>{' '}
                with a short introduction about yourself and your work in hospitality or tourism.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}