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

const stats = [
  {
    value: '24/7',
    label: 'Service Availability',
    description: 'Round-the-clock support for emergencies',
  },
  {
    value: '3',
    label: 'Crisis Hotlines',
    description: 'Dedicated lines for different needs',
  },
  {
    value: '100%',
    label: 'Free Access',
    description: 'No cost barrier to emergency help',
  },
  {
    value: '< 30s',
    label: 'Response Time',
    description: 'Quick connection to assistance',
  },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="text-primary-gold">Our Impact</span>
          </motion.div>
          <h2 className="mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl">
            Making a Real Difference
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Through our AI-powered hotlines, we're providing immediate assistance and connecting people with the resources they need during critical times.
          </p>
        </motion.div>

        <motion.dl
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-accent-gold-light/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent-gold-light/5 blur-2xl" />
              
              <dt className="flex flex-col">
                <span className="text-4xl font-light tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="mt-2 text-base font-medium text-primary-gold">
                  {stat.label}
                </span>
              </dt>
              <dd className="mt-3 text-sm text-neutral-400">
                {stat.description}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="text-lg italic text-neutral-400">
            "Every second counts in a crisis. Our AI technology ensures no one has to wait for critical information."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 