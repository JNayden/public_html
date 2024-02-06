<?php
/**
 * Plugin Name: Nayden Import
 * Description: desc
 * Author: Nayden
 * Author URI: https://gorose.bg
 * Version: 1.0.0
 * Text Domain: nayden-import
 * 
 */
// Add a menu item to the WordPress admin menu
function product_importer_menu() {
    add_menu_page( 'Nayden Product Importer', 'Nayden Product Importer', 'manage_options', 'nayden-product-importer', 'product_importer_page' );
}

// Render the product importer page
function product_importer_page() {
    ?>
    <center>
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
    </center>  
    <?php
}




// Process the form submission
function process_product_import() {
    if (isset($_POST['submit']) && isset($_FILES['import_file'])) {
        ?>
        <center>
            <?php
            // Handle file upload and product import here
            if ($_FILES['import_file']['error'] !== UPLOAD_ERR_OK) {
                // Handle file upload error
                echo "File upload failed with error code: " . $_FILES['import_file']['error'];
                return;
            }
            $file = $_FILES['import_file'];
            ?>
        </center>
        <?php
        ?>
        
        <script src="..\wp-content\plugins\nayden-import\js\index.js"></script>
        <center>
            <div class="wrap">
                <h2>Nayden Product Importer</h2>
        </center>
        <?php
        $variable_products = isset($_POST['variable_products']) ? true : false;
    }
}
if(!defined('ABSPATH')){
    echo 'What are you trying to do?';
    exit();
}
add_action( 'admin_menu', 'product_importer_menu' );
add_action( 'admin_init', 'process_product_import' );