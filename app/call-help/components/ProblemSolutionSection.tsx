import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="text-primary-gold">The Challenge</span>
          </motion.div>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Problem Side */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
          >
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-red-500/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-red-500/5 blur-3xl" />
            
            <div className="relative space-y-6">
              <h3 className="text-2xl font-light text-white">When Disaster Strikes</h3>
              <div className="h-px w-12 bg-gradient-to-r from-red-500/50 to-transparent" />
              <p className="text-lg leading-relaxed text-neutral-400">
                When the California wildfires broke out, people faced:
              </p>
              <ul className="space-y-4">
                {[
                  'Website error messages',
                  'Overloaded call centers',
                  'Out-of-date information',
                  'Scattered resources',
                  'Inaccessible help',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-sm text-red-500">
                      ✕
                    </span>
                    <span className="text-neutral-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-accent-gold-light/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
          >
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            
            <div className="relative space-y-6">
              <h3 className="text-2xl font-light text-white">We Built a Solution</h3>
              <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
              <p className="text-lg leading-relaxed text-neutral-400">
                At GuestOS, we leveraged our expertise to create:
              </p>
              <ul className="space-y-4">
                {[
                  'AI-powered voice technology',
                  'Three crisis-response hotlines',
                  'Immediate resource connection',
                  'Real-time information updates',
                  'Simple, accessible solutions',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent-gold-light/20 bg-accent-gold-light/10 text-sm text-primary-gold">
                      ✓
                    </span>
                    <span className="text-neutral-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-lg italic text-neutral-400">
                "This wasn't a pre-planned initiative. We built this because the need was immediate. And it worked."
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 