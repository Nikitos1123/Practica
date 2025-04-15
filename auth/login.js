
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target && !target.startsWith('#')) {
            e.preventDefault();
            document.querySelector('.wrapper').classList.add('fade-out');
            setTimeout(() => {
                window.location.href = target;
            }, 300);
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


document.getElementById("LoginBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-pass").value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru|yahoo\.com)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const isEmailValid = validateField("login-email", emailRegex.test(email));
    const isPasswordValid = validateField("login-pass", passwordRegex.test(password));

    if (isEmailValid && isPasswordValid) {
        alert("You successfully logged in!");
        window.location.href = "../Main_Content/website.html";
    }
});
