<?php
require_once(__DIR__.'../../../../wp-load.php');

// require('./js/index.js')
// sendSelectedColum()
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

function myplugin_enqueue_styles() {
    // Enqueue your CSS file
    wp_enqueue_style('myplugin-custom-style', plugins_url('wp-content\plugins\nayden-import\css\style.css', __FILE__));
}

// Render the product importer page
function product_importer_page() {
    ?>
        <div id="wrap">
            <h2 class="main-heading">Nayden Product Importer</h2>
            <form method="post" action="" enctype="multipart/form-data">
                <label for="import_file">Upload CSV File:</label>
                <input type="file" id="import_file" name="import_file">
                <!-- <br><br> -->
                <!-- <input type="checkbox" id="variable_products" name="variable_products"> -->
                <!-- <label for="variable_products">Import Variable Products</label> -->
                <br><br>
                <input type="submit" name="submit" value="Import Products">
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
            
            // echo "All lines: " . sizeof($allLines);
            // Close the file handle
            fclose($handle);
    
            // $column_headers now contains an array of column headers from the CSV file
            // You can use this array to dynamically populate options in your HTML select element
            // For example, you can encode this array as JSON and pass it to JavaScript
            $column_headers_json = json_encode($column_headers);
            $first_row_json = json_encode($first_row);
            
            // Pass $column_headers_json to your HTML/JavaScript for dynamic population of options
            ?>
            <script>
                    let columnHeaders = <?php echo $column_headers_json; ?>;
                    let firstRow = <?php echo $first_row_json; ?>;
            </script>
            <?php
        } else {
            // Error opening file
            echo "Error opening the CSV file.";
        }
        ?>
        
        <script src="..\wp-content\plugins\nayden-import\js\index.js"></script>
        <?php
        $variable_products = isset($_POST['variable_products']) ? true : false;

        $data = json_decode(file_get_contents('php://input'), true);
        echo "Data from php POST: ";
        print_r($data);
        // $selectedColumn = $data['column'];

        // // Read CSV file and fetch rows associated with the selected column
        // $allLines = [];
        // $handle = fopen($file, 'r');
        // while (($line = fgetcsv($handle)) !== FALSE) {
        //     // Assuming the first row contains column headers
        //     $columnIndex = array_search($selectedColumn, $line);
        //     if ($columnIndex !== false) {
        //         // Add only rows that have the selected column
        //         $allLines[] = $line;
        //     }
        // }
        // fclose($handle);
    }
}
// if(!defined('ABSPATH')){
//     echo 'What are you trying to do?';
//     exit();
// }



add_action('wp_ajax_my_action', 'my_action');
add_action('wp_ajax_nopriv_my_action', 'my_action'); // За анонимни потребители

function my_action() {
    // Проверка за безопасност
    check_ajax_referer('my_action_nonce', 'security');

    // Получаване на данните от AJAX заявката
    $data = $_POST['data'];  // Access the data sent from JavaScript

    // Обработка на получените данни
    // Например, можете да ги използвате за извикване на определена функция или за извършване на други действия

    // Изпращане на отговор обратно към клиента
    echo 'Данните са получени успешно. Data: ' . $data;

    // Приключване на изпълнението на PHP скрипта
    wp_die();
}



add_action('wp_enqueue_scripts', 'myplugin_enqueue_styles');

add_action( 'admin_menu', 'product_importer_menu' );
add_action( 'admin_init', 'process_product_import' );