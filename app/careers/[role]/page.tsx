'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Footer from '@/app/components/Footer';
import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../../components/Navbar';
import { JobListing, jobs } from '../jobsData';

const JobDetailsPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<JobListing | null>(null);

  useEffect(() => {
    const currentJob = jobs.find((j) => j.id === params.role);
    setJob(currentJob || null);
    setIsLoading(false);
  }, [params.role]);

  const containerVariants = {
    hidden: { opacity: 0 },
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
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <div className='min-h-screen bg-[#18181B] font-book'>
      <AnimatePresence mode='wait'>
        {isLoading || !job ? (
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
            exit='hidden'
            variants={containerVariants}
            className='relative flex min-h-screen flex-col text-white'
          >
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.05),transparent_50%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,180,67,0.05),transparent_50%)]' />
            
            <Navbar isFixed={false} />

            {/* Main content */}
            <div className='relative w-full flex-1 px-4 sm:px-8'>
              <div className='mx-auto max-w-7xl'>
                <div className='flex flex-col lg:flex-row lg:gap-20'>
                  {/* Left column - Job title and quick info */}
                  <div className='lg:w-[40%]'>
                    <div className='sticky top-[20vh]'>
                      <motion.div variants={itemVariants} className='space-y-6'>
                        <div>
                          <span className='hidden sm:inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm'>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#03E87A]' />
                            {job.type}
                          </span>
                          <h1 className='mt-20 text-4xl font-book tracking-tight sm:mt-4 sm:text-5xl'>
                            {job.title}
                          </h1>
                        </div>

                        <div className='space-y-4'>
                          <div className='flex flex-wrap items-center gap-2 text-white/60'>
                            {/* <icons.MapPin className='h-4 w-4' /> */}
                            <span>{job.location}</span>
                            <span className='hidden sm:inline'>•</span>
                            <span className='inline-flex items-center gap-2 sm:hidden'>
                              <span className='h-1.5 w-1.5 rounded-full bg-[#03E87A]' />
                              {job.type}
                            </span>
                          </div>
                          
                          <div className='flex items-center gap-2 text-white/60'>
                            {/* <icons.DollarSign className='h-4 w-4' /> */}
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                          <a
                            href='mailto:jessie@guestos.ai'
                            className='group inline-flex items-center justify-center gap-2 rounded-xl bg-[#03E87A] px-6 py-3 text-base font-medium text-black transition-all hover:bg-[#03E87A]/90'
                          >
                            Apply Now
                          </a>
                          
                          <Link
                            href='/careers'
                            className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-base font-medium text-white transition-all hover:bg-white/5'
                          >
                            Back to Careers
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right column - Job details */}
                  <div className='mt-12 lg:mt-[20vh] lg:w-[60%]'>
                    <div className='space-y-12'>
                      {/* Overview section */}
                      <motion.div variants={itemVariants} className='space-y-4'>
                        <h2 className='text-sm font-medium uppercase tracking-wider text-white/40'>
                          Overview
                        </h2>
                        <p className='text-lg leading-relaxed text-white/80'>
                          {job.overview}
                        </p>
                      </motion.div>

                      {/* Responsibilities section */}
                      <motion.div variants={itemVariants} className='space-y-4'>
                        <h2 className='text-sm font-medium uppercase tracking-wider text-white/40'>
                          Responsibilities
                        </h2>
                        <ul className='grid gap-3 text-white/80'>
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className='flex items-start gap-3'>
                              <div className='mt-3.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#03E87A]' />
                              <span className='text-lg leading-relaxed'>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Requirements section */}
                      <motion.div variants={itemVariants} className='space-y-4'>
                        <h2 className='text-sm font-medium uppercase tracking-wider text-white/40'>
                          Requirements
                        </h2>
                        <ul className='grid gap-3 text-white/80'>
                          {job.qualifications.map((qual, index) => (
                            <li key={index} className='flex items-start gap-3'>
                              <div className='mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFB443]' />
                              <span className='text-lg leading-relaxed'>{qual}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {job.benefits && (
                        <motion.div variants={itemVariants} className='space-y-4'>
                          <h2 className='text-sm font-medium uppercase tracking-wider text-white/40'>
                            Benefits
                          </h2>
                          <p className='text-lg leading-relaxed text-white/80'>
                            {job.benefits}
                          </p>
                        </motion.div>
                      )}

                      {/* Nice to Have section - if it exists */}
                      {job.niceToHave && (
                        <motion.div variants={itemVariants} className='space-y-4'>
                          <h2 className='text-sm font-medium uppercase tracking-wider text-white/40'>
                            Nice to Have
                          </h2>
                          <ul className='grid gap-3 text-white/80'>
                            {job.niceToHave.map((item, index) => (
                              <li key={index} className='flex items-start gap-3'>
                                <div className='mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#03E87A]/50' />
                                <span className='text-lg leading-relaxed'>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className='pt-10' /> {/* Added space under */}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
