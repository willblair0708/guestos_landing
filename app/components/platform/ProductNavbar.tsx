import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { memo } from 'react';
import { FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

import { AnimatePresence, motion } from 'framer-motion';

interface ProductNavbarProps {
  currentProduct: string;
}

const products = ['Hospitality', 'Tourism', 'Education'];

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const ProductLink = memo(
  ({
    product,
    currentProduct,
    onClick,
  }: {
    product: string;
    currentProduct: string;
    onClick?: () => void;
  }) => {
    const isActive = useMemo(
      () => currentProduct === product,
      [currentProduct, product]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        const section = document.getElementById(
          `${product.toLowerCase()}-section`
        );
        if (section) {
          const navHeight = product.toLowerCase() === 'dynamo' ? 0 : 76;
          const sectionTop = section.offsetTop - navHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
        if (onClick) onClick();
      },
      [product, onClick]
    );

    return (
      <motion.div
        variants={navItemVariants}
        className='group relative'
        initial='hidden'
        animate='visible'
      >
        <Link
          href={`#${product.toLowerCase()}-section`}
          className={`flex items-center gap-3 rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-gold/5 hover:to-transparent ${
            isActive
              ? 'bg-gradient-to-r from-primary-gold/10 to-transparent text-primary-gold'
              : 'text-white/80'
          }`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <motion.span
            className={`flex h-6 w-6 items-center justify-center rounded-lg ${
              isActive
                ? 'bg-gradient-to-br from-primary-gold/90 to-accent-gold text-black shadow-lg'
                : 'bg-white/5'
            }`}
            initial={false}
            animate={{ scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isActive && <FiChevronRight className='h-3 w-3' />}
          </motion.span>
          <span className='text-sm font-medium tracking-wide'>{product}</span>
        </Link>
      </motion.div>
    );
  }
);

ProductLink.displayName = 'ProductLink';

function ProductNavbar({ currentProduct }: ProductNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='sticky top-0 z-50 w-full'
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-primary-gold/10 to-primary-gold/5' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-gold/10 via-transparent to-transparent' />

        <div className='max-w-9xl relative mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='flex items-center gap-3'
            >
              <div className='h-8 w-8 rounded-xl bg-gradient-to-br from-primary-gold via-primary-gold/80 to-accent-gold shadow-lg' />
              <div>
                <h2 className='text-lg font-medium tracking-tight text-white'>
                  GuestOS
                </h2>
                <p className='text-xs font-medium text-white/60'>
                  Platform Products
                </p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className='hidden items-center gap-6 md:flex'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {products.map((product) => (
                <ProductLink
                  key={product}
                  product={product}
                  currentProduct={currentProduct}
                />
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className='flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-lg md:hidden'
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <FiX className='h-5 w-5 text-white' />
              ) : (
                <FiMenu className='h-5 w-5 text-white' />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/10 bg-black p-4 backdrop-blur-xl md:hidden'
              >
                <div className='flex flex-col gap-2'>
                  {products.map((product) => (
                    <ProductLink
                      key={product}
                      product={product}
                      currentProduct={currentProduct}
                      onClick={closeMobileMenu}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(ProductNavbar);
