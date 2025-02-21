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

export default function TermsOfService() {
  return (
    <div className="bg-black/95 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="mb-12 text-4xl font-book text-white opacity-0 translate-y-4 animate-fade-in">
          Terms of Service
        </h1>

        <Section index={0} title="1. Acceptance of Terms">
          <p>
            By using our Services, you agree to these Terms of Service. If you do not agree, do not use our Services.
          </p>
        </Section>

        <Section index={1} title="2. Description of Services">
          <p>
            GuestOS, operated by TravelMind, Inc. DBA GuestOS ("Company," "we," "us," or "our"), provides AI-powered 
            voice concierge and customer support services for hospitality businesses and other industries. The Services 
            include AI-driven call management, guest inquiries, and automation tools designed to enhance guest experiences 
            and streamline operations.
          </p>
        </Section>

        <Section index={2} title="3. User Accounts & Responsibilities">
          <p>If you create an account, you are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing accurate, up-to-date, and verified information at all times.</li>
            <li>Ensuring that all information provided on behalf of your organization, including emergency updates or operational data, is current, truthful, and correctly represents your organization.</li>
            <li>Maintaining the security of your account credentials.</li>
            <li>Ensuring that your use of the Services complies with applicable laws and regulations.</li>
            <li>Updating any critical information promptly, especially if your organization provides real-time data for public use.</li>
          </ul>
          <p className="mt-4">
            Unauthorized access to another user's account or any fraudulent activities related to the Services are strictly prohibited.
          </p>
        </Section>

        <Section index={3} title="4. Service Limitations & Disclaimers">
          <ul className="list-disc pl-6 space-y-2">
            <li>Our Services are provided "as is." We do not guarantee uninterrupted service or the accuracy of AI-generated responses.</li>
            <li>Our Services do not replace emergency services (e.g., 911). Users should always rely on official emergency channels when required.</li>
            <li>AI-generated guidance is based on available data sources and does not guarantee real-time updates or human-verified responses.</li>
          </ul>
        </Section>

        <Section index={4} title="5. Fees & Payments">
          <ul className="list-disc pl-6 space-y-2">
            <li>Pricing is outlined in agreements with hotels, businesses, and partners.</li>
            <li>Payments are due as specified in our billing terms.</li>
            <li>Failure to make timely payments may result in suspension or termination of Services.</li>
          </ul>
        </Section>

        <Section index={5} title="6. Intellectual Property">
          <p>
            All materials, software, and technologies associated with GuestOS remain the sole property of TravelMind, Inc. 
            Users are not granted any ownership rights beyond what is necessary for their use of the Services.
          </p>
        </Section>

        <Section index={6} title="7. Prohibited Uses">
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Services for illegal or fraudulent purposes.</li>
            <li>Reverse-engineer, copy, or misappropriate our technology.</li>
            <li>Interfere with or disrupt the integrity and security of the Services.</li>
          </ul>
        </Section>

        <Section index={7} title="8. Termination">
          <p>
            We reserve the right to suspend or terminate accounts violating these Terms or engaging in prohibited activities. 
            Users may terminate their accounts by contacting our support team.
          </p>
        </Section>

        <Section index={8} title="9. Data Collection & Consent">
          <p>
            We collect and use certain personal and operational data to provide and improve our Services. By using our Services, you consent to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The collection of personal information (e.g., name, email, contact details) to manage accounts and provide customer support.</li>
            <li>The processing of usage data (e.g., call logs, AI interactions) to enhance our platform.</li>
            <li>Opting into communications regarding product updates, service-related messages, and necessary system notifications.</li>
          </ul>
          <p className="mt-4">
            You may withdraw consent for data collection by contacting us. However, withdrawing consent may limit access to certain features.
          </p>
        </Section>

        <Section index={9} title="10. Force Majeure">
          <p>
            Neither party will be liable for failure or delay in performance due to causes beyond its reasonable control, 
            including but not limited to natural disasters, power failures, cyberattacks, labor disputes, and acts of government.
          </p>
        </Section>

        <Section index={10} title="11. Governing Law & Dispute Resolution">
          <p>
            These Terms and all matters arising out of or relating to them shall be governed by the laws of the State of Delaware, 
            United States, without regard to its conflict of laws provisions. Any disputes arising from or relating to these Terms 
            shall be resolved in the courts of the State of Delaware.
          </p>
        </Section>

        <Section index={11} title="12. Changes to Terms">
          <p>
            We may update these Terms from time to time. Continued use of the Services after updates constitutes acceptance of 
            the revised Terms.
          </p>
        </Section>

        <Section index={12} title="13. Contact Information">
          <p>
            For any questions regarding these Terms, email us at{' '}
            <a href="mailto:jessie@guestos.ai" className="text-accent-gold hover:text-accent-gold-dark transition-colors duration-300">
              jessie@guestos.ai
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
} 