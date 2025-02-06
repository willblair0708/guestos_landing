'use client';

import { useEffect } from 'react';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import Footer from '../components/Footer';
import PricingCard from './components/PricingCard';
import PricingHero from './components/PricingHero';

const pricingTiers = [
  {
    title: 'Core AI Concierge',
    price: '199',
    description: 'Perfect for businesses starting their AI journey',
    features: [
      { text: 'AI Concierge Service', included: true },
      { text: 'Custom AI Training', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Calendar Integration', included: false },
      { text: 'Payment Integration', included: false },
      { text: 'Priority Support', included: false },
      { text: 'Custom Development', included: false },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
  },
  {
    title: 'Professional',
    price: '499',
    description: 'Enhanced features for growing businesses',
    features: [
      { text: 'AI Concierge Service', included: true },
      { text: 'Custom AI Training', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Email Support', included: true },
      { text: 'Calendar Integration', included: true },
      { text: 'Payment Integration', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Development', included: false },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
    isPopular: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      { text: 'AI Concierge Service', included: true },
      { text: 'Custom AI Training', included: true },
      { text: 'Enterprise Analytics', included: true },
      { text: '24/7 Support', included: true },
      { text: 'Calendar Integration', included: true },
      { text: 'Payment Integration', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Development', included: true },
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};

const cardVariants = {
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

export default function PricingPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <motion.div
        key="pricing-page"
        className="min-h-screen w-screen overflow-hidden bg-black font-sans"
      >
        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <PricingHero isMobile={isMobile} />

          <motion.section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3"
            >
              {pricingTiers.map((tier) => (
                <motion.div key={tier.title} variants={cardVariants}>
                  <PricingCard {...tier} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.main>
      </motion.div>
      <Footer />
    </>
  );
}
