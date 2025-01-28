
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

import { WishlistProvider } from './context/WishlistContext';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A Next.js app with Clerk authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
     <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      <html lang="en">
        <body className={inter.className}>
          <Header/>
         
          <WishlistProvider> {children} </WishlistProvider>
          <Footer/>

          
         
          </body>
      </html>
    </ClerkProvider>
  );
}