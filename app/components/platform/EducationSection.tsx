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
      imageSrc='/assets/platform/education-hero.webp'
      overlayContent={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='absolute right-8 top-8 z-10 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 p-6 backdrop-blur-xl'
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
        >
          <div className='relative space-y-4'>
            {/* Glow Effects */}
            <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl' />
            <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl' />

            {/* Content */}
            <div className='relative space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium text-white'>
                  Learning Analytics
                </h4>
                <div className='rounded-full bg-white/10 px-2 py-1'>
                  <span className='text-xs text-white/80'>Real-time</span>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/60'>
                      Student Engagement
                    </span>
                    <span className='text-sm font-medium text-blue-400'>
                      92%
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10'>
                    <div className='h-full w-[92%] rounded-full bg-blue-400' />
                  </div>
                </div>

                <div className='rounded-lg bg-white/5 p-3'>
                  <span className='text-xs text-white/80'>
                    Popular Activities
                  </span>
                  <div className='mt-2 grid grid-cols-2 gap-2'>
                    {[
                      { label: 'Cultural Tours', value: '45%' },
                      { label: 'Workshops', value: '32%' },
                      { label: 'Field Studies', value: '28%' },
                      { label: 'Group Projects', value: '25%' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between rounded-lg bg-white/5 p-2'
                      >
                        <span className='text-xs text-white/60'>
                          {item.label}
                        </span>
                        <span className='text-xs font-medium text-blue-400'>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
