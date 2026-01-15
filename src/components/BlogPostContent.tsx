'use client'
import { useEffect } from 'react'

interface BlogPostContentProps {
  content: string
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  // Load wp-blocks.css for blog posts
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/wp-blocks.css'
    link.id = 'wp-blocks-css'
    document.head.appendChild(link)

    return () => {
      const existingLink = document.getElementById('wp-blocks-css')
      if (existingLink) {
        existingLink.remove()
      }
    }
  }, [])

  return (
    <article
      className="wp-content prose prose-lg max-w-none"
      style={{ fontFamily: 'Poppins, sans-serif' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
