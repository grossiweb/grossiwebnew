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
  const { data, loading, error } = useQuery(GET_TESTIMONIALS);

  if (loading) return <div className="py-20 text-center">Loading testimonials...</div>;

  // Prefer WordPress testimonials if available; otherwise fall back to the static set.
  const testimonials: TestimonialNode[] = data?.testimonials?.nodes || [];

  const hasWpTestimonials = testimonials.length > 0;

  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[#070a17]/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070a17]/40 via-[#070a17]/70 to-[#070a17]/85" />

      <div className="container relative mx-auto px-6">
        <h2
          className="max-w-5xl border-l-4 border-[#287194] pl-6 text-4xl font-bold leading-tight text-white md:text-5xl"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          We focus on aspects that matter to your business That&apos;s what makes our clients happy
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(hasWpTestimonials ? testimonials : fallbackTestimonials).map((t: any, idx: number) => {
            const name = hasWpTestimonials ? (t?.customFields?.clientName || t?.title || 'Client') : t.name
            const company = hasWpTestimonials ? (t?.customFields?.clientCompany || t?.customFields?.clientPosition || '') : t.company
            const htmlText = hasWpTestimonials ? (t?.excerpt || t?.content || '') : null
            const plainText = hasWpTestimonials ? null : t.text

            return (
              <div
                key={hasWpTestimonials ? t.id : `${t.name}-${idx}`}
                className="rounded-2xl bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
              >
                <div className="text-center">
                  <h3
                    className="text-xl font-semibold text-[#191e4e]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {name}
                  </h3>
                  {company ? (
                    <p className="mt-2 text-sm font-medium tracking-wide text-gray-500">
                      {String(company).toUpperCase()}
                    </p>
                  ) : null}
                </div>

                {hasWpTestimonials ? (
                  <div
                    className="mt-6 text-[15px] leading-relaxed text-gray-500 [&_p]:m-0 [&_p+_p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: htmlText }}
                  />
                ) : (
                  <p className="mt-6 text-[15px] leading-relaxed text-gray-500">{plainText}</p>
                )}
              </div>
            )
          })}
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