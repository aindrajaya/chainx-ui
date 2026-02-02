import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChainX - Security Tools',
  description:
    'Enhance your smart contract security and streamline API key management with ChainX. Our comprehensive tools provide robust protection and efficient control.',
  openGraph: {
    images: [
      {
        url: '/metadata/image-main.png', // Use your relative image path here
        width: 1200, // Adjust width as needed
        height: 630, // Adjust height as needed, common for social sharing
        alt: 'ChainX Security Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainX - Security Tools',
    description:
      'Enhance your smart contract security and streamline API key management with ChainX. Our comprehensive tools provide robust protection and efficient control.',
    images: ['/metadata/image-main.png', '/metadata/image-docs.png', '/metadata/image-second.png'], // Use your relative image path here
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}