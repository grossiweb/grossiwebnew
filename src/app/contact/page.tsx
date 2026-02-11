import React from 'react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const defaultHeroImageUrl = process.env.NEXT_PUBLIC_DEFAULT_HERO_IMAGE_URL || '/waterfall.webp'

  return (
    <div className="min-h-screen">
      {/* Hero header (matches dynamic page style) */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        {defaultHeroImageUrl ? (
          <>
            <img
              src={defaultHeroImageUrl}
              alt="Contact Us"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          </>
        )}

        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1
              className="text-[42px] font-bold text-white leading-[1.05]"
            >
              Contact Us
            </h1>
            <p
              className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
            >
              Ready to take your business to the next level? Let&apos;s discuss how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-gray-600">
                404-228-8694
                <br />
                888-476-7741
              </p>
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
      </section>

      <ContactForm />
    </div>
  )
} 