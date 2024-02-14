<?php
/**
 * Plugin Name: Nayden Import
 * Description: desc
 * Author: Nayden
 * Author URI: https://example.com
 * Version: 1.0.0
 * Text Domain: nayden-import
 * 
 */
// Add a menu item to the WordPress admin menu

require_once(__DIR__.'../../../../wp-load.php');
function product_importer_menu() {
    add_menu_page( 'Nayden Product Importer', 'Nayden Product Importer', 'manage_options', 'nayden-product-importer', 'product_importer_page' );
}

// Render the product importer page
function product_importer_page() {
    ?>
        <div id="wrap">
            <h2>Nayden Product Importer</h2>
            <form method="post" action="" enctype="multipart/form-data">
                <label for="import_file">Upload CSV File:</label>
                <input type="file" id="import_file" name="import_file">
                <br><br>
                <input type="checkbox" id="variable_products" name="variable_products">
                <label for="variable_products">Import Variable Products</label>
                <br><br>
                <input type="submit" name="submit" class="button button-primary" value="Import Products">
            </form>
        
        </div>
    <?php
}

// Process the form submission
function process_product_import() {
    if (isset($_POST['submit']) && isset($_FILES['import_file'])) {
        // Handle file upload and product import here
        if ($_FILES['import_file']['error'] !== UPLOAD_ERR_OK) {
            // Handle file upload error
            echo "File upload failed with error code: " . $_FILES['import_file']['error'];
            return;
        }
        // $file = $_FILES['import_file'];
        $file = $_FILES['import_file']['tmp_name'];

        // Open the file for reading
        $handle = fopen($file, "r");
    
        // Check if the file opened successfully
        if ($handle !== FALSE) {
            // Get the column headers (first row)
            $allLines = [];
            $column_headers = fgetcsv($handle);

            $first_row = fgetcsv($handle);
            // $allLines[] = $column_headers;
            // $allLines[] = $first_row;

            // // Read each line of the CSV file until the end
            // while (($line = fgetcsv($handle)) !== FALSE) {
            //     // Add the current line to the array
            //     $allLines[] = $line;
            // }

            // $column_headers now contains an array of column headers from the CSV file
            // You can use this array to dynamically populate options in your HTML select element
            // For example, you can encode this array as JSON and pass it to JavaScript
            $column_headers_json = json_encode($column_headers);
            $first_row_json = json_encode($first_row);
            
            // Pass $column_headers_json to your HTML/JavaScript for dynamic population of options
            ?>
            <script>
                    var columnHeaders = <?php echo $column_headers_json; ?>;
                    var firstRow = <?php echo $first_row_json; ?>;
            </script>
            <?php
            my_plugin_scripts();
        } else {
            // Error opening file
            echo "Error opening the CSV file.";
        }
        // Close the file handle
        fclose($handle);
    }
}

function receiving_js_data(){
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
        $json_data = file_get_contents('php://input');
        // print_r($json_data);
        $data_field_body_arr = json_decode($json_data, true); // true parameter converts it to associative array
        // Check if the 'data' key exists in the decoded data
        $product_args = array();
        print_r($data_field_body_arr);
        if (isset($data_field_body_arr)) {
            foreach ($data_field_body_arr as $key => $value) {
                  
                // Trim keys and values
                $key = trim($key);
                $value = trim($value);
                $product_args[$key] = $value;
                echo "Key: " . $key . ", Value: " . $value . "\n";
            }
            $product_args['post_type'] = 'product';
            print_r($product_args);
            $product_id = wp_insert_post($product_args);
            update_post_meta($product_id, '_product_type', 'simple');

            // Set product status to 'publish'  
            wp_update_post(array('ID' => $product_id, 'post_status' => 'publish'));

            // Set product category (replace 'category-slug' with the actual category slug)
            wp_set_post_terms($product_id, 'Fashion', 'product_cat');

            // Set product tags (replace 'tag1, tag2' with actual tag names)
            wp_set_post_terms($product_id, 'tag1, tag2', 'product_tag');
        }
    }
}
// if(!defined('ABSPATH')){
//     echo 'What are you trying to do?';
//     exit();
// }
function delete_products(){
    for($i = 1707163835; $i <= 1707163836; $i++){
        if (get_post_type($i) === 'product') {
            // Delete the product
            wp_delete_post($i, true); // Set the second parameter to true to force delete
            echo 'Product deleted successfully.';
        } else {
            echo 'Product does not exist.';
        }
    }
}
function my_plugin_scripts() {
    wp_enqueue_script('my-plugin-script', plugins_url('..\nayden-import\js\index.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'my_plugin_scripts');

add_action( 'admin_menu', 'product_importer_menu' );
add_action( 'admin_init', 'process_product_import' );
receiving_js_data();
// delete_products();