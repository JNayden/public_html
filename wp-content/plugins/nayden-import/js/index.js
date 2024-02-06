// var columnHeaders = null;

function populateSelectOptions(selectId, options, firstRowValue) {
    // Get a reference to the container div
    var container = document.getElementById('wrap');

    var label = document.createElement('label');
    label.textContent = selectId.replace(/-/g, ' ') + ': ';
    container.appendChild(label);
    
    // Create and append form elements
    var select = document.createElement("select");

    // Set the id attribute
    select.id = selectId;
    container.appendChild(select);
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
        console.log(option);
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });

    // Add a grayed text span under the label
    var span = document.createElement('span');
    span.textContent = '(First row: ' + firstRowValue + ')';
    span.style.color = '#888'; // Gray color
    label.appendChild(document.createElement('br')); // Add line break
    label.appendChild(span);
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
}

document.addEventListener("DOMContentLoaded", function() {
    // Call function to populate select options
    if (columnHeaders !== null) {
        populateAllSelectOptions(columnHeaders, firstRow);
    }
});