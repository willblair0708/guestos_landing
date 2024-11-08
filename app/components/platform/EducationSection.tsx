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
          {/* Trip Analytics Card */}
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
                  <div className='space-y-1'>
                    <h4 className='text-sm font-medium text-white'>
                      Study Trip Overview
                    </h4>
                    <p className='text-xs text-white/60'>
                      University of Cambridge
                    </p>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <div className='rounded-full bg-blue-500/20 px-2 py-1'>
                      <span className='text-xs font-medium text-blue-400'>
                        Active Trip
                      </span>
                    </div>
                    <span className='text-xs text-white/40'>Day 5 of 14</span>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-2'>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-blue-400'>
                      42
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Students
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-blue-400'>
                      8
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Faculty
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-2'>
                    <div className='mb-1 text-center text-xl font-medium text-blue-400'>
                      4
                    </div>
                    <div className='text-center text-[10px] text-white/60'>
                      Groups
                    </div>
                  </div>
                </div>

                <div className='space-y-3 rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/80'>Trip Progress</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs font-medium text-blue-400'>
                        35.7%
                      </span>
                      <span className='text-[10px] text-white/40'>
                        5/14 days
                      </span>
                    </div>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10'>
                    <div className='h-full w-[35.7%] rounded-full bg-blue-400' />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Schedule Card */}
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
                    Today's Schedule
                  </h4>
                  <p className='text-xs text-white/60'>Thursday, March 14</p>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-blue-400' />
                  <span className='text-xs text-white/80'>Live Updates</span>
                </div>
              </div>

              <div className='space-y-2'>
                {[
                  {
                    time: '09:00',
                    activity: 'British Museum Tour',
                    location: 'Great Russell St',
                    type: 'Cultural',
                    status: 'Completed',
                  },
                  {
                    time: '13:30',
                    activity: 'Architecture Workshop',
                    location: 'UCL Campus',
                    type: 'Academic',
                    status: 'Current',
                  },
                  {
                    time: '15:45',
                    activity: 'Urban Planning Study',
                    location: 'City Center',
                    type: 'Field Work',
                    status: 'Upcoming',
                  },
                ].map((item, i) => (
                  <div key={i} className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 flex items-center justify-between'>
                      <span className='text-xs text-white/60'>{item.time}</span>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] ${
                            item.type === 'Cultural'
                              ? 'bg-purple-500/20 text-purple-400'
                              : item.type === 'Academic'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {item.type}
                        </span>
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
                    </div>
                    <div className='space-y-1'>
                      <div className='text-sm text-white/90'>
                        {item.activity}
                      </div>
                      <div className='flex items-center gap-1 text-xs text-white/50'>
                        <svg
                          className='h-3 w-3'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        {item.location}
                      </div>
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
                <div className='space-y-1'>
                  <h4 className='text-sm font-medium text-white'>
                    Learning Analytics
                  </h4>
                  <p className='text-xs text-white/60'>Week 1 Performance</p>
                </div>
                <div className='rounded-full bg-blue-500/20 px-2 py-1'>
                  <span className='text-xs font-medium text-blue-400'>
                    ↑ 15% vs. Target
                  </span>
                </div>
              </div>

              <div className='space-y-3'>
                {[
                  {
                    label: 'Cultural Engagement',
                    value: '92%',
                    trend: '↑ 8%',
                    details: 'Museum visits, local interactions',
                  },
                  {
                    label: 'Academic Tasks',
                    value: '88%',
                    trend: '↑ 5%',
                    details: 'Workshops, assignments',
                  },
                  {
                    label: 'Field Research',
                    value: '95%',
                    trend: '↑ 12%',
                    details: 'Data collection, analysis',
                  },
                  {
                    label: 'Group Collaboration',
                    value: '90%',
                    trend: '↑ 7%',
                    details: 'Team projects, presentations',
                  },
                ].map((item, i) => (
                  <div key={i} className='space-y-2'>
                    <div className='flex justify-between text-xs'>
                      <div className='space-y-1'>
                        <span className='text-white/80'>{item.label}</span>
                        <div className='text-[10px] text-white/40'>
                          {item.details}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-blue-400'>{item.trend}</span>
                        <span className='font-medium text-white/90'>
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
