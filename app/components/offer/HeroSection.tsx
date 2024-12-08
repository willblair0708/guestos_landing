import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring as useFramerSpring, useScroll, useTransform } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../Navbar';
import useIsMobile from '@/hooks/use-is-mobile';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

interface Feature {
  icon: string;
  text: string;
  description: string;
}

const SnowflakeParticle = () => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 10 + Math.random() * 20;
  const randomSize = 2 + Math.random() * 4;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute text-white/20"
      initial={{ x: `${randomX}vw`, y: -20, rotate: 0, scale: 0 }}
      animate={{ y: '100vh', rotate: randomRotation, scale: 1 }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        width: randomSize,
        height: randomSize,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)'
      }}
    />
  );
};

const SnowEffect = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <SnowflakeParticle key={i} />
    ))}
  </div>
);

const Background = () => {
  return (
    <motion.div
      className='absolute inset-0 z-0'
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.div className='absolute inset-0'>
        <Image
          src='/assets/offer/offer_header.jpg'
          alt='About GuestOS'
          fill
          priority
          quality={100}
          className='h-full w-full object-cover'
          sizes='100vw'
        />
        <motion.div
          className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Holiday-themed overlays */}
      <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.02] mix-blend-overlay' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.1),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.1),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_90%)]' />
    </motion.div>
  );
};

const HolidayBadge = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
);

const imageVariants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.2, 0.1, 0.3, 1],
    },
  },
};

const PlatformPreview = () => (
  <motion.div
    variants={imageVariants}
    className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-[1px] sm:rounded-[2rem]'
  >
    <div className='absolute inset-0'>
      <div className='absolute inset-0 bg-gradient-to-r from-red-500/25 via-white/15 to-green-500/25 opacity-60 blur-3xl transition-all duration-700 group-hover:opacity-90 group-hover:blur-[100px]' />
    </div>

    <div className='relative grid grid-cols-2 gap-4 overflow-hidden rounded-[2rem] p-4'>
      <div className='relative aspect-[9/16] overflow-hidden rounded-xl'>
        <Image
          src='/assets/concierge-mobile.png'
          alt='AI Concierge Mobile Interface'
          fill
          className='object-cover transition-all duration-1000 will-change-transform group-hover:scale-110'
          quality={100}
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
      </div>
      <div className='relative aspect-video overflow-hidden rounded-xl'>
        <Image
          src='/assets/concierge-dashboard.png'
          alt='AI Concierge Dashboard'
          fill
          className='object-cover transition-all duration-1000 will-change-transform group-hover:scale-110'
          quality={100}
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
      </div>
    </div>
  </motion.div>
);

const SuccessRedirect = () => {
  useEffect(() => {
    // After successful payment, redirect to Calendly
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
    window.location.href = calendlyUrl!;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Payment Successful!</h1>
        <p>Redirecting you to schedule your concierge setup...</p>
      </div>
    </div>
  );
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features: Feature[] = [
    { 
      icon: '🎁', 
      text: 'Personalized AI Concierge',
      description: 'Custom-built and trained specifically for your property'
    },
    { 
      icon: '📱', 
      text: 'Dedicated Guest Line',
      description: 'Exclusive phone number for guest calls and text messages'
    },
    { 
      icon: '💬', 
      text: 'Core Dashboard Access',
      description: 'View all conversation transcripts and monitor interactions'
    },
    { 
      icon: '📚', 
      text: 'Knowledge Base Control',
      description: 'Full control to update and maintain your property information'
    },
    { 
      icon: '⚡', 
      text: 'Future-Ready',
      description: 'Option to add advanced capabilities as your needs grow'
    }
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyWebsite: '',
    email: '',
    phone: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          successUrl: `${window.location.origin}/success`, // Will render SuccessRedirect
          cancelUrl: `${window.location.origin}/offer`,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background />
      <SnowEffect />

      <motion.div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />

        <div className='container mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12'>
          <div className='mb-12'>
            <motion.div
              className='inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-gradient-to-r from-red-500/10 to-green-500/10 px-6 py-2.5 backdrop-blur-sm'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className='h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-green-500 animate-pulse' />
              <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text font-light tracking-wider text-transparent'>
                HOLIDAY SPECIAL
              </span>
            </motion.div>

            <motion.h1
              className='mt-6 text-5xl font-light leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className='bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent'>
                Transform Your
                <br />
                Guest Experience
              </span>
              <div className='mt-4 space-y-2'>
                <span className='bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent block text-3xl sm:text-4xl lg:text-5xl'>
                  $50/month for 3 months
                </span>
                <span className='text-white/60 text-lg'>
                  Lock in this special rate today
                </span>
              </div>
            </motion.h1>
          </div>

          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
            {/* Left Column - Package Details */}
            <div className='space-y-8'>
              <div className='space-y-6'>
                <h2 className='text-2xl font-light'>Your Holiday Package Includes:</h2>
                <ul className='space-y-4'>
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className='flex items-start gap-4 rounded-lg border border-white/5 bg-white/5 p-4 backdrop-blur-sm'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <span className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500/10 to-green-500/10 text-xl'>
                        {feature.icon}
                      </span>
                      <div>
                        <span className='block text-lg text-white/90'>{feature.text}</span>
                        <span className='text-sm text-white/60'>{feature.description}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className='space-y-4'>
                <div className='relative rounded-xl border border-white/10 bg-gradient-to-r from-red-500/5 to-green-500/5 p-5 backdrop-blur-sm'>
                  <h3 className='text-lg font-medium mb-3'>Offer Terms:</h3>
                  <div className='space-y-2'>
                    <p className='text-sm leading-relaxed text-white/80'>
                      🎄 Special holiday offer valid until December 31, 2024
                    </p>
                    <p className='text-sm leading-relaxed text-white/60'>
                      • Discounted period begins after your AI Concierge is built and activated
                    </p>
                    <p className='text-sm leading-relaxed text-white/60'>
                      • Rate locks in at $50/month for the first 3 months
                    </p>
                    <p className='text-sm leading-relaxed text-white/60'>
                      • Setup appointment scheduled immediately after signup
                    </p>
                  </div>
                </div>

                <PlatformPreview />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className='relative'>
              <HolidayBadge />
              <form onSubmit={handleSubmit} className='relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.1)]'>
                <div className='absolute inset-0 bg-gradient-to-br from-red-500/5 to-green-500/5' />
                <div className='relative space-y-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    {[
                      { name: 'firstName', label: 'First Name', type: 'text', required: true },
                      { name: 'lastName', label: 'Last Name', type: 'text', required: true }
                    ].map((field) => (
                      <div key={field.name}>
                        <label className='block text-sm font-light text-white/80'>{field.label}*</label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className='mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-sm transition-all focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50'
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { name: 'companyName', label: 'Company Name', type: 'text', required: true },
                    { name: 'companyWebsite', label: 'Company Website', type: 'url', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', required: false }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className='block text-sm font-light text-white/80'>
                        {field.label}{field.required && '*'}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className='mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-sm transition-all focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50'
                      />
                    </div>
                  ))}

                  <div>
                    <label className='block text-sm font-light text-white/80'>Property Description</label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className='mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-sm transition-all focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50'
                      placeholder='Tell us about your property and goals for using the concierge...'
                    />
                  </div>

                  <div className='space-y-2 text-center'>
                    <motion.button
                      type='submit'
                      className='group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-green-500 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className='relative z-10 font-medium'>Claim Your Holiday Offer</span>
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent'
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>

                    <div className='space-y-2 pt-4 border-t border-white/10'>
                      <p className='text-sm text-white/40'>
                        No credit card required to start
                      </p>
                      <p className='text-xs text-white/40'>
                        After payment, you'll be directed to schedule your concierge setup via Calendly
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
