import { motion } from 'framer-motion';

interface PricingStatsProps {
  stats: Array<{
    id: string | number;
    label: string;
    value: string | number;
    prefix?: string;
    suffix?: string;
    description?: string;
  }>;
}

export default function PricingStats({ stats }: PricingStatsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto mt-20 max-w-7xl rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-10">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-50">
            <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(234,179,8,0.1)_360deg)]" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Trusted by thousands of users worldwide
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-neutral-300">
            Join the growing community of users who trust our platform for their needs.
            Our proven track record speaks for itself.
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="relative flex flex-col bg-neutral-900/50 px-8 py-12">
              {/* Stat Background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900/50 to-black/30" />

              <dt className="order-2 mt-4">
                <div className="inline-flex items-center rounded-full bg-primary-gold/10 px-4 py-1 text-sm font-medium text-primary-gold">
                  {stat.label}
                </div>
              </dt>

              <dd className="order-1 text-5xl font-medium tracking-tight text-white">
                <div className="flex items-center justify-center gap-2">
                  {stat.prefix && (
                    <span className="text-2xl text-neutral-400">{stat.prefix}</span>
                  )}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {stat.value}
                  </motion.span>
                  {stat.suffix && (
                    <span className="text-2xl text-neutral-400">{stat.suffix}</span>
                  )}
                </div>
              </dd>

              {stat.description && (
                <p className="order-3 mt-3 text-sm text-neutral-400">
                  {stat.description}
                </p>
              )}

              {/* Decorative Corner Lines */}
              <div className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-primary-gold to-transparent" />
              <div className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-primary-gold to-transparent" />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 