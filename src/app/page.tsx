import React from 'react'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import BlogSection from '@/components/BlogSection'
import ClientsSection from '@/components/ClientsSection'
import TrustSection from '@/components/TrustSection'
import { GET_HOMEPAGE } from '@/lib/queries'
import { getWordPressData } from '@/lib/wordpress'

// Revalidate every 60 seconds — Vercel caches the page at the edge
export const revalidate = 60

export default async function HomePage() {
  let homepageData = null
  try {
    const data = await getWordPressData(GET_HOMEPAGE)
    homepageData = data?.page || null
  } catch {
    // Fallback: components handle missing data gracefully
  }

  return (
    <div className="min-h-screen">
      <Hero homepageData={homepageData} loading={false} />
      <ClientsSection />
      <TrustSection />
      <Services />
      <Testimonials />
      <BlogSection />
      <ContactForm />
    </div>
  )
} 