// var columnHeaders = null;
// global variables are: columnHeaders firstRow
// import './index.css'

function populateSelectOptions(selectId, options, firstRowValue) {
    // Get a reference to the container div

    console.log('inside');
    // // console.log(columnHeaders);
    // // console.log(firstRow);

    // let mainContainerDiv = document.createElement('div');
    // let mainHeading = document.createElement('h1');
    // mainHeading.classList.add('main-container-heading');
    // container.appendChild(mainHeading);

    // mainHeading.textContent = 'Initialize your products';

    // let productDiv = document.createElement('div');
    // let productNameDiv = document.createElement('div');
    // let productOptionDiv = document.createElement('div');
    // productDiv.appendChild(productNameDiv);
    // productDiv.appendChild(productOptionDiv);








    // container.appendChild(mainContainerDiv);





    let container = document.getElementById('wrap');


    let productDiv = document.createElement('div');


    container.appendChild(productDiv);

    let tr = document.createElement('div');
    tr.classList.add('tr')
    tr.style.width='50%'
    tr.style.display = 'flex'
    tr.style.justifyContent = 'space-around'
    tr.style.alignItems = 'center'
    tr.style.padding = '15px'


    let tdLabel = document.createElement('div');
    let tdSelect = document.createElement('div');

    let label = document.createElement('label');
    maxLength = 40;
    label.textContent = selectId.replace(/-/g, ' ') + ': ';

    let shortenedValue = label.textContent.length > maxLength ? label.textContent.substring(0, maxLength) : label.textContent;
    label.textContent = shortenedValue;
    label.style.paddingRight = '10px';
    tdLabel.appendChild(label);

    // Create and append form elements
    let select = document.createElement("select");
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
    options.forEach(function (option) {
        // console.log(option);
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });

    // Append table cells to table row
    tr.appendChild(tdLabel);
    tr.appendChild(tdSelect);

    productDiv.appendChild(tr);
    // Add a grayed text span under the label
    var span = document.createElement('span');
    var maxLength = 50; // Maximum length of the span text
    if (firstRowValue.length > maxLength) {
        shortenedValue = firstRowValue.substring(0, maxLength)
        span.textContent = '(First row: ' + shortenedValue;
        span.style.color = '#888'; // Gray color
        span.style.fontSize = "12px";

        var span2 = document.createElement('span');
        var shortenedValue2 = firstRowValue.substring(maxLength, 80) + ' ...';
        span2.textContent = "\n" + shortenedValue2 + ')';
        span2.style.color = '#888'; // Gray color
        span2.style.fontSize = "12px";

        label.appendChild(document.createElement('br')); // Add line break
        label.appendChild(span);

        label.appendChild(document.createElement('br'));
        label.appendChild(span2);
    } else {
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
    columnHeaders.forEach(function (columnHeader) {
        columns.push(columnHeader)
    })
    container.innerHTML = '';
    // Populate options for each select element
    columns.map(function (column, index) {
        var firstRowValue = firstRow[index];
        populateSelectOptions(column, columnHeaders, firstRowValue);
    })
    var button = document.createElement('button');
    button.textContent = 'Submit';

    // Add event listener to the button
    button.addEventListener('click', function () {
        sendSelectedColumn(columnHeaders);
    });

    // Append the button to the document body or any desired container
    container.appendChild(button);
}

function sendSelectedColumn(columnHeaders) {
    columnHeaders.forEach(function (columnHeader) {

        var select = document.getElementById(columnHeader);
        var selectedColumn = select.value;

        // Send selected column to server using AJAX
        // Example using fetch API


        fetch('www.goasdksaod.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ column: selectedColumn }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log response from server
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    })
}

document.addEventListener("DOMContentLoaded", function () {
    // Call function to populate select options
    if (columnHeaders !== null) {
        populateAllSelectOptions(columnHeaders, firstRow);
    }
});

// module.exports = {
//     sendSelectedColumn,
//     sendSelectedColumn,
//     populateAllSelectOptions,
//     populateSelectOptions
// }