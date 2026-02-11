'use client'
import React from 'react'
import ContactForm from '@/components/ContactForm'
import FocusSection from '@/components/FocusSection'

const teamMembers = [
  { name: 'Stefano', role: 'Business Developer', image: '/team/Stefano.png' },
  { name: 'Daniel', role: 'Account Manager', image: '/team/Daniel.png' },
  { name: 'Zhisiel', role: 'Project Manager', image: '/team/Zhisiel.png' },
  { name: 'Mujahid', role: 'Senior Developer', image: '/team/Mujahid.png' },
  { name: 'Manuel', role: 'Search Specialist', image: '/team/Manuel.png' },
  { name: 'Mayank', role: 'Developer', image: '/team/Mayank.png' },
  { name: 'Angelina', role: 'Content Creator', image: '/team/Angelina.png' },
]

const processSteps = [
  {
    number: '01',
    title: '15 Minutes Consultation',
    description:
      'We will schedule a quick 15-minute call with you to understand what you need to unlock the full potential of your business.',
  },
  {
    number: '02',
    title: 'Project Proposal',
    description:
      'After we got every output from you, we will prepare a proposal for you. If you agree with our pricing and timeline, we are all set to take off.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'Our team gets to work bringing your vision to life with strategy, design, development, and marketing tailored to your goals.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <img
          src="/about_hero.png"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-[42px] font-bold text-white leading-[1.05]">
              About Us
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed">
              We don&apos;t just build websites; we build growth engines. We focus on your ROI.
            </p>
          </div>
        </div>
      </section>

      {/* The Minds Behind Your Growth + Team */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold border-l-4 border-blue-500 pl-4 inline-block"
              style={{ color: '#191e4e' }}
            >
              The Minds Behind Your <span style={{ color: '#287194' }}>Growth</span>
            </h2>
          </div>

          {/* Intro Text */}
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-lg leading-relaxed text-gray-600">
              We are a specialized crew of Strategists, Developers, and Creatives who treat your business as if it were our own.
              Our approach is built on deep relationships and the shared passion we bring to the office every single day.
              We invest ourselves fully into every project, building high-impact growth engines that move the needle on your revenue.
              When you work with GrossiWeb, you&apos;re getting a dedicated partner who dares to be different and walks the entire journey with you.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-[3/4] w-full max-w-[220px] mx-auto mb-4 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: '#191e4e' }}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Description + Gallery */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 border-l-4 border-blue-500 pl-4"
              style={{ color: '#191e4e' }}
            >
              Get to know our ultra modern <span style={{ color: '#287194' }}>&quot;tropical jungle&quot;</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-10">
              Our office loft is an environment conducive for creativity and diligent work ethic. However, when we aren&apos;t
              creating beautiful money making empires for our select clients we can be found sailing paper airplanes off
              the balcony towards Piedmont park and wrestling Xiaolei away from the espresso machine.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Section (Testimonials) */}
      <FocusSection />

      {/* What Happens After You Contact Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-12 border-l-4 border-blue-500 pl-4"
              style={{ color: '#191e4e' }}
            >
              What happens after you contact us?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {processSteps.map((step, index) => (
                <div key={index}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-white font-bold text-lg"
                    style={{ backgroundColor: '#287194' }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: '#191e4e' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {step.description}
                  </p>
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
