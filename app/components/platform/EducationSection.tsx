import ProductSection from './ProductSection';

interface SeraphSectionProps {
  id: string;
  bgColor: string;
}

export default function SeraphSection({ id, bgColor }: SeraphSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Education'
      productDescription='AI-powered solutions for educational institutions and student travel.'
      imageSrc='/assets/products/seraph.webp'
      features={[
        {
          title: 'TRIP PLANNING',
          description:
            'Streamline educational travel planning with AI-powered itinerary creation, accommodation booking, and group coordination tools.',
        },
        {
          title: 'STUDENT EXPERIENCE',
          description:
            'Enhance student trips with personalized recommendations, real-time updates, and interactive cultural learning experiences.',
        },
        {
          title: 'ADMINISTRATIVE TOOLS',
          description:
            'Simplify logistics with automated scheduling, budget management, risk assessment, and communication tools for faculty and staff.',
        },
      ]}
    />
  );
}
