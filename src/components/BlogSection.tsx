'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_BLOG_POSTS = gql`
  query GetBlogPosts($first: Int = 4) {
    posts(first: $first) {
      nodes {
        id
        title
        excerpt
        slug
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
}

// Fallback blog posts
const fallbackPosts: BlogCardPost[] = [
  {
    title: 'Grossi Web opens its new offices across from Piedmont Park',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-97-1.webp',
    slug: 'new-offices-piedmont-park'
  },
  {
    title: 'The Future is Digital Distribution',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-98.webp',
    slug: 'future-digital-distribution'
  },
  {
    title: 'The Organ of Sight',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-98-1.webp',
    slug: 'organ-of-sight'
  },
  {
    title: 'Manifesting your Reality',
    image: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Rectangle-161.webp',
    slug: 'manifesting-your-reality'
  }
];

export default function BlogSection() {
  const { data, loading, error } = useQuery(GET_BLOG_POSTS, {
    variables: { first: 4 }
  });

  // Use WordPress data if available, otherwise fallback
  const blogPosts: BlogCardPost[] = data?.posts?.nodes?.map((post: any) => ({
    title: post.title,
    image: post.featuredImage?.node?.sourceUrl || fallbackPosts[0].image,
    slug: post.slug
  })) || fallbackPosts;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-blue-900 border-l-4 border-blue-500 pl-6 inline-block"
            style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
          >
            Blog
          </h2>
        </div>
        
        {/* Blog Grid - 2x2 Layout */}
        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {blogPosts.slice(0, 2).map((post: BlogCardPost, index: number) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <div 
                  className="relative bg-cover bg-center rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    minHeight: '325px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h5 
                      className="text-white font-semibold text-lg leading-tight bg-black/50 rounded-lg p-4"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600'
                      }}
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
            {blogPosts.slice(2).map((post: BlogCardPost, index: number) => (
              <Link key={index + 2} href={`/blog/${post.slug}`}>
                <div 
                  className="relative bg-cover bg-center rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    minHeight: '325px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h5 
                      className="text-white font-semibold text-lg leading-tight bg-black/50 rounded-lg p-4"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600'
                      }}
                    >
                      {post.title}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <button 
              className="text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors"
              style={{fontFamily: 'Poppins, sans-serif', color: '#287194'}}
            >
              View more &gt;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}