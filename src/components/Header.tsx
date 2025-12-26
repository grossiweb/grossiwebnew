'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_MENU } from '@/lib/queries'

type MenuNode = {
  id?: string
  label: string
  url?: string | null
  path?: string | null
  parentId?: string | null
  target?: string | null
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const menuLocation = process.env.NEXT_PUBLIC_WP_MENU_LOCATION || 'PRIMARY'

  const { data: menuData } = useQuery(GET_MENU, {
    variables: { location: menuLocation },
    errorPolicy: 'ignore'
  })

  // Fallback menu items
  const fallbackMenuItems: MenuNode[] = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about-us/' },
    { label: 'Services', url: '/services/' },
    { label: 'Contact Us', url: '/contact-us/' },
    { label: 'Blog', url: '/blog/' }
  ]

  const wpMenuItems: MenuNode[] | undefined = menuData?.menuItems?.nodes
  const menuItems: MenuNode[] = wpMenuItems?.length ? wpMenuItems : fallbackMenuItems

  const normalizeHref = (item: MenuNode): string => {
    const raw = item.path || item.url || '/'

    // Prefer WPGraphQL `path` (already relative), else parse full URL.
    if (raw.startsWith('/')) {
      return raw !== '/' ? raw.replace(/\/+$/, '') : '/'
    }

    try {
      const u = new URL(raw)
      const pathname = u.pathname || '/'
      return pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
    } catch {
      return '/'
    }
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
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

          {/* Desktop nav intentionally hidden (menu opens only from hamburger) */}

          {/* Right side actions: CTA + Hamburger (hamburger next to CTA on desktop) */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link 
              href="#contact"
              className="hidden lg:inline-flex border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              Schedule a call →
            </Link>

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
                
                {menuItems.map((item: MenuNode, index: number) => (
                  <Link 
                    key={item.id || `${item.label}-${index}`}
                    href={normalizeHref(item)}
                    className="text-white text-2xl font-medium hover:text-blue-300 transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    onClick={() => setIsMenuOpen(false)}
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