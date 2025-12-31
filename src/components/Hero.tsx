'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { WordPressPage } from '@/types/wordpress'

interface HeroProps {
  homepageData?: WordPressPage;
}

export default function Hero({ homepageData }: HeroProps) {
  const [currentWord, setCurrentWord] = useState('Strategy')
  const words = ['Strategy', 'Design', 'Development', 'Results']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => {
        const currentIndex = words.indexOf(prev)
        return words[(currentIndex + 1) % words.length]
      })
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="https://newdesign.grossiweb.com/wp-content/uploads/2025/03/1-3.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Poppins, sans-serif', lineHeight: '0.1'}}>
              {homepageData?.title || "We are"}
            </h2>
            
            <div className="flex items-center text-4xl md:text-6xl font-bold mb-8" style={{fontFamily: 'Poppins, sans-serif'}}>
              <div className="inline-block overflow-hidden transition-all duration-300 ease-in-out">
                <div className="animate-fade-in">{currentWord}</div>
              </div>
              <span className="ml-4">Driven</span>
            </div>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl" style={{fontFamily: 'Poppins, sans-serif'}}>
              We have the development aptitude to build exactly what you need.
            </p>
            
            <Link 
              href="#services"
              className="inline-block text-white font-bold hover:text-blue-300 transition-colors"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              | SCROLL TO EXPLORE
            </Link>
          </div>
          
          {/* Right Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
              <div className="space-y-4">
                <Link href="/interactive-marketing-strategy/" className="flex items-center space-x-4 py-3 border-b-2 border-blue-900 hover:bg-gray-50 transition-colors">
                  <img 
                    src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Group-1.png" 
                    alt="Strategy"
                    className="w-6 h-8"
                  />
                  <span className="text-blue-900 font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Strategy</span>
                </Link>
                
                <Link href="/atlanta-web-design/" className="flex items-center space-x-4 py-3 border-b-2 border-blue-900 hover:bg-gray-50 transition-colors">
                  <img 
                    src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-1.png" 
                    alt="Design"
                    className="w-10 h-6"
                  />
                  <span className="text-blue-900 font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Design</span>
                </Link>
                
                <Link href="/web-development/" className="flex items-center space-x-4 py-3 border-b-2 border-blue-900 hover:bg-gray-50 transition-colors">
                  <img 
                    src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/development-icon.png" 
                    alt="Development"
                    className="w-9 h-9"
                  />
                  <span className="text-blue-900 font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Development</span>
                </Link>
                
                <Link href="/internet-marketing/" className="flex items-center space-x-4 py-3 hover:bg-gray-50 transition-colors">
                  <img 
                    src="https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-2.png" 
                    alt="Marketing"
                    className="w-8 h-8"
                  />
                  <span className="text-blue-900 font-bold" style={{fontFamily: 'Poppins, sans-serif'}}>Marketing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 