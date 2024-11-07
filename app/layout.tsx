import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

import CookieBanner from '@/app/components/CookieBanner';

import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://guestos.ai'),
  title: 'GuestOS | The AI Concierge for Hospitality',
  description:
    'GuestOS is the leading AI concierge platform designed for the hospitality industry, offering 24/7 multilingual support and personalized guest experiences.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: 'index, follow',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  twitter: {
    card: 'summary_large_image',
    site: '@guestosai',
    creator: '@guestosai',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'GuestOS - The AI Concierge for Hospitality',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guestos.ai',
    siteName: 'GuestOS',
    title: 'GuestOS | The AI Concierge for Hospitality',
    description:
      'GuestOS is the leading AI concierge platform designed for the hospitality industry, offering 24/7 multilingual support and personalized guest experiences.',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'GuestOS - The AI Concierge for Hospitality',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`scroll-smooth bg-[#000000] ${roboto.className}`}
    >
      {/* GA Script with default denied consent */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  // Default consent mode setup
                  gtag('consent', 'default', {
                    analytics_storage: 'denied'
                  });

                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
        }}
      />
      <body className='bg-background-light text-primary antialiased'>
        <div className='flex min-h-screen flex-col'>
          <Toaster />
          <main className='flex-grow'>{children}</main>
        </div>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
