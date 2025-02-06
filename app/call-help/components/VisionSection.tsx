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

export default function VisionSection() {
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
            <span className="text-primary-gold">Our Vision</span>
          </motion.div>
          <h2 className="mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl">
            From Crisis to Innovation
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            How a personal experience during the California wildfires led to a new way of handling crisis communication.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Founder's Story */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-accent-gold-light/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
          >
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            
            <div className="relative space-y-6">
              <h3 className="text-2xl font-light text-white">The Story Behind GuestOS</h3>
              <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
              <div className="space-y-4 text-neutral-300">
                <p>
                  When the Palisades Fire broke out, I witnessed firsthand the chaos and confusion that ensues during a crisis. People were desperately seeking information, but existing systems were overwhelmed.
                </p>
                <p>
                  As someone with experience in AI and technology, I knew we could do better. We built our first AI-powered hotline in just days, providing immediate, accurate information to those who needed it most.
                </p>
                <p>
                  What started as an emergency response has grown into something much bigger. We've proven that AI can be a powerful tool for crisis communication, helping communities stay informed and connected when it matters most.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-accent-gold-light/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
          >
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            
            <div className="relative space-y-6">
              <h3 className="text-2xl font-light text-white">Looking Ahead</h3>
              <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
              <div className="space-y-4">
                <div className="rounded-xl border border-accent-gold-light/20 bg-accent-gold-light/5 p-4">
                  <h4 className="font-medium text-primary-gold">Expanding Our Reach</h4>
                  <p className="mt-2 text-neutral-300">
                    We're scaling our technology to serve more communities, making crisis communication accessible to everyone.
                  </p>
                </div>
                <div className="rounded-xl border border-accent-gold-light/20 bg-accent-gold-light/5 p-4">
                  <h4 className="font-medium text-primary-gold">Enhanced AI Capabilities</h4>
                  <p className="mt-2 text-neutral-300">
                    Developing more sophisticated AI models to handle complex emergency scenarios and provide even more accurate, contextual information.
                  </p>
                </div>
                <div className="rounded-xl border border-accent-gold-light/20 bg-accent-gold-light/5 p-4">
                  <h4 className="font-medium text-primary-gold">Community Integration</h4>
                  <p className="mt-2 text-neutral-300">
                    Building partnerships with local emergency services and community organizations to create a more connected crisis response network.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="text-lg italic text-neutral-400">
            "Our vision is to ensure that no one feels alone or uninformed during a crisis. Technology should bring communities together, especially when they need it most."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 