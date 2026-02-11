'use client'
import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CONTENT_BY_SLUG, GET_PAGE } from '@/lib/queries'
import FocusSection from '@/components/FocusSection'
import ContactForm from '@/components/ContactForm'

type DynamicWpPageProps = {
  slug: string
}

export default function DynamicWpPage({ slug }: DynamicWpPageProps) {
  // First try to get content by slug (works for most WordPress setups)
  const { data: slugData, loading: slugLoading, error: slugError } = useQuery(GET_CONTENT_BY_SLUG, {
    variables: { slug },
    errorPolicy: 'all'
  })

  // Fallback: try to get by URI if slug doesn't work
  const { data: uriData, loading: uriLoading, error: uriError } = useQuery(GET_PAGE, {
    variables: {
      id: `/${slug}/`,
      idType: 'URI'
    },
    skip: !slugError && (slugData?.pages?.nodes?.length > 0 || slugData?.posts?.nodes?.length > 0),
    errorPolicy: 'all'
  })

  // Determine which data to use
  const loading = slugLoading || uriLoading
  const foundPage = slugData?.pages?.nodes?.[0] || uriData?.page
  const foundPost = slugData?.posts?.nodes?.[0]
  const content = foundPage || foundPost
  const isPost = !!foundPost && !foundPage

  // IMPORTANT: Hooks must run in the same order on every render.
  const rawHtml = content?.content || ''
  const excerptHtml = content?.excerpt || ''

  const { coverImageUrl, coverImageAlt, coverTitleHtml, coverSubtitleLines, contentHtmlWithoutCover } = useMemo(() => {
    if (!rawHtml) {
      return {
        coverImageUrl: undefined,
        coverImageAlt: undefined,
        coverTitleHtml: undefined,
        coverSubtitleLines: undefined,
        contentHtmlWithoutCover: rawHtml
      }
    }

    if (typeof DOMParser === 'undefined') {
      return {
        coverImageUrl: undefined,
        coverImageAlt: undefined,
        coverTitleHtml: undefined,
        coverSubtitleLines: undefined,
        contentHtmlWithoutCover: rawHtml
      }
    }

    const extractCssUrl = (styleValue?: string | null) => {
      if (!styleValue) return undefined
      const match = styleValue.match(/url\(["']?(.*?)["']?\)/i)
      return match?.[1]
    }

    try {
      const doc = new DOMParser().parseFromString(rawHtml, 'text/html')
      const cover = doc.querySelector('.wp-block-cover')

      if (!cover) {
        return {
          coverImageUrl: undefined,
          coverImageAlt: undefined,
          coverTitleHtml: undefined,
          coverSubtitleLines: undefined,
          contentHtmlWithoutCover: rawHtml
        }
      }

      const coverImg = cover.querySelector('img.wp-block-cover__image-background') as HTMLImageElement | null
      const imgSrc = coverImg?.getAttribute('src') || undefined
      const imgAlt = coverImg?.getAttribute('alt') || undefined

      const bgFromCover = extractCssUrl(cover.getAttribute('style'))
      const bgEl = cover.querySelector('.wp-block-cover__background') as HTMLElement | null
      const bgFromOverlay = extractCssUrl(bgEl?.getAttribute('style'))

      const imageUrl = imgSrc || bgFromCover || bgFromOverlay

      const inner = cover.querySelector('.wp-block-cover__inner-container')
      const innerClone = inner?.cloneNode(true) as HTMLElement | null

      let titleHtml: string | undefined = undefined
      let subtitle: string[] | undefined = undefined

      if (innerClone) {
        const headingEl = innerClone.querySelector('h1,h2,h3,h4,h5,h6') as HTMLElement | null
        titleHtml = headingEl?.innerHTML?.trim() || undefined
        if (headingEl) headingEl.remove()

        const pEls = Array.from(innerClone.querySelectorAll('p')) as HTMLElement[]
        subtitle = pEls
          .map((p) => (p.textContent || '').trim())
          .filter(Boolean)

        if (!subtitle.length) {
          const remainingText = (innerClone.textContent || '').trim()
          if (remainingText) subtitle = [remainingText]
        }
      }

      cover.remove()
      const cleanedHtml = doc.body.innerHTML

      return {
        coverImageUrl: imageUrl,
        coverImageAlt: imgAlt,
        coverTitleHtml: titleHtml,
        coverSubtitleLines: subtitle?.length ? subtitle : undefined,
        contentHtmlWithoutCover: cleanedHtml
      }
    } catch {
      return {
        coverImageUrl: undefined,
        coverImageAlt: undefined,
        coverTitleHtml: undefined,
        coverSubtitleLines: undefined,
        contentHtmlWithoutCover: rawHtml
      }
    }
  }, [rawHtml])

  const pageDescription = useMemo(() => {
    if (excerptHtml) return excerptHtml.replace(/<[^>]*>/g, '').trim()

    if (contentHtmlWithoutCover) {
      const firstParagraph = contentHtmlWithoutCover.match(/<p[^>]*>(.*?)<\/p>/i)
      if (firstParagraph) {
        return firstParagraph[1].replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...'
      }
    }
    return ''
  }, [excerptHtml, contentHtmlWithoutCover])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
          <p className="text-sm text-gray-400 mt-2">Looking for: /{slug}</p>
          {(slugError || uriError) && (
            <p className="text-xs text-red-400 mt-1">Error: {slugError?.message || uriError?.message}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header / Banner Section (Cover Block style) */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        {(coverImageUrl || content.featuredImage?.node?.sourceUrl) && (
          <>
            <img
              src={coverImageUrl || content.featuredImage.node.sourceUrl}
              alt={coverImageAlt || content.featuredImage?.node?.altText || content.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"></div>
          </>
        )}

        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1
              className="text-[42px] font-bold text-white leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: coverTitleHtml || content.title }}
            />

            {coverSubtitleLines?.length ? (
              <div
                className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 leading-relaxed"
              >
                {coverSubtitleLines.map((line, idx) => (
                  <div key={idx} className={idx === 0 ? '' : 'mt-4'}>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              pageDescription && (
                <p
                  className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed"
                >
                  {pageDescription}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {isPost && (
            <div className="w-full mx-auto mb-12 text-center">
              <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 space-x-4">
                {content.author?.node?.name && <span>By {content.author.node.name}</span>}
                {content.date && <span>{new Date(content.date).toLocaleDateString()}</span>}
                {content.categories?.nodes?.length > 0 && (
                  <span>in {content.categories.nodes.map((cat: any) => cat.name).join(', ')}</span>
                )}
              </div>
            </div>
          )}

          <div className="w-full mx-auto">
            <div
              className="prose max-w-none text-[18px]
                         prose-headings:font-bold prose-headings:text-[#6c6c6c]
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                         prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
                         prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                         prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6
                         prose-p:text-[#6c6c6c] prose-p:text-[18px] prose-p:leading-relaxed prose-p:mb-6
                         prose-li:text-[#6c6c6c] prose-li:text-[18px]
                         prose-a:text-[#287194] prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-[#6c6c6c] prose-strong:font-semibold
                         prose-ul:mb-6 prose-ol:mb-6
                         prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: contentHtmlWithoutCover }}
            />
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <FocusSection />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
}


