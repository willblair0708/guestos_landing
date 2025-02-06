import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
  isNew?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  isPopular?: boolean;
  isMobile?: boolean;
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const checkmarkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function PricingCard({
  title,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
  isPopular = false,
  isMobile = false,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-primary-gold/50 hover:bg-neutral-900/80 ${
        isPopular ? 'ring-2 ring-primary-gold/20' : ''
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -right-12 top-8 z-10 -rotate-45 bg-gradient-to-r from-primary-gold to-primary-gold px-12 py-1.5 text-center text-xs font-medium text-white shadow-sm">
          Most Popular
        </div>
      )}

      {/* Card Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-white">{title}</h3>
          {isPopular && (
            <div className="flex items-center gap-1.5 rounded-full bg-primary-gold/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold" />
              <span className="text-xs font-medium text-primary-gold">Popular Choice</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-medium text-white">${price}</span>
            <span className="text-sm text-neutral-400">/month</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">{description}</p>
        </div>
      </div>

      {/* Features List */}
      <div className="mb-8 flex-grow space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start gap-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mt-1 rounded-full bg-primary-gold/10 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-primary-gold"
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
            </motion.div>
            <span className="text-sm leading-relaxed text-neutral-300">{feature.text}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full overflow-hidden rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
          isPopular
            ? 'bg-gradient-to-r from-primary-gold to-primary-gold text-white shadow-lg shadow-primary-gold/20'
            : 'border border-neutral-700 bg-neutral-800 text-white shadow-sm hover:border-primary-gold/50 hover:bg-primary-gold/5'
        }`}
      >
        <span className="relative z-10">Get Started</span>
        {isPopular && (
          <motion.div
            className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-gold via-primary-gold to-primary-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            initial={false}
            animate={isHovered ? { x: ['0%', '100%'] } : { x: '0%' }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
} 