import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site-config';

/**
 * Typography: the brief prefers Satoshi, then Inter, then Manrope.
 * Satoshi is not a Google Font and no font files were present in the repo, so
 * Inter is loaded here as the reliable, self-hosted web font. If Satoshi
 * `.woff2` files are later added to public/fonts, declare an @font-face for it
 * and it will be picked up first via the `--font-sans` fallback chain.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description:
    'Luis Suarez turns complex problems into clear, useful digital products — connecting product thinking, experience design, and technology.',
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description:
      'Turning complex problems into clear, useful digital products.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#100416',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
