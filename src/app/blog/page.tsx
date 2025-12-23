import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const blogPosts = [
  {
    title: 'Grossi Web opens its new offices across from Piedmont Park',
    excerpt: 'We are excited to announce our new location in Atlanta, positioned perfectly across from the beautiful Piedmont Park.',
    date: 'December 15, 2024',
    slug: 'new-offices-piedmont-park'
  },
  {
    title: 'The Future is Digital Distribution',
    excerpt: 'Exploring how digital distribution is reshaping the way businesses connect with their customers in 2025.',
    date: 'December 10, 2024', 
    slug: 'future-digital-distribution'
  },
  {
    title: 'The Organ of Sight',
    excerpt: 'Understanding visual design principles and how they impact user experience in the digital age.',
    date: 'December 5, 2024',
    slug: 'organ-of-sight'
  },
  {
    title: 'Manifesting your Reality',
    excerpt: 'How to turn your business vision into reality through strategic planning and execution.',
    date: 'November 30, 2024',
    slug: 'manifesting-your-reality'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and news from the world of digital marketing and web development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">{post.date}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 