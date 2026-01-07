'use client';

import React from 'react'
import { useQuery } from '@apollo/client'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import BlogSection from '@/components/BlogSection'
import ClientsSection from '@/components/ClientsSection'
import TrustSection from '@/components/TrustSection'
import { GET_HOMEPAGE } from '@/lib/queries'

export default function HomePage() {
  // Fetch WordPress data but don't block rendering on errors
  const { data, loading, error } = useQuery(GET_HOMEPAGE, {
    errorPolicy: 'ignore', // Ignore GraphQL errors and use fallback data
    fetchPolicy: 'cache-first', // Use cache if available
  });

  // Always render the page - components will handle their own fallbacks
  return (
    <div className="min-h-screen">
      <Hero homepageData={data?.page} loading={loading} />
      <ClientsSection />
      <TrustSection />
      <Services />
      <Testimonials />
      <BlogSection />
      <ContactForm />
    </div>
  )
} 