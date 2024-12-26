import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gratuit Streaming - Voir tous les films en streaming gratuitement',
  description: 'Regardez les derniers films en streaming gratuit sur Gratuit Streaming',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL
  },
  verification: {
    google: '4-5C23ti3KbFzOsKJu6eEd8y8pOALOIuHgcsTEj9Rm0'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-black to-gray-900 min-h-screen text-white`}>
        <Header />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}