import React from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { getWordPressData } from '@/lib/wordpress'
import FocusSection from '@/components/FocusSection'
import ContactForm from '@/components/ContactForm'

const GET_BLOG_INDEX = gql`
  query GetBlogIndex($first: Int = 24) {
    posts(
      first: $first
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]*>/g, '').trim()
}

type BlogIndexPost = {
  id: string
  title: string
  excerpt?: string
  slug: string
  date?: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  categories?: { nodes?: Array<{ name: string; slug: string }> }
}

export default async function BlogPage() {
  const defaultHeroImageUrl = process.env.NEXT_PUBLIC_DEFAULT_HERO_IMAGE_URL || '/waterfall.webp'
  let posts: BlogIndexPost[] = []

  try {
    const data = await getWordPressData<any>(GET_BLOG_INDEX, { first: 24 })
    const rawPosts: BlogIndexPost[] = data?.posts?.nodes || []

    // Exclude internal "category-as-CPT" content if those categories exist.
    posts = rawPosts.filter((p) => {
      const cats = p.categories?.nodes?.map((c) => c.slug) || []
      return !cats.includes('services') && !cats.includes('testimonials')
    })
  } catch {
    posts = []
  }

  return (
    <div className="min-h-screen">
      {/* Hero header (matches contact/about style so the global Header is readable) */}
      <section className="relative min-h-[50vh] md:min-h-[65vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        {defaultHeroImageUrl ? (
          <>
            <img
              src={defaultHeroImageUrl}
              alt="Blog"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </>
        ) : (
          <>
        </>
        )}

        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1
              className="text-[42px] md:text-[56px] font-bold text-white leading-[1.05]"
            >
              Blog
            </h1>
            <p
              className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed"
            >
              Stay updated with the latest insights, trends, and news from the world of digital marketing and web development.
            </p>
          </div>
        </div>
      </section>

      <main className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const dateLabel = post.date ? new Date(post.date).toLocaleDateString() : ''
              const excerpt = stripHtml(post.excerpt).slice(0, 160)
              const imageUrl = post.featuredImage?.node?.sourceUrl

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden block"
                >
                  {imageUrl ? (
                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={post.featuredImage?.node?.altText || post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}

                  <div className="p-6">
                    {dateLabel ? (
                      <div className="text-sm text-blue-600 font-medium mb-2">{dateLabel}</div>
                    ) : null}
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                    {excerpt ? <p className="text-gray-600 mb-4">{excerpt}…</p> : null}
                    <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      Read More →
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      {/* Focus Section */}
      <FocusSection />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
} 