import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface Feature {
  text: string;
}

interface NumberedFeature {
  number: string;
  title: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  partner: string;
  status: string;
  phoneNumber?: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  features: Feature[] | NumberedFeature[];
  icon: (props: any) => ReactNode;
}

const services: Service[] = [
  {
    title: 'Malibu Housing Hotline',
    description: 'Call 424-484-2372 for 24/7 assistance with finding immediate housing solutions during the Palisades Fire crisis. Get matched with verified temporary and long-term rental options.',
    partner: 'malibu foundation',
    status: 'Active 24/7',
    phoneNumber: '424-484-2372',
    testimonial: {
      quote: "The hotline connected me with a real estate professional who had an available rental within hours. It was such a relief to find help so quickly.",
      author: "Housing Support Caller",
      role: "Wildfire Evacuee"
    },
    features: [
      {
        number: '1',
        title: 'IMMEDIATE MATCHING',
        description: 'Get matched with available rentals instantly'
      },
      {
        number: '2',
        title: 'VERIFIED LISTINGS',
        description: 'Access on-market and off-market properties'
      },
      {
        number: '3',
        title: 'EXPERT SUPPORT',
        description: 'Speak directly with real estate professionals'
      },
      {
        number: '4',
        title: '24/7 AVAILABILITY',
        description: 'Get help any time, day or night'
      }
    ],
    icon: (props: any) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        {...props}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
        />
      </svg>
    ),
  },
  {
    title: 'Wildfire Relief Resource Hub',
    description: 'This hotline connects helpers directly with those in need during the Palisades Fire relief effort. Call 831-480-5016 for 24/7 assistance with donations, housing, and animal support.',
    partner: 'malibu foundation',
    status: 'Active 24/7',
    phoneNumber: '831-480-5016',
    testimonial: {
      quote: "Thank you for making it so easy to get the information and solutions I needed. It's just been too much to even try to look.",
      author: "Housing Support Caller",
      role: "Evacuee"
    },
    features: [
      {
        number: '1',
        title: 'DONATE ITEMS',
        description: 'Donate essential items to those in need'
      },
      {
        number: '2',
        title: 'PICK UP ITEMS',
        description: 'Arrange pickup of donated items'
      },
      {
        number: '3',
        title: 'ACCESS HOUSING',
        description: 'Find temporary housing solutions'
      },
      {
        number: '4',
        title: 'ASSIST ANIMALS',
        description: 'Help with animal evacuation and care'
      }
    ],
    icon: (props: any) => (
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        {...props}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </motion.svg>
    ),
  },
  {
    title: 'Palisades Fire Information Phone Line',
    description: 'Call 831-230-2682 for 24/7 information. Our AI-powered phone line provides real-time updates, connects you to verified resources, and helps you get the information you need.',
    partner: 'join the aid arena community',
    status: 'Active 24/7',
    phoneNumber: '831-230-2682',
    testimonial: {
      quote: "I didn't even realize I was talking to an AI—it felt like a real person helping me.",
      author: "Information Line Caller",
      role: "Resident"
    },
    features: [
      {
        number: '1',
        title: 'EVACUATION ZONES',
        description: 'Check your zone and get updates'
      },
      {
        number: '2',
        title: 'SHELTER LOCATIONS',
        description: 'Locate shelters for people and animals nearby'
      },
      {
        number: '3',
        title: 'FREE RESOURCES',
        description: 'Food, supplies, and distribution hubs'
      },
      {
        number: '4',
        title: 'HOW IT WORKS',
        description: 'Call to get info, share updates, or ask questions'
      }
    ],
    icon: (props: any) => (
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        {...props}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </motion.svg>
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

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, 15, -15, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        duration: 2,
      }
    }
  }
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="learn-more" className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="text-primary-gold">Our Services</span>
          </motion.div>
          <h2 className="mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
            Emergency Response Solutions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent-gold-light/50 hover:bg-neutral-900/80"
            >
              {/* Status Badge */}
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-accent-gold-light/20 bg-accent-gold-light/5 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-gold opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-gold"></span>
                </span>
                <span className="text-sm text-primary-gold">{service.status}</span>
              </div>

              {/* Service Image Placeholder */}
              <div className="relative mb-6 h-36 overflow-hidden rounded-xl border border-neutral-800 transition-all duration-300 group-hover:border-accent-gold-light/30">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent"
                  animate={{
                    x: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                  {/* Add service image here */}
                </div>
              </div>

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-gold-light bg-accent-gold-light/10 text-primary-gold"
                    variants={iconVariants}
                  >
                    <service.icon />
                  </motion.div>
                  <h3 className="text-xl font-light text-white">{service.title}</h3>
                </div>

                <p className="text-base leading-relaxed text-neutral-400">
                  {service.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className={`flex items-center gap-4 rounded-lg border border-neutral-800 p-4 transition-all duration-300 hover:border-accent-gold-light/30
                        ${idx === 0 ? 'bg-[#F6D77C]/10' : ''}
                        ${idx === 1 ? 'bg-[#C1E6D7]/10' : ''}
                        ${idx === 2 ? 'bg-[#F8D3C5]/10' : ''}
                        ${idx === 3 ? 'bg-[#D3E3F8]/10' : ''}
                      `}
                    >
                      {'number' in feature ? (
                        <>
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-xl font-bold text-primary-gold">
                            {(feature as NumberedFeature).number}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-white">{(feature as NumberedFeature).title}</div>
                            <div className="text-sm text-neutral-400">{(feature as NumberedFeature).description}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 + idx * 0.1 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                          <span className="text-sm text-neutral-300">{(feature as Feature).text}</span>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>

                {service.phoneNumber && (
                  <div className="mt-6 rounded-xl border border-accent-gold-light bg-accent-gold-light/5 p-4 text-center">
                    <div className="mb-2 text-sm text-neutral-400">Call for 24/7 Information</div>
                    <div className="text-2xl font-bold text-primary-gold">{service.phoneNumber}</div>
                  </div>
                )}

                {/* Testimonial */}
                <motion.div 
                  className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-gold opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <div className="h-px flex-grow bg-gradient-to-r from-primary-gold to-transparent" />
                  </div>
                  <p className="mb-4 text-sm italic text-neutral-400">{service.testimonial.quote}</p>
                  <div className="flex items-center justify-end gap-2 text-sm">
                    <span className="font-medium text-primary-gold">{service.testimonial.author}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-neutral-400">{service.testimonial.role}</span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-2">
                  <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
                  <span className="text-sm text-primary-gold">{service.partner}</span>
                </div>

                {/* Call Button */}
                <motion.a
                  href={`tel:${service.phoneNumber}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 py-3 text-primary-gold transition-colors hover:bg-accent-gold-light/20"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </motion.svg>
                  <span>Call Now</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 