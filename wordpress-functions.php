<?php
/**
 * Add this code to your WordPress theme's functions.php file
 * Or create a custom plugin with this code
 */

// Enable GraphQL for menu locations
add_filter('graphql_nav_menu_location_enum_values', function($values) {
    $values['PRIMARY'] = [
        'value' => 'primary',
        'description' => 'Primary navigation menu'
    ];
    return $values;
});

// Register menu location
function register_my_menus() {
    register_nav_menus([
        'primary' => 'Primary Menu'
    ]);
}
add_action('init', 'register_my_menus');

// Enable CORS for GraphQL (if needed)
add_action('init', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Allow specific origins (replace with your Next.js domain)
        $allowed_origins = [
            'http://localhost:3000',
            'https://yourdomain.com'
        ];
        
        if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
});

// Add custom post type supports for GraphQL
add_action('init', function() {
    // Services
    if (post_type_exists('services')) {
        add_post_type_support('services', 'graphql');
    }
    
    // Testimonials
    if (post_type_exists('testimonials')) {
        add_post_type_support('testimonials', 'graphql');
    }
    
    // Clients
    if (post_type_exists('clients')) {
        add_post_type_support('clients', 'graphql');
    }
    
    // Trust Features
    if (post_type_exists('trust_features')) {
        add_post_type_support('trust_features', 'graphql');
    }
});

// Customize GraphQL schema
add_filter('graphql_post_object_connection_query_args', function($query_args, $source, $args, $context, $info) {
    // You can customize queries here if needed
    return $query_args;
}, 10, 5);

// Enable custom fields in REST API (backup option)
add_action('rest_api_init', function() {
    register_rest_field(['page', 'post', 'services', 'testimonials', 'clients', 'trust_features'], 'custom_fields', [
        'get_callback' => function($object) {
            return get_fields($object['id']);
        }
    ]);
});

// Add settings page for contact info
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Site Settings',
        'menu_title' => 'Site Settings',
        'menu_slug' => 'site-settings',
        'capability' => 'edit_posts',
        'show_in_graphql' => true,
    ]);
}
?>