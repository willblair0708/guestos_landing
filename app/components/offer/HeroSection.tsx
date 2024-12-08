import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring as useFramerSpring, useScroll, useTransform } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
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
          src='/assets/about/about_header.webp'
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

const PreviewImage = () => (
  <div className="relative mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
    <Image
      src="/assets/concierge-preview.png"
      alt="AI Concierge Preview"
      width={300}
      height={600}
      className="w-full"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
);

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const ySpring = useFramerSpring(y, { stiffness: 120, damping: 25, restDelta: 0.001 });

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
    // TODO: Implement Stripe integration and Calendly redirect
  };

  const features = [
    { 
      icon: '🎁', 
      text: 'Personalized AI Concierge',
      description: 'Custom-built for your property'
    },
    { 
      icon: '📱', 
      text: 'Dedicated Phone Line',
      description: 'For calls and text messages'
    },
    { 
      icon: '💬', 
      text: 'Conversation Dashboard',
      description: 'View transcripts and analytics'
    },
    { 
      icon: '📚', 
      text: 'Knowledge Base',
      description: 'Easy updates and management'
    }
  ];

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

      <motion.div
        className='relative z-20 flex h-full flex-col'
        style={{ opacity, scale, y: ySpring }}
      >
        <Navbar isFixed={false} />

        <div className='relative grid h-full grid-cols-12 gap-12 px-6 py-16 sm:px-8 lg:px-12 mt-20'>
          <motion.div
            ref={inViewRef}
            className='col-span-12 lg:col-span-6'
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8 }}
          >
            <div className='space-y-10'>
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

              <div className='space-y-6'>
                <motion.h1
                  className='text-5xl font-light leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className='bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent'>
                    Give Your Guests
                    <br />
                    The Gift of AI 🎄
                  </span>
                  <div className='mt-4 text-3xl sm:text-4xl lg:text-5xl'>
                    <span className='bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent'>
                      $50/month for 3 months
                    </span>
                  </div>
                </motion.h1>

                <motion.div
                  className='space-y-8'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
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

                  <div className='relative inline-block rounded-xl border border-white/10 bg-gradient-to-r from-red-500/5 to-green-500/5 p-5 backdrop-blur-sm'>
                    <div className='space-y-2'>
                      <p className='text-sm leading-relaxed text-white/80'>
                        🎄 Special holiday offer valid until December 31, 2024
                      </p>
                      <p className='text-sm leading-relaxed text-white/60'>
                        Discounted period begins after your AI Concierge is built and activated
                      </p>
                    </div>
                    <motion.div
                      className='absolute -right-2 -top-2 text-xl'
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐️
                    </motion.div>
                  </div>

                  <PreviewImage />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='col-span-12 lg:col-span-6'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className='relative'>
              <form 
                onSubmit={handleSubmit} 
                className='relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.1)]'
              >
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
                      placeholder='Tell us about your property and goals...'
                    />
                  </div>

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

                  <div className='space-y-2 text-center'>
                    <p className='text-sm text-white/40'>
                      No credit card required to start
                    </p>
                    <p className='text-xs text-white/40'>
                      After signup, you'll be directed to schedule your concierge setup
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
