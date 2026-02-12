'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TESTIMONIALS } from '@/lib/queries'

type TestimonialNode = {
  id: string
  title?: string
  content?: string
  excerpt?: string
}

export default function FocusSection() {
  const { data, loading } = useQuery(GET_TESTIMONIALS);

  const testimonials: TestimonialNode[] = data?.posts?.nodes || [];

  // Don't render the section at all if there's no data
  if (!loading && testimonials.length === 0) return null;

  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section
      className="relative overflow-hidden min-h-[600px] md:min-h-[700px]"
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
        {/* Heading */}
        <div className="pt-16 md:pt-20">
          <h2
            className="max-w-5xl border-l-4 border-[#287194] pl-4 text-left text-2xl md:text-3xl font-bold leading-tight text-white"
          >
            <span className="block">Real Businesses. Real Growth. Real Results.</span>
          </h2>
        </div>

        {/* Carousel row */}
        <div className="mt-14 md:mt-16 flex items-center justify-center pb-20 md:pb-24">
          {loading ? (
            <div className="flex items-center gap-3 text-white/70">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm">Loading testimonials...</span>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden testimonial-mask">
              <div className="testimonial-marquee flex gap-10 pr-10">
                {marqueeItems.map((t, idx) => {
                  const name = t.title || 'Client'
                  const company = t.excerpt?.replace(/<[^>]*>/g, '').trim() || ''
                  const htmlText = t.content || ''

                  return (
                    <div
                      key={`${t.id}-${idx}`}
                      className="w-[360px] md:w-[520px] shrink-0 rounded-2xl bg-white px-10 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
                    >
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-[#191e4e]">
                          {name}
                        </h3>
                        {company ? (
                          <p className="mt-1 text-sm font-medium tracking-wide text-gray-500">
                            {company.toUpperCase()}
                          </p>
                        ) : null}
                      </div>

                      <div
                        className="mt-8 text-[16px] leading-relaxed text-gray-500 [&_p]:m-0 [&_p+_p]:mt-4"
                        dangerouslySetInnerHTML={{ __html: htmlText }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
