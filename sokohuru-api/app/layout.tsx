/**
 * Root Layout (API-only project)
 *
 * This is a minimal layout shell required by Next.js.
 * This project has NO UI pages - only API routes.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sokohuru API',
  description: 'API middleware for Sokohuru platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
