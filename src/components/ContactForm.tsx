'use client'
import React, { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', enquiry: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                Thank You!
              </h3>
              <p className="text-green-700" style={{fontFamily: 'Poppins, sans-serif'}}>
                We&apos;ve received your message and will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Column - 60% */}
            <div className="lg:col-span-3 space-y-8">
              <h2 
                className="text-3xl md:text-4xl font-bold text-blue-900 border-l-4 border-blue-500 pl-6 leading-tight"
                style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
              >
                What happens after you{' '}
                <span style={{color: '#287194'}}>contact us?</span>
              </h2>
              
              <div className="space-y-8">
                {/* 15 minutes consultation */}
                <div>
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{backgroundColor: '#14183e'}}
                    ></div>
                    <div>
                      <p 
                        className="text-xl font-bold mb-2"
                        style={{fontFamily: 'Poppins, sans-serif', color: '#14183e'}}
                      >
                        <span style={{color: '#287194'}}>15 minutes</span> consultation
                      </p>
                      <div 
                        className="border-l-2 pl-4 text-gray-700"
                        style={{borderColor: '#14183e'}}
                      >
                        <p className="text-base md:text-lg leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                          We will schedule a quick 15-minute call with you to understand what you need to unlock the full potential of your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Proposal */}
                <div>
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{backgroundColor: '#14183e'}}
                    ></div>
                    <div>
                      <p 
                        className="text-xl font-bold mb-2"
                        style={{fontFamily: 'Poppins, sans-serif', color: '#14183e'}}
                      >
                        Project Proposal
                      </p>
                      <div className="border-l-2 border-transparent pl-4 text-gray-700">
                        <p className="text-base md:text-lg leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                          After we got every output from you, we will prepare a proposal for you. If you agree with our pricing and timeline, we are all set to take off.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 40% */}
            <div 
              className="lg:col-span-2 contact-form rounded-xl p-10 md:p-12"
              style={{backgroundColor: '#14183e'}}
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-lg font-semibold text-white mb-3"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    Your Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-white/70 text-white placeholder-white/50 focus:ring-0 focus:border-white transition-colors text-lg"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your full name"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-lg font-semibold text-white mb-3"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    Email<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-white/70 text-white placeholder-white/50 focus:ring-0 focus:border-white transition-colors text-lg"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your email address"
                  />
                </div>
              
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-lg font-semibold text-white mb-3"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    Phone Number<span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-white/70 text-white placeholder-white/50 focus:ring-0 focus:border-white transition-colors text-lg"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your phone number"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="enquiry" 
                    className="block text-lg font-semibold text-white mb-3"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    Your Enquiry<span className="required">*</span>
                  </label>
                  <textarea
                    id="enquiry"
                    name="enquiry"
                    required
                    rows={4}
                    value={formData.enquiry}
                    onChange={handleChange}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-white/70 text-white placeholder-white/50 focus:ring-0 focus:border-white transition-colors resize-none text-lg"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type the reason for your enquiry"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 h-16 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg bg-[#287194] hover:bg-[#2f7fa1]"
                  style={{fontFamily: 'Poppins, sans-serif'}}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 