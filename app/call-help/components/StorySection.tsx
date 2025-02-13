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

const timelineItems = [
  {
    date: '2017',
    event: 'Atlas Fire',
    description: 'Lost first home, sparking the journey to help others.',
  },
  {
    date: '2024',
    event: 'French Fire',
    description: 'Second home lost, reinforcing the mission.',
  },
  {
    date: '2025',
    event: 'Call-Help Launch',
    description: 'Founded Call-Help to provide critical support during wildfires.',
  },
];

export default function StorySection() {
  return (
    <section className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
            >
              <span className="text-primary-gold">Our Journey</span>
            </motion.div>
            <h2 className="mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
              Turning Personal Loss Into Community Action
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 h-full w-px bg-neutral-800 lg:left-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.date}
                  variants={itemVariants}
                  className={`relative flex flex-col gap-8 lg:flex-row ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Date Circle */}
                  <div className="absolute left-8 top-0 -ml-[9px] h-[18px] w-[18px] rounded-full border-2 border-accent-gold-light bg-black lg:left-1/2">
                    <div className="absolute inset-0 animate-ping rounded-full bg-accent-gold-light/50" />
                  </div>

                  {/* Content */}
                  <div className="ml-16 lg:ml-0 lg:w-[calc(50%-2rem)]">
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
                      <div className="mb-4 flex items-center gap-4">
                        <span className="text-xl font-bold text-primary-gold">{item.date}</span>
                        <div className="h-px flex-grow bg-gradient-to-r from-primary-gold to-transparent" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium text-white">{item.event}</h3>
                      <p className="text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Story Content */}
            <motion.div
              variants={itemVariants}
              className="relative mt-16 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              {/* Image */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-xl border border-neutral-800">
                <img
                  src="/partners/atlas-2.jpeg"
                  alt="Atlas Fire aftermath"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative space-y-8">
                <p className="text-lg leading-relaxed text-neutral-400">
                  After losing two homes to the Atlas Fire in 2017 and the French Fire in 2024, I've been driven to turn personal loss into action. Motivated by the need for change, I've dedicated myself to educating others about wildfire preparedness and resilience while developing innovative solutions to help communities rebuild and adapt for a safer future.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="https://www.linkedin.com/in/jessiefischer/" target="_blank" rel="noopener noreferrer">
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
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 