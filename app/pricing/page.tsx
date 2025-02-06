'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

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
      { text: 'AI Concierge Hours (9am-5pm)', included: true, tooltip: 'Business hours only, Monday-Friday' },
      { text: 'AI Model Training (1 Model)', included: true, tooltip: 'Single AI model with basic training' },
      { text: 'Analytics Dashboard', included: true, tooltip: 'Basic metrics and monthly reports' },
      { text: 'Email Support (48h)', included: true, tooltip: 'Response within 48 business hours' },
      { text: 'Calendar Integration', included: false, tooltip: 'Not available in Core plan' },
      { text: 'Payment Processing', included: false, tooltip: 'Not available in Core plan' },
      { text: 'API Access', included: false, tooltip: 'Not available in Core plan' },
      { text: 'Custom Development', included: false, tooltip: 'Not available in Core plan' },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
  },
  {
    title: 'Professional',
    price: '499',
    description: 'Enhanced features for growing businesses',
    features: [
      { text: 'AI Concierge Hours (7am-9pm)', included: true, tooltip: 'Extended hours with weekend support', isNew: true },
      { text: 'AI Model Training (5 Models)', included: true, tooltip: 'Train up to 5 custom AI models', isNew: true },
      { text: 'Analytics Dashboard', included: true, tooltip: 'Advanced metrics with custom reports' },
      { text: 'Email Support (4h)', included: true, tooltip: 'Priority response within 4 hours' },
      { text: 'Calendar Integration', included: true, tooltip: 'Multi-platform calendar integration' },
      { text: 'Payment Processing', included: true, tooltip: 'Standard payment methods' },
      { text: 'API Access', included: true, tooltip: 'Basic API access' },
      { text: 'Custom Development', included: false, tooltip: 'Available in Enterprise plan only' },
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
      { text: 'AI Concierge Hours (24/7)', included: true, tooltip: '24/7 coverage with phone support', isNew: true },
      { text: 'AI Model Training (Unlimited)', included: true, tooltip: 'Unlimited AI models with custom fine-tuning' },
      { text: 'Analytics Dashboard', included: true, tooltip: 'Enterprise analytics suite' },
      { text: 'Email Support (Instant)', included: true, tooltip: 'Instant priority support with dedicated team' },
      { text: 'Calendar Integration', included: true, tooltip: 'Full calendar suite with custom integrations' },
      { text: 'Payment Processing', included: true, tooltip: 'Custom payment solutions' },
      { text: 'API Access', included: true, tooltip: 'Full API access with custom endpoints' },
      { text: 'Custom Development', included: true, tooltip: 'Dedicated development team' },
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
];

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, wire transfers, and ACH payments. Enterprise customers can also opt for custom billing arrangements.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
//   {
//     question: 'Do you offer a free trial?',
//     answer: 'Yes, we offer a 14-day free trial for all our plans. No credit card required to start.',
//   },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer email support for all plans, with priority support and 24/7 phone support available on higher tiers.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export default function PricingPage() {
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div
        ref={mainRef}
        key="pricing-page"
        className="relative min-h-screen w-full bg-gradient-to-b from-neutral-900 to-black font-sans"
      >
        {/* Refined background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,200,87,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,200,87,0.05)_1px,transparent_1px)] bg-[size:14px_14px] opacity-20" />
          
          {/* Soft accent gradients */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,200,87,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,87,87,0.1),transparent_50%)]" />
          </div>
          
          {/* Animated accent elements */}
          <motion.div
            className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary-gold/10 blur-[120px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        <motion.div
            className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent-gold-light/10 blur-[100px]"
            animate={{
              x: [0, -50, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <PricingHero isMobile={isMobile} />

          {/* Pricing Cards Section */}
          <motion.section className="relative z-10 px-4 pt-24 pb-32 sm:px-6 lg:px-8">
            {/* Section Title */}
            <motion.div
              variants={cardVariants}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-light text-white sm:text-4xl">
                Choose your plan
              </h2>
              <p className="text-lg text-neutral-300">
                All plans include our core AI technology. Upgrade or downgrade at any time.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
              variants={containerVariants}
              className="relative mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-12"
            >
              {pricingTiers.map((tier, index) => (
                <motion.div 
                  key={tier.title} 
                  variants={cardVariants}
                  className={`relative ${
                    tier.isPopular ? 'lg:-mt-6' : ''
                  }`}
                >
                  <PricingCard {...tier} />
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              variants={containerVariants}
              className="mx-auto mt-32 max-w-3xl"
            >
              <motion.div
                variants={cardVariants}
                className="mb-12 text-center"
              >
                <h2 className="mb-4 text-3xl font-light text-white">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="space-y-6"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-primary-gold/30 hover:bg-neutral-900/80"
                  >
                    <div className="relative p-6">
                      <h3 className="mb-4 text-lg font-medium text-white group-hover:text-primary-gold">
                        {faq.question}
                      </h3>
                      <p className="text-neutral-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Additional Info Section */}
            <motion.div 
              variants={containerVariants}
              className="mx-auto mt-32 max-w-3xl text-center"
            >
              <motion.div
                variants={cardVariants}
                className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm"
              >
                <h3 className="relative mb-6 text-2xl font-light text-white">
                  All plans include
                </h3>
                <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-primary-gold/30 hover:bg-neutral-900/80">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm text-neutral-300 group-hover:text-white">24/7 System Monitoring</span>
                  </div>
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-primary-gold/30 hover:bg-neutral-900/80">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm text-neutral-300 group-hover:text-white">99.9% Uptime SLA</span>
                  </div>
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-primary-gold/30 hover:bg-neutral-900/80">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm text-neutral-300 group-hover:text-white">Dedicated Support</span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Link */}
              <motion.div
                variants={cardVariants}
                className="mt-12 text-center"
              >
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 rounded-full border border-primary-gold bg-primary-gold/5 px-6 py-3 text-neutral-300 transition-all duration-300 hover:border-primary-gold hover:bg-primary-gold/10 hover:text-primary-gold"
                >
                  <span>Still have questions? Talk to our team</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
          </motion.main>
      </div>
      <Footer />
    </>
  );
}
