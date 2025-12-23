# WordPress Headless CMS Configuration Steps

## Your Current Setup ✅
- WordPress Admin: https://newdesign.grossiweb.com/wp-admin
- Username: mujahid
- GraphQL Pro ✅
- WP GraphQL ACF ✅ 
- Custom Fields (ACF) ✅
- Custom Post Types ✅

## Step 1: Create Custom Post Types

### A. Services Post Type
1. Go to **CPT UI → Add/Edit Post Types**
2. Create new post type:
   - Post Type Slug: `services`
   - Plural Label: `Services`
   - Singular Label: `Service`
   - Settings:
     - Public: True
     - Show in GraphQL: True
     - GraphQL Single Name: `service`
     - GraphQL Plural Name: `services`
   - Supports: Title, Editor, Thumbnail, Excerpt

### B. Testimonials Post Type
1. Create new post type:
   - Post Type Slug: `testimonials`
   - Plural Label: `Testimonials`
   - Singular Label: `Testimonial`
   - Settings:
     - Public: True
     - Show in GraphQL: True
     - GraphQL Single Name: `testimonial`
     - GraphQL Plural Name: `testimonials`
   - Supports: Title, Editor

### C. Clients Post Type
1. Create new post type:
   - Post Type Slug: `clients`
   - Plural Label: `Clients`
   - Singular Label: `Client`
   - Settings:
     - Public: True
     - Show in GraphQL: True
     - GraphQL Single Name: `client`
     - GraphQL Plural Name: `clients`
   - Supports: Title, Thumbnail

### D. Trust Features Post Type
1. Create new post type:
   - Post Type Slug: `trust_features`
   - Plural Label: `Trust Features`
   - Singular Label: `Trust Feature`
   - Settings:
     - Public: True
     - Show in GraphQL: True
     - GraphQL Single Name: `trustFeature`
     - GraphQL Plural Name: `trustFeatures`
   - Supports: Title, Editor

## Step 2: Create Custom Fields (ACF)

### A. Homepage Fields
1. Go to **Custom Fields → Field Groups → Add New**
2. Title: `Homepage Fields`
3. Add these fields:

```
Field Label: Hero Title
Field Name: hero_title
Field Type: Text
Default Value: We are

Field Label: Hero Subtitle  
Field Name: hero_subtitle
Field Type: Textarea
Default Value: We have the development aptitude to build exactly what you need.

Field Label: Hero Video URL
Field Name: hero_video
Field Type: URL
Default Value: https://newdesign.grossiweb.com/wp-content/uploads/2025/03/1-3.mp4

Field Label: Hero Words
Field Name: hero_words
Field Type: Repeater
Sub Field:
  - Field Label: Word
  - Field Name: word
  - Field Type: Text
```

4. Location Rules: 
   - Post Type is equal to Page
   - AND Page Template is equal to Default Template
   - AND Page is equal to Home (create home page first if needed)

5. Settings:
   - Show in GraphQL: Yes
   - GraphQL Field Name: heroFields

### B. Services Fields
1. Create new field group: `Services Fields`
2. Add these fields:

```
Field Label: Service Icon
Field Name: service_icon
Field Type: Image
Return Format: Array

Field Label: Service Price
Field Name: service_price
Field Type: Text

Field Label: Service Features
Field Name: service_features
Field Type: Repeater
Sub Field:
  - Field Label: Feature
  - Field Name: feature
  - Field Type: Text
```

3. Location Rules: Post Type is equal to Services
4. Settings: Show in GraphQL: Yes

### C. Testimonials Fields
1. Create new field group: `Testimonials Fields`
2. Add these fields:

```
Field Label: Client Name
Field Name: client_name
Field Type: Text

Field Label: Client Position
Field Name: client_position
Field Type: Text

Field Label: Client Company
Field Name: client_company
Field Type: Text

Field Label: Rating
Field Name: rating
Field Type: Number
Min: 1, Max: 5

Field Label: Client Image
Field Name: client_image
Field Type: Image
Return Format: Array
```

3. Location Rules: Post Type is equal to Testimonials
4. Settings: Show in GraphQL: Yes

### D. Clients Fields
1. Create new field group: `Clients Fields`
2. Add these fields:

```
Field Label: Client Logo
Field Name: client_logo
Field Type: Image
Return Format: Array

Field Label: Client URL
Field Name: client_url
Field Type: URL
```

3. Location Rules: Post Type is equal to Clients
4. Settings: Show in GraphQL: Yes

### E. Trust Features Fields
1. Create new field group: `Trust Features Fields`
2. Add these fields:

```
Field Label: Icon
Field Name: icon
Field Type: Image
Return Format: Array

Field Label: Highlight Words
Field Name: highlight_words
Field Type: Text
Instructions: Enter comma-separated words to highlight (e.g., ROI,happiness)
```

3. Location Rules: Post Type is equal to Trust Features
4. Settings: Show in GraphQL: Yes

## Step 3: Configure Menus

### A. Create Primary Menu
1. Go to **Appearance → Menus**
2. Create new menu: `Primary Menu`
3. Add these items:
   - Home (Custom Link: /)
   - About (Custom Link: /about)
   - Services (Custom Link: /services)
   - Contact Us (Custom Link: /contact)
   - Blog (Custom Link: /blog)
4. Assign to location: `Primary Menu`

### B. Enable GraphQL for Menus
1. Go to **GraphQL → Settings**
2. Under "Menus", enable GraphQL for all menu locations

## Step 4: Create Content

### A. Create Homepage
1. Go to **Pages → Add New**
2. Title: `Home`
3. Slug: `home`
4. Fill in the Hero custom fields:
   - Hero Title: `We are`
   - Hero Subtitle: `We have the development aptitude to build exactly what you need.`
   - Hero Video: `https://newdesign.grossiweb.com/wp-content/uploads/2025/03/1-3.mp4`
   - Hero Words: Add 4 repeater rows:
     - Strategy
     - Design  
     - Development
     - Results
5. Publish the page

### B. Set Homepage as Front Page
1. Go to **Settings → Reading**
2. Set "Your homepage displays" to "A static page"
3. Select "Home" as the homepage

### C. Create Sample Services
1. Go to **Services → Add New**
2. Create 3-4 services with:
   - Title (e.g., "Web Development")
   - Content (description)
   - Featured Image
   - Service Icon
   - Service Price
   - Service Features (add multiple features)

### D. Create Sample Testimonials
1. Go to **Testimonials → Add New**
2. Create 3-4 testimonials with:
   - Title (client review summary)
   - Content (full review)
   - Client Name
   - Client Position
   - Client Company
   - Rating (1-5)
   - Client Image

### E. Create Sample Clients
1. Go to **Clients → Add New**
2. Add client logos:
   - Title (Client name)
   - Featured Image (logo)
   - Client Logo (same image)
   - Client URL

### F. Create Trust Features
1. Go to **Trust Features → Add New**
2. Create 4 trust features:
   - "We ensure ROI" (highlight: ROI)
   - "Your happiness is ours" (highlight: happiness)
   - "We dare to be different" (highlight: different)
   - "We keep you company in your process" (highlight: process)

## Step 5: Test GraphQL

1. Visit: `https://newdesign.grossiweb.com/graphql`
2. Test this query:

```graphql
query {
  page(id: "home", idType: URI) {
    title
    customFields {
      heroTitle
      heroSubtitle
      heroVideo
      heroWords {
        word
      }
    }
  }
  
  services {
    nodes {
      title
      content
      customFields {
        serviceIcon {
          sourceUrl
        }
        servicePrice
        serviceFeatures {
          feature
        }
      }
    }
  }
}
```

## Step 6: WordPress Settings

### A. Permalink Structure
1. Go to **Settings → Permalinks**
2. Select "Post name" structure
3. Save changes

### B. GraphQL Settings
1. Go to **GraphQL → Settings**
2. Enable all post types for GraphQL
3. Set introspection to "Enabled"

## Next Steps After Setup:

1. Test the GraphQL endpoint
2. Verify your Next.js app can connect
3. Add real content to replace samples
4. Configure SEO settings
5. Set up contact forms

Let me know when you complete each step, and I'll help you troubleshoot any issues!