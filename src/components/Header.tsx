'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_MENU, GET_MENU_BY_ID } from '@/lib/queries'

type MenuNode = {
  id?: string
  label: string
  url?: string | null
  path?: string | null
  parentId?: string | null
  target?: string | null
}

type MenuItemWithChildren = MenuNode & {
  children: MenuItemWithChildren[]
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  
  const menuLocation = process.env.NEXT_PUBLIC_WP_MENU_LOCATION || 'PRIMARY'
  const menuId = process.env.NEXT_PUBLIC_WP_MENU_ID

  // Prefer fetching by Menu database ID when provided (e.g. "3")
  const { data: menuByIdData } = useQuery(GET_MENU_BY_ID, {
    variables: { id: menuId as string },
    skip: !menuId,
    errorPolicy: 'ignore', // Ignore errors and use fallback menu
    fetchPolicy: 'cache-first', // Use cache to avoid repeated failures
  })

  // Otherwise, fall back to fetching by theme location (PRIMARY, etc.)
  const { data: menuByLocationData } = useQuery(GET_MENU, {
    variables: { location: menuLocation },
    skip: !!menuId,
    errorPolicy: 'ignore', // Ignore errors and use fallback menu
    fetchPolicy: 'cache-first', // Use cache to avoid repeated failures
  })

  // Fallback menu items
  const fallbackMenuItems: MenuNode[] = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about-us/' },
    { label: 'Services', url: '/services/' },
    { label: 'Contact Us', url: '/contact-us/' },
    { label: 'Blog', url: '/blog/' }
  ]

  const wpMenuItems: MenuNode[] | undefined =
    menuByIdData?.menu?.menuItems?.nodes || menuByLocationData?.menuItems?.nodes
  const flatMenuItems: MenuNode[] = wpMenuItems?.length ? wpMenuItems : fallbackMenuItems

  // Build hierarchical menu structure
  const buildMenuTree = (items: MenuNode[]): MenuItemWithChildren[] => {
    const itemMap = new Map<string, MenuItemWithChildren>()
    const roots: MenuItemWithChildren[] = []

    // First pass: create all items with empty children arrays
    items.forEach((item, index) => {
      const id = item.id || `item-${index}`
      itemMap.set(id, { ...item, id, children: [] })
    })

    // Second pass: build parent-child relationships
    items.forEach((item, index) => {
      const id = item.id || `item-${index}`
      const menuItem = itemMap.get(id)!

      if (item.parentId && itemMap.has(item.parentId)) {
        const parent = itemMap.get(item.parentId)!
        parent.children.push(menuItem)
      } else {
        roots.push(menuItem)
      }
    })

    return roots
  }

  const menuItems = buildMenuTree(flatMenuItems)

  // Log menu source for debugging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (menuByIdData?.menu?.menuItems?.nodes?.length) {
        console.log(`✅ Menu loaded from WordPress ID ${menuId}:`, menuByIdData.menu.menuItems.nodes)
      } else if (menuByLocationData?.menuItems?.nodes?.length) {
        console.log(`✅ Menu loaded from WordPress location ${menuLocation}:`, menuByLocationData.menuItems.nodes)
      } else {
        console.log('⚠️ Using fallback menu items (WordPress menu not found)')
      }
    }
  }, [menuByIdData, menuByLocationData, menuId, menuLocation])

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
                src="/images/logos/grossi-logo.png"
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
          className="fixed inset-0 z-[60]"
          style={{backgroundColor: '#191E4F'}}
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
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/" className="inline-block" onClick={() => setIsMenuOpen(false)}>
                    <img
                      src="/images/logos/grossi-logo.png"
                      alt="Grossiweb"
                      width={164}
                      height={38}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

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
                {menuItems.map((item: MenuItemWithChildren, index: number) => (
                  <div key={item.id || `${item.label}-${index}`} className="relative">
                    {item.children.length > 0 ? (
                      <>
                        <button
                          type="button"
                          className="text-white text-3xl md:text-4xl font-semibold hover:text-blue-200 transition-colors flex items-center gap-3"
                          style={{fontFamily: 'Poppins, sans-serif'}}
                          onClick={() => setOpenSubmenu(openSubmenu === item.id ? null : item.id || null)}
                          onMouseEnter={() => setOpenSubmenu(item.id || null)}
                        >
                          {item.label}
                          <svg
                            className={`w-6 h-6 transition-transform duration-200 ${openSubmenu === item.id ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openSubmenu === item.id && (
                          <div
                            className="mt-4 ml-6 flex flex-col space-y-4"
                            onMouseLeave={() => setOpenSubmenu(null)}
                          >
                            {item.children.map((child: MenuItemWithChildren, childIndex: number) => (
                              <Link
                                key={child.id || `${child.label}-${childIndex}`}
                                href={normalizeHref(child)}
                                className="text-white text-xl md:text-2xl font-medium hover:text-blue-200 transition-colors"
                                style={{fontFamily: 'Poppins, sans-serif'}}
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setOpenSubmenu(null)
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={normalizeHref(item)}
                        className="text-white text-3xl md:text-4xl font-semibold hover:text-blue-200 transition-colors"
                        style={{fontFamily: 'Poppins, sans-serif'}}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
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