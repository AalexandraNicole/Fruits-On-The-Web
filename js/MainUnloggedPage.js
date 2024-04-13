// document.getElementById("btnlogin").onclick = function () {
//     location.href = "loginPage.html";
// };

// Get all category headers
const categoryHeaders = document.querySelectorAll('.category-header');

// Get all category elements
const categories = document.querySelectorAll('.category');

// Function to handle category header click
function handleCategoryHeaderClick(event) {
    // Get the ID of the clicked category header
    const categoryId = event.target.id.replace('-header', '');
    
    // Hide all categories
    categories.forEach(category => {
        category.classList.remove('active');
    });

    // Show the clicked category
    document.getElementById(categoryId).classList.add('active');
}

// Add event listener to category headers
categoryHeaders.forEach(header => {
    header.addEventListener('click', handleCategoryHeaderClick);
});