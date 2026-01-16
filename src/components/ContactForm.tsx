'use client'
import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [captchaError, setCaptchaError] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verify reCAPTCHA
    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      setCaptchaError(true)
      return
    }

    setCaptchaError(false)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', enquiry: '' })
        recaptchaRef.current?.reset()
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
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="w-full mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left Column - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <h2
                className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4 leading-tight"
                style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
              >
                What happens after you{' '}
                <span style={{color: '#287194'}}>contact us?</span>
              </h2>
              
              <div className="space-y-6 pl-4">
                {/* 15 minutes consultation */}
                <div>
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0"
                      style={{backgroundColor: '#14183e'}}
                    ></div>
                    <div className="flex-1">
                      <p
                        className="text-lg font-bold mb-2"
                        style={{fontFamily: 'Poppins, sans-serif', color: '#14183e'}}
                      >
                        <span style={{color: '#287194'}}>15 minutes</span> consultation
                      </p>
                      <div
                        className="border-l-2 pl-3 text-gray-700"
                        style={{borderColor: '#14183e', marginLeft: '-14px'}}
                      >
                        <p className="text-base leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                          We will schedule a quick 15-minute call with you to understand what you need to unlock the full potential of your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Proposal */}
                <div>
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0"
                      style={{backgroundColor: '#14183e'}}
                    ></div>
                    <div className="flex-1">
                      <p
                        className="text-lg font-bold mb-2"
                        style={{fontFamily: 'Poppins, sans-serif', color: '#14183e'}}
                      >
                        Project Proposal
                      </p>
                      <div
                        className="border-l-2 pl-3 text-gray-700"
                        style={{borderColor: '#14183e', marginLeft: '-14px'}}
                      >
                        <p className="text-base leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
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
              className="lg:col-span-2 contact-form rounded-lg p-6 md:p-8"
              style={{backgroundColor: '#14183e'}}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-white mb-2"
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white text-white placeholder-white/70 focus:ring-0 focus:border-white transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your full name"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-white mb-2"
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white text-white placeholder-white/70 focus:ring-0 focus:border-white transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your email address"
                  />
                </div>
              
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium text-white mb-2"
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white text-white placeholder-white/70 focus:ring-0 focus:border-white transition-colors"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type your phone number"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="enquiry" 
                    className="block text-sm font-medium text-white mb-2"
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white text-white placeholder-white/70 focus:ring-0 focus:border-white transition-colors resize-none"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Type the reason for your enquiry"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="mt-6">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcSTUwsAAAAAI4gV-eEcCfYqeoHjNcnn3lAFIZX'}
                    theme="light"
                    onChange={() => setCaptchaError(false)}
                  />
                </div>
                {captchaError && (
                  <p className="text-sm text-red-300 text-center" style={{fontFamily: 'Poppins, sans-serif'}}>
                    Please complete the reCAPTCHA verification
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 