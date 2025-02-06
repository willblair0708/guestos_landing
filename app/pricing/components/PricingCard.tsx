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
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
  isPopular = false,
}: PricingCardProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex h-full flex-col rounded-2xl border ${
        isPopular
          ? 'border-accent-gold-light bg-accent-gold-light/10'
          : 'border-neutral-800 bg-neutral-900/50'
      } p-8 backdrop-blur-sm transition-all duration-500`}
    >
      {/* Popular Badge */}
      <div className="absolute left-0 right-0 -top-5 flex justify-center">
        {isPopular && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-full bg-accent-gold-light/20 blur-sm" />
              
              {/* Badge */}
              <div className="relative flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent-gold-light bg-accent-gold-light px-4 py-1.5">
                <span className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-white" />
                <span className="text-sm font-medium text-white">Most Popular</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 text-2xl font-medium text-white">{title}</h3>
        <p className="mb-6 text-base text-neutral-400">{description}</p>
        <div className="mb-6">
          {price === 'Custom' ? (
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-4xl font-bold text-transparent">
              Custom
            </span>
          ) : (
            <div className="flex items-baseline">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-4xl font-bold text-transparent">
                ${price}
              </span>
              <span className="ml-2 text-neutral-400">/month</span>
            </div>
          )}
        </div>
        <div className="h-px w-12 bg-gradient-to-r from-primary-gold to-transparent" />
      </div>

      <div className="mb-10 flex-grow">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="group relative flex items-start space-x-3"
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  feature.included
                    ? 'bg-accent-gold-light text-black'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {feature.included ? '✓' : '×'}
              </motion.span>
              <span
                className={`text-base ${
                  feature.included
                    ? 'text-white'
                    : 'text-neutral-500 line-through'
                }`}
              >
                {feature.text}
                {feature.isNew && (
                  <span className="ml-2 inline-flex items-center rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-2 py-0.5 text-xs text-primary-gold">
                    New
                  </span>
                )}
              </span>
              {/* Tooltip */}
              {feature.tooltip && hoveredFeature === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -top-2 z-10 w-48 -translate-y-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm text-neutral-400 shadow-xl"
                >
                  {feature.tooltip}
                  <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 border-b border-r border-neutral-800 bg-neutral-900" />
                </motion.div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <Link href={ctaHref} className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex w-full items-center justify-center space-x-2 overflow-hidden rounded-full ${
            isPopular
              ? 'border-accent-gold-medium bg-accent-gold-light text-black hover:bg-accent-gold-medium'
              : 'border border-accent-gold-light bg-accent-gold-light/10 text-primary-gold hover:border-accent-gold-medium hover:bg-accent-gold-light/20'
          } px-6 py-3.5 text-base transition-all duration-300`}
        >
          <div className="relative flex items-center justify-center gap-2">
            <span className="relative z-10">{ctaLabel}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={`relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 ${
                isPopular ? 'stroke-black' : 'stroke-primary-gold'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </motion.svg>
          </div>
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={false}
            animate={{
              background: [
                'linear-gradient(45deg, rgba(255,200,87,0.1) 0%, rgba(255,200,87,0) 100%)',
                'linear-gradient(45deg, rgba(255,200,87,0) 0%, rgba(255,200,87,0.1) 50%, rgba(255,200,87,0) 100%)',
                'linear-gradient(45deg, rgba(255,200,87,0) 0%, rgba(255,200,87,0.1) 100%)',
              ],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        </motion.button>
      </Link>
    </motion.div>
  );
} 