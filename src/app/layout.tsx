import type { Metadata } from 'next'
import '../globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Grossiweb - Strategy Driven Web Solutions',
  description: 'We have the development aptitude to build exactly what you need. Strategy, Design, Development, Marketing.',
  keywords: 'web development, design, marketing, strategy, grossiweb',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 