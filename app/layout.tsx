import '@/app/ui/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Orders SaaS',
    default: 'Orders SaaS',
  },
  description: 'Your tailored solution for small retailers\' order management needs. Simplify order processing, tracking, inventory management, and fulfillment. Ideal for small-scale retail businesses looking to streamline operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>      
    </html>
  );
}
