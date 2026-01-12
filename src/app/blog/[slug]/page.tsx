import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordPressData } from '@/lib/wordpress';
import { gql } from '@apollo/client';
import FocusSection from '@/components/FocusSection';
import ContactForm from '@/components/ContactForm';

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const data = await getWordPressData(GET_ALL_POSTS);
    return data.posts.nodes.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await getWordPressData(GET_POST_BY_SLUG, { slug: params.slug });
    const post = data.post;

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const plainExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').trim() || ''
    const description = plainExcerpt ? plainExcerpt.slice(0, 160) : undefined

    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post',
    };
  }
}

export default async function BlogPost({ params }: Props) {
  try {
    const data = await getWordPressData(GET_POST_BY_SLUG, { slug: params.slug });
    const post = data.post;

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Hero header (matches contact/about style so the global Header is readable) */}
        <section className="relative min-h-[55vh] md:min-h-[70vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
          {post.featuredImage?.node?.sourceUrl ? (
            <>
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent"></div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            </>
          )}

          <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-24">
            <div className="max-w-4xl">
              <h1
                className="text-[36px] md:text-[54px] font-bold text-white leading-[1.05]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/85">
                {post.author?.node?.name ? <span>By {post.author.node.name}</span> : null}
                {post.date ? <span>{new Date(post.date).toLocaleDateString()}</span> : null}
                {post.categories?.nodes?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.nodes.map((category: any, index: number) => (
                      <span
                        key={index}
                        className="bg-white/15 text-white px-3 py-1 rounded-full text-xs tracking-wide"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <main className="py-16">
          <div className="container mx-auto px-6">
            {/* Post Content */}
            <article
              className="prose prose-lg max-w-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </main>

        {/* Focus Section */}
        <FocusSection />

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}