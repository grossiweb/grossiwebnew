'use client'
import React from 'react'
import Link from 'next/link'

const services = [
  {
    id: '1',
    title: 'Strategy',
    shortDescription: 'The roadmap that turns your biggest goals into achievable milestones, giving you clarity, confidence, and a competitive edge.',
    icon: '/images/icons/Strategy.png',
    slug: 'interactive-marketing-strategy'
  },
  {
    id: '2',
    title: 'Design',
    shortDescription: 'First impressions that convert browsers into buyers, creating experiences so compelling that your customers can\'t help but engage.',
    icon: '/images/icons/design.png',
    slug: 'atlanta-web-design'
  },
  {
    id: '3',
    title: 'Development',
    shortDescription: 'Flawless execution that transforms strategy into fast, scalable, conversion-optimized digital experiences your customers love.',
    icon: '/images/icons/Development.png',
    slug: 'web-development'
  },
  {
    id: '4',
    title: 'Marketing',
    shortDescription: 'Attract your ideal customers, build authority in your market, and create content that turns attention into revenue.',
    icon: '/images/icons/Marketing.png',
    slug: 'digital-marketing'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-12">
      {/* Hero Background with Cover */}
      <div
        className="relative mb-12 md:mb-16 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url(/images/services-bg.png)',
          minHeight: '400px'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-2xl md:text-3xl font-bold text-white border-l-4 border-blue-500 pl-4"
            >
              Four Pillars That Drive Exponential Growth
            </h2>
            <p
              className="mt-14 text-base md:text-lg text-white/90 italic max-w-3xl"
            >
              &ldquo;Great businesses don&apos;t grow by accident. They grow from intentional strategy, seamless execution, and continuous optimization.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Services Title */}
      <div className="container mx-auto px-6 text-center mb-8 md:mb-10">
        <h2
          className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4 inline-block"
          style={{color: '#191e4e'}}
        >
          Our Services
        </h2>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 rounded-lg p-6 md:p-8"
              style={{backgroundColor: '#f8f9fa'}}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="h-14 w-auto mb-4 object-contain"
              />
              <h3
                className="text-2xl font-bold mb-3"
                style={{color: '#191e4e'}}
              >
                {service.title}
              </h3>
              <p
                className="text-base leading-relaxed text-gray-700 mb-4"
              >
                {service.shortDescription}
              </p>
              <Link
                href={`/${service.slug}/`}
                className="inline-flex items-center text-sm font-semibold transition-colors duration-200 hover:opacity-80"
                style={{color: '#287194'}}
              >
                Explore &raquo;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 