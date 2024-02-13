// var columnHeaders = null;
// global variables are: columnHeaders firstRow


function populateSelectOptions(selectId, options, firstRowValue) {
    // Get a reference to the container div

    console.log('inside');

    let container = document.getElementById('wrap');


    let productDiv = document.createElement('div');


    container.appendChild(productDiv);

    let tr = document.createElement('div');
    tr.classList.add('tr')
    tr.style.width = '50%'
    tr.style.display = 'grid'
    tr.style.gridTemplateAreas = 'leftSide rightSide';
    tr.style.gridTemplateAreas = '60% 40%'
    tr.style.alignItems = 'center'
    tr.style.padding = '40px'


    let tdLabel = document.createElement('div');
    tdLabel.style.gridArea = 'leftSide'
    let tdSelect = document.createElement('div');
    tdSelect.style.gridArea = 'rightSide'
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

    // container.appendChild(document.createElement('br')); for delete
    // container.appendChild(document.createElement('br')); for delete
    // Clear existing options
    select.innerHTML = '';

    // Add default option
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Select --';
    select.appendChild(defaultOption);

    // Add options from the array
    options.forEach(function (option) {
        // console.log(option);
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });

    // Append table cells to table row
    tr.appendChild(tdLabel);
    tr.appendChild(tdSelect);

    productDiv.appendChild(tr);
    // Add a grayed text span under the label
    let labelSapnOne = document.createElement('span');
    let maxLength = 50; // Maximum length of the span text
    if (firstRowValue.length > maxLength) {
        shortenedValue = firstRowValue.substring(0, maxLength)
        labelSapnOne.textContent = '(First row: ' + shortenedValue;
        labelSapnOne.style.color = '#888'; // Gray color
        labelSapnOne.style.fontSize = "12px";

        let labelSpanTwo = document.createElement('span');
        let shortenedValue2 = firstRowValue.substring(maxLength, 80) + ' ...';
        labelSpanTwo.textContent = "\n" + shortenedValue2 + ')';
        labelSpanTwo.style.color = '#888'; // Gray color
        labelSpanTwo.style.fontSize = "12px";

        label.appendChild(document.createElement('br')); // Add line break
        label.appendChild(labelSapnOne);

        label.appendChild(document.createElement('br'));
        label.appendChild(labelSpanTwo);
    } else {
        shortenedValue = firstRowValue;
        span.textContent = '(First row: ' + shortenedValue + ')';
        span.style.color = '#888'; // Gray color
        span.style.fontSize = "12px";

        label.appendChild(document.createElement('br')); // Add line break
        label.appendChild(labelSapnOne);
    }

    // Create a button element

}

// Function to populate all select options
function populateAllSelectOptions(columnHeaders, firstRow) {
    let container = document.getElementById('wrap');
    let columns = [];
    columnHeaders.forEach((columnHeader) => {
        columns.push(columnHeader)
    })
    container.innerHTML = '';
    // Populate options for each select element
    columns.map((column, index) => {
        let firstRowValue = firstRow[index];
        populateSelectOptions(column, columnHeaders, firstRowValue);
    })
    let button = document.createElement('button');
    button.textContent = 'Submit';

    // Add event listener to the button
    button.addEventListener('click',
        function () {
            sendSelectedColumn(columnHeaders);
        }
    );

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