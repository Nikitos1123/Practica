function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
    setTimeout(() => {
        sidebar.classList.add('visible');
    }, 10);
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('visible');
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300); // Match the transition duration
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('nav ul li:last-child');
    
    if (sidebar && sidebar.classList.contains('visible')) {
        if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
            hideSidebar();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    const nav = document.querySelector('nav ul');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        const loginTime = new Date(userData.loginTime);
        const currentTime = new Date();
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);

        if (hoursSinceLogin < 24) {
            // Add logout button
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.innerHTML = '<i class="bx bx-log-out"></i> Logout';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.setItem('isLogout', 'true'); // Set logout flag
                sessionStorage.removeItem('currentUser');
                window.location.href = '../auth/login.html';
            });
            logoutLi.appendChild(logoutLink);
            nav.appendChild(logoutLi);
        } else {
            sessionStorage.removeItem('currentUser');
            window.location.href = '../auth/login.html';
        }
    } else {
        // Add login button
        const loginLi = document.createElement('li');
        const loginLink = document.createElement('a');
        loginLink.href = '../auth/login.html';
        loginLink.innerHTML = '<i class="bx bx-log-in"></i> Login';
        loginLi.appendChild(loginLink);
        nav.appendChild(loginLi);
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> e3eb7da15f03ce2e18fd1fb907ce10f4a02f1019
