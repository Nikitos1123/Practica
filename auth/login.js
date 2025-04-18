document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target && !target.startsWith('#')) {
            e.preventDefault();
            const wrapper = document.querySelector('.wrapper');
            if (wrapper) {
                wrapper.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            } else {
                window.location.href = target;
            }
        }
    });
});

function validateField(id, condition) {
    const field = document.getElementById(id);
    const inputBox = field.parentElement;

    if (condition) {
        inputBox.classList.remove("error");
        return true;
    } else {
        inputBox.classList.add("error");
        return false;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = 'red';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.marginBottom = '10px';
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
}

function setLoading(isLoading) {
    const button = document.getElementById("SignInBtn");
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing in...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Sign In <i class="bx bx-log-in"></i>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing session data when loading the login page
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isLogout');
});

document.getElementById("SignInBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("log-email").value.trim();
    const password = document.getElementById("log-pass").value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru|yahoo\.com)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const isEmailValid = validateField("log-email", emailRegex.test(email));
    const isPasswordValid = validateField("log-pass", passwordRegex.test(password));

    if (!isEmailValid || !isPasswordValid) {
        if (!isEmailValid) {
            showError("Please enter a valid email address (gmail.com, mail.ru, or yahoo.com)");
            return;
        }
        if (!isPasswordValid) {
            showError("Password must be at least 6 characters with 1 uppercase and 1 lowercase letter");
            return;
        }
    }

    setLoading(true);
    clearError();

    // First check localStorage for the user
    const storedUsersData = localStorage.getItem('usersData');
    if (storedUsersData) {
        const storedUsers = JSON.parse(storedUsersData);
        const storedUser = storedUsers.users.find(u => u.email === email && u.password === password);
        if (storedUser) {
            handleSuccessfulLogin(storedUser);
            return;
        }
    }

    // If not found in localStorage, check the JSON file
    fetch('../auth/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const user = data.users.find(u => u.email === email && u.password === password);
            
            if (user) {
                handleSuccessfulLogin(user);
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Invalid credentials') {
                showError("Invalid email or password");
            } else {
                showError("An error occurred. Please try again later.");
            }
            setLoading(false);
        });
});

function handleSuccessfulLogin(user) {
    clearError();
    sessionStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
    }));
    
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        wrapper.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = "../Main_Content/website.html";
        }, 500);
    } else {
        window.location.href = "../Main_Content/website.html";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        const loginTime = new Date(userData.loginTime);
        const currentTime = new Date();
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);

        if (hoursSinceLogin < 24) {
            window.location.href = "../Main_Content/website.html";
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }
});
