import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#14183E] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Company Info - Left Column */}
          <div className="md:col-span-6">
            <div className="mb-6">
              <img
                src="/images/logos/grossi-logo.png"
                alt="Grossiweb"
                width={164}
                height={38}
                className="h-10 w-auto"
              />
            </div>
            <p
              className="text-gray-300 mb-8 leading-relaxed max-w-xl"
              style={{fontSize: '15px'}}
            >
              We partner with ambitious businesses to create digital experiences that don&apos;t just look good; they drive revenue, build customer loyalty, and create sustainable competitive advantages. Your success is our obsession.
            </p>

            <div className="space-y-3">
              <p
                className="text-white"
                style={{fontSize: '15px'}}
              >
                404-228-8694
              </p>
              <p
                className="text-white"
                style={{fontSize: '15px'}}
              >
                888-476-7741
              </p>
              <p
                className="text-white mt-4"
                style={{fontSize: '15px'}}
              >
                support@grossiweb.com
              </p>
            </div>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3">
            <div className="flex items-start mb-6">
              <div className="w-1 h-6 bg-blue-400 mr-3"></div>
              <h4
                className="text-lg font-bold uppercase"
              >
                SERVICES
              </h4>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/interactive-marketing-strategy/"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/atlanta-web-design/"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/web-development/"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  href="/internet-marketing/"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Other Links Column */}
          <div className="md:col-span-3">
            <div className="flex items-start mb-6">
              <div className="w-1 h-6 bg-blue-400 mr-3"></div>
              <h4
                className="text-lg font-bold uppercase"
              >
                OTHER LINKS
              </h4>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white hover:text-blue-300 transition-colors"
                  style={{fontSize: '16px'}}
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-white text-sm"
              style={{fontSize: '14px'}}
            >
              © {new Date().getFullYear()} Grossi Consulting LLC. All rights reserved
            </p>

            <Link
              href="/privacy-policy/"
              className="text-white hover:text-blue-300 transition-colors text-sm flex items-center"
              style={{fontSize: '14px'}}
            >
              Privacy Policy
            </Link>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link href="https://www.facebook.com/people/GrossiWeb/100063803895706/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="https://x.com/GrossiWeb" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="https://my.linkedin.com/company/grossi-web" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
