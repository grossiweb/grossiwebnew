# WordPress Menu GraphQL Fix Guide

## Problem
Menu created in WordPress (ID 3) is not accessible via GraphQL endpoint.

## Root Cause
WPGraphQL requires explicit configuration to expose menus to the GraphQL API.

## Solutions

### Solution 1: Enable in WPGraphQL Settings (Easiest)
1. WordPress Admin → GraphQL → Settings
2. Find "Public Post Types" or similar section
3. Ensure "Menu Items" or "Navigation" is enabled
4. Save settings

### Solution 2: Add Code to functions.php (Most Reliable)

```php
<?php
// File: wp-content/themes/your-theme/functions.php

// Enable GraphQL support for navigation menus
add_filter( 'register_post_type_args', function( $args, $post_type ) {
    if ( 'nav_menu_item' === $post_type ) {
        $args['show_in_graphql'] = true;
        $args['graphql_single_name'] = 'MenuItem';
        $args['graphql_plural_name'] = 'MenuItems';
    }
    return $args;
}, 10, 2 );

// Enable GraphQL support for nav_menu taxonomy
add_filter( 'register_taxonomy_args', function( $args, $taxonomy ) {
    if ( 'nav_menu' === $taxonomy ) {
        $args['show_in_graphql'] = true;
        $args['graphql_single_name'] = 'Menu';
        $args['graphql_plural_name'] = 'Menus';
    }
    return $args;
}, 10, 2 );

// Register theme menu locations
add_action('after_setup_theme', function() {
    register_nav_menus([
        'primary' => __('Primary Menu', 'grossiweb'),
        'header' => __('Header Menu', 'grossiweb'),
    ]);
});

// Enable GraphQL for menu locations
add_filter('graphql_nav_menu_location_enum_values', function($values) {
    $values['PRIMARY'] = [
        'value' => 'primary',
        'description' => __('Primary navigation menu', 'grossiweb')
    ];
    $values['HEADER'] = [
        'value' => 'header',
        'description' => __('Header navigation menu', 'grossiweb')
    ];
    return $values;
});
```

### Solution 3: Assign Menu to Theme Location

1. WordPress Admin → Appearance → Menus
2. Select "Top Menu" (the one with ID 3)
3. Under "Display location" or "Menu Settings", check:
   - ☑ Primary Menu
   - OR ☑ Header Menu
4. Click "Save Menu"

## Testing After Fix

### Test 1: Query All Menus
```bash
curl -X POST https://newdesign.grossiweb.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ menus { nodes { id databaseId name } } }"}'
```

Expected output:
```json
{
  "data": {
    "menus": {
      "nodes": [
        {
          "id": "...",
          "databaseId": 3,
          "name": "Top Menu"
        }
      ]
    }
  }
}
```

### Test 2: Query Menu by ID
```bash
curl -X POST https://newdesign.grossiweb.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ menu(id: \"3\", idType: DATABASE_ID) { id name menuItems { nodes { label url } } } }"}'
```

### Test 3: Query Menu by Location
```bash
curl -X POST https://newdesign.grossiweb.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ menuItems(where: {location: PRIMARY}) { nodes { label url } } }"}'
```

## Verification in Next.js

After applying the fix, your Next.js app will automatically:

1. Fetch menu from WordPress (ID 3 or PRIMARY location)
2. Display WordPress menu items in header
3. Show debug log in browser console:
   ```
   ✅ Menu loaded from WordPress ID 3
   ```

If WordPress menu is still unavailable, fallback menu will display:
```
⚠️ Using fallback menu items (WordPress menu not found)
```

## Current Fallback Menu

If WordPress menu doesn't load, these items display:
- Home → /
- About → /about-us/
- Services → /services/
- Contact Us → /contact-us/
- Blog → /blog/

## Next Steps

1. Apply one of the solutions above in WordPress
2. Clear WordPress cache (if using caching plugin)
3. Refresh your Next.js app: http://localhost:3000
4. Check browser console for menu debug message
5. Verify menu items match your WordPress menu

## Need Help?

If the menu still doesn't appear after trying all solutions:
1. Check WPGraphQL plugin version (should be 1.x or higher)
2. Verify WPGraphQL plugin is activated
3. Check WordPress error logs
4. Test GraphQL endpoint with the curl commands above
