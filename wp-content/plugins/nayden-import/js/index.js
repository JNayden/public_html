// var columnHeaders = null;

function populateSelectOptions(selectId, options, firstRowValue) {
    // Get a reference to the container div
    var container = document.getElementById('wrap');

    var table = document.createElement('table');
    container.appendChild(table);

     // Create and append form elements
    var tr = document.createElement('tr');
    var tdLabel = document.createElement('td');
    var tdSelect = document.createElement('td');

    var label = document.createElement('label');
    var maxLength = 40; 
    label.textContent = selectId.replace(/-/g, ' ') + ': ';
    var shortenedValue = label.textContent.length > maxLength ? label.textContent.substring(0, maxLength): label.textContent;
    label.textContent = shortenedValue;
    label.style.paddingRight = '10px';
    tdLabel.appendChild(label);
    
    // Create and append form elements
    var select = document.createElement("select");
    // Set the id attribute
    select.id = selectId;
    select.style.width = '200px';
    tdSelect.appendChild(select);

    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    // Clear existing options
    select.innerHTML = '';

    // Add default option
    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Select --';
    select.appendChild(defaultOption);

    // Add options from the array
    options.forEach(function(option) {
        // console.log(option);
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });

     // Append table cells to table row
    tr.appendChild(tdLabel);
    tr.appendChild(tdSelect);

    table.appendChild(tr);
    // Add a grayed text span under the label
    var span = document.createElement('span');
    var maxLength = 50; // Maximum length of the span text
    if (firstRowValue.length > maxLength){
        shortenedValue = firstRowValue.substring(0, maxLength)
        span.textContent = '(First row: ' + shortenedValue;
        span.style.color = '#888'; // Gray color
        span.style.fontSize = "12px";

        var span2 = document.createElement('span');
        var shortenedValue2 = firstRowValue.substring(maxLength, 80) + ' ...';
        span2.textContent = "\n" + shortenedValue2  + ')';
        span2.style.color = '#888'; // Gray color
        span2.style.fontSize = "12px";

        label.appendChild(document.createElement('br')); // Add line break
        label.appendChild(span);

        label.appendChild(document.createElement('br')); 
        label.appendChild(span2);
    }else{
        shortenedValue = firstRowValue;
        span.textContent = '(First row: ' + shortenedValue + ')';
        span.style.color = '#888'; // Gray color
        span.style.fontSize = "12px";

        label.appendChild(document.createElement('br')); // Add line break
        label.appendChild(span);
    }

    // Create a button element
   
}

// Function to populate all select options
function populateAllSelectOptions(columnHeaders, firstRow) {
    var container = document.getElementById('wrap');
    var columns = [];
    columnHeaders.forEach(function(columnHeader){
        columns.push(columnHeader)
    })
    container.innerHTML = '';
    // Populate options for each select element
    columns.map(function(column, index) {
        var firstRowValue = firstRow[index];
        populateSelectOptions(column, columnHeaders, firstRowValue);
    })
    var button = document.createElement('button');
    button.textContent = 'Submit';

    // Add event listener to the button
    button.addEventListener('click',  function() {
        sendSelectedColumn(columnHeaders);
    });

    // Append the button to the document body or any desired container
    container.appendChild(button);
}

function sendSelectedColumn(columnHeaders) {
    columnHeaders.forEach(function(columnHeader){
    
        var select = document.getElementById(columnHeader);
        var selectedColumn = select.value;
        
        // Send selected column to server using AJAX
        // Example using fetch API
        fetch('admin.php?page=nayden-product-importer', {
            method: 'POST',
            body: JSON.stringify({ column: selectedColumn }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log response from server
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    })
}

document.addEventListener("DOMContentLoaded", function() {
    // Call function to populate select options
    if (columnHeaders !== null) {
        populateAllSelectOptions(columnHeaders, firstRow);
    }
});