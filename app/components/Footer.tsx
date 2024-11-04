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
      { name: 'HOTELS', href: '/products#hotels-section' },
      { name: 'PARKS', href: '/products#parks-section' },
      { name: 'RESERVES', href: '/products#reserves-section' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { name: 'ABOUT US', href: '/about' },
      { name: 'CAREERS', href: '/careers' },
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

// Animation variants
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      stiffness: 300,
      damping: 30,
      mass: 0.8,
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

// Components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <motion.div variants={itemVariants} className='font-oracle'>
    <h3 className='mb-2 select-none text-xs tracking-wider text-white/90'>
      {title}
    </h3>
    <ul className='space-y-2'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className='group flex items-center text-xs tracking-wider text-white/60 transition-all duration-300 hover:text-white'
          >
            <motion.span
              className='inline-block origin-left'
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
            </motion.span>
            <motion.div className='ml-2 h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-300 group-hover:w-8' />
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SocialIcon = memo(({ icon }: { icon: (typeof SOCIAL_ICONS)[number] }) => (
  <motion.div variants={itemVariants}>
    <Link
      href={icon.href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10'
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className='text-white/80 transition-colors duration-300 group-hover:text-white'
      >
        <icon.Icon color='currentColor' />
      </motion.div>
    </Link>
  </motion.div>
));

SocialIcon.displayName = 'SocialIcon';

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
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className='relative overflow-hidden bg-black'
    >
      <motion.div
        className='absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className='mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'
        >
          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <Link href='/' className='group inline-block'>
              <span className='text-2xl font-book tracking-tight text-white transition-all duration-300 group-hover:opacity-80'>
                Guest<span className='font-light tracking-tighter'>OS</span>
              </span>
              <motion.div className='mt-0.5 h-px w-0 bg-gradient-to-r from-white/80 to-transparent transition-all duration-300 group-hover:w-full' />
            </Link>
          </motion.div>

          {FOOTER_LINKS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}

          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <h3 className='mb-2 text-xs tracking-wider text-white/90'>
              JOIN OUR MAILING LIST
            </h3>
            <form onSubmit={handleSubmit} className='relative'>
              <AnimatePresence mode='wait'>
                {!showSuccess ? (
                  <motion.div variants={formVariants} className='relative'>
                    <input
                      type='email'
                      placeholder='Email Address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white backdrop-blur-sm transition-all duration-300 placeholder:text-white/40 hover:border-white/20 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30'
                    />
                    <AnimatePresence>
                      {email && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          type='submit'
                          className='absolute right-2 top-2 rounded-md bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20'
                        >
                          Subscribe
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={formVariants}
                    className='flex h-10 items-center rounded-lg border border-white/20 bg-white/5 px-4 text-sm text-white backdrop-blur-sm'
                  >
                    Thank you for subscribing
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className='mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row'
        >
          <motion.div variants={itemVariants} className='flex space-x-4'>
            {SOCIAL_ICONS.map((icon) => (
              <SocialIcon key={icon.name} icon={icon} />
            ))}
          </motion.div>
          <motion.p
            variants={itemVariants}
            className='mt-4 text-xs tracking-wider text-white/60 sm:mt-0'
          >
            &copy; 2024 GUESTOS
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
