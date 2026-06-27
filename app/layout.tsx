import type {Metadata} from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Premium Grooming Studio',
  description: 'Crafted for the discerning gentleman',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-poppins bg-[#3B070A] text-[#E8D9C0] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
