import { motion } from 'framer-motion';

const mediaItems = [
  {
    title: 'GuestOS: Powering AI Hotlines for Wildfire Relief',
    type: 'Press Release',
    date: 'January 2025',
  },
  {
    title: 'Malibu Housing Hotline',
    type: 'Initiative Launch',
    date: 'January 2025',
  },
  {
    title: 'Interview post-French Fire loss',
    type: 'CBS News',
    date: 'July 2024',
  },
  {
    title: 'Discussing wildfire experiences',
    type: 'All Things Wildfire Podcast',
    date: 'August 2024',
  },
  {
    title: 'Interview on home inventory app',
    type: 'CBS News',
    date: 'January 2025',
  },
];

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

export default function MediaSection() {
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
              In the Media
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            {/* Decorative corner gradients */}
            <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />

            <div className="relative space-y-6">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-accent-gold-light/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-gold">{item.type}</span>
                      <span className="text-sm text-neutral-500">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-light text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 