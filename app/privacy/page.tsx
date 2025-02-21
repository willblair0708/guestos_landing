'use client';

import { useEffect } from 'react';

const Section = ({ title, children, index }: { title: string; children: React.ReactNode; index: number }) => (
  <div 
    className="mb-12 opacity-0 translate-y-4 animate-fade-in"
    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
  >
    <h2 className="mb-4 text-xl font-medium text-white">{title}</h2>
    <div className="prose prose-invert max-w-none text-neutral-400">
      {children}
    </div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="bg-black/95 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="mb-12 text-4xl font-book text-white opacity-0 translate-y-4 animate-fade-in">
          Privacy Policy
        </h1>

        <Section index={0} title="1. Introduction">
          <p>
            Welcome to GuestOS, operated by TravelMind, Inc. DBA GuestOS ("Company," "we," "us," or "our"). 
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your 
            information when you use our AI-powered voice concierge services and related products (collectively, 
            the "Services").
          </p>
        </Section>

        <Section index={1} title="2. Information We Collect">
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Personal Information:</strong> When you interact with our Services, 
              we may collect your name, contact details, hotel reservation details, payment information, and any 
              preferences you provide.
            </li>
            <li>
              <strong className="text-white">Usage Data:</strong> We collect data about how you interact with our 
              Services, including call logs, voice interactions, guest requests, and support inquiries.
            </li>
            <li>
              <strong className="text-white">Device and Technical Data:</strong> Information such as IP addresses, 
              browser types, operating systems, and device identifiers to enhance our Services.
            </li>
            <li>
              <strong className="text-white">Third-Party Data:</strong> We may receive data from hotel partners, 
              emergency response agencies, or integrations you authorize.
            </li>
            <li>
              <strong className="text-white">Sensitive Information:</strong> We do not intentionally collect 
              sensitive data such as social security numbers, government IDs, or financial account details unless 
              required for a specific service and with explicit consent.
            </li>
          </ul>
        </Section>

        <Section index={2} title="3. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our AI-powered concierge and crisis response services.</li>
            <li>Respond to guest inquiries and enhance hospitality operations.</li>
            <li>Book experiences and process transactions to enhance guest experiences.</li>
            <li>Improve service performance, develop new features, and optimize AI accuracy.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Provide critical information during emergencies, connect users with verified resources, and facilitate communication with relevant agencies when applicable.</li>
            <li>Prevent fraud, enforce our terms, and maintain security.</li>
          </ul>
        </Section>

        <Section index={3} title="4. Data Sharing and Disclosure">
          <p>
            We do not sell your personal data. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Hospitality Partners:</strong> To facilitate guest services and enhance your stay experience.
            </li>
            <li>
              <strong className="text-white">Public Sector and Crisis Response Entities:</strong> When relevant to providing critical support and emergency assistance.
            </li>
            <li>
              <strong className="text-white">Service Providers:</strong> Who assist us in delivering our Services (e.g., cloud hosting, analytics, and payment processing providers).
            </li>
            <li>
              <strong className="text-white">Legal Authorities:</strong> If required by law, in response to a valid legal request, or to protect our rights, security, and property.
            </li>
            <li>
              <strong className="text-white">Corporate Transactions:</strong> If we undergo a business transaction such as a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
            </li>
          </ul>
        </Section>

        <Section index={4} title="5. Data Security & Retention">
          <p>
            We use industry-standard security measures to protect your data from unauthorized access, disclosure, or loss. 
            Information is retained only as long as necessary for operational, legal, and compliance purposes. If you request 
            data deletion, we will honor the request unless retention is required for legal or security reasons.
          </p>
        </Section>

        <Section index={5} title="6. Your Rights & Choices">
          <p>
            Depending on your location and applicable laws, you may have rights regarding your personal data. These may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Access & Correction:</strong> You may request a copy of the personal data we hold about you and request corrections if necessary.
            </li>
            <li>
              <strong className="text-white">Data Deletion:</strong> In certain cases, you may request the deletion of your personal data, subject to legal and operational limitations.
            </li>
            <li>
              <strong className="text-white">Opt-Out of Marketing:</strong> You may opt-out of receiving marketing communications at any time by following the instructions in our emails or contacting us.
            </li>
            <li>
              <strong className="text-white">Restrict Processing:</strong> Under some circumstances, you may have the right to request that we limit how we use your data.
            </li>
            <li>
              <strong className="text-white">Data Portability:</strong> If required by law, we can provide a machine-readable copy of your personal data upon request.
            </li>
            <li>
              <strong className="text-white">Withdraw Consent:</strong> If we rely on your consent to process data, you may withdraw it at any time without affecting the lawfulness of prior processing.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please email us at{' '}
            <a href="mailto:contact@guestos.ai" className="text-accent-gold-light hover:underline">
              contact@guestos.ai
            </a>
            .
          </p>
        </Section>

        <Section index={6} title="7. Cookies & Tracking Technologies">
          <p>
            We use cookies and similar tracking technologies to enhance user experience, analyze usage, and provide 
            personalized services. You can manage cookie settings through your browser preferences.
          </p>
        </Section>

        <Section index={7} title="8. International Data Transfers">
          <p>
            If you access our Services from outside the United States, your information may be transferred and stored 
            in jurisdictions with different data protection laws. By using our Services, you consent to such transfers.
          </p>
        </Section>

        <Section index={8} title="9. Updates to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be available on our website. 
            Continued use of the Services after updates constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section index={9} title="10. Contact Information">
          <p>
            For any questions regarding this Privacy Policy, email us at{' '}
            <a href="mailto:contact@guestos.ai" className="text-accent-gold-light hover:underline">
              contact@guestos.ai
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
} 