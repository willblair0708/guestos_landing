export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  salary?: string;
  about: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  niceToHave?: string[];
  benefits?: string;
  gradient?: string;
}

export const jobs: JobListing[] = [
  {
    id: 'founding-engineer',
    title: 'Founding Engineer',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    about: 'GuestOS is reimagining how the hospitality industry connects with guests. Our AI-powered platform delivers personalized experiences that elevate satisfaction and unlock new revenue streams for hotels and destinations.',
    overview: "We're searching for a Senior Fullstack Engineer to lead the development of our platform end-to-end. In this hands-on role, you'll architect and build both the backend and frontend, integrating AI to deliver seamless guest experiences. You'll play a pivotal role in building scalable systems and working with technologies that power personalization, payments, and hospitality services.",
    responsibilities: [
      'Own the full product lifecycle: architecture, design, implementation, and deployment',
      'Build and maintain scalable backend systems to support personalized guest services and real-time communication',
      'Develop responsive, intuitive frontends for both guests and hotel staff',
      'Integrate AI-driven features for voice and SMS communication, guest personalization, and data collection',
      'Scale payment processing systems (e.g., Stripe) to handle bookings and upsells seamlessly as the platform grows',
      'Optimize the platform to meet growing demand, working with tools like AWS and Twilio',
      'Collaborate with industry experts and advisors to align the technical strategy with market needs',
    ],
    qualifications: [
      '2+ years of experience in full-stack development with proficiency in backend (e.g., Python, Node.js) and frontend frameworks (e.g., React, Vue.js)',
      'Experience building and delivering customer-facing applications from end to end',
      'Familiarity working with APIs and managed services and working on scalable solutions deployed in cloud environments',
      'Ability to write clean, maintainable code, and move fast to get things done in a dynamic startup environment',
      'Willingness to grind, problem-solve, and iterate quickly as the platform grows',
      'Based in San Francisco/Bay Area (preferred)',
    ],
    niceToHave: [
      'Experience building platforms in the hospitality or travel industry',
      'Familiarity with Twilio or similar tools for SMS and voice services',
      'Background in AI-driven personalization or recommendation systems',
      'Experience in real-time communication systems',
      'Experience with Gen AI applications, including prompt engineering, RAG, model providers, and self-hosted models',
      'Knowledge of payment processing systems (e.g., Stripe) and secure transaction handling',
      'Experience in designing and implementing scalable SaaS platforms',
      'Prior experience in a startup environment',
    ],
    benefits: "At GuestOS, you'll have the opportunity to shape the future of AI-powered guest experiences. You'll take full ownership of the technical roadmap and work closely with industry leaders as we scale. Plus, there's potential to grow into a CTO role in the near future. You'll also receive mentorship from C-level executives with past experience at companies like HotelTonight, StubHub, and VMware as we build something extraordinary.",
    gradient: 'from-[#03E87A] to-[#03E87A]/5',
  },
  {
    id: 'agent-engineer',
    title: 'Agent Engineer',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    about: "At GuestOS, we're reimagining the way hotels operate, creating tools that empower hospitality professionals to deliver exceptional guest experiences. Our vision is to simplify complex operations with seamless technology.",
    overview: "If you thrive in early-stage environments, love solving hard problems, and have a knack for elegant, efficient code, we'd love to hear from you. This is an opportunity to join a small but mighty team in San Francisco and have a direct impact on what we're building and how it evolves.",
    responsibilities: [
      'Build and Enhance GuestOS Agents: Expand the platform by developing new agents to meet operational needs',
      'Integrate with Industry Platforms: Design and implement integrations with third-party APIs',
      'Collaborate on Strategy and Features: Work closely with cross-functional teams',
      'Deliver Actionable Insights: Develop features that gather and process operational data',
      'Ensure Security and Compliance: Uphold high standards for data security and privacy',
    ],
    qualifications: [
      'API Integration Expertise: Experience integrating with third-party APIs',
      'Strong Technical Skills: Proficiency in programming languages such as Python, Java, or C++',
      'Knowledge of Hotel Operations: Familiarity with Property Management Systems (PMS)',
      'Problem-Solving Mindset: Proven ability to troubleshoot complex systems',
      'Team Player: Experience working collaboratively in a dynamic environment',
      'Adaptability: Comfortable with shifting priorities in an early-stage startup',
      'Clear Communicator: Ability to explain technical concepts clearly',
    ],
    benefits: "Join a talented, mission-driven team in a hybrid setup in San Francisco. You'll have ownership and impact, with your work directly shaping the future of GuestOS and redefining how hotels operate. We offer growth opportunities and the chance to work on meaningful challenges with plenty of room for personal and professional development.",
    gradient: 'from-[#FFB443] to-[#FFB443]/5',
  },
];
