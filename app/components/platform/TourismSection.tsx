import ProductSection from './ProductSection';

interface LumenSectionProps {
  id: string;
  bgColor: string;
}

export default function TourismSection({ id, bgColor }: LumenSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName="Tourism & Attractions"
      productDescription="Transform visitor experiences with AI-powered solutions that enhance engagement and optimize operations."
      imageSrc="/assets/platform/tourism-hero.webp"
      features={[
        {
          title: "VISITOR EXPERIENCE",
          description: "Create immersive experiences:",
          bulletPoints: [
            "AI-powered recommendations",
            "Interactive digital guides",
            "Real-time attraction updates",
            "Virtual queuing system",
            "Augmented reality features"
          ]
        },
        {
          title: "DESTINATION MANAGEMENT",
          description: "Optimize operations with smart tools:",
          bulletPoints: [
            "Capacity optimization",
            "Dynamic pricing",
            "Local business integration",
            "Sustainability metrics",
            "Cultural experience curation"
          ]
        }
      ]}
    />
  );
}
