'use client';

import { useMemo, useRef, useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegisterReturn,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { z } from 'zod';

import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

// Move form fields outside component to prevent recreation on each render
const formFields = [
  {
    id: 'firstName',
    label: 'FIRST NAME',
    placeholder: 'First Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'lastName',
    label: 'LAST NAME',
    placeholder: 'Last Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'email',
    label: 'EMAIL',
    placeholder: 'Business Email Address',
    type: 'email',
    width: 'half',
  },
  {
    id: 'jobTitle',
    label: 'JOB TITLE',
    placeholder: 'Job Title',
    type: 'text',
    width: 'half',
  },
  {
    id: 'organization',
    label: 'ORGANIZATION',
    placeholder: 'Organization',
    type: 'text',
    width: 'half',
  },
  {
    id: 'message',
    label: 'MESSAGE',
    placeholder: 'Your Message',
    type: 'textarea',
    width: 'full',
  },
] as const;

// Move form field rows outside component
const formFieldRows = [
  ['firstName', 'lastName'],
  ['email', 'jobTitle'],
  ['organization'],
] as const;

// Move variants outside component to prevent recreation
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

// Add these variants near the top with other variants
const inputVariants = {
  initial: { y: 0 },
} as const;

const labelVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
} as const;

// Add this type declaration at the top of the file, after the imports
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => Promise<void>) => Promise<void>;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

// Add new background gradient variants
const backgroundVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1.5 },
  },
} as const;

const FormInput = ({
  field,
  form,
  ...props
}: {
  field: (typeof formFields)[number];
  form: UseFormReturn<z.infer<typeof formSchema>>;
} & UseFormRegisterReturn) => {
  const [isFocused, setIsFocused] = useState(false);

  const value = form.watch(field.id, '');
  const hasValue = value.length > 0;

  return (
    <div
      key={field.id}
      className='relative flex w-full flex-col items-start justify-end gap-8'
    >
      <div className='relative flex w-full flex-col items-start justify-center gap-2.5 self-stretch'>
        <motion.div
          className='relative w-full'
          initial='initial'
          animate={isFocused ? 'focus' : 'initial'}
          whileHover='hover'
          variants={inputVariants}
        >
          <motion.input
            type={field.type}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.placeholder = '';
            }}
            onBlur={(e) => {
              setIsFocused(false);
              e.target.placeholder = field.placeholder;
            }}
            placeholder={field.placeholder}
            name={field.id}
            className='peer relative flex h-[38px] w-full items-center gap-2.5 self-stretch rounded-[7px] bg-black/20 px-5 py-3 text-[12px] font-book tracking-[-0.12px] text-white transition-all duration-200 placeholder:text-white/40 focus:bg-black/30 focus:outline-none focus:ring-1 focus:ring-[#03E87A]/50'
          />
          <motion.div
            className='pointer-events-none absolute inset-0 rounded-[7px]'
            animate={{
              boxShadow: isFocused
                ? '0 0 0 1px rgba(3,232,122,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                : '0 0 0 1px rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <motion.label
          initial='initial'
          animate={isFocused || hasValue ? 'visible' : 'initial'}
          variants={labelVariants}
          className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
        >
          {field.label}
        </motion.label>
        {form.formState.errors[field.id] && (
          <motion.p className='text-sm text-red-500'>
            {form.formState.errors[field.id]?.message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  jobTitle: z.string().min(3),
  organization: z.string().min(2),
  message: z.string().min(50),
});

// Add this at the top with other constants
const PARTICLE_COUNT = 25;
const PARTICLE_POSITIONS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: (i * 4.17) % 100, // Distribute evenly across width
  top: (i * 4.17 + 2.5) % 100, // Distribute evenly across height
  opacity: 0.1 + (i % 3) * 0.05, // Consistent opacity values
  scale: 0.5 + (i % 4) * 0.1, // Consistent scale values
}));

// Add this near other constants at the top
const PARTICLE_SEEDS = Array.from({ length: 25 }, (_, i) => ({
  left: ((i * 17) % 97) + 2, // Prime numbers for better distribution
  top: ((i * 19) % 94) + 3,
  opacity: 0.1 + ((i * 7) % 3) * 0.05,
  scale: 0.5 + ((i * 11) % 4) * 0.1,
  delay: i * 0.1,
  duration: 3 + (i % 2) * 2,
}));

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
            { action: 'CONTACT' }
          );

          const response = await fetch('https://getform.io/f/bollgpza', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              ...data,
              'g-recaptcha-response': token,
            }),
          });

          // Log response for debugging
          console.log('Form submission response:', {
            status: response.status,
            statusText: response.statusText,
          });

          if (response.ok) {
            toast.success('Message sent! We will get back to you soon.');
            form.reset();
          } else {
            const errorText = await response.text();
            console.error('Form submission error:', errorText);

            if (response.status === 429) {
              toast.error('Too many requests. Please try again later.');
            } else if (response.status === 400) {
              toast.error('Invalid form data. Please check your inputs.');
            } else if (response.status === 401 || response.status === 403) {
              toast.error(
                'Authentication failed. Please refresh and try again.'
              );
            } else {
              toast.error(
                `Failed to send message (${response.status}). Please try again later.`
              );
            }
          }
        } catch (error) {
          console.error('Form submission error:', error);
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error('Failed to send message. Please try again later.');
          }
        }
      });
    } catch (error) {
      console.error('Recaptcha error:', error);
      if (error instanceof Error) {
        toast.error(`Recaptcha error: ${error.message}`);
      } else {
        toast.error('Failed to verify recaptcha. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const message = form.watch('message', '');

  // Replace the particles section with this
  const renderParticles = useMemo(
    () => (
      <motion.div
        className='pointer-events-none absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {PARTICLE_SEEDS.map((seed, i) => (
          <motion.div
            key={i}
            className='absolute h-1 w-1 rounded-full bg-white'
            style={{
              left: `${seed.left}%`,
              top: `${seed.top}%`,
              opacity: seed.opacity,
              scale: seed.scale,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [seed.opacity, seed.opacity * 2, seed.opacity],
              scale: [seed.scale, seed.scale * 1.2, seed.scale],
            }}
            transition={{
              duration: seed.duration,
              repeat: Infinity,
              delay: seed.delay,
            }}
          />
        ))}
      </motion.div>
    ),
    []
  );

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex h-auto min-h-[800px] flex-col overflow-hidden text-white lg:h-screen lg:min-h-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: bgColor }}
    >
      {/* Nature-themed animated background */}
      <motion.div
        className='absolute inset-0 -z-10'
        variants={backgroundVariants}
        initial='initial'
        animate='animate'
      >
        {/* Base gradient - removed bg color since it's now in the section */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#0A2F51] via-[#0E4941] to-[#1A472A] opacity-50' />

        {/* Rest of the background elements */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.15),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(100,200,255,0.1),transparent_70%)]' />

        {/* Subtle grid */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />

        {/* Animated glow */}
        <motion.div
          className='absolute -left-[500px] top-1/2 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-[#03E87A]/20 via-[rgba(100,200,255,0.15)] to-transparent blur-3xl'
          animate={{
            x: [0, 200, 0],
            y: [-100, 100, -100],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      <Navbar isFixed={false} />

      <div className='relative flex flex-1 flex-col px-4 py-8 sm:flex-row sm:justify-between sm:px-2 sm:py-12 md:px-4 lg:px-8'>
        {/* Update heading styles */}
        <motion.div
          variants={itemVariants}
          initial='initial'
          animate='animate'
          className='relative mt-12 sm:mt-16 lg:mt-24'
        >
          <motion.h1
            className={`${
              isMobile ? 'text-[36px]' : 'text-[42px]'
            } max-w-2xl font-book leading-[1.2] tracking-[-0.01em]`}
          >
            See The Future,
            <br />
            <span className='bg-gradient-to-r from-[#03E87A] to-[#64C8FF] bg-clip-text text-transparent'>
              Change The Present
            </span>
          </motion.h1>
          <div className='mt-4 h-px w-32 bg-gradient-to-r from-[#03E87A]/50 to-transparent' />
        </motion.div>

        {/* Update form container styles */}
        <div
          className={`${
            isMobile
              ? 'mt-8 w-full'
              : 'mt-16 w-full max-w-[569px] xl:max-w-[640px]'
          } mb-4`}
        >
          <motion.div
            className='rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'
            variants={containerVariants}
            initial='initial'
            animate='animate'
          >
            <motion.p
              variants={itemVariants}
              className='mb-[30px] text-lg font-book tracking-tight sm:mb-[50px] sm:text-[24px]'
            >
              Contact / Request a Demo
            </motion.p>

            {/* Update form styles */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='relative flex w-full flex-col items-start gap-[50px]'
            >
              {/* honey pot */}
              <input type='hidden' name='_gotcha' className='hidden' />
              {formFieldRows.map((row) => (
                <div
                  key={row.join('-')}
                  className={`flex w-full ${
                    isMobile
                      ? 'flex-col gap-[50px]'
                      : 'relative flex-[0_0_auto] flex-row gap-[50px] self-stretch'
                  }`}
                >
                  {row.map((fieldId) => {
                    const field = formFields.find((f) => f.id === fieldId)!;
                    return (
                      <FormInput
                        key={field.id}
                        field={field}
                        form={form}
                        {...form.register(field.id)}
                      />
                    );
                  })}
                </div>
              ))}
              <div className='relative flex w-full flex-[0_0_auto] flex-col items-start justify-end gap-8 self-stretch'>
                <div className='relative w-full'>
                  <div className='mb-4 flex items-center gap-2'>
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='2.06641'
                        y='1.96387'
                        width='10.8682'
                        height='10.8682'
                        rx='5.43408'
                        stroke='white'
                      />
                      <rect
                        x='7'
                        y='6.11133'
                        width='1'
                        height='4.57227'
                        fill='#D9D9D9'
                      />
                      <rect
                        x='7'
                        y='4.11133'
                        width='1'
                        height='1'
                        fill='#D9D9D9'
                      />
                    </svg>
                    <p className='text-sm text-white opacity-80'>
                      Please tell us about your project so we can connect you
                      with the right team.
                    </p>
                  </div>

                  <motion.div
                    initial='initial'
                    whileHover='hover'
                    variants={inputVariants}
                  >
                    <textarea
                      placeholder='Your Message'
                      className='peer relative flex w-full items-center gap-2.5 self-stretch rounded-[7px] bg-[#18181B] px-5 pb-20 pt-3 text-base font-book tracking-[-0.12px] transition-shadow duration-200 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 sm:text-xs'
                      {...form.register('message')}
                    />
                    <motion.div
                      className='pointer-events-none absolute inset-0 rounded-[7px]'
                      animate={{
                        boxShadow: message
                          ? '0 0 0 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                          : '0 0 0 1px rgba(255,255,255,0)',
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  <motion.label
                    initial='initial'
                    animate={message?.length > 0 ? 'visible' : 'initial'}
                    variants={labelVariants}
                    className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
                  >
                    MESSAGE
                  </motion.label>
                  {form.formState.errors.message && (
                    <motion.p className='text-sm text-red-500'>
                      {form.formState.errors.message?.message}
                    </motion.p>
                  )}
                </div>
              </div>
              <motion.button
                type='submit'
                disabled={isSubmitting}
                className='relative -mt-4 inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 rounded-[20000px] bg-zinc-900 px-2 py-1 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50'
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <span className='relative mt-[-1.00px] w-fit whitespace-nowrap text-xs font-normal leading-[13.2px] tracking-[0.96px] text-white'>
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </span>
                {!isSubmitting && (
                  <ArrowIcon
                    className='rotate-[-90deg]'
                    color='white'
                    size={10}
                  />
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {renderParticles}
    </motion.section>
  );
}
