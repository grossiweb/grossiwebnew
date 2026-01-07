'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TESTIMONIALS } from '@/lib/queries'

type TestimonialNode = {
  id: string
  title?: string
  content?: string
  excerpt?: string
  customFields?: {
    clientName?: string
    clientPosition?: string
    clientCompany?: string
    rating?: number
    clientImage?: {
      sourceUrl?: string
      altText?: string
    }
  }
}

const fallbackTestimonials: Array<{
  name: string
  company: string
  text: string
}> = [
  {
    name: 'Rhia',
    company: 'ATHENS LANGUAGE SCHOOLHOUSE',
    text:
      'I am fortunate to have found Grossi Web to construct my website and help me realize my marketing strategy and look! Grossi Web listened to my ideas and created the perfect end result. The process was made easy for me allowing me creative freedom without stress. Grossi Web worked fast, producing a professional and stunning website. I am so pleased with Grossi Web!',
  },
  {
    name: 'Thay',
    company: 'HUMES MCCOY AVIATION',
    text:
      'Thanks to the Talent and Professionalism of GrossiWeb, I have turned a dream into a successful aviation company. I continuously receive compliments on the corporate site and AirExpress® brand. GrossiWeb developed a highly targeted marketing campaign that has resulted in international exposure and attaining clients who were previously unreachable!',
  },
  {
    name: 'Bob',
    company: 'DORFMAN CAPITAL',
    text:
      'I had been courting a high profile business prospect, but after a few months my prospect was becoming increasingly distant. One morning after I had made some follow up calls, my prospect called me right back stating he had seen a news story about my company on Yahoo news. This is the type of instant gratification and credibility I have experienced working with Grossi Web.',
  },
]

export default function Testimonials() {
  const { data, loading, error } = useQuery(GET_TESTIMONIALS, {
    errorPolicy: 'ignore', // Gracefully ignore errors and use fallback data
  });

  // Prefer WordPress testimonials if available; otherwise fall back to the static set.
  const testimonials: TestimonialNode[] = data?.testimonials?.nodes || [];

  const hasWpTestimonials = testimonials.length > 0;
  const items = hasWpTestimonials ? testimonials : fallbackTestimonials
  const marqueeItems = [...items, ...items]

  return (
    <section
      className="relative overflow-hidden min-h-[760px] md:min-h-[860px]"
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[#070a17]/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070a17]/40 via-[#070a17]/70 to-[#070a17]/85" />

      <div className="container relative mx-auto px-6 h-full">
        {/* Heading (match screenshot: left aligned with accent border) */}
        <div className="pt-24 md:pt-28">
          <h2
            className="max-w-5xl border-l-4 border-[#287194] pl-6 text-left text-4xl font-bold leading-tight text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="block">We focus on aspects that matter to your business</span>
            <span className="block">That&apos;s what makes our clients happy</span>
          </h2>
        </div>

        {/* Carousel row centered vertically */}
        <div className="mt-14 md:mt-16 flex items-center justify-center pb-20 md:pb-24">
          <div className="relative w-full overflow-hidden testimonial-mask">
            <div className="testimonial-marquee flex gap-10 pr-10">
              {marqueeItems.map((t: any, idx: number) => {
                const name = hasWpTestimonials ? (t?.customFields?.clientName || t?.title || 'Client') : t.name
                const position = hasWpTestimonials ? (t?.customFields?.clientPosition || '') : ''
                const company = hasWpTestimonials ? (t?.customFields?.clientCompany || '') : t.company
                const htmlText = hasWpTestimonials ? (t?.excerpt || t?.content || '') : null
                const plainText = hasWpTestimonials ? null : t.text

                return (
                  <div
                    key={hasWpTestimonials ? `${t.id}-${idx}` : `${t.name}-${idx}`}
                    className="w-[360px] md:w-[520px] shrink-0 rounded-2xl bg-white px-10 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
                  >
                    <div className="text-center">
                      <h3
                        className="text-xl font-semibold text-[#191e4e]"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {name}
                      </h3>
                      {position ? (
                        <p className="mt-3 text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {position}
                        </p>
                      ) : null}
                      {company ? (
                        <p className="mt-1 text-sm font-medium tracking-wide text-gray-500">
                          {String(company).toUpperCase()}
                        </p>
                      ) : null}
                    </div>

                    {hasWpTestimonials ? (
                      <div
                        className="mt-8 text-[16px] leading-relaxed text-gray-500 [&_p]:m-0 [&_p+_p]:mt-4"
                        dangerouslySetInnerHTML={{ __html: htmlText }}
                      />
                    ) : (
                      <p className="mt-8 text-[16px] leading-relaxed text-gray-500">{plainText}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {error ? (
          <p className="mt-10 text-sm text-white/70">
            Unable to load live testimonials right now — showing a fallback preview.
          </p>
        ) : null}
      </div>
    </section>
  )
}