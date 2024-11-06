import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';

// Constants
const FOOTER_LINKS = [
  {
    title: 'PRODUCTS',
    links: [
      { name: 'Hotels', href: '/products/hotels' },
      { name: 'Parks', href: '/products/parks' },
      { name: 'Reserves', href: '/products/reserves' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIAL_ICONS = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/guestos-ai',
    Icon: SocialIcons.LinkedInIcon,
  },
  // {
  //   name: 'youtube',
  //   href: 'https://www.youtube.com/guestos_ai',
  //   Icon: SocialIcons.YoutubeIcon,
  // },
  {
    name: 'twitter',
    href: 'https://twitter.com/guestos_ai',
    Icon: SocialIcons.TwitterIcon,
  },
  // {
  //   name: 'instagram',
  //   href: 'https://www.instagram.com/guestos_ai',
  //   Icon: SocialIcons.InstagramIcon,
  // },
];

// Enhanced animation variants
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 35,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const hoverScaleVariants = {
  hover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <motion.div variants={itemVariants} className='font-book'>
    <h3 className='mb-8 select-none text-xs font-medium tracking-[0.2em] text-gray-100'>
      {title}
      <motion.div
        className='mt-2 h-px w-12 bg-gradient-to-r from-accent-gold-light to-transparent'
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
      />
    </h3>
    <ul className='space-y-4'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className='group relative inline-flex items-center text-sm tracking-wide text-gray-400 transition-colors duration-300 hover:text-accent-gold-light'
          >
            <motion.div
              className='absolute -left-4 h-4 w-0.5 rounded-full bg-accent-gold-light/20'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SocialIcon = memo(({ icon }: { icon: (typeof SOCIAL_ICONS)[number] }) => (
  <Link
    href={icon.href}
    target='_blank'
    rel='noopener noreferrer'
    className='bg-surface-accent group relative rounded-full p-2.5 transition-all hover:bg-white/10'
  >
    <div className='absolute inset-0 rounded-full bg-accent-gold-light/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    <icon.Icon
      className='relative h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-accent-gold-light'
      color='currentColor'
    />
  </Link>
));

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      'https://app.loops.so/api/newsletter-form/cm2sddtg5037da0trsg1hhngw',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
        }),
      }
    );

    setEmail('');
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <motion.footer className='relative overflow-hidden bg-black/95 px-5 py-20 sm:px-8'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'
        >
          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <Link href='/' className='group inline-flex flex-col'>
              <span className='text-2xl font-book tracking-tight text-white'>
                Guest<span className='font-light'>OS</span>
              </span>
              <motion.div
                className='h-px w-0 bg-gradient-to-r from-accent-gold-light/40 to-transparent transition-all duration-300 group-hover:w-full'
                layoutId='logo-underline'
              />
            </Link>
            <p className='mt-6 max-w-sm text-sm leading-relaxed tracking-wide text-neutral-400'>
              Enhancing human connection through AI-powered hospitality
              experiences.
            </p>
          </motion.div>

          {FOOTER_LINKS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}

          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <h3 className='mb-6 text-xs font-medium tracking-[0.2em] text-white'>
              NEWSLETTER
              <motion.div
                className='mt-2 h-px w-12 bg-gradient-to-r from-accent-gold-light/40 to-transparent'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
            </h3>
            <form onSubmit={handleSubmit} className='group relative'>
              <AnimatePresence mode='wait'>
                {!showSuccess ? (
                  <motion.div className='relative'>
                    <input
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='h-11 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 text-sm text-white shadow-sm transition-all duration-300 placeholder:text-neutral-500 hover:border-accent-gold-light/30 focus:border-accent-gold-light/50 focus:outline-none focus:ring-1 focus:ring-accent-gold-light/20'
                    />
                    <AnimatePresence>
                      {email && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          type='submit'
                          className='absolute right-2 top-1.5 rounded-md bg-accent-gold-light/10 px-3 py-2 text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-accent-gold-light/20'
                        >
                          Subscribe
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={successVariants}
                    className='flex h-11 items-center rounded-lg border border-accent-gold-light/30 bg-accent-gold-light/5 px-4 text-sm text-accent-gold-light'
                  >
                    <span className='flex items-center'>
                      Thank you for subscribing
                      <motion.svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-2 h-4 w-4 text-accent-gold-light'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </motion.svg>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className='mt-16 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row'
        >
          <motion.div variants={itemVariants} className='flex space-x-3'>
            {SOCIAL_ICONS.map((icon) => (
              <SocialIcon key={icon.name} icon={icon} />
            ))}
          </motion.div>
          <motion.p
            variants={itemVariants}
            className='mt-6 text-xs tracking-wide text-gray-600 sm:mt-0'
          >
            &copy; {new Date().getFullYear()} GuestOS. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
