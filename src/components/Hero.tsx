'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { WordPressPage } from '@/types/wordpress'

interface HeroProps {
  homepageData?: WordPressPage;
  loading?: boolean;
}

export default function Hero({ homepageData, loading = false }: HeroProps) {
  const [currentWord, setCurrentWord] = useState('Development')
  const [fadeClass, setFadeClass] = useState('opacity-100')
  const words = ['Development', 'Design', 'Strategy', 'Results']
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setFadeClass('opacity-0')

      // Change word after fade out
      setTimeout(() => {
        setCurrentWord(prev => {
          const currentIndex = words.indexOf(prev)
          return words[(currentIndex + 1) % words.length]
        })
        // Fade in
        setFadeClass('opacity-100')
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Force video to play on mount (Safari fix)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
              We are
            </h1>

            <div className="flex items-baseline mb-6">
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-opacity duration-500 ${fadeClass}`}
                style={{fontFamily: 'Poppins, sans-serif', display: 'inline-block'}}
              >
                {currentWord}
              </h2>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ml-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                Driven
              </span>
            </div>

            <p className="text-base md:text-lg mb-6 max-w-xl" style={{fontFamily: 'Poppins, sans-serif'}}>
              We have the development aptitude to build exactly what you need.
            </p>

            <Link
              href="#services"
              className="inline-block text-white text-sm font-medium hover:text-blue-300 transition-colors"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              | SCROLL TO EXPLORE
            </Link>
          </div>
          
          {/* Right Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto" >
              <div className="divide-y-2" style={{borderColor: '#191E4F'}}>
                <Link href="/interactive-marketing-strategy/" className="flex items-center space-x-4 px-6 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <img
                    src="/images/icons/Group-1.png"
                    alt="Strategy"
                    className="w-6 h-7"
                  />
                  <span className="text-gray-900 font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Strategy</span>
                </Link>

                <Link href="/atlanta-web-design/" className="flex items-center space-x-4 px-6 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <img
                    src="/images/icons/Frame-1.png"
                    alt="Design"
                    className="w-9 h-6"
                  />
                  <span className="text-gray-900 font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Design</span>
                </Link>

                <Link href="/web-development/" className="flex items-center space-x-4 px-6 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <img
                    src="/images/icons/development-icon.png"
                    alt="Development"
                    className="w-8 h-8"
                  />
                  <span className="text-gray-900 font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Development</span>
                </Link>

                <Link href="/internet-marketing/" className="flex items-center space-x-4 px-6 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <img
                    src="/images/icons/Frame-2.png"
                    alt="Marketing"
                    className="w-7 h-7"
                  />
                  <span className="text-gray-900 font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Marketing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 