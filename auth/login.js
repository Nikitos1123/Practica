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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let isValid = true;

    document.querySelectorAll(".input-box").forEach(box => {
        box.classList.remove("error");
    });

    if (!emailRegex.test(email)) {
        markError("log-email");
        isValid = false;
    }

    if (password.length < 6) {
        markError("log-pass");
        isValid = false;
    }

    if (isValid) {
        console.log("Login successful");
        alert("You successfully registered!");
    }
});

function markError(id) {
    const field = document.getElementById(id);
    field.parentElement.classList.add("error");
}
