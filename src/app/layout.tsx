import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-injected',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-injected',
  weight: ['400', '500', '600'],
});

const basePath = process.env.NODE_ENV === 'production' ? '/better-ktu-notes' : '';

export const metadata: Metadata = {
  metadataBase: new URL('https://ratherpixelate.github.io/better-ktu-notes/'),
  title: {
    default: 'BetterKTUNotes · KTU 2024 Scheme S3 Revision Studio',
    template: '%s · BetterKTUNotes',
  },
  description:
    'Syllabus-aligned revision notes, hardware architectures, and university PYQ patterns for KTU 2024 Scheme Semester 3 IT & CSE.',
  verification: {
    google: '62Y6TgvDOe7kKQfXWwdYuYnzZxeAMZkjKqErKv4UWQk',
  },
  openGraph: {
    title: 'BetterKTUNotes · KTU 2024 Scheme S3 Revision Studio',
    description:
      'Direct syllabus revision notes without textbook fluff for APJ Abdul Kalam Technological University (KTU) 2024 Scheme S3.',
    url: 'https://ratherpixelate.github.io/better-ktu-notes/',
    siteName: 'BetterKTUNotes',
    type: 'website',
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${basePath}/favicon.ico`, sizes: '32x32' },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('bkn-theme');var t=s;if(!t||(t!=='dark'&&t!=='light')){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BetterKTUNotes',
              url: 'https://ratherpixelate.github.io/better-ktu-notes/',
              description:
                'Syllabus-aligned revision notes and exam study material for APJ Abdul Kalam Technological University (KTU) 2024 Scheme Semester 3.',
              publisher: {
                '@type': 'Organization',
                name: 'BetterKTUNotes',
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
