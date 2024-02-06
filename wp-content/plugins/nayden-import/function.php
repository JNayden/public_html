<?php
function product_importer_menu() {
    add_menu_page( 'Nayden Product Importer', 'Nayden Product Importer', 'manage_options', 'nayden-product-importer', 'product_importer_page' );
    add_menu_page(
        'Nayden Import Settings',
        'Nayden Import',
        'manage_options',
        'nayden-import-settings',
        'nayden_import_settings_page'
    );
}

// Function to render the settings page
function nayden_import_settings_page() {
    ?>
    <div class="wrap">
        <h2>Nayden Import Settings</h2>
        <form method="post" action="options.php">
            <?php settings_fields('nayden_import_options'); ?>
            <?php do_settings_sections('nayden-import-settings'); ?>
            <?php submit_button('Save Settings'); ?>
        </form>
    </div>
    <?php
}
// Function to register plugin settings and fields
function nayden_import_register_settings() {
    // Register a settings group
    register_setting('nayden_import_options', 'nayden_import_options');

    // Add sections for different mapping options
    add_settings_section('title_mapping_section', 'Title Mapping', 'title_mapping_section_callback', 'nayden-import-settings');
    add_settings_section('description_mapping_section', 'Description Mapping', 'description_mapping_section_callback', 'nayden-import-settings');
    // Add more sections for other mappings (e.g., image, price, etc.)

    // Add fields for mapping options within each section
    add_settings_field('title_mapping_field', 'Title Column', 'title_mapping_field_callback', 'nayden-import-settings', 'title_mapping_section');
    add_settings_field('description_mapping_field', 'Description Column', 'description_mapping_field_callback', 'nayden-import-settings', 'description_mapping_section');
    // Add more fields for other mappings (e.g., image, price, etc.)
}
add_action('admin_init', 'nayden_import_register_settings');

// Callback functions to render individual fields
function title_mapping_field_callback() {
    $options = get_option('nayden_import_options');
    echo '<input type="text" name="nayden_import_options[title_mapping]" value="' . esc_attr($options['title_mapping']) . '" />';
}

function description_mapping_field_callback() {
    $options = get_option('nayden_import_options');
    echo '<input type="text" name="nayden_import_options[description_mapping]" value="' . esc_attr($options['description_mapping']) . '" />';
}

// Callback functions to render section headers
function title_mapping_section_callback() {
    echo '<p>Select the CSV column for the product title.</p>';
}

function description_mapping_section_callback() {
    echo '<p>Select the CSV column for the product description.</p>';
}

// Add more callbacks for other sections and fields as needed
// Function to handle the CSV file upload and processing with user selection
function process_uploaded_csv_with_selection() {
    if (isset($_FILES['csv_file'])) {
        $csv_file = $_FILES['csv_file']['tmp_name'];
        
        // Process the CSV file here
        // You can use functions like fgetcsv() to read the file and extract data
        // Example:
        if (($handle = fopen($csv_file, "r")) !== FALSE) {
            // Display user interface for column mapping
            echo '<form method="post">';
            echo '<label for="title_column">Select Title Column:</label>';
            echo '<select name="title_column">';
            // Output options based on CSV columns
            // Example: You may need to read the first row to get column headers
            // and then display them as options in the select dropdown
            // Example: 
            foreach ($csv_columns as $index => $column) {
                echo "<option value='$index'>$column</option>";
            }
            echo '</select>';
            // Similar select dropdowns for other attributes like description, image, etc.
            echo '<input type="submit" name="submit_mapping" value="Submit Mapping">';
            echo '</form>';
        }
    }
}

// Function to handle user submission of column mapping
function handle_column_mapping_submission() {
    if (isset($_POST['submit_mapping'])) {
        $title_column_index = $_POST['title_column'];
        // Get selected columns for other attributes
        
        // Save the selected column mappings to user options
        // Example: You can use update_option() to save the mappings
    }
}

// Function to match uploaded CSV info with defined inputs using user-selected mappings
function match_csv_info_with_selection() {
    // Retrieve user-selected column mappings
    // Example: You can use get_option() to retrieve the mappings saved in Step 2
    
    // Process CSV file using the selected column mappings
    if (isset($_FILES['csv_file'])) {
        $csv_file = $_FILES['csv_file']['tmp_name'];
        
        if (($handle = fopen($csv_file, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                // Match CSV info with defined inputs using user-selected mappings
                // Example: Get title from the selected column index
                // Example: $title = $data[$title_column_index];
                
                // Process matched info (e.g., save to database)
            }
            fclose($handle);
        }
    }
}

// Function to save matched info to database
function save_matched_info_to_database($title, $description) {
    // Example: Insert data into database
    global $wpdb;
    $table_name = $wpdb->prefix . 'imported_products';

    $wpdb->insert(
        $table_name,
        array(
            'title' => $title,
            'description' => $description,
            // Add more fields as needed
        )
    );
}

function process_product_import() {
    if (isset($_POST['action']) && $_POST['action'] === 'process_import' && isset($_FILES['import_file'])) {
        // Handle file upload and product import here
        $file = $_FILES['import_file'];
        $variable_products = isset($_POST['variable_products']) ? true : false;
        
        // Call the function to process the uploaded CSV file
        process_uploaded_csv_with_selection($file, $variable_products);
    }
}