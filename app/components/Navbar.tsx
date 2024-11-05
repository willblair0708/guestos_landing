import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import GuestOSIcon from '@/public/assets/ui/GuestOSIcon';

import MobileMenu from './MobileMenu';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Platform', href: '/platform' },
  { text: 'About', href: '/about' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

interface NavbarProps {
  isFixed?: boolean;
}

export default function Navbar({ isFixed = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      initial='hidden'
      animate='visible'
      className={`${
        isFixed ? 'fixed backdrop-blur-md' : 'absolute'
      } left-0 right-0 z-50 flex w-full items-center justify-between px-4 py-6`}
    >
      <NavLogo />
      <DesktopMenu pathname={pathname} />
      <MobileMenuButton toggleMenu={toggleMenu} />
      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <MobileMenu
            pathname={pathname}
            toggleMenu={toggleMenu}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const NavLogo = memo(() => (
  <motion.div variants={navItemVariants} className='flex items-center'>
    <Link href='/' scroll={false}>
      <GuestOSIcon className='h-6 w-auto' />
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

const DesktopMenu = memo(({ pathname }: { pathname: string }) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    className='hidden items-center space-x-8 sm:flex sm:space-x-12'
  >
    {navItems.map((item) => (
      <NavItem key={item.text} item={item} pathname={pathname} />
    ))}
    <ContactButton />
  </motion.div>
));

DesktopMenu.displayName = 'DesktopMenu';

interface NavItemProps {
  item: {
    text: string;
    href: string;
  };
  pathname: string;
}

const NavItem = memo(({ item, pathname }: NavItemProps) => {
  const isActive = pathname === item.href;

  return (
    <motion.div className='relative' variants={navItemVariants}>
      <Link href={item.href} className='relative'>
        <span className='relative inline-block px-4 py-2 text-sm tracking-wide text-neutral-100 transition-colors duration-300 hover:text-primary-gold'>
          {item.text}
          <AnimatePresence>
            {isActive && (
              <motion.div
                layoutId='navbar-active'
                className='absolute inset-0 rounded-full bg-accent-gold-light'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </span>
      </Link>
      <motion.div
        className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent-gold-light to-transparent'
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
});

NavItem.displayName = 'NavItem';

const ContactButton = memo(() => (
  <motion.div variants={navItemVariants}>
    <Link href='/contact' scroll={false}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='group flex items-center space-x-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-5 py-2 text-sm backdrop-blur-sm transition-all hover:border-accent-gold-medium hover:bg-accent-gold-light/20'
      >
        <span className='font-book tracking-wide text-primary-gold'>
          Book Demo
        </span>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 stroke-primary-gold transition-transform duration-300 group-hover:translate-x-0.5'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
          />
        </motion.svg>
      </motion.button>
    </Link>
  </motion.div>
));

const MobileMenuButton = memo(({ toggleMenu }: { toggleMenu: () => void }) => (
  <motion.button
    variants={navItemVariants}
    className='flex items-center sm:hidden'
    onClick={toggleMenu}
    aria-label='Toggle mobile menu'
  >
    <div className='space-y-2'>
      <motion.div className='h-px w-8 bg-white/80' />
      <motion.div className='h-px w-6 bg-white/60' />
    </div>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
