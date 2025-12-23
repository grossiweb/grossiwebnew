'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_MENU } from '@/lib/queries'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const { data: menuData } = useQuery(GET_MENU, {
    variables: { location: 'PRIMARY' },
    errorPolicy: 'ignore'
  })

  // Fallback menu items
  const fallbackMenuItems = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Blog', url: '/blog' }
  ]

  const menuItems = menuData?.menuItems?.nodes || fallbackMenuItems

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <img 
                src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Group_6_1_.png"
                alt="Grossiweb"
                width={164}
                height={38}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex justify-end">
            <Link 
              href="#contact"
              className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              Schedule a call →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex justify-end">
            <button 
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-900 shadow-lg">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-6">
                <div className="mb-6">
                  <img 
                    src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Group_6_1_.png"
                    alt="Grossiweb"
                    width={149}
                    height={34}
                    className="h-8 w-auto"
                  />
                </div>
                
                {menuItems.map((item: any, index: number) => (
                  <Link 
                    key={index}
                    href={item.url || item.path || '/'}
                    className="text-white text-2xl font-medium hover:text-blue-300 transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 