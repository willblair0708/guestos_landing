'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const partners = [
  {
    name: 'The Malibu Foundation',
    url: 'https://www.themalibufoundation.org/',
    description: 'Leading disaster response and community resilience initiatives in California.',
    logo: '/partners/malibu.png',
  },
  {
    name: 'Conversacorps / Aid Arena',
    url: 'https://conversacorps.org/aid_arena/',
    description: 'Pioneering innovative solutions for crisis communication and humanitarian aid.',
    logo: '/partners/conversacorps.webp',
  },
];

export default function PartnersSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
            >
              <span className="text-primary-gold">Trusted Partners</span>
            </motion.div>
            <h2 className="mb-6 text-3xl font-light text-white sm:text-4xl">
              Working Together for Better Crisis Response
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400">
              Empowering crisis response organizations and the public sector with AI hotlines that deliver critical information when it matters most.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid gap-8 sm:grid-cols-2"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold-light/50 hover:bg-neutral-900/80"
              >
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative flex flex-col items-center gap-6">
                    <div className="relative h-16 w-48">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-2 text-xl font-medium text-white group-hover:text-primary-gold">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-neutral-400 group-hover:text-neutral-300">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                </a>

                {/* Decorative Elements */}
                <div className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-primary-gold to-transparent" />
                <div className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-primary-gold to-transparent" />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-accent-gold-light bg-accent-gold-light/10 px-8 py-4 text-primary-gold transition-all duration-300 hover:border-accent-gold-light hover:bg-accent-gold-light/20"
              >
                <span className="relative z-10">Partner With Us</span>
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 