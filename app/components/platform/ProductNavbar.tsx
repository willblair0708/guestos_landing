import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

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
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const menuVariants = {
  open: {
    opacity: 1,
    height: 'auto',
    marginTop: 8,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
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
          const navHeight = product.toLowerCase() === 'dynamo' ? 0 : 90;
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
          className={`flex items-center transition-all duration-300 hover:text-primary-gold ${
            isActive ? 'text-primary-gold' : 'text-white/70'
          }`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className='flex items-center'>
            <motion.span
              className={`mr-2 h-1.5 w-1.5 rounded-full bg-primary-gold ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            {product}
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-primary-gold/80 to-transparent'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
    );
  }
);

ProductLink.displayName = 'ProductLink';

function ProductNavbar({ currentProduct }: ProductNavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='relative w-full bg-[#18181B]'
    >
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 to-transparent' />

      <div className='relative flex flex-col items-center justify-between p-4 sm:p-6'>
        <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent' />
        <div className='mt-4 flex w-full items-center justify-between sm:mt-6'>
          <motion.p
            variants={navItemVariants}
            className='font-light text-[12px] tracking-wide text-primary-gold/90 sm:text-[14px]'
          >
            GuestOS Products
          </motion.p>

          <div className='flex space-x-6 font-light text-[13px] tracking-wide text-white sm:space-x-10 sm:text-[14px]'>
            {products.map((product) => (
              <ProductLink
                key={product}
                product={product}
                currentProduct={currentProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(ProductNavbar);
