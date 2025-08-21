'use client';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ChaptersSection from './components/ChaptersSection';

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

export default function CommunityPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <motion.div
        key="community-page"
        className="relative min-h-screen w-screen overflow-hidden bg-white font-sans"
      >
        {/* Background Elements - matching About page style */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,124,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,139,140,0.05),transparent_70%)]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
        </div>

        {/* Dark bar for navbar visibility */}
        <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-gray-700 via-gray-700/40 via-30% to-transparent z-40" />
        <Navbar isFixed={false} />
        
        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <HeroSection isMobile={isMobile} />
          
          <motion.div className="relative z-10">
            {/* Main Content */}
            <ContentSection />
            
            {/* Chapters Section */}
            <ChaptersSection />
          </motion.div>
        </motion.main>
      </motion.div>
      <Footer />
    </>
  );
}