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
