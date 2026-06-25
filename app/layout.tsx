import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Identity Audit Protocol — Soy Consciencia Elevada',
  description:
    '20-question diagnostic that names the exact identity mechanism blocking your execution. Personalized report delivered to your inbox. $37 — 7-day full refund.',
  alternates: {
    canonical: 'https://sce-identity-audit.vercel.app/',
  },
  openGraph: {
    title: 'Identity Audit Protocol — Soy Consciencia Elevada',
    description:
      '20 structured questions. One personalized diagnostic report. The exact mechanism driving your execution failures — identified, mapped, and linked to a clear direction.',
    type: 'website',
    siteName: 'Soy Consciencia Elevada',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Identity Audit Protocol — SCE',
    description:
      '20 structured questions. One personalized diagnostic report. The exact mechanism driving your execution failures — identified.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Identity Audit Protocol',
  description:
    'A 20-question diagnostic assessment that identifies the specific identity mechanism blocking your execution.',
  brand: { '@type': 'Brand', name: 'Soy Consciencia Elevada' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard',
      price: '37.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://whop.com/soy-consciencia-elevada/identity-audit-protocol-cc/',
    },
    {
      '@type': 'Offer',
      name: 'VIP — Identity Integration Protocol',
      price: '97.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://whop.com/soy-consciencia-elevada/identity-integration-protocol-62/',
    },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '6' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
