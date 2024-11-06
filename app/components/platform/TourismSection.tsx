import ProductSection from './ProductSection';

interface LumenSectionProps {
  id: string;
  bgColor: string;
}

export default function LumenSection({ id, bgColor }: LumenSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Tourism & Attractions'
      productDescription='Smart solutions for tourism operators and destinations.'
      imageSrc='/assets/products/lumen.webp'
      features={[
        {
          title: 'VISITOR EXPERIENCE',
          description:
            'Create personalized visitor journeys with AI-powered recommendations, digital guides, and real-time attraction information.',
        },
        {
          title: 'DESTINATION MANAGEMENT',
          description: 'Optimize your tourism operations with:',
          bulletPoints: [
            'Smart capacity management',
            'Dynamic pricing optimization',
            'Local business partnerships',
            'Sustainable tourism tools',
            'Cultural experience curation',
          ],
        },
      ]}
    />
  );
}
