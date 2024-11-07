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
      imageSrc='/assets/platform/hospitality-hero.webp'
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
