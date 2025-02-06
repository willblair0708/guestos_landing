import { motion } from 'framer-motion';

interface ComparisonTableProps {
  features: any[];
  plans: any[];
}

export default function ComparisonTable({ features, plans }: ComparisonTableProps) {
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden">
      {/* Table Container */}
      <div className="relative mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-sm">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-neutral-200 bg-neutral-50/50">
          <div className="p-6">
            <h3 className="text-lg font-medium text-neutral-900">Features</h3>
            <p className="mt-1 text-sm text-neutral-600">Compare our plans and find the right one for you.</p>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`flex flex-col justify-between border-l border-neutral-200 p-6 ${
                plan.isPopular ? 'relative bg-primary-gold/5' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary-gold px-3 py-1 text-center text-xs font-medium text-white shadow-sm">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-neutral-900">{plan.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{plan.description}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-medium text-neutral-900">${plan.price}</span>
                  <span className="text-sm text-neutral-500">/month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="divide-y divide-neutral-200">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="grid grid-cols-[1.5fr_repeat(3,1fr)] hover:bg-neutral-50/50"
            >
              <div className="flex items-center p-6">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{feature.name}</p>
                  {feature.description && (
                    <p className="mt-1 text-sm text-neutral-600">{feature.description}</p>
                  )}
                </div>
              </div>
              {plans.map((plan) => {
                const value = feature.values[plan.title.toLowerCase()];
                return (
                  <div
                    key={plan.title}
                    className={`flex items-center border-l border-neutral-200 p-6 ${
                      plan.isPopular ? 'bg-primary-gold/5' : ''
                    }`}
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <div className="rounded-full bg-primary-gold/10 p-1">
                          <svg
                            className="h-4 w-4 text-primary-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="rounded-full bg-neutral-100 p-1">
                          <svg
                            className="h-4 w-4 text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-neutral-700">{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-t border-neutral-200 bg-neutral-50/50">
          {[{ title: '' }, ...plans].map((plan) => (
            <div
              key={plan.title}
              className={`border-l border-neutral-200 p-6 first:border-l-0 ${
                plan.isPopular ? 'bg-primary-gold/5' : ''
              }`}
            >
              {plan.title && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-primary-gold to-primary-gold text-white shadow-lg shadow-primary-gold/20'
                      : 'border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:border-primary-gold/50 hover:bg-primary-gold/5'
                  }`}
                >
                  Get Started
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 