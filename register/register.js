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


document.getElementById("RegisterBtn").addEventListener("click", function(e) {
    e.preventDefault();

    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-pass").value.trim();
    const username = document.getElementById("reg-username").value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let isValid = true;

    document.querySelectorAll(".input-box").forEach(box => {
        box.classList.remove("error");
    });

    if (username === "") {
        markError("reg-username");
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        markError("reg-email");
        isValid = false;
    }

    if (password.length < 6) {
        markError("reg-pass");
        isValid = false;
    }

        if (isValid) {
            alert("You successfully registered!");
    }
});

function markError(id) {
    const field = document.getElementById(id);
    field.parentElement.classList.add("error");
}