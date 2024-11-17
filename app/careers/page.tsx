'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as icons from '@/app/icons';
import ArrowIcon from '@/public/assets/ui/Arrow';
import LinkedIn from '@/public/assets/ui/LinkedIn';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const CareersPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const roles = [
    {
      title: 'Full Stack Engineer',
      type: 'Full Time',
      location: 'Remote',
      department: 'Engineering',
      gradient: 'from-[#03E87A] to-[#03E87A]/5',
    },
    {
      title: 'Research Engineer',
      type: 'Full Time',
      location: 'Remote',
      department: 'Research',
      gradient: 'from-[#FFB443] to-[#FFB443]/5',
    },
  ];

  const handleRoleClick = (role: string) => {
    router.push(
      `/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`
    );
  };

  return (
    <div className='min-h-screen bg-[#18181B] font-book'>
      <div className='sm:px-8'>
        <Navbar isFixed={false} />
        <AnimatePresence mode='wait'>
          {isLoading ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex min-h-screen items-center justify-center text-white'
            >
              <div className='h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent' />
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial='hidden'
              animate='visible'
              variants={containerVariants}
              className='mx-auto flex min-h-screen max-w-7xl flex-col px-4 text-white sm:px-8'
            >
              {/* Hero Section */}
              <motion.div variants={itemVariants} className='pt-[120px] lg:pt-[140px]'>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm'>
                  <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
                  We're Hiring
                </span>
                <h1 className='mt-6 text-4xl font-book tracking-tight sm:text-5xl lg:text-6xl'>
                  Join Our Team
                </h1>
                <p className='mt-4 max-w-2xl text-base text-white/60 sm:text-lg'>
                  Help us build the future of AI-powered guest experiences. We're looking for
                  exceptional people to join our growing team.
                </p>
              </motion.div>

              {/* Roles Section */}
              <motion.div variants={containerVariants} className='mt-16 sm:mt-24'>
                <motion.h2 variants={itemVariants} className='text-xl font-book sm:text-2xl'>
                  Open Positions
                </motion.h2>
                <motion.div variants={itemVariants} className='mt-8 space-y-4'>
                  {roles.map((role, index) => (
                    <motion.div
                      key={index}
                      className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-1 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]'
                      onClick={() => handleRoleClick(role.title)}
                      whileHover={{ scale: 1.005 }}
                      role='link'
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.05]`} />
                      <div className='relative flex items-center justify-between p-6'>
                        <div className='space-y-1'>
                          <h3 className='text-lg font-medium sm:text-xl'>{role.title}</h3>
                          <div className='flex items-center gap-4 text-sm text-white/60'>
                            <span>{role.type}</span>
                            <span>•</span>
                            <span>{role.location}</span>
                            <span>•</span>
                            <span>{role.department}</span>
                          </div>
                        </div>
                        <ArrowIcon color='white' className='rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-1' />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  variants={itemVariants}
                  className='mt-24 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 backdrop-blur-xl sm:p-12'
                >
                  <div className='flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center'>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-book sm:text-2xl'>
                        Don't see what you're looking for?
                      </h3>
                      <p className='text-white/60'>
                        We're always looking for talented people to join our team.
                      </p>
                    </div>
                    <Link
                      href='mailto:jobs@aaruaaru.com'
                      className='group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90'
                    >
                      Get in Touch
                      <ArrowIcon className='rotate-[-90deg] transition-transform group-hover:translate-x-1' />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

function FounderPortrait({
  name,
  index,
  slug,
  linkedin,
  instagram,
}: {
  name: string;
  index: number;
  slug: string;
  linkedin: string;
  instagram: string;
}) {
  return (
    <motion.div
      key={name}
      className={`relative w-fit ${
        index === 1 ? 'md:mt-12 lg:mt-20' : 'md:-mt-12 lg:-mt-20'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
    >
      <motion.div
        className='relative h-[450px] w-full sm:h-full sm:max-h-[500px] lg:max-h-[538px]'
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={`/assets/founders/${slug}`}
          className='!aspect-[0.83] h-full w-auto object-cover sm:max-h-[500px] lg:max-h-[538px]'
          height={538}
          width={448}
          alt={name}
        />
        <motion.div
          className='absolute bottom-[10px] left-[10px] flex h-[120px] w-[180px] flex-col justify-between bg-[#03E87A] p-3 sm:h-[130px] sm:w-[190px] sm:p-4 lg:h-[143px] lg:w-[207px]'
          initial={{ y: 0, x: 0 }}
          whileHover={{ y: -5, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h3 className='mb-2.5 border-t border-black pt-2.5 text-lg font-book tracking-tight text-black'>
              {name}
            </h3>
            <p className='text-sm font-book tracking-tight text-black'>
              Co-Founder
            </p>
          </div>
          <div className='flex space-x-2'>
            <Link
              href={`https://www.instagram.com/${instagram}`}
              target='_blank'
              rel='noopener noreferrer'
            >
            </Link>
            <Link
              href={`https://www.linkedin.com/in/${linkedin}/`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedIn width={16} height={16} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default CareersPage;
