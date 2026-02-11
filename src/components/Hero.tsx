'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { WordPressPage } from '@/types/wordpress'

interface HeroProps {
  homepageData?: WordPressPage;
  loading?: boolean;
}

export default function Hero({ homepageData, loading = false }: HeroProps) {
  const [currentWord, setCurrentWord] = useState('Strategy')
  const [fadeClass, setFadeClass] = useState('opacity-100')
  const words = ['Strategy','Design','Development','Results']
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0')
      setTimeout(() => {
        setCurrentWord(prev => {
          const currentIndex = words.indexOf(prev)
          return words[(currentIndex + 1) % words.length]
        })
        setFadeClass('opacity-100')
      }, 1000)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Seamless loop: two videos crossfade so the restart is invisible
  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return

    // Start video A playing, B paused at 0
    a.play().catch(() => {})
    b.currentTime = 0

    let rafId: number
    const CROSSFADE = 0.8 // seconds to crossfade
    let bPlaying = false

    const tick = () => {
      if (a.duration && !a.paused) {
        const timeLeft = a.duration - a.currentTime

        // When A is about to end, start B underneath and fade A out
        if (timeLeft <= CROSSFADE) {
          if (!bPlaying) {
            b.currentTime = 0
            b.play().catch(() => {})
            bPlaying = true
          }
          a.style.opacity = `${timeLeft / CROSSFADE}`
        } else {
          a.style.opacity = '1'
        }
      }

      // When A ends, swap: B becomes the active layer, A resets underneath
      if (a.ended || (a.duration && a.currentTime >= a.duration - 0.05)) {
        if (bPlaying) {
          // Swap z-index: bring B to front, reset A behind
          b.style.zIndex = '2'
          a.style.zIndex = '1'
          a.style.opacity = '1'
          a.currentTime = 0
          a.pause()

          // Now monitor B for its loop
          bPlaying = false
          // Swap refs role by restarting with B as active
          const monitor = () => {
            if (b.duration && !b.paused) {
              const tl = b.duration - b.currentTime
              if (tl <= CROSSFADE) {
                if (!bPlaying) {
                  a.currentTime = 0
                  a.play().catch(() => {})
                  bPlaying = true
                }
                b.style.opacity = `${tl / CROSSFADE}`
              } else {
                b.style.opacity = '1'
              }
            }

            if (b.ended || (b.duration && b.currentTime >= b.duration - 0.05)) {
              if (bPlaying) {
                a.style.zIndex = '2'
                b.style.zIndex = '1'
                b.style.opacity = '1'
                b.currentTime = 0
                b.pause()
                bPlaying = false
              }
            }

            rafId = requestAnimationFrame(monitor)
          }
          rafId = requestAnimationFrame(monitor)
          return
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Dual Video Background for seamless loop */}
      <video
        ref={videoBRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <video
        ref={videoARef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 2 }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[80vh] pt-28 md:pt-0">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 leading-[1.1] md:leading-tight">
              We are
            </h1>

            <div className="flex items-baseline mb-4 md:mb-6">
              <h1
                className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] md:leading-tight transition-opacity duration-500 ${fadeClass}`}
              >
                {currentWord}
              </h1>
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] md:leading-tight ml-2 md:ml-4">
                Driven
              </span>
            </div>

            <p className="text-base md:text-lg mb-6 max-w-xl">
              When your online presence directly impacts your bottom line, you need a partner who turns digital strategy into measurable business growth.
            </p>

            <Link
              href="#services"
              className="hidden md:inline-block text-white text-sm font-medium hover:text-blue-300 transition-colors"
            >
              | SCROLL TO EXPLORE
            </Link>
          </div>
          
          {/* Right Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden mx-auto max-w-[344px]" >
              <div className="divide-y-2" style={{borderColor: '#191E4F'}}>
                <Link href="/interactive-marketing-strategy/" className="flex items-center space-x-4 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/icons/Group-1.png"
                      alt="Strategy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-900 font-semibold text-lg">Strategy</span>
                </Link>

                <Link href="/design/" className="flex items-center space-x-4 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/icons/Frame-1.png"
                      alt="Design"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-900 font-semibold text-lg">Design</span>
                </Link>

                <Link href="/development/" className="flex items-center space-x-4 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/icons/development-icon.png"
                      alt="Development"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-900 font-semibold text-lg">Development</span>
                </Link>

                <Link href="/internet-marketing/" className="flex items-center space-x-4 py-5 transition-colors group" style={{width: '85%', borderColor: '#191E4F',margin: '0 auto'}}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/icons/Frame-2.png"
                      alt="Marketing"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-900 font-semibold text-lg">Marketing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 