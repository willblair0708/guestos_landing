import { motion } from 'framer-motion';
import Link from 'next/link';

interface PricingFeature {
  text: string;
  included: boolean;
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
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex h-full flex-col rounded-2xl border ${
        isPopular
          ? 'border-accent-gold-light bg-accent-gold-light/10'
          : 'border-neutral-800 bg-neutral-900/50'
      } p-8 backdrop-blur-sm transition-colors duration-300`}
    >
      {/* Popular Badge Container - Always present but only visible when isPopular is true */}
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
            <li key={index} className="flex items-start space-x-3">
              <span
                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  feature.included
                    ? 'bg-accent-gold-light text-black'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {feature.included ? '✓' : '×'}
              </span>
              <span
                className={`text-base ${
                  feature.included
                    ? 'text-white'
                    : 'text-neutral-500 line-through'
                }`}
              >
                {feature.text}
              </span>
            </li>
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
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>
      </Link>
    </motion.div>
  );
} 