'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TESTIMONIALS } from '@/lib/queries'

export default function Testimonials() {
  const { data, loading, error } = useQuery(GET_TESTIMONIALS);

  if (loading) return <div className="py-20 text-center">Loading testimonials...</div>;
  if (error) return <div className="py-20 text-center">Error loading testimonials: {error.message}</div>;

  // Get testimonials from category-based posts
  const testimonials = data?.testimonials?.nodes || [];

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{fontFamily: 'Poppins, sans-serif'}}>
            What Our Clients Say
          </h2>
          <p className="text-gray-600">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{fontFamily: 'Poppins, sans-serif'}}>
          What Our Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
              {testimonial.featuredImage?.node?.sourceUrl && (
                <img 
                  src={testimonial.featuredImage.node.sourceUrl}
                  alt={testimonial.featuredImage.node.altText || testimonial.title}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              
              <h3 className="text-xl font-bold text-center mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                {testimonial.title}
              </h3>
              
              <div 
                className="text-gray-600 text-center mb-4"
                dangerouslySetInnerHTML={{ __html: testimonial.excerpt || testimonial.content }}
              />
              
              {/* Default 5-star rating */}
              <div className="flex justify-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-lg text-yellow-400">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}