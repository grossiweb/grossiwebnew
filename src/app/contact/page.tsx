import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to take your business to the next level? Let&apos;s discuss how we can help you achieve your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-600">contact@grossiweb.com</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-gray-600">404-228-8694<br/>888-476-7741</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">Atlanta, Georgia</p>
            </div>
          </div>
        </div>
      </main>
      
      <ContactForm />
      <Footer />
    </div>
  )
} 