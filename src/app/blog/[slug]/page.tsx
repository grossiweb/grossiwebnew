import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordPressData } from '@/lib/wordpress';
import { GET_PAGE, GET_ALL_PAGES } from '@/lib/queries';
import { gql } from '@apollo/client';

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
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
      seo {
        title
        metaDesc
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
    const post = data.postBy;

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.seo?.title || post.title,
      description: post.seo?.metaDesc || post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
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
    const post = data.postBy;

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-20">
          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-8">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <h1 
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
            >
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              {post.author?.node?.name && (
                <span>By {post.author.node.name}</span>
              )}
              {post.date && (
                <span>{new Date(post.date).toLocaleDateString()}</span>
              )}
              {post.categories?.nodes?.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.nodes.map((category: any, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Post Content */}
          <article 
            className="prose prose-lg max-w-none"
            style={{fontFamily: 'Poppins, sans-serif'}}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}