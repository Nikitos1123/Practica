const sidebar = document.getElementById('sidebar');
const dashboardIcon = document.getElementById('dashboardIcon');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const sidebarToggle = document.getElementById('sidebarToggle');

// Toggle sidebar visibility (for larger screens)
dashboardIcon.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
});

// Sidebar toggle (for small screens)
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Handle search functionality
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        console.log(`Searching for: ${query}`); // Add your search logic here
    } else {
        console.log('Please enter a search query');
    }
});
