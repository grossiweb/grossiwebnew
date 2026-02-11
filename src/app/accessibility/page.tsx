'use client'
import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const kpiItems = [
  {
    title: 'Reduce Risk Exposure',
    description: 'Improve alignment with accessibility expectations before issues become expensive or disruptive.'
  },
  {
    title: 'Improve Usability & Conversions',
    description: 'Fewer barriers means more people can navigate, understand, and complete actions.'
  },
  {
    title: 'Strengthen SEO Foundations',
    description: 'Cleaner structure supports better crawling, clearer content signals, and stronger engagement.'
  }
]

const deliverables = [
  {
    title: 'Manual Accessibility Audit',
    description: 'Keyboard navigation, forms, contrast, headings, and real user flows—not just an automated score.'
  },
  {
    title: 'Prioritized Fix Plan',
    description: 'Severity + impact so you know what to fix first (and what can wait).'
  },
  {
    title: 'Remediation Implementation',
    description: 'Templates, components, navigation, forms, and content patterns cleaned up properly.'
  },
  {
    title: 'Verification & Documentation',
    description: 'Confirmation + a clear summary of what changed and what improved.'
  },
  {
    title: 'Optional Monitoring',
    description: "If you publish often, we can keep accessibility strong as the site evolves—so you don't slip backward.",
    wide: true
  }
]

const riskChecklist = [
  { id: 'keyboard', points: 18, title: 'Keyboard navigation works', description: 'Users can reach menus, forms, and buttons without a mouse.' },
  { id: 'forms', points: 18, title: 'Forms are accessible', description: 'Fields are labeled, errors are clear, and completion is straightforward.' },
  { id: 'contrast', points: 16, title: 'Color contrast is readable', description: 'Text and UI elements are readable for low vision/color blindness.' },
  { id: 'headings', points: 16, title: 'Headings are structured', description: 'H1–H3 hierarchy is used for meaning, not just styling.' },
  { id: 'alttext', points: 16, title: 'Images have alt text', description: 'Important images/icons have descriptions where needed.' },
  { id: 'focus', points: 16, title: 'Focus states are visible', description: 'When tabbing, users can always see where they are.' }
]

const faqs = [
  {
    question: 'Will making my site accessible ruin the design?',
    answer: 'No. Accessibility usually improves clarity and usability. We preserve your design intent while removing barriers like low contrast, missing labels, and broken focus states.'
  },
  {
    question: 'Do small businesses need accessibility?',
    answer: "Often, yes. Accessibility reduces friction (lost leads), improves trust, and lowers risk exposure. It's protection plus performance."
  },
  {
    question: 'What standards do you follow?',
    answer: "We implement widely accepted accessibility best practices (commonly based on WCAG guidance). We're not a law firm, but we build practical improvements and verify real usability."
  },
  {
    question: 'How long does it take?',
    answer: "It depends on site size and complexity. We'll give a clear timeline after a quick review of your URL and platform."
  },
  {
    question: 'Do you guarantee compliance?',
    answer: "We don't provide legal guarantees. We do implement standards-aligned fixes and verify improvements in real flows—so your site is more usable and risk is meaningfully reduced."
  },
  {
    question: 'What do you need from us to start?',
    answer: 'Just your website URL and a bit of context (platform, key pages, and your main concern). We take it from there.'
  }
]

export default function AccessibilityPage() {
  const heroImageUrl = '/assicibility.jpeg'
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const calculateScore = () => {
    let total = 0
    riskChecklist.forEach(item => {
      if (checkedItems[item.id]) {
        total += item.points
      }
    })
    return Math.min(100, total)
  }

  const score = calculateScore()

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Website URL is required'
    }

    const captchaToken = recaptchaRef.current?.getValue()
    if (!captchaToken) {
      newErrors.captcha = 'Please complete the reCAPTCHA verification'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const captchaToken = recaptchaRef.current?.getValue()

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/dolcesummit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          websiteUrl: ''
        })
        recaptchaRef.current?.reset()
      } else {
        setErrors({ submit: data.error || 'Failed to submit form. Please try again.' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'An error occurred. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value

    setFormData({
      ...formData,
      [name]: formattedValue
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <img
          src={heroImageUrl}
          alt="Website Accessibility Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <span
              className="text-blue-300 uppercase tracking-widest text-xs font-bold mb-3 block"
            >
              Development &middot; Website Accessibility
            </span>
            <h1
              className="text-[36px] md:text-[48px] font-bold text-white leading-[1.1]"
            >
              Website Accessibility That Protects Your Business
            </h1>
            <p
              className="mt-6 md:mt-8 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
            >
              We audit your site, fix what&apos;s blocking real users, and verify the improvements—so you reduce risk,
              improve usability, and strengthen SEO.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => scrollToSection('request')}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
                style={{ backgroundColor: '#287194', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a75'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#287194'}
              >
                Request an Audit
              </button>
              <button
                onClick={() => scrollToSection('scan')}
                className="text-white/90 font-semibold underline underline-offset-4 hover:text-white transition-colors"
              >
                Try the quick risk scan
              </button>
            </div>

            <div
              className="mt-8 border-l-4 pl-4 text-white/85 text-sm max-w-2xl"
              style={{ borderColor: '#287194' }}
            >
              Familiar, client-first delivery. Clear priorities. Practical fixes that protect your money and your brand.
            </div>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: '#287194' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#191e4e' }}
          >
            What you get
          </h2>
          <p
            className="text-gray-600 mb-10 max-w-3xl"
          >
            Clear deliverables, not guesswork. We identify what matters, fix what matters, and verify it works—without overcomplicating the process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-5 shadow-lg border border-gray-100 flex gap-4 ${item.wide ? 'md:col-span-2' : ''}`}
              >
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: '#287194', boxShadow: '0 0 0 4px rgba(40, 113, 148, 0.15)' }}
                ></div>
                <div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Risk Scan Section */}
      <section id="scan" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: '#191e4e' }}
              >
                Quick risk scan
              </h2>
              <p
                className="text-gray-600 mb-8"
              >
                Check what applies. This creates an estimated &quot;risk &amp; friction signal&quot; so you can decide whether a full audit is worth it.
              </p>

              <div className="space-y-3">
                {riskChecklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-lg cursor-pointer hover:border-blue-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mt-1 accent-blue-600"
                    />
                    <div>
                      <span className="font-bold text-gray-900">
                        {item.title}
                      </span>
                      <span className="block text-gray-500 text-sm mt-1">
                        {item.description}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 h-fit">
              <div className="text-sm font-bold text-gray-600 mb-2">
                Estimated risk &amp; friction signal
              </div>
              <div className="text-4xl font-bold mb-4" style={{ color: '#191e4e' }}>
                {score}/100
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${score}%`, backgroundColor: '#287194' }}
                ></div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#287194' }}></span>
                  <b>0–30:</b>&nbsp;Low
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#287194' }}></span>
                  <b>31–60:</b>&nbsp;Moderate
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#287194' }}></span>
                  <b>61–100:</b>&nbsp;High
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                This is a quick signal—not a compliance verdict. If the score is high, you&apos;re likely losing leads and inviting unnecessary risk.
              </p>

              <hr className="border-gray-200 mb-6" />

              <button
                onClick={() => scrollToSection('request')}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-white"
                style={{ backgroundColor: '#287194' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a75'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#287194'}
              >
                Request a full audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#191e4e' }}
          >
            FAQs
          </h2>
          <p
            className="text-gray-600 mb-10"
          >
            Quick answers to the questions we hear most often.
          </p>

          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-gray-400 ml-4">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3
                  className="text-2xl font-bold text-green-800 mb-4"
                >
                  Request Submitted Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for your interest in our accessibility services. We&apos;ll review your information and get back to you with next steps.
                </p>
              </div>
            ) : (
              <>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: '#191e4e' }}
                >
                  Request an Accessibility Audit
                </h2>
                <p
                  className="text-gray-600 mb-8"
                >
                  Send the basics. We&apos;ll reply with next steps and a clear recommendation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Business Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Website URL<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.websiteUrl ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="https://www.yourwebsite.com"
                    />
                    {errors.websiteUrl && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.websiteUrl}
                      </p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <p className="text-sm text-red-600">
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  {/* reCAPTCHA */}
                  <div className="mt-8">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcSTUwsAAAAAI4gV-eEcCfYqeoHjNcnn3lAFIZX'}
                      theme="light"
                      onChange={() => {
                        if (errors.captcha) {
                          setErrors({ ...errors, captcha: '' })
                        }
                      }}
                    />
                  </div>
                  {errors.captcha && (
                    <p className="text-sm text-red-600 text-center">
                      {errors.captcha}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white px-8 py-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg"
                      style={{backgroundColor: '#287194'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a75'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#287194'}
                    >
                      {isSubmitting ? 'Submitting...' : 'Request My Audit'}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 text-center mt-4">
                    <span className="text-red-600">*</span> Required fields
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
