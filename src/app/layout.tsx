import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'أسماء سالم | لايف كوتش',
  description: 'Life coaching through Luscher Color Test and MetaHealth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
