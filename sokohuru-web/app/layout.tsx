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
  title: {
    default: "Sokohuru — Creator Marketplace for East Africa",
    template: "%s | Sokohuru",
  },
  description: "Connect with verified East African creators. Launch UGC, affiliate, and ambassador campaigns in minutes. Trusted by brands across Kenya, Nigeria, and South Africa.",
  keywords: ["creator marketplace", "influencer marketing Kenya", "UGC campaigns Africa", "brand deals East Africa", "creator partnerships", "influencer platform"],
  openGraph: {
    siteName: "Sokohuru",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    site: "@sokohuru",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md"
          style={{
            background: 'var(--sk-pink)',
            color: '#FFFFFF',
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
