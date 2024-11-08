import { motion } from 'framer-motion';

import ProductSection from './ProductSection';

interface SeraphSectionProps {
  id: string;
  bgColor: string;
}

export default function EducationSection({ id, bgColor }: SeraphSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Education'
      productDescription='Revolutionize educational travel with AI-powered planning tools and immersive learning experiences.'
      imageSrc='/assets/platform/education.jpg'
      overlayContent={
        <>
          {/* Learning Analytics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='absolute right-8 top-8 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
          >
            <div className='relative space-y-4'>
              <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl' />
              <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl' />

              <div className='relative space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-sm font-medium text-white'>
                    Trip Overview
                  </h4>
                  <div className='rounded-full bg-white/10 px-2 py-1'>
                    <span className='text-xs text-white/80'>Active Trip</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-blue-400'>
                      42
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Students
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-blue-400'>
                      8
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Days Left
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/60'>Trip Progress</span>
                    <span className='text-sm font-medium text-blue-400'>
                      65%
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10'>
                    <div className='h-full w-[65%] rounded-full bg-blue-400' />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Tracker Card */}
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
                  Today's Schedule
                </h4>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-blue-400' />
                  <span className='text-xs text-white/80'>In Progress</span>
                </div>
              </div>

              <div className='space-y-3'>
                {[
                  {
                    time: '09:00',
                    activity: 'Museum Tour',
                    status: 'Completed',
                  },
                  { time: '13:30', activity: 'Workshop', status: 'Current' },
                  {
                    time: '15:45',
                    activity: 'Field Study',
                    status: 'Upcoming',
                  },
                ].map((item, i) => (
                  <div key={i} className='rounded-lg bg-white/5 p-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/60'>{item.time}</span>
                      <span
                        className={`text-xs ${
                          item.status === 'Completed'
                            ? 'text-green-400'
                            : item.status === 'Current'
                              ? 'text-blue-400'
                              : 'text-white/40'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className='mt-1 text-sm text-white/80'>
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Learning Metrics Card */}
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
                  Learning Outcomes
                </h4>
                <span className='text-xs text-white/60'>This Week</span>
              </div>

              <div className='space-y-3'>
                {[
                  { label: 'Cultural Engagement', value: '92%', trend: '↑ 8%' },
                  { label: 'Academic Tasks', value: '88%', trend: '↑ 5%' },
                  {
                    label: 'Group Participation',
                    value: '95%',
                    trend: '↑ 12%',
                  },
                ].map((item, i) => (
                  <div key={i} className='space-y-2'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-white/60'>{item.label}</span>
                      <div className='flex items-center gap-2'>
                        <span className='text-blue-400'>{item.trend}</span>
                        <span className='font-medium text-white/80'>
                          {item.value}
                        </span>
                      </div>
                    </div>
                    <div className='h-1.5 rounded-full bg-white/10'>
                      <div
                        className='h-full rounded-full bg-blue-400'
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      }
      features={[
        {
          title: 'TRIP PLANNING',
          description: 'Streamline educational travel planning:',
          bulletPoints: [
            'AI-powered itinerary creation',
            'Smart accommodation booking',
            'Group coordination tools',
            'Risk assessment automation',
            'Budget optimization',
          ],
        },
        {
          title: 'STUDENT EXPERIENCE',
          description: 'Enhance learning journeys:',
          bulletPoints: [
            'Personalized recommendations',
            'Interactive cultural guides',
            'Real-time updates',
            'Educational gamification',
            'Social learning features',
          ],
        },
      ]}
    />
  );
}
