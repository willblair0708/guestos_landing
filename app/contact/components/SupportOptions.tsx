'use client';

import { motion } from 'framer-motion';

const supportOptions = [
  {
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Live Demo',
    description: 'Schedule a personalized demo with our product experts',
    href: '/demo',
  },
  {
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: 'Documentation',
    description: 'Browse our comprehensive guides and API documentation',
    href: '/docs',
  },
  {
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: 'Chat Support',
    description: '24/7 chat support for quick assistance',
    href: '/chat',
  },
];

export default function SupportOptions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(234,179,8,0.1)_360deg)]" />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white">Support Options</h3>
          <p className="mt-1 text-sm text-neutral-400">
            Choose the support option that works best for you
          </p>
        </div>

        <div className="grid gap-4">
          {supportOptions.map((option, index) => (
            <motion.a
              key={option.title}
              href={option.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-primary-gold/50 hover:bg-primary-gold/5"
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-gold/0 via-primary-gold/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                animate={{
                  x: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <div className="relative flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-primary-gold transition-colors duration-300 group-hover:border-primary-gold/50 group-hover:bg-primary-gold/5">
                  <option.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    {option.title}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-400">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Help Text */}
        <div className="rounded-xl border border-primary-gold/20 bg-primary-gold/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-gold/20 bg-primary-gold/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-primary-gold">
              Can't find what you're looking for? Our team is here to help 24/7.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 