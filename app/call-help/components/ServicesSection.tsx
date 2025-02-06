import { motion } from 'framer-motion';

const services = [
  {
    title: 'Wildfire Relief Resource Hub',
    description: 'This 24/7 hotline connects people who want to donate with those who need it most. Every connection is verified, and we provide follow-up updates by text to keep you informed.',
    partner: 'malibu foundation',
    features: [
      'Real-time donation matching',
      'Verified recipient profiles',
      'SMS status updates',
      'Impact tracking',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Palisades Fire AI Info Line',
    description: 'This 24/7 AI info line provides real-time updates from CalFire, connects you to verified resources, and links you with professionals who can assist.',
    partner: 'join the aid arena community',
    features: [
      'Live CalFire updates',
      'Resource matching',
      'Professional assistance',
      'Multi-language support',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
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

export default function ServicesSection() {
  return (
    <section id="learn-more" className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
            Our Services
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent-gold-light/50 hover:bg-neutral-900/80"
            >
              {/* Service Image Placeholder */}
              <div className="relative mb-8 h-48 overflow-hidden rounded-xl border border-neutral-800">
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600">
                  Add service image here
                </div>
              </div>

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-gold-light bg-accent-gold-light/10 text-primary-gold">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-light text-white">{service.title}</h3>
                </div>

                <p className="text-lg leading-relaxed text-neutral-400">
                  {service.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
                  <span className="text-sm text-primary-gold">{service.partner}</span>
                </div>

                {/* Call Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 py-3 text-primary-gold transition-colors hover:bg-accent-gold-light/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 