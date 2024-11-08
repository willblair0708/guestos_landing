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
          {/* Visitor Analytics Card */}
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
                  <div className='space-y-1'>
                    <h4 className='text-sm font-medium text-white'>
                      Visitor Analytics
                    </h4>
                    <p className='text-xs text-white/60'>
                      London Eye Experience
                    </p>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <div className='rounded-full bg-amber-500/20 px-2 py-1'>
                      <span className='text-xs font-medium text-amber-400'>
                        Peak Hours
                      </span>
                    </div>
                    <span className='text-xs text-white/40'>14:30 - 16:30</span>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-2'>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-amber-400'>
                      847
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Current
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-amber-400'>
                      25
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Wait (min)
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-amber-400'>
                      92%
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Capacity
                    </div>
                  </div>
                </div>

                <div className='space-y-3 rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/80'>Hourly Flow</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs font-medium text-amber-400'>
                        ↑ 12%
                      </span>
                      <span className='text-[10px] text-white/40'>vs avg</span>
                    </div>
                  </div>
                  <div className='flex h-12 items-end gap-1'>
                    {[45, 65, 85, 92, 88, 76, 70, 55].map((height, i) => (
                      <div key={i} className='flex-1'>
                        <div
                          className='rounded-sm bg-amber-400/80'
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-between text-[10px] text-white/40'>
                    <span>10:00</span>
                    <span>17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Ratings Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='absolute left-8 top-1/4 z-10 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h4 className='text-sm font-medium text-white'>
                    Experience Ratings
                  </h4>
                  <p className='text-xs text-white/60'>Last 24 Hours</p>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-amber-400' />
                  <span className='text-xs text-white/80'>Live</span>
                </div>
              </div>

              <div className='space-y-3'>
                {[
                  {
                    label: 'Overall Experience',
                    rating: 4.9,
                    reviews: 328,
                    trend: '↑ 0.2',
                    details: 'Visitor satisfaction',
                  },
                  {
                    label: 'Staff Service',
                    rating: 4.8,
                    reviews: 256,
                    trend: '↑ 0.1',
                    details: 'Staff interaction',
                  },
                  {
                    label: 'Facilities',
                    rating: 4.7,
                    reviews: 412,
                    trend: '↑ 0.3',
                    details: 'Amenities & comfort',
                  },
                  {
                    label: 'Value for Money',
                    rating: 4.6,
                    reviews: 289,
                    trend: '↑ 0.2',
                    details: 'Price satisfaction',
                  },
                ].map((item, i) => (
                  <div key={i} className='space-y-2 rounded-lg bg-white/5 p-3'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <span className='text-xs text-white/80'>
                          {item.label}
                        </span>
                        <div className='text-[10px] text-white/40'>
                          {item.details}
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium text-amber-400'>
                            {item.rating}
                          </span>
                          <span className='text-xs text-amber-400/60'>
                            {item.trend}
                          </span>
                        </div>
                        <span className='text-[10px] text-white/40'>
                          {item.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-0.5'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`h-1 flex-1 rounded-full ${
                            star <= Math.floor(item.rating)
                              ? 'bg-amber-400'
                              : star - item.rating < 1
                                ? 'bg-gradient-to-r from-amber-400 to-white/10'
                                : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Operations Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='absolute bottom-8 right-8 z-10 w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
          >
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h4 className='text-sm font-medium text-white'>Operations</h4>
                  <p className='text-xs text-white/60'>Today's Performance</p>
                </div>
                <div className='rounded-full bg-amber-500/20 px-2 py-1'>
                  <span className='text-xs font-medium text-amber-400'>
                    +15% Revenue
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-white/60'>Tickets</span>
                    <span className='text-xs text-amber-400'>↑ 8%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-amber-400'>
                    2,847
                  </div>
                  <div className='mt-1 text-[10px] text-white/40'>
                    Sold today
                  </div>
                </div>
                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-white/60'>Revenue</span>
                    <span className='text-xs text-amber-400'>↑ 15%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-amber-400'>
                    £42.8k
                  </div>
                  <div className='mt-1 text-[10px] text-white/40'>
                    Daily total
                  </div>
                </div>
              </div>

              <div className='rounded-lg bg-white/5 p-3'>
                <div className='mb-2 text-xs text-white/80'>
                  Popular Add-ons
                </div>
                <div className='flex flex-wrap gap-2'>
                  {[
                    { name: 'Fast Track', value: '+£15', count: '847 sold' },
                    {
                      name: 'VIP Experience',
                      value: '+£45',
                      count: '234 sold',
                    },
                    { name: 'Photo Pass', value: '+£12', count: '562 sold' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'
                    >
                      <span className='text-xs text-white/60'>{item.name}</span>
                      <span className='text-xs font-medium text-amber-400'>
                        {item.value}
                      </span>
                      <span className='text-[10px] text-white/40'>
                        ({item.count})
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
