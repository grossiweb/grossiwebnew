import React from 'react'
import { notFound } from 'next/navigation'
import { getWordPressData } from '@/lib/wordpress'
import { GET_CONTENT_BY_SLUG, GET_PAGE, GET_ALL_PAGES } from '@/lib/queries'
import DynamicPageContent from '@/components/DynamicPageContent'

// Revalidate every 60 seconds — Vercel caches the page at the edge
export const revalidate = 60

// Pre-build known pages at build time for instant loading
export async function generateStaticParams() {
  try {
    const data = await getWordPressData<any>(GET_ALL_PAGES)
    return (data?.pages?.nodes || [])
      .filter((page: any) => page.slug && page.slug !== 'home')
      .map((page: any) => ({
        slug: page.uri
          ? page.uri.split('/').filter(Boolean)
          : [page.slug],
      }))
  } catch {
    return []
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')

  // Try to get content by slug
  let content = null
  let isPost = false

  try {
    const slugData = await getWordPressData<any>(GET_CONTENT_BY_SLUG, { slug })
    const foundPage = slugData?.pages?.nodes?.[0]
    const foundPost = slugData?.posts?.nodes?.[0]

    if (foundPage) {
      content = foundPage
    } else if (foundPost) {
      content = foundPost
      isPost = true
    }
  } catch {
    // Slug query failed, try URI fallback
  }

  // Fallback: try to get by URI
  if (!content) {
    try {
      const uriData = await getWordPressData<any>(GET_PAGE, {
        id: `/${slug}/`,
        idType: 'URI',
      })
      if (uriData?.page) {
        content = uriData.page
      }
    } catch {
      // URI query also failed
    }
  }

  if (!content) {
    notFound()
  }

  return <DynamicPageContent content={content} isPost={isPost} slug={slug} />
}
