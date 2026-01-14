'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/wordpress';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Dynamically load wp-style.css only if not on home page
    if (!isHomePage) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/wp-style.css';
      link.id = 'wp-style';
      document.head.appendChild(link);

      return () => {
        // Cleanup: remove the stylesheet when navigating away or component unmounts
        const existingLink = document.getElementById('wp-style');
        if (existingLink) {
          existingLink.remove();
        }
      };
    } else {
      // Remove wp-style.css if it exists and we're on home page
      const existingLink = document.getElementById('wp-style');
      if (existingLink) {
        existingLink.remove();
      }
    }
  }, [isHomePage]);

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </ApolloProvider>
  );
}