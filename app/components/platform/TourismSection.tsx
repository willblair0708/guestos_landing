import { motion } from 'framer-motion';

import ProductSection from './ProductSection';

interface LumenSectionProps {
  id: string;
  bgColor: string;
}

export default function TourismSection({ id, bgColor }: LumenSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Tourism & Attractions'
      productDescription='Transform visitor experiences with AI-powered solutions that enhance engagement and optimize operations.'
      imageSrc='/assets/platform/tourism.jpg'
      overlayContent={
        <>
          {/* Visitor Insights Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='absolute right-8 top-8 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
          >
            <div className='relative space-y-4'>
              <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl' />
              <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl' />

              <div className='relative space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-sm font-medium text-white'>
                    Visitor Insights
                  </h4>
                  <div className='rounded-full bg-white/10 px-2 py-1'>
                    <span className='text-xs text-white/80'>Live</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-amber-400'>
                      847
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Current Visitors
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-amber-400'>
                      12m
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Wait Time
                    </div>
                  </div>
                </div>

                <div className='space-y-3 rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/80'>Peak Hours</span>
                    <span className='text-xs text-amber-400'>Next: 2PM</span>
                  </div>
                  <div className='flex gap-1'>
                    {[30, 45, 80, 95, 70, 60, 40].map((height, i) => (
                      <div key={i} className='flex-1'>
                        <div className='h-16 w-full rounded-sm bg-white/10'>
                          <div
                            className='w-full rounded-sm bg-amber-400/60 transition-all'
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Analytics Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='absolute left-8 top-1/4 z-10 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium text-white'>
                  Experience Ratings
                </h4>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-amber-400' />
                  <span className='text-xs text-white/80'>Live</span>
                </div>
              </div>

              <div className='space-y-3'>
                {[
                  { label: 'Cultural Tours', rating: 4.9, reviews: 328 },
                  { label: 'Local Guides', rating: 4.8, reviews: 256 },
                  { label: 'Food Experience', rating: 4.7, reviews: 412 },
                ].map((item, i) => (
                  <div key={i} className='rounded-lg bg-white/5 p-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/60'>
                        {item.label}
                      </span>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium text-amber-400'>
                          {item.rating}
                        </span>
                        <span className='text-xs text-white/40'>
                          ({item.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Revenue Insights Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='absolute bottom-8 right-8 z-10 w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium text-white'>
                  Revenue Insights
                </h4>
                <span className='text-xs text-white/60'>Today</span>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-white/60'>Ticket Sales</span>
                    <span className='text-xs text-amber-400'>↑ 12%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-amber-400'>
                    $24.8k
                  </div>
                </div>
                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-white/60'>Avg Spend</span>
                    <span className='text-xs text-amber-400'>↑ 8%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-amber-400'>
                    $86
                  </div>
                </div>
              </div>

              <div className='rounded-lg bg-white/5 p-3'>
                <div className='mb-2 text-xs text-white/80'>
                  Popular Add-ons
                </div>
                <div className='flex flex-wrap gap-2'>
                  {[
                    { name: 'Guide Service', value: '+$45' },
                    { name: 'Photo Pass', value: '+$25' },
                    { name: 'Fast Track', value: '+$30' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'
                    >
                      <span className='text-xs text-white/60'>{item.name}</span>
                      <span className='text-xs font-medium text-amber-400'>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      }
      features={[
        {
          title: 'VISITOR EXPERIENCE',
          description: 'Create immersive experiences:',
          bulletPoints: [
            'AI-powered recommendations',
            'Interactive digital guides',
            'Real-time attraction updates',
            'Virtual queuing system',
            'Augmented reality features',
          ],
        },
        {
          title: 'DESTINATION MANAGEMENT',
          description: 'Optimize operations with smart tools:',
          bulletPoints: [
            'Capacity optimization',
            'Dynamic pricing',
            'Local business integration',
            'Sustainability metrics',
            'Cultural experience curation',
          ],
        },
      ]}
    />
  );
}
