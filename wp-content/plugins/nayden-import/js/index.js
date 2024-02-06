function replaceContent() {
    // Get a reference to the container div
    var container = document.getElementById('wrap');

    // Remove the old content by setting innerHTML to an empty string
    container.innerHTML = '';
}
document.addEventListener("DOMContentLoaded", function() {
    // Function to replace content
    replaceContent();
});