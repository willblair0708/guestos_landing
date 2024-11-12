import { motion } from 'framer-motion';

import Icon from '../ui/Icon';
import ProductSection from './ProductSection';

interface DynamoSectionProps {
  id: string;
  bgColor: string;
}

export default function HospitalitySection({
  id,
  bgColor,
}: DynamoSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Hotel and Resort Operations'
      productDescription='Elevate your hotel and resort operations with AI-powered solutions that enhance guest experiences and streamline staff workflows.'
      imageSrc='/assets/platform/hospitality.jpeg'
      overlayContent={
        <>
          {/* Guest Intelligence Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='absolute right-8 top-8 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className='relative space-y-4'>
              <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/10 blur-3xl' />
              <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/5 blur-3xl' />

              <div className='relative space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-sm font-medium text-white'>
                    Guest Intelligence
                  </h4>
                  <div className='rounded-full bg-white/10 px-2 py-1'>
                    <span className='text-xs text-white/80'>Live</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-[#03E87A]'>
                      156
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Active Guests
                    </div>
                  </div>
                  <div className='rounded-lg bg-white/5 p-3'>
                    <div className='mb-2 text-center text-2xl font-medium text-[#03E87A]'>
                      4.9
                    </div>
                    <div className='text-center text-xs text-white/60'>
                      Guest Score
                    </div>
                  </div>
                </div>

                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/80'>
                      Guest Sentiment
                    </span>
                    <span className='text-xs text-[#03E87A]'>↑ 12%</span>
                  </div>
                  <div className='mt-3 flex gap-2'>
                    {[
                      { label: 'Excellent', value: '78%' },
                      { label: 'Good', value: '16%' },
                      { label: 'Average', value: '6%' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className='flex-1 rounded-lg bg-white/5 p-2 text-center'
                      >
                        <div className='text-sm font-medium text-[#03E87A]'>
                          {item.value}
                        </div>
                        <div className='text-xs text-white/40'>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Operations Card */}
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
                  Operations Status
                </h4>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-[#03E87A]' />
                  <span className='text-xs text-white/80'>Real-time</span>
                </div>
              </div>

              <div className='space-y-3'>
                {[
                  { label: 'Room Service', time: '8m', status: 'On Track' },
                  { label: 'Housekeeping', time: '24m', status: 'Busy' },
                  { label: 'Maintenance', time: '12m', status: 'Available' },
                ].map((item, i) => (
                  <div key={i} className='rounded-lg bg-white/5 p-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/60'>
                        {item.label}
                      </span>
                      <span
                        className={`text-xs ${
                          item.status === 'On Track'
                            ? 'text-[#03E87A]'
                            : item.status === 'Busy'
                              ? 'text-amber-400'
                              : 'text-blue-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                      <div className='text-sm font-medium text-white/80'>
                        Response Time:
                      </div>
                      <div className='text-sm text-[#03E87A]'>{item.time}</div>
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
                    <span className='text-xs text-white/60'>RevPAR</span>
                    <span className='text-xs text-[#03E87A]'>↑ 15%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-[#03E87A]'>
                    $245
                  </div>
                </div>
                <div className='rounded-lg bg-white/5 p-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-white/60'>ADR</span>
                    <span className='text-xs text-[#03E87A]'>↑ 8%</span>
                  </div>
                  <div className='mt-1 text-lg font-medium text-[#03E87A]'>
                    $320
                  </div>
                </div>
              </div>

              <div className='rounded-lg bg-white/5 p-3'>
                <div className='mb-2 text-xs text-white/80'>
                  Revenue Streams
                </div>
                <div className='space-y-2'>
                  {[
                    { label: 'Room Revenue', value: '82%' },
                    { label: 'F&B', value: '12%' },
                    { label: 'Other Services', value: '6%' },
                  ].map((item, i) => (
                    <div key={i} className='space-y-1'>
                      <div className='flex justify-between text-xs'>
                        <span className='text-white/60'>{item.label}</span>
                        <span className='text-[#03E87A]'>{item.value}</span>
                      </div>
                      <div className='h-1.5 rounded-full bg-white/10'>
                        <div
                          className='h-full rounded-full bg-[#03E87A]'
                          style={{ width: item.value }}
                        />
                      </div>
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
          title: 'AI CONCIERGE',
          description:
            '24/7 multilingual guest support powered by advanced AI:',
          bulletPoints: [
            'Instant response to guest inquiries',
            'Personalized recommendations',
            'Seamless request handling',
            'Multi-language support',
            'Integration with hotel services',
          ],
        },
        {
          title: 'SMART OPERATIONS',
          description: 'Optimize your operations with AI-driven insights:',
          bulletPoints: [
            'Predictive analytics for staffing',
            'Automated task management',
            'Real-time performance metrics',
            'Resource optimization',
            'Preventive maintenance alerts',
          ],
        },
      ]}
    />
  );
}
