# WordPress Headless CMS Setup Guide

This guide will help you configure your WordPress installation at `https://newdesign.grossiweb.com/wp-admin` to work as a headless CMS with your Next.js frontend.

## Required WordPress Plugins

### 1. WPGraphQL (Essential)
```bash
# Install WPGraphQL plugin
# Download from: https://github.com/wp-graphql/wp-graphql
# Or install from WordPress admin: Plugins > Add New > Search "WPGraphQL"
```

### 2. WPGraphQL for Advanced Custom Fields
```bash
# Install WPGraphQL for ACF
# Download from: https://github.com/wp-graphql/wp-graphql-acf
```

### 3. Advanced Custom Fields (ACF) Pro
```bash
# Install ACF Pro for custom fields
# Download from: https://www.advancedcustomfields.com/
```

## Custom Post Types & Fields Setup

### 1. Homepage Custom Fields
Create a field group for the "Page" post type with these fields:

```php
// Homepage Hero Section
- Hero Title (Text) - Field Name: hero_title
- Hero Subtitle (Textarea) - Field Name: hero_subtitle  
- Hero Video URL (URL) - Field Name: hero_video
- Hero Words Array (Repeater) - Field Name: hero_words
  - Word (Text) - Field Name: word

// Apply to: Page Template = Homepage
```

### 2. Services Custom Post Type
```php
// Create Custom Post Type: "Services"
- Post Type: services
- Supports: title, editor, thumbnail, excerpt

// Custom Fields for Services:
- Service Icon (Image) - Field Name: service_icon
- Service Price (Text) - Field Name: service_price
- Service Features (Repeater) - Field Name: service_features
  - Feature (Text) - Field Name: feature
```

### 3. Testimonials Custom Post Type
```php
// Create Custom Post Type: "Testimonials"
- Post Type: testimonials
- Supports: title, editor

// Custom Fields for Testimonials:
- Client Name (Text) - Field Name: client_name
- Client Position (Text) - Field Name: client_position
- Client Company (Text) - Field Name: client_company
- Rating (Number) - Field Name: rating
- Client Image (Image) - Field Name: client_image
```

### 4. Clients Custom Post Type
```php
// Create Custom Post Type: "Clients"
- Post Type: clients
- Supports: title, thumbnail

// Custom Fields for Clients:
- Client Logo (Image) - Field Name: client_logo
- Client URL (URL) - Field Name: client_url
```

### 5. Trust Features Custom Post Type
```php
// Create Custom Post Type: "Trust Features"
- Post Type: trust_features
- Supports: title, editor

// Custom Fields for Trust Features:
- Icon (Image) - Field Name: icon
- Highlight Words (Text) - Field Name: highlight_words (comma-separated)
```

## Menu Configuration

### 1. Create Primary Menu
1. Go to **Appearance > Menus**
2. Create a new menu called "Primary Menu"
3. Add your main navigation items:
   - Home (Link to: /)
   - About (Link to: /about)
   - Services (Link to: /services) 
   - Contact Us (Link to: /contact)
   - Blog (Link to: /blog)
4. Set as "Primary Menu" location

### 2. Enable GraphQL for Menus
```php
// Add to functions.php
add_action('init', function() {
    register_nav_menus([
        'primary' => 'Primary Menu'
    ]);
});

// Enable GraphQL for menu location
add_filter('graphql_nav_menu_location_enum_values', function($values) {
    $values['PRIMARY'] = [
        'value' => 'primary',
        'description' => 'Primary navigation menu'
    ];
    return $values;
});
```

## Contact Form Setup

### 1. Install Contact Form 7 + WPGraphQL Extension
```bash
# Install Contact Form 7
# Install WPGraphQL for Contact Form 7
```

### 2. Contact Settings Custom Fields
```php
// Create Options Page with ACF
- Contact Email (Email) - Field Name: contact_email
- Contact Phone (Text) - Field Name: contact_phone  
- Contact Address (Textarea) - Field Name: contact_address
- Social Media (Group) - Field Name: social_media
  - Facebook (URL) - Field Name: facebook
  - Twitter (URL) - Field Name: twitter
  - LinkedIn (URL) - Field Name: linkedin
  - Instagram (URL) - Field Name: instagram
```

## Content Creation Guide

### 1. Create Homepage
1. Create a new Page titled "Home"
2. Set slug to "home"
3. Fill in the Hero custom fields:
   - Hero Title: "We are"
   - Hero Subtitle: "We have the development aptitude to build exactly what you need."
   - Hero Video: URL to your hero video
   - Hero Words: Strategy, Design, Development, Results

### 2. Add Services
1. Go to Services > Add New
2. Create services with:
   - Title
   - Description (content)
   - Featured Image
   - Service Icon
   - Service Price
   - Service Features

### 3. Add Testimonials
1. Go to Testimonials > Add New
2. Create testimonials with:
   - Client review (content)
   - Client Name
   - Client Position
   - Client Company
   - Rating (1-5)
   - Client Image

### 4. Add Clients
1. Go to Clients > Add New
2. Add client logos:
   - Client Name (title)
   - Featured Image (logo)
   - Client URL

### 5. Add Trust Features
1. Go to Trust Features > Add New
2. Create 4 trust features:
   - Title
   - Description (content)
   - Icon image
   - Highlight words (comma-separated)

## GraphQL Endpoints

Your GraphQL endpoint will be available at:
```
https://newdesign.grossiweb.com/graphql
```

## Testing GraphQL

1. Install GraphiQL or use the WPGraphQL IDE
2. Test this query:

```graphql
query {
  pages {
    nodes {
      title
      content
      customFields {
        heroTitle
        heroSubtitle
      }
    }
  }
  
  services {
    nodes {
      title
      content
      customFields {
        serviceIcon
        servicePrice
      }
    }
  }
}
```

## Environment Variables

Add to your `.env.local`:
```env
WORDPRESS_API_URL=https://newdesign.grossiweb.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://newdesign.grossiweb.com
```

## Security & Performance

1. **Enable CORS** for your domain in WordPress
2. **Set up caching** with Redis or similar
3. **Optimize images** with WebP format
4. **Enable Gzip compression**
5. **Set up SSL** if not already configured

## Additional Plugins (Optional)

- **Yoast SEO** - For SEO management
- **WP Rocket** - For caching and performance
- **Smush** - For image optimization
- **Wordfence** - For security

## Troubleshooting

### Common Issues:

1. **GraphQL endpoint not accessible**
   - Check if WPGraphQL plugin is activated
   - Verify permalink structure is set (not "Plain")

2. **Custom fields not showing in GraphQL**
   - Install WPGraphQL for ACF plugin
   - Check field group settings (Show in GraphQL = Yes)

3. **CORS errors**
   - Add your Next.js domain to WordPress CORS settings
   - Install a CORS plugin if needed

4. **Authentication errors**
   - For private content, set up JWT authentication
   - Configure proper API permissions

Your headless CMS is now ready! The Next.js frontend will automatically pull content from WordPress via GraphQL.