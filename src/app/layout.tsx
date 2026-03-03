import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asmaa Salem | أسماء سالم',
  description: 'Specialized life coaching through Luscher Color Test and MetaHealth | لايف كوتش متخصصة في اختبار لوشر والميتاهيلث',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
