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
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';
    errorDiv.style.color = 'red';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.marginBottom = '10px';
    errorDiv.innerText = message;

    const wrapper = document.querySelector('.wrapper');
    wrapper.insertBefore(errorDiv, wrapper.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function setLoading(isLoading) {
    const button = document.getElementById("RegisterBtn");
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Registering...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Register <i class="bx bx-user-plus"></i>';
    }
}

document.getElementById("RegisterBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-pass").value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru|yahoo\.com)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const isUsernameValid = validateField("reg-username", username !== "");
    const isEmailValid = validateField("reg-email", emailRegex.test(email));
    const isPasswordValid = validateField("reg-pass", passwordRegex.test(password));

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
        if (!isUsernameValid) {
            showError("Please enter a username");
            return;
        }
        if (!isEmailValid) {
            showError("Please enter a valid email address (gmail.com, mail.ru, or yahoo.com)");
            return;
        }
        if (!isPasswordValid) {
            showError("Password must be at least 6 characters with 1 uppercase and 1 lowercase letter");
            return;
        }
        return;
    }

    setLoading(true);

    // First, check if the email already exists
    fetch('../auth/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if email already exists
            if (data.users.some(user => user.email === email)) {
                throw new Error('Email already registered');
            }

            // Add new user
            const newUser = {
                email: email,
                password: password,
                name: username
            };

            data.users.push(newUser);

            // Since we can't actually save to the JSON file in the browser,
            // we'll store the updated data in localStorage as a temporary solution
            localStorage.setItem('usersData', JSON.stringify(data));

            // Show success message and redirect
            const wrapper = document.querySelector('.wrapper');
            if (wrapper) {
                wrapper.classList.add('fade-out');
                setTimeout(() => {
                    alert("Registration successful! Please login with your credentials.");
                    window.location.href = "../auth/login.html";
                }, 500);
            } else {
                alert("Registration successful! Please login with your credentials.");
                window.location.href = "../auth/login.html";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Email already registered') {
                showError("This email is already registered. Please use a different email or login.");
            } else {
                showError("Registration failed. Please try again later.");
            }
            setLoading(false);
        });
});
