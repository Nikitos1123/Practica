
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


document.getElementById("SignInBtn").addEventListener("click", function(e) {
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
        alert("You successfully login!");
        window.location.href="../Main_Content/website.html"

    }
});

function markError(id) {
    const field = document.getElementById(id);
    field.parentElement.classList.add("error");
}
