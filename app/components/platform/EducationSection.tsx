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
      productName='Hospitality Education'
      productDescription='Next-generation tools for hospitality schools and training programs.'
      imageSrc='/assets/products/seraph.webp'
      features={[
        {
          title: 'INTERACTIVE LEARNING',
          description:
            'Deliver engaging hospitality education through virtual simulations, interactive scenarios, and real-world case studies.',
        },
        {
          title: 'SKILLS DEVELOPMENT',
          description:
            'Provide hands-on training with industry-standard tools and AI-powered feedback systems that prepare students for real hospitality environments.',
        },
        {
          title: 'INDUSTRY CONNECTION',
          description:
            'Bridge education and industry with internship matching, career guidance, and direct connections to hospitality employers.',
        },
      ]}
    />
  );
}
