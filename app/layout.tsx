import type { Metadata } from "next";
import "./globals.css";
// import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}