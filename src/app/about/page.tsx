'use client'
import React from 'react'
import ContactForm from '@/components/ContactForm'

const teamMembers = [
  { name: 'Ginseppe', role: 'Graphic Designer', image: '/team/Ginseppe.webp' },
  { name: 'Xiadei', role: 'Developer', image: '/team/Xiadei.webp' },
  { name: 'Micah', role: 'Graphic Designer', image: '/team/Micah.jpg' },
  { name: 'Michael', role: 'Copywriter', image: '/team/Michael.webp' },
  { name: 'Bhawini', role: 'Developer/Project Manager', image: '/team/Bhawini.webp' },
  { name: 'Stefeno', role: 'Business Developer', image: '/team/Stefeno.webp' }
]

const testimonials = [
  {
    name: 'Jason & Kelli',
    company: 'Buckhead Imports',
    text: 'We have recommended GrossiWeb to several people looking to build a useful, user friendly website. They were so helpful and had so many brilliant ideas! And the level of customer service is top notch. They are always just an email or phone call away. We highly recommend using their website services.'
  },
  {
    name: 'Mike Lewis',
    company: 'Modern Hook',
    text: 'My working experience with Grossi Web was a very good one. I work with a lot of web development teams that have an easy time talking about what you want but not being able to pull it off. That was not the case with Grossi Web. There was good communication throughout the process and they were able to pull off what they promised.'
  },
  {
    name: 'Michelle',
    company: 'Beau Kaye & Associates',
    text: 'I had been approached by multiple so called experts marketing legal websites, I decided to give Grossi Web Consulting a shot and they quickly designed a powerful and elegant presentation and best of all, I was on all the major search engines in a matter of days. Now the clients that are looking for us can easily find us.'
  },
  {
    name: 'Rhia',
    company: 'Athens Language Schoolhouse',
    text: 'I am fortunate to have found Grossi Web to construct my website and help me realize my marketing strategy and look! Grossi Web listened to my ideas and created the perfect end result. The process was made easy for me allowing me creative freedom without stress. Grossi Web worked fast, producing a professional and stunning website. I am so pleased with Grossi Web!'
  },
  {
    name: 'Thay',
    company: 'Humes McCoy Aviation',
    text: 'Thanks to the Talent and Professionalism of GrossiWeb, I have turned a dream into a successful aviation company. I continuously receive compliments on the corporate site and AirExpress® brand. GrossiWeb developed a highly targeted marketing campaign that has resulted in international exposure and attaining clients who were previously unreachable!'
  },
  {
    name: 'Bob',
    company: 'Dorfman Capital',
    text: 'I had been courting a high profile business prospect, but after a few months my prospect was becoming increasingly distant. One morning after I had made some follow up calls, my prospect called me right back stating he had seen a news story about my company on Yahoo news. This is the type of instant gratification and credibility I have experienced working with Grossi Web.'
  }
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

      {/* Focus Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-16" style={{fontFamily: 'Poppins, sans-serif'}}>
              We focus on aspects that matter to your business<br />
              <span className="text-blue-600">That&apos;s what makes our clients happy</span>
            </h2>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-left">
                    <h4 className="font-bold text-lg text-gray-900 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-4 font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {testimonial.company}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
} 