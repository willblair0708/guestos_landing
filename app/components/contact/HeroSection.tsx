'use client';

import { useRef, useState } from 'react';
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
import Icon from '../ui/Icon';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

// Move form fields outside component to prevent recreation on each render
const formFields = [
  {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    type: 'text',
    width: 'half',
    icon: 'user',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
    type: 'text',
    width: 'half',
    icon: 'user',
  },
  {
    id: 'email',
    label: 'Work Email',
    placeholder: 'john@company.com',
    type: 'email',
    width: 'half',
    icon: 'mail',
  },
  {
    id: 'jobTitle',
    label: 'Role',
    placeholder: 'Head of Operations',
    type: 'text',
    width: 'half',
    icon: 'briefcase',
  },
  {
    id: 'organization',
    label: 'Company',
    placeholder: 'Acme Inc.',
    type: 'text',
    width: 'half',
    icon: 'building',
  },
  {
    id: 'message',
    label: 'Message',
    placeholder: 'Tell us about your needs...',
    type: 'textarea',
    width: 'full',
    icon: 'message',
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

// Update input variants for more modern feel
const inputVariants = {
  initial: {
    y: 0,
    boxShadow: '0 0 0 1px rgba(198,168,124,0.08)',
  },
  hover: {
    y: -1,
    boxShadow: '0 4px 20px rgba(198,168,124,0.12)',
  },
  focus: {
    y: -1,
    boxShadow: '0 4px 20px rgba(198,168,124,0.16)',
  },
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

// Update FormInput component
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
    <div className='relative flex w-full flex-col items-start justify-end gap-4'>
      <motion.div
        className='relative w-full rounded-xl'
        initial='initial'
        animate={isFocused ? 'focus' : 'initial'}
        whileHover='hover'
        variants={inputVariants}
      >
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold/40'>
          <Icon name={field.icon} size={16} />
        </span>

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
          className='peer relative flex h-[48px] w-full items-center gap-2.5 rounded-xl bg-gradient-to-b from-surface-dark/95 to-surface-dark/90 pl-4 pr-4 font-light text-lg tracking-wide text-white/90 backdrop-blur-md transition-all duration-200 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary-gold/30'
        />

        <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary-gold/[0.02] via-transparent to-primary-gold/[0.02]' />
      </motion.div>

      <motion.label
        initial='initial'
        animate={isFocused || hasValue ? 'visible' : 'initial'}
        variants={labelVariants}
        className='pointer-events-none absolute -top-6 left-0 origin-left font-light text-sm tracking-wide text-primary-gold/80'
      >
        {field.label}
      </motion.label>

      {form.formState.errors[field.id] && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-sm text-red-400/90'
        >
          {form.formState.errors[field.id]?.message}
        </motion.p>
      )}
    </div>
  );
};

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email('Please enter a valid email address'),
  jobTitle: z.string(),
  organization: z.string(),
  message: z.string(),
});

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
  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-bg-dark text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-black/80' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,232,122,0.12),transparent_70%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]' />
        <motion.div
          className='absolute -left-[500px] top-1/2 rounded-full bg-gradient-to-r from-[#03E87A]/15 via-[rgba(255,200,87,0.1)] to-transparent blur-3xl'
          animate={{
            x: [0, 200, 0],
            y: [-100, 100, -100],
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Navbar isFixed={false} />

      <div className='max-w-9xl relative mx-auto mt-40 flex w-full flex-1 flex-col gap-16 px-4 pb-12 pt-24 sm:flex-row sm:items-start sm:justify-between sm:px-8 lg:gap-24'>
        <motion.div
          variants={containerVariants}
          initial='initial'
          animate='animate'
          className='flex max-w-xl flex-col gap-8'
        >
          <motion.span className='inline-flex items-center gap-3 self-start rounded-full bg-surface-dark/50 px-4 py-2 backdrop-blur-sm'>
            <span className='h-1.5 w-1.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-primary-gold' />
            <span className='font-light text-base text-white/90'>
              Book a Demo
            </span>
          </motion.span>

          <div className='space-y-6'>
            <motion.h1
              variants={itemVariants}
              className={`${
                isMobile ? 'text-5xl' : 'text-6xl'
              } max-w-2xl font-light leading-[1.1] tracking-tight text-white`}
            >
              Experience the Future
              <br />
              <span className='bg-gradient-to-r from-primary-gold via-primary-gold/90 to-primary-gold/80 bg-clip-text text-transparent'>
                of Hospitality AI
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className='max-w-lg font-light text-xl leading-relaxed text-white/60'
            >
              Schedule a personalized demo to see how GuestOS can transform your
              guest experience.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className='flex flex-col gap-4 sm:flex-row'
            >
              <a
                href='https://calendly.com/guestos_ai'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary-gold px-8 py-4 text-base font-medium text-black transition-all duration-300 hover:bg-primary-gold/90'
              >
                <span>Schedule Demo</span>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='relative top-[1px]'
                >
                  <path
                    d='M15.8334 4.16666H4.16669C3.24622 4.16666 2.50002 4.91285 2.50002 5.83332V15.8333C2.50002 16.7538 3.24622 17.5 4.16669 17.5H15.8334C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83332C17.5 4.91285 16.7538 4.16666 15.8334 4.16666Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M13.3333 2.5V5.83333'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6.66669 2.5V5.83333'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M2.50002 9.16666H17.5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </a>
              <span className='inline-flex items-center gap-2 text-lg text-white/60'>
                or fill out the form
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='relative top-[1px]'
                >
                  <path
                    d='M5 10H15'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 15L15 10L10 5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='initial'
          animate='animate'
          className={`${
            isMobile ? 'w-full' : 'w-full max-w-[600px]'
          } relative overflow-hidden rounded-2xl border border-[#03E87A]/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-8 backdrop-blur-xl lg:p-10`}
        >
          <div className='absolute -left-14 top-0 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/10 to-transparent blur-3xl' />
          <div className='absolute -right-14 -top-10 h-[150px] w-[150px] bg-gradient-to-r from-[#03E87A]/20 via-[#03E87A]/5 to-transparent blur-3xl' />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='relative flex w-full flex-col items-start gap-12'
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
                    Please tell us about your project so we can connect you with
                    the right team.
                  </p>
                </div>

                <motion.div
                  initial='initial'
                  whileHover='hover'
                  variants={inputVariants}
                  className='relative w-full'
                >
                  <textarea
                    placeholder='Your Message'
                    className='peer relative flex w-full items-center gap-2.5 self-stretch rounded-xl bg-gradient-to-b from-surface-dark/90 to-surface-dark/70 px-5 pb-20 pt-3 font-light text-base tracking-wide text-white/90 backdrop-blur-md transition-all duration-200 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary-gold/30 sm:text-sm'
                    {...form.register('message')}
                  />
                  <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary-gold/[0.03] via-transparent to-primary-gold/[0.03]' />
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
              className='relative inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-gold/90 via-primary-gold/80 to-primary-gold/90 px-8 py-4 text-base font-medium text-black transition-all duration-300 hover:from-primary-gold hover:to-primary-gold disabled:cursor-not-allowed disabled:opacity-50'
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            >
              <span className='relative whitespace-nowrap text-base'>
                {isSubmitting ? 'Sending...' : 'Request Demo'}
              </span>
              {!isSubmitting && (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.16669 10H15.8334'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.8334 5L15.8334 10L10.8334 15'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
