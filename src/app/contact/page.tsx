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
          </>
        ) : (
          <>
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

      <ContactForm />
    </div>
  )
} 