'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_BLOG_POSTS = gql`
  query GetBlogPosts($first: Int = 4) {
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
        categories {
          nodes {
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

type BlogCardPost = {
  title: string
  image: string
  slug: string
  date?: string
}

// Fallback blog posts
const fallbackPosts: BlogCardPost[] = [
  {
    title: 'Grossi Web opens its new offices across from Piedmont Park',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-97-1.webp',
    slug: 'new-offices-piedmont-park',
    date: 'Dec 15, 2024',
  },
  {
    title: 'The Future is Digital Distribution',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-98.webp',
    slug: 'future-digital-distribution',
    date: 'Dec 10, 2024',
  },
  {
    title: 'The Organ of Sight',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-98-1.webp',
    slug: 'organ-of-sight',
    date: 'Dec 5, 2024',
  },
  {
    title: 'Manifesting your Reality',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-161.webp',
    slug: 'manifesting-your-reality',
    date: 'Nov 30, 2024',
  }
];

export default function BlogSection() {
  const { data, loading, error } = useQuery(GET_BLOG_POSTS, {
    variables: { first: 4 },
    errorPolicy: 'ignore', // Gracefully ignore errors and use fallback data
  });

  // Use WordPress data if available, otherwise fallback
  const blogPosts: BlogCardPost[] = (data?.posts?.nodes || [])
    .filter((post: any) => {
      const cats = post?.categories?.nodes?.map((c: any) => c.slug) || []
      return !cats.includes('services') && !cats.includes('testimonials')
    })
    .slice(0, 4)
    .map((post: any) => ({
      title: post.title,
      image: post.featuredImage?.node?.sourceUrl || fallbackPosts[0].image,
      slug: post.slug,
      date: post.date,
    }))

  // Guarantee 4 cards (fill from fallback if WP returns fewer than 4)
  const displayPosts: BlogCardPost[] = (blogPosts.length >= 4
    ? blogPosts
    : [...blogPosts, ...fallbackPosts].slice(0, 4));

  const formatDate = (iso?: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4 inline-block"
            style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
          >
            Blog
          </h2>
        </div>
        
        {/* Blog Grid - 2x2 Layout */}
        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {displayPosts.slice(0, 2).map((post: BlogCardPost, index: number) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <div 
                  className="relative bg-cover bg-center rounded-md overflow-hidden cursor-pointer shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    minHeight: '280px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-[2px] px-6 py-4 rounded-b-md">
                    <div
                      className="text-white/90 text-sm mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {post.date ? formatDate(post.date) : ''}
                    </div>
                    <h5 
                      className="text-white font-semibold text-lg leading-tight"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}
                    >
                      {post.title}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayPosts.slice(2).map((post: BlogCardPost, index: number) => (
              <Link key={index + 2} href={`/blog/${post.slug}`}>
                <div 
                  className="relative bg-cover bg-center rounded-md overflow-hidden cursor-pointer shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    minHeight: '280px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-[2px] px-6 py-4 rounded-b-md">
                    <div
                      className="text-white/90 text-sm mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {post.date ? formatDate(post.date) : ''}
                    </div>
                    <h5 
                      className="text-white font-semibold text-lg leading-tight"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}
                    >
                      {post.title}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/blog">
            <button
              className="text-sm font-semibold hover:underline transition-colors"
              style={{fontFamily: 'Poppins, sans-serif', color: '#287194'}}
            >
              View more
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}