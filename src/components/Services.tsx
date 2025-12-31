'use client'
import React from 'react'
import Link from 'next/link'

const services = [
  {
    id: '1',
    title: 'Strategy',
    shortDescription: 'We come up with a master plan to help you grow, create, and reach your dream future with your clients.',
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Strategy.png',
    slug: 'interactive-marketing-strategy'
  },
  {
    id: '2',
    title: 'Design',
    shortDescription: 'We build awesome and memorable design experiences tailor-made for you and your clients.',
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/design.png',
    slug: 'atlanta-web-design'
  },
  {
    id: '3',
    title: 'Development',
    shortDescription: 'Turn your ideas into life! Through coding and development we make sure your project becomes a memorable reality.',
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Development.png',
    slug: 'web-development'
  },
  {
    id: '4',
    title: 'Marketing',
    shortDescription: 'Winning results for your business is our goal. We help you build your ideal audience through high quality content.',
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Marketing.png',
    slug: 'digital-marketing'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-16">
      {/* Hero Background with Cover */}
      <div 
        className="relative mb-16 md:mb-20 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url(https://newdesign.grossiweb.com/wp-content/uploads/2023/10/maskgroup.webp)',
          minHeight: '540px'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex justify-center">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white border-l-4 border-blue-500 pl-6"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              We focus on growing your business
            </h2>
          </div>
        </div>
      </div>

      {/* Services Title */}
      <div className="container mx-auto px-6 text-center mb-12 md:mb-14">
        <h2 
          className="text-3xl md:text-4xl font-bold text-blue-900 border-l-4 border-blue-500 pl-6 inline-block"
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
            style={{backgroundColor: index % 2 === 1 ? '#ebebeb' : '#ffffff'}}
          >
            <div className="container mx-auto px-6 py-14 md:py-16">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} flex justify-center lg:justify-start`}>
                  <img 
                    src={service.icon}
                    alt={service.title}
                    className="max-w-full h-auto"
                    style={{maxWidth: '300px'}}
                  />
                </div>
                
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:pr-12' : 'lg:pl-12'} text-center lg:text-left`}>
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-5"
                    style={{fontFamily: 'Poppins, sans-serif', color: '#191e4f'}}
                  >
                    {service.title}
                  </h3>
                  
                  <p 
                    className="text-base md:text-lg mb-7 leading-relaxed"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    {service.shortDescription}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-block text-blue-600 font-bold text-base md:text-lg hover:text-blue-700 transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif', color: '#287194'}}
                  >
                    View more &gt;
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