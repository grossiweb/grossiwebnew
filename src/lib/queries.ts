import { gql } from '@apollo/client';

// Homepage content query - simplified to work without custom fields
export const GET_HOMEPAGE = gql`
  query GetHomepage {
    page(id: "home", idType: URI) {
      id
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Menu query
export const GET_MENU = gql`
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        url
        path
        parentId
        cssClasses
        description
        target
        title
      }
    }
  }
`;

// Menu query by database ID (when a menu isn't assigned to a theme location)
export const GET_MENU_BY_ID = gql`
  query GetMenuById($id: ID!) {
    menu(id: $id, idType: DATABASE_ID) {
      id
      menuItems(first: 200) {
        nodes {
          id
          label
          url
          path
          parentId
          cssClasses
          description
          target
          title
        }
      }
    }
  }
`;

// Services query - simplified to work without custom fields
export const GET_SERVICES = gql`
  query GetServices {
    posts(where: { categoryName: "services" }) {
      nodes {
        id
        title
        content
        excerpt
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

// Testimonials query - using category-based approach (works immediately)
export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      nodes {
        id
        title
        content
        excerpt
        customFields {
          clientName
          clientPosition
          clientCompany
          rating
          clientImage {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Single page query - enhanced for dynamic routing
export const GET_PAGE = gql`
  query GetPage($id: ID!, $idType: PageIdType = URI) {
    page(id: $id, idType: $idType) {
      id
      title
      content
      slug
      uri
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// All pages for static generation and navigation
export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        uri
        dateGmt
        modifiedGmt
      }
    }
  }
`;

// Query for getting content by slug (checks both pages and posts)
export const GET_CONTENT_BY_SLUG = gql`
  query GetContentBySlug($slug: String!) {
    # Search for pages by slug
    pages(where: { name: $slug }) {
      nodes {
        id
        title
        content
        slug
        uri
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    
    # Search for posts by slug
    posts(where: { name: $slug }) {
      nodes {
        id
        title
        content
        slug
        uri
        date
        modified
        excerpt
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
  }
`;

// Contact form settings - simplified
export const GET_CONTACT_SETTINGS = gql`
  query GetContactSettings {
    generalSettings {
      title
      description
      email
    }
  }
`;