import { motion } from 'framer-motion';

interface PricingFAQProps {
  faqs: Array<{
    id: string | number;
    question: string;
    answer: string;
  }>;
}

export default function PricingFAQ({ faqs }: PricingFAQProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto mt-20 max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-10">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-50">
            <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(234,179,8,0.1)_360deg)]" />
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300">
            Can't find the answer you're looking for? Reach out to our{' '}
            <a
              href="#"
              className="font-medium text-primary-gold hover:text-primary-gold/80"
            >
              customer support
            </a>{' '}
            team.
          </p>
        </div>

        <dl className="mt-16 space-y-8 divide-y divide-neutral-800">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 0 ? 'pt-0' : 'pt-8'}
            >
              <dt>
                <button
                  type="button"
                  className="flex w-full items-start justify-between text-left"
                >
                  <span className="text-base font-medium leading-7 text-white">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <div className="relative h-5 w-5">
                      <div className="absolute inset-0 rounded-full bg-primary-gold/10" />
                      <svg
                        className="relative h-5 w-5 text-primary-gold"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M10 4v12m6-6H4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </span>
                </button>
              </dt>
              <dd className="mt-4 pr-12">
                <p className="text-base leading-7 text-neutral-300">{faq.answer}</p>
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* Contact Support Section */}
        <div className="relative mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-50">
              <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(234,179,8,0.1)_360deg)]" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <h3 className="text-lg font-medium text-white">Still have questions?</h3>
              <p className="mt-1 text-sm text-neutral-300">
                Can't find the answer you're looking for? Please chat with our friendly team.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-gold to-primary-gold px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary-gold/20 transition-all duration-300 hover:from-primary-gold/90 hover:to-primary-gold/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Get in touch
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 