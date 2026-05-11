import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: 'Sokohuru — Creator Marketplace for East Africa',
    template: '%s | Sokohuru',
  },
  description:
    'Connect brands with the right creators. Authentic campaigns, real results, East Africa first.',
  keywords: [
    'creator marketplace',
    'influencer marketing',
    'East Africa',
    'Kenya',
    'UGC',
    'brand deals',
    'affiliate',
  ],
  authors: [{ name: 'Sokohuru' }],
  creator: 'Sokohuru',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Sokohuru',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sokohuru',
    creator: '@sokohuru',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
