const sidebar = document.getElementById('sidebar');
const dashboardIcon = document.getElementById('dashboardIcon');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const sidebarToggle = document.getElementById('sidebarToggle');


dashboardIcon.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
});


sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});


searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        console.log(`Searching for: ${query}`); 
    } else {
        console.log('Please enter a search query');
    }
});
