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
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
          <span className="rounded-full bg-accent-gold-light px-3 py-1 text-sm font-medium text-black">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-medium text-white">{title}</h3>
        <p className="mb-4 text-neutral-400">{description}</p>
        <div className="mb-4">
          {price === 'Custom' ? (
            <span className="text-4xl font-bold text-white">Custom</span>
          ) : (
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-white">${price}</span>
              <span className="ml-2 text-neutral-400">/month</span>
            </div>
          )}
        </div>
      </div>
      <div className="mb-8 flex-grow">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span
                className={`mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full ${
                  feature.included
                    ? 'bg-accent-gold-light text-black'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {feature.included ? '✓' : '×'}
              </span>
              <span
                className={
                  feature.included ? 'text-white' : 'text-neutral-500 line-through'
                }
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
          className={`group flex w-full items-center justify-center space-x-2 rounded-full ${
            isPopular
              ? 'border-accent-gold-medium bg-accent-gold-light text-black hover:bg-accent-gold-medium'
              : 'border border-accent-gold-light bg-accent-gold-light/10 text-primary-gold hover:border-accent-gold-medium hover:bg-accent-gold-light/20'
          } px-6 py-3 text-base transition-all duration-300`}
        >
          <span>{ctaLabel}</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 ${
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
        </motion.button>
      </Link>
    </motion.div>
  );
} 