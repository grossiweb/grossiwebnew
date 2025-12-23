'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/wordpress';
import Header from './Header';
import Footer from './Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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