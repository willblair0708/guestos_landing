'use client';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import ServicesSection from './components/ServicesSection';
import ImpactSection from './components/ImpactSection';
import VisionSection from './components/VisionSection';
import StorySection from './components/StorySection';
import MediaSection from './components/MediaSection';

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
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
          
          {/* Emergency-themed gradients */}
          <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_40%_30%,rgba(255,87,87,0.08),rgba(255,200,87,0.08),rgba(255,87,87,0.08))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(255,87,87,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,200,87,0.08),transparent_50%)]" />
          
          {/* Animated emergency pulses */}
          <div className="absolute left-0 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-red-500/5 blur-[100px]" />
          <div className="absolute right-0 top-3/4 h-[300px] w-[300px] animate-pulse rounded-full bg-accent-gold-light/5 blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 animate-pulse rounded-full bg-red-500/3 blur-[120px]" />
        </div>

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Critical Information First */}
          <HeroSection isMobile={isMobile} />
          
          <motion.div className="relative z-10">
            {/* Context and Services */}
            <ProblemSolutionSection />
            <ServicesSection />
            
            {/* Impact and Social Proof */}
            <ImpactSection />
            
            {/* Story and Vision */}
            <div className="relative">
              <StorySection />
              <VisionSection />
            </div>
            
            {/* Additional Information */}
            <MediaSection />
          </motion.div>
        </motion.main>
      </motion.div>
      <Footer />
    </>
  );
} 