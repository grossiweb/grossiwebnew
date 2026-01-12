'use client'
import React from 'react'
import Link from 'next/link'

const services = [
  {
    id: '1',
    title: 'Strategy',
    shortDescription: 'We come up with a master plan to help you grow, create, and reach your dream future with your clients.',
    icon: '/images/icons/Strategy.png',
    slug: 'interactive-marketing-strategy'
  },
  {
    id: '2',
    title: 'Design',
    shortDescription: 'We build awesome and memorable design experiences tailor-made for you and your clients.',
    icon: '/images/icons/design.png',
    slug: 'atlanta-web-design'
  },
  {
    id: '3',
    title: 'Development',
    shortDescription: 'Turn your ideas into life! Through coding and development we make sure your project becomes a memorable reality.',
    icon: '/images/icons/Development.png',
    slug: 'web-development'
  },
  {
    id: '4',
    title: 'Marketing',
    shortDescription: 'Winning results for your business is our goal. We help you build your ideal audience through high quality content.',
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
          backgroundImage: 'url(/images/services-bg.webp)',
          minHeight: '400px'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex justify-center">
            <h2
              className="text-2xl md:text-3xl font-bold text-white border-l-4 border-blue-500 pl-4"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              We focus on growing your business
            </h2>
          </div>
        </div>
      </div>

      {/* Services Title */}
      <div className="container mx-auto px-6 text-center mb-8 md:mb-10">
        <h2
          className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4 inline-block"
          style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
        >
          Our Services
        </h2>
      </div>

      {/* Services List */}
      <div className="space-y-0">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`}
            style={{backgroundColor: index % 2 === 1 ? '#f8f9fa' : '#ffffff'}}
          >
            <div className="container mx-auto px-6 py-10 md:py-12">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} flex justify-center lg:justify-start`}>
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="max-w-full h-auto"
                    style={{maxWidth: '250px'}}
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:pr-8' : 'lg:pl-8'} text-center lg:text-left`}>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-4"
                    style={{fontFamily: 'Poppins, sans-serif', color: '#191e4f'}}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-sm md:text-base mb-5 leading-relaxed text-gray-700"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-block text-sm font-semibold hover:underline transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif', color: '#287194'}}
                  >
                    View more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 