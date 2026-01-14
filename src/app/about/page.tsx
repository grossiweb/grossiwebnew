'use client'
import React from 'react'
import ContactForm from '@/components/ContactForm'
import FocusSection from '@/components/FocusSection'

const teamMembers = [
  { name: 'Ginseppe', role: 'Graphic Designer', image: '/team/Ginseppe.webp' },
  { name: 'Xiadei', role: 'Developer', image: '/team/Xiadei.webp' },
  { name: 'Micah', role: 'Graphic Designer', image: '/team/Micah.jpg' },
  { name: 'Michael', role: 'Copywriter', image: '/team/Michael.webp' },
  { name: 'Bhawini', role: 'Developer/Project Manager', image: '/team/Bhawini.webp' },
  { name: 'Stefeno', role: 'Business Developer', image: '/team/Stefeno.webp' }
]

export default function AboutPage() {
  const defaultHeroImageUrl = process.env.NEXT_PUBLIC_DEFAULT_HERO_IMAGE_URL || '/waterfall.webp'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <img
          src={defaultHeroImageUrl}
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1
              className="text-[42px] font-bold text-white leading-[1.05]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              About Us
            </h1>
            <p
              className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Elevating standards through building relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              The Grossi Web Team
            </h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto" style={{fontFamily: 'Poppins, sans-serif'}}>
              Grossi Web is a diverse and talented group of graphic designers, programmers, and marketing strategists. 
              Our small size allows us to really invest our time and passion into our clients.
            </p>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto" style={{fontFamily: 'Poppins, sans-serif'}}>
              We all love coming to work and helping our clients become more successful.
            </p>

            {/* Team Members Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Office Description */}
            <div className="bg-gray-50 rounded-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                Get to know our ultra modern &quot;tropical jungle&quot;
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                Our office loft is an environment conducive for creativity and diligent work ethic. However, when we aren&apos;t 
                creating beautiful money making empires for our select clients we can be found sailing paper airplanes off 
                the balcony towards Piedmont park and wrestling Xiaolei away from the espresso machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section - Using standard component */}
      <FocusSection />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
} 