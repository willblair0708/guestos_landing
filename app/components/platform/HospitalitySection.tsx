import ProductSection from './ProductSection';

interface DynamoSectionProps {
  id: string;
  bgColor: string;
}

export default function DynamoSection({ id, bgColor }: DynamoSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Hotel Operations'
      productDescription='Comprehensive AI solutions for hotels and resorts.'
      imageSrc='/assets/about/about_header.webp'
      features={[
        {
          title: 'AI CONCIERGE',
          description:
            'Provide 24/7 multilingual guest support with our AI concierge that handles inquiries, requests, and recommendations while maintaining a personal touch.',
        },
        {
          title: 'SMART OPERATIONS',
          description:
            'Streamline your hotel operations with predictive analytics, automated task management, and real-time performance insights that help your staff deliver exceptional service.',
        },
      ]}
    />
  );
}
