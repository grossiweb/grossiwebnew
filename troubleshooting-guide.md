# WordPress Headless CMS Troubleshooting Guide

## Common Issues & Solutions

### 1. GraphQL Endpoint Not Working

**Issue**: `https://newdesign.grossiweb.com/graphql` returns 404 error

**Solutions**:
- Go to **Settings → Permalinks** and click "Save Changes"
- Check if WPGraphQL plugin is activated
- Verify .htaccess file has proper rewrite rules

### 2. Custom Fields Not Showing in GraphQL

**Issue**: Custom fields created with ACF don't appear in GraphQL

**Solutions**:
- Check field group settings: "Show in GraphQL" must be "Yes"
- Verify WPGraphQL for ACF plugin is activated
- Re-save the field group after checking GraphQL settings

### 3. Custom Post Types Not Available

**Issue**: Custom post types don't appear in GraphQL schema

**Solutions**:
- In CPT UI settings, enable "Show in GraphQL"
- Set proper GraphQL names (singular and plural)
- Add the functions.php code provided

### 4. CORS Errors

**Issue**: Browser blocks GraphQL requests from Next.js

**Solutions**:
- Add CORS headers to functions.php (code provided)
- Install a CORS plugin like "CORS for GraphQL"
- Contact hosting provider about CORS settings

### 5. Authentication Errors

**Issue**: GraphQL returns authentication errors

**Solutions**:
- For public content, no authentication needed
- Check user permissions in WordPress
- Verify GraphQL settings allow public access

### 6. Images Not Loading

**Issue**: Image URLs in GraphQL are broken

**Solutions**:
- Check WordPress media settings
- Verify image uploads are working
- Check file permissions on uploads folder

### 7. Menu Not Showing

**Issue**: Menu items not appearing in GraphQL

**Solutions**:
- Create menu in **Appearance → Menus**
- Assign menu to "Primary Menu" location
- Add functions.php code for menu registration

### 8. Performance Issues

**Issue**: GraphQL queries are slow

**Solutions**:
- Install a caching plugin (WP Rocket, W3 Total Cache)
- Optimize images (Smush, WebP)
- Use query complexity analysis
- Limit query depth and complexity

## Testing Steps

### Step 1: Basic GraphQL Test
1. Visit: `https://newdesign.grossiweb.com/graphql`
2. Should show GraphQL playground
3. Try this simple query:
```graphql
query {
  posts {
    nodes {
      title
    }
  }
}
```

### Step 2: Check Schema
1. In GraphQL playground, click "Schema" tab
2. Look for your custom post types
3. Verify custom fields are listed

### Step 3: Test Custom Fields
1. Create a test post/page with custom fields
2. Query it via GraphQL
3. Verify all fields return data

### Step 4: Frontend Connection
1. Test Next.js connection to GraphQL
2. Check browser network tab for errors
3. Verify API responses

## Useful WordPress Plugins for Debugging

1. **Query Monitor** - Debug WordPress queries
2. **WP GraphQL Query Analyzer** - Analyze GraphQL performance
3. **Debug Bar** - General WordPress debugging
4. **Health Check** - WordPress health diagnostics

## Hosting Considerations

### Shared Hosting Issues
- May have limited GraphQL support
- File permission restrictions
- Limited server resources

### Solutions for Shared Hosting
- Contact hosting support
- Consider upgrading to VPS/dedicated
- Use caching extensively

### Recommended Hosting Features
- PHP 8.0+
- MySQL 5.7+
- mod_rewrite enabled
- cURL support
- Adequate memory limits (512MB+)

## Getting Help

### WordPress Support Channels
1. **WPGraphQL GitHub**: https://github.com/wp-graphql/wp-graphql
2. **WordPress Forums**: https://wordpress.org/support/
3. **ACF Support**: https://support.advancedcustomfields.com/

### Debugging Information to Provide
- WordPress version
- PHP version
- Plugin versions
- Error messages (full text)
- GraphQL query causing issues
- Browser developer tools errors

## Emergency Fallback

If GraphQL completely fails, you can use WordPress REST API as backup:

### REST API Endpoints
- Posts: `/wp-json/wp/v2/posts`
- Pages: `/wp-json/wp/v2/pages`
- Custom Fields: Available with our functions.php code

### Switching to REST API
1. Update Next.js to use fetch() instead of GraphQL
2. Modify data parsing logic
3. Update TypeScript interfaces

Remember: Always backup your WordPress site before making changes!