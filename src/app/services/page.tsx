import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Services from '@/components/Services'

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business grow and thrive in the modern marketplace.
            </p>
          </div>
        </div>
      </main>
      
      <Services />
      <Footer />
    </div>
  )
} 