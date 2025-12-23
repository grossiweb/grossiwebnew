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
  const { data, loading, error } = useQuery(GET_HOMEPAGE);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;

  return (
    <div className="min-h-screen">
      <Hero homepageData={data?.page} />
      <ClientsSection />
      <TrustSection />
      <Services />
      <Testimonials />
      <BlogSection />
      <ContactForm />
    </div>
  )
} 