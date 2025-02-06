'use client';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import MediaSection from './components/MediaSection';
import ServicesSection from './components/ServicesSection';
import StorySection from './components/StorySection';

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

export default function CallHelpPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <motion.div
        key="call-help-page"
        className="relative min-h-screen w-screen overflow-hidden bg-black font-sans"
      >
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,87,0.12),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]" />
        </div>

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <HeroSection isMobile={isMobile} />
          
          <motion.div className="relative z-10">
            <ServicesSection />
            <StorySection />
            <MediaSection />
          </motion.div>
        </motion.main>
      </motion.div>
      <Footer />
    </>
  );
} 