import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
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
