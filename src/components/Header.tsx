'use client'
import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!isMenuOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

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
              aria-expanded={isMenuOpen}
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
      </div>

      {/* Full-screen Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-blue-900"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Backdrop click closes */}
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative h-full w-full">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <img 
                  src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Group_6_1_.png"
                  alt="Grossiweb"
                  width={149}
                  height={34}
                  className="h-8 w-auto"
                />

                {/* Explicit X close button */}
                <button
                  type="button"
                  className="text-white p-2"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-12 flex flex-col space-y-7">
                {menuItems.map((item: MenuNode, index: number) => (
                  <Link 
                    key={item.id || `${item.label}-${index}`}
                    href={normalizeHref(item)}
                    className="text-white text-3xl md:text-4xl font-semibold hover:text-blue-200 transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-14">
                <Link
                  href="#contact"
                  className="inline-flex border-2 border-white text-white px-7 py-3 rounded-md hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schedule a call →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 