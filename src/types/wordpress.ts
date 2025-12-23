// WordPress GraphQL Types

export interface WordPressImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface CustomFields {
  [key: string]: any;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  serviceIcon?: string;
  servicePrice?: string;
  serviceFeatures?: string[];
  clientName?: string;
  clientPosition?: string;
  clientCompany?: string;
  rating?: number;
  clientImage?: string;
}

export interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug?: string;
  uri?: string;
  featuredImage?: WordPressImage;
  customFields?: CustomFields;
  seo?: {
    title: string;
    metaDesc: string;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId?: string;
  cssClasses?: string[];
  description?: string;
  target?: string;
  title?: string;
}

export interface Service {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: WordPressImage;
  customFields?: CustomFields;
}

export interface Testimonial {
  id: string;
  title: string;
  content: string;
  customFields?: CustomFields;
}

export interface ContactSettings {
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface GeneralSettings {
  title: string;
  description: string;
}