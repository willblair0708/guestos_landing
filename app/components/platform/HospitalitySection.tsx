import { motion } from 'framer-motion';

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
      productName='Hotel Operations'
      productDescription='Elevate your hotel operations with AI-powered solutions that enhance guest experiences and streamline staff workflows.'
      imageSrc='/assets/platform/hospitality.jpeg'
      overlayContent={
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
            {/* Glow Effects */}
            <div className='absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/10 blur-3xl' />
            <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#03E87A]/5 blur-3xl' />

            {/* Content */}
            <div className='relative space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium text-white'>
                  Guest Intelligence
                </h4>
                <div className='rounded-full bg-white/10 px-2 py-1'>
                  <span className='text-xs text-white/80'>Live</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/60'>Response Rate</span>
                    <span className='text-sm font-medium text-[#03E87A]'>
                      98%
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10'>
                    <div className='h-full w-[98%] rounded-full bg-[#03E87A]' />
                  </div>
                </div>

                <div className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-white/60'>Guest Score</span>
                    <span className='text-sm font-medium text-[#03E87A]'>
                      4.9
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10'>
                    <div className='h-full w-[95%] rounded-full bg-[#03E87A]' />
                  </div>
                </div>
              </div>

              <div className='mt-4 rounded-lg bg-white/5 p-3'>
                <div className='flex items-center gap-2'>
                  <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#03E87A]' />
                  <span className='text-xs text-white/80'>
                    Top Guest Requests
                  </span>
                </div>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {['Room Service', 'Local Tips', 'Transport'].map((tag, i) => (
                    <span
                      key={i}
                      className='rounded-full bg-white/10 px-2 py-1 text-xs text-white/60'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
