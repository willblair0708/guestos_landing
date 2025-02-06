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
      { text: 'AI Concierge Service', included: true, tooltip: '24/7 AI-powered customer service' },
      { text: 'Custom AI Training', included: true, tooltip: 'Train AI on your specific business needs' },
      { text: 'Basic Analytics', included: true, tooltip: 'Essential metrics and insights' },
      { text: 'Email Support', included: true, tooltip: 'Response within 24 hours' },
      { text: 'Calendar Integration', included: false, tooltip: 'Sync with popular calendar apps' },
      { text: 'Payment Integration', included: false, tooltip: 'Process payments seamlessly' },
      { text: 'Priority Support', included: false, tooltip: 'Get help within 2 hours' },
      { text: 'Custom Development', included: false, tooltip: 'Tailored solutions for your needs' },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
  },
  {
    title: 'Professional',
    price: '499',
    description: 'Enhanced features for growing businesses',
    features: [
      { text: 'AI Concierge Service', included: true, tooltip: '24/7 AI-powered customer service' },
      { text: 'Custom AI Training', included: true, tooltip: 'Train AI on your specific business needs' },
      { text: 'Advanced Analytics', included: true, tooltip: 'Detailed metrics and custom reports', isNew: true },
      { text: 'Priority Email Support', included: true, tooltip: 'Response within 4 hours' },
      { text: 'Calendar Integration', included: true, tooltip: 'Sync with popular calendar apps' },
      { text: 'Payment Integration', included: true, tooltip: 'Process payments seamlessly' },
      { text: 'Priority Support', included: true, tooltip: 'Get help within 2 hours' },
      { text: 'Custom Development', included: false, tooltip: 'Tailored solutions for your needs' },
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
      { text: 'AI Concierge Service', included: true, tooltip: '24/7 AI-powered customer service' },
      { text: 'Custom AI Training', included: true, tooltip: 'Train AI on your specific business needs' },
      { text: 'Enterprise Analytics', included: true, tooltip: 'Advanced analytics with custom integrations', isNew: true },
      { text: '24/7 Support', included: true, tooltip: 'Round-the-clock dedicated support' },
      { text: 'Calendar Integration', included: true, tooltip: 'Sync with popular calendar apps' },
      { text: 'Payment Integration', included: true, tooltip: 'Process payments seamlessly' },
      { text: 'Priority Support', included: true, tooltip: 'Get help within 1 hour' },
      { text: 'Custom Development', included: true, tooltip: 'Tailored solutions for your needs' },
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA', description: 'Enterprise-grade reliability' },
  { value: '24/7', label: 'Support', description: 'Round-the-clock assistance' },
  { value: '15min', label: 'Response Time', description: 'Average support response' },
  { value: '100%', label: 'Satisfaction', description: 'Customer happiness guaranteed' },
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
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a 14-day free trial for all our plans. No credit card required to start.',
  },
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
        className="relative min-h-screen w-full bg-black font-sans"
      >
        {/* Single consolidated background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/95 to-black" />
          
          {/* Accent gradients */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,200,87,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,87,87,0.1),transparent_50%)]" />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,200,87,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,200,87,0.05)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
          
          {/* Animated accent gradients */}
          <motion.div
            className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-accent-gold-light/10 blur-[120px]"
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
            className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-[100px]"
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
          <motion.div
            className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-accent-gold-light/5 blur-[150px]"
            animate={{
              x: [50, -50, 50],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
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

          {/* Stats Section */}
          <motion.section
            variants={cardVariants}
            className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <motion.div
                variants={cardVariants}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold-light/50 hover:bg-neutral-900/80"
                  >
                    {/* Hover gradient effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 0.1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    
                    {/* Corner gradients */}
                    <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent-gold-light/5 blur-2xl" />
                    <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-accent-gold-light/5 blur-2xl" />

                    <div className="relative">
                      <div className="mb-2 text-3xl font-bold text-primary-gold">{stat.value}</div>
                      <div className="mb-1 text-sm font-medium text-white">{stat.label}</div>
                      <div className="text-sm text-neutral-400">{stat.description}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Pricing Cards Section */}
          <motion.section className="relative z-10 px-4 pt-24 pb-32 sm:px-6 lg:px-8">
            {/* Section Title */}
            <motion.div
              variants={cardVariants}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
                Choose your plan
              </h2>
              <p className="text-lg text-neutral-400">
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

            {/* FAQ Section with Enhanced Design */}
            <motion.div 
              variants={containerVariants}
              className="mx-auto mt-32 max-w-3xl"
            >
              <motion.div
                variants={cardVariants}
                className="mb-12 text-center"
              >
                <h2 className="mb-4 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent">
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
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold-light/50"
                  >
                    {/* Hover gradient effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 0.1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    
                    <div className="relative p-6">
                      <h3 className="mb-4 text-lg font-medium text-white group-hover:text-primary-gold">
                        {faq.question}
                      </h3>
                      <p className="text-neutral-400">
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
                className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm"
              >
                {/* Corner gradients */}
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl" />

                <h3 className="relative mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-2xl font-light text-transparent">
                  All plans include
                </h3>
                <div className="relative grid gap-6 text-neutral-400 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-accent-gold-light/50">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm group-hover:text-white">24/7 System Monitoring</span>
                  </div>
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-accent-gold-light/50">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm group-hover:text-white">99.9% Uptime SLA</span>
                  </div>
                  <div className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-accent-gold-light/50">
                    <span className="text-xl text-primary-gold">✓</span>
                    <span className="text-sm group-hover:text-white">Dedicated Support</span>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Link */}
              <motion.div
                variants={cardVariants}
                className="mt-12 text-center"
              >
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-6 py-3 text-neutral-400 transition-all duration-300 hover:border-accent-gold-light/50 hover:bg-accent-gold-light/20 hover:text-primary-gold"
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
