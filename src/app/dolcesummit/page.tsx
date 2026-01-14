'use client'
import React, { useState } from 'react'

export default function DolceSummitPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    websiteUrl: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
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
    } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid website URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/dolcesummit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          websiteUrl: ''
        })
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
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
          <img
            src="/waterfall.webp"
            alt="Success"
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
                Thank You!
              </h1>
              <p
                className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Your request has been received.
              </p>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Request Submitted Successfully!
                </h3>
                <p className="text-green-700 text-lg mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Thank you for requesting your complimentary Visibility & Accessibility Review.
                </p>
                <p className="text-green-700" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Our team will analyze your website and reach out to you within 2-3 business days with valuable insights.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <img
          src="/waterfall.webp"
          alt="Dolce Summit"
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
              Request Your Visibility & Accessibility Review
            </h1>
            <p
              className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Discover what's helping (and hurting) your online conversions.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields (First and Last) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{fontFamily: 'Poppins, sans-serif'}}
                    >
                      First Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      style={{fontFamily: 'Poppins, sans-serif'}}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{fontFamily: 'Poppins, sans-serif'}}
                    >
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      style={{fontFamily: 'Poppins, sans-serif'}}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{fontFamily: 'Poppins, sans-serif'}}
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
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{fontFamily: 'Poppins, sans-serif'}}
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
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{fontFamily: 'Poppins, sans-serif'}}
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
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="Enter your business name"
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Website URL */}
                <div>
                  <label
                    htmlFor="websiteUrl"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    Website URL<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.websiteUrl ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    style={{fontFamily: 'Poppins, sans-serif'}}
                    placeholder="https://www.yourwebsite.com"
                  />
                  {errors.websiteUrl && (
                    <p className="mt-1 text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {errors.websiteUrl}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-sm text-red-600" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white px-8 py-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg"
                    style={{fontFamily: 'Poppins, sans-serif', backgroundColor: '#287194'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a75'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#287194'}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request My Review'}
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                  <span className="text-red-600">*</span> Required fields
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
