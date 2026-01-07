# Menu Configuration

## Overview
The Next.js app automatically fetches the main navigation menu from your WordPress headless CMS using WPGraphQL.

## WordPress Setup
Your main menu is configured in WordPress:
- **Menu Name**: Top Menu
- **Menu ID**: 3 (Database ID)
- **Location**: WordPress Admin → Appearance → Menus

## How It Works

### 1. Environment Variable
The menu ID is configured in your `.env.local` file:
```env
NEXT_PUBLIC_WP_MENU_ID=3
```

### 2. Automatic Fetching
The `Header` component (`src/components/Header.tsx`) automatically:
- Fetches menu items from WordPress using GraphQL
- Queries menu by database ID (3) if `NEXT_PUBLIC_WP_MENU_ID` is set
- Falls back to theme location if ID is not provided
- Uses hardcoded fallback menu if WordPress is unreachable

### 3. GraphQL Query
The query used is `GET_MENU_BY_ID` (defined in `src/lib/queries.ts`):
```graphql
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
        target
      }
    }
  }
}
```

## Adding/Updating Menu Items

### In WordPress:
1. Go to **WordPress Admin → Appearance → Menus**
2. Select **"Top Menu"** (ID: 3)
3. Add, remove, or reorder menu items
4. Click **Save Menu**

### In Next.js:
**Nothing!** The menu will automatically update when you:
- Refresh the page (in development)
- Rebuild the site (in production)

The changes appear **instantly** because the Header component fetches the menu on every page load.

## Menu Structure
The system supports:
- **Label**: Display text for the menu item
- **URL/Path**: Link destination (automatically normalized)
- **Target**: Open in new tab (`_blank`) or same tab
- **Parent/Child**: Supports nested menu items (submenus)

## Fallback Menu
If WordPress is unreachable or the menu is not found, the app uses these fallback items:
- Home (/)
- About (/about-us/)
- Services (/services/)
- Contact Us (/contact-us/)
- Blog (/blog/)

## Debugging
In development mode, check the browser console for menu loading status:
- ✅ `Menu loaded from WordPress ID 3` - Working correctly
- ⚠️ `Using fallback menu items` - WordPress connection issue

## Testing
1. Go to your WordPress Admin
2. Add a new menu item to "Top Menu" (ID: 3)
3. Save the menu
4. Refresh your Next.js app
5. Click the hamburger menu icon
6. The new item should appear automatically!

## Technical Details
- **Query Location**: `src/lib/queries.ts` → `GET_MENU_BY_ID`
- **Component**: `src/components/Header.tsx`
- **Caching**: Apollo Client handles caching (fresh on each load in dev)
- **SSR**: Menu is fetched client-side for maximum flexibility

