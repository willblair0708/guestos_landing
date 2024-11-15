import Link from 'next/link';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';
import GuestOSIcon from '@/public/assets/ui/GuestOSIcon';

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
  // {
  //   name: 'twitter',
  //   href: 'https://twitter.com/guestos_ai',
  //   Icon: SocialIcons.TwitterIcon,
  // },
  // {
  //   name: 'instagram',
  //   href: 'https://www.instagram.com/guestos_ai',
  //   Icon: SocialIcons.InstagramIcon,
  // },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: '-100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      duration: 0.4,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.08,
      delayChildren: 0.1,
      duration: 0.5,
    },
  },
};

const mobileItemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 350,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
    },
  },
};

interface MobileMenuProps {
  pathname: string;
  toggleMenu: () => void;
  navItems: readonly { text: string; href: string }[];
}

const MobileMenu = memo(
  ({ pathname, toggleMenu, navItems }: MobileMenuProps) => (
    <AnimatePresence>
      <motion.div
        initial='closed'
        animate='open'
        exit='closed'
        variants={mobileMenuVariants}
        className='to-black/98 fixed inset-0 z-50 flex h-[100vh] flex-col bg-gradient-to-b from-neutral-900/95 backdrop-blur-lg sm:hidden'
      >
        <motion.div
          className='relative h-20 w-full border-b border-primary-gold/10 bg-black/20 px-5 shadow-sm backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {/* <Link href="/">
            <motion.div
              className='absolute left-0 flex w-[85.5px] items-center pl-4'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GuestOSIcon
                size={70}
                className='mt-1 text-primary-gold'
                stroke='currentColor'
              />
            </motion.div>
          </Link> */}

          <motion.button
            onClick={toggleMenu}
            className='absolute right-4 top-[22px] rounded-full bg-primary-gold/5 p-2.5 text-primary-gold hover:bg-primary-gold/10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label='Close mobile menu'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 38 62'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='transition-colors duration-200'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M20.6643 31.0001L33.3947 18.2697L31.9805 16.8555L19.2501 29.5859L6.51968 16.8555L5.10547 18.2697L17.8359 31.0001L5.10547 43.7305L6.51968 45.1447L19.2501 32.4143L31.9805 45.1447L33.3947 43.7305L20.6643 31.0001Z'
                fill='currentColor'
              />
            </svg>
          </motion.button>
        </motion.div>

        <div className='flex w-full flex-1 justify-center overflow-y-auto bg-gradient-to-b from-black/50 to-primary-gold/5 py-8'>
          <motion.div
            className='flex w-full flex-col items-center gap-8 px-6'
            variants={{
              open: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            <motion.div
              className='flex w-full flex-col items-center gap-4'
              variants={{
                open: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              <div className='w-full space-y-2.5'>
                {navItems.map(({ text, href }) => (
                  <motion.div
                    key={text}
                    variants={mobileItemVariants}
                    className='w-full'
                  >
                    <Link
                      href={href}
                      onClick={toggleMenu}
                      className={`block w-full rounded-xl px-5 py-3.5 text-[15px] font-medium tracking-wide transition-all duration-200 ${
                        pathname === href
                          ? 'bg-primary-gold text-black shadow-sm shadow-primary-gold/20'
                          : 'text-neutral-100 hover:bg-primary-gold/10 hover:text-primary-gold'
                      }`}
                    >
                      {text}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={mobileItemVariants} className='w-full pt-2'>
                <Link
                  href='/contact'
                  onClick={toggleMenu}
                  className='group flex w-full items-center justify-center space-x-2 rounded-xl border border-primary-gold/20 bg-primary-gold/5 px-5 py-3.5 text-[15px] backdrop-blur-sm transition-all hover:border-primary-gold/30 hover:bg-primary-gold/10'
                >
                  <span className='font-medium tracking-wide text-primary-gold'>
                    Contact
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 stroke-primary-gold transition-transform duration-300 group-hover:translate-x-0.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={mobileItemVariants}
              className='mt-8 flex items-center gap-7'
            >
              {SOCIAL_ICONS.map(({ name, href, Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white transition-colors hover:text-primary-gold'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className='h-5 w-5 text-white' color='currentColor' />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
);

const MobileMenuItem = memo(
  ({
    item,
    pathname,
    toggleMenu,
  }: {
    item: { text: string; href: string };
    pathname: string;
    toggleMenu: () => void;
  }) => {
    const isActive = pathname === item.href;

    return (
      <motion.div variants={mobileItemVariants} whileHover={{ x: 10 }}>
        <Link
          href={item.href}
          onClick={toggleMenu}
          className={`font-oracle relative mb-[15px] block text-[32px] leading-[43.20px] tracking-[-0.36px] text-zinc-900 transition-opacity duration-200 ${
            isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          {item.text}
          {isActive && (
            <motion.div
              className='absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#18181B]'
              layoutId='activeIndicator'
            />
          )}
        </Link>
      </motion.div>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';
MobileMenuItem.displayName = 'MobileMenuItem';

export default MobileMenu;
