'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  const defaultHeroImageUrl = process.env.NEXT_PUBLIC_DEFAULT_HERO_IMAGE_URL || '/waterfall.webp'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <Image
          src={defaultHeroImageUrl}
          alt="404 Not Found"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1
              className="text-[42px] font-bold text-white leading-[1.05] mb-4"
            >
              404
            </h1>
            <p
              className="text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
            >
              Page not found
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Oops! We couldn&apos;t find that page
            </h2>
            <p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 text-white rounded-md transition-all duration-300 font-semibold"
                style={{ backgroundColor: '#287194' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a75'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#287194'}
              >
                Go to Homepage
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 text-gray-700 rounded-md hover:bg-gray-50 transition-all duration-300 font-semibold"
                style={{ borderColor: '#287194', color: '#287194' }}
              >
                Contact Us
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3
                className="text-xl font-bold text-gray-900 mb-6"
              >
                Quick Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/interactive-marketing-strategy/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Strategy
                </Link>
                <Link
                  href="/design/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Design
                </Link>
                <Link
                  href="/development/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Development
                </Link>
                <Link
                  href="/internet-marketing/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Marketing
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
