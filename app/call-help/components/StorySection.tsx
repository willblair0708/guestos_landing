import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function StorySection() {
  return (
    <section className="relative py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
              My Story
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            {/* Decorative corner gradients */}
            <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />

            <div className="relative space-y-8">
              <p className="text-lg leading-relaxed text-neutral-400">
                After losing two homes to the Atlas Fire in 2017 and the French Fire in 2024, I've been driven to turn personal loss into action. Motivated by the need for change, I've dedicated myself to educating others about wildfire preparedness and resilience while developing innovative solutions to help communities rebuild and adapt for a safer future.
              </p>

              <div className="flex items-center justify-center gap-4">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-6 py-2 text-primary-gold transition-colors hover:bg-accent-gold-light/20"
                  >
                    <span>Connect on LinkedIn</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 