document.addEventListener('DOMContentLoaded', function() {
    const creditSlider = document.getElementById('creditSlider');
    const termSlider = document.getElementById('termSlider');
    const creditValue = document.getElementById('creditValue');
    const termValue = document.getElementById('termValue');
    const monthlyRate = document.getElementById('monthlyRate');
    const submitBtn = document.getElementById('submitBtn');

    const annualInterestRate = 0.05;

    function updateCalculations() {
        const amount = parseInt(creditSlider.value);
        const term = parseInt(termSlider.value);

        creditValue.textContent = amount.toLocaleString();
        termValue.textContent = term;

        const monthlyInterestRate = annualInterestRate / 12;
        const monthlyPayment = (amount * monthlyInterestRate) / 
            (1 - Math.pow(1 + monthlyInterestRate, -term));

        monthlyRate.textContent = monthlyPayment.toFixed(2);
    }

    updateCalculations();
    creditSlider.addEventListener('input', updateCalculations);
    termSlider.addEventListener('input', updateCalculations);
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert(`Cererea a fost trimisă!\nSuma: ${creditValue.textContent} Lei\nTermen: ${termValue.textContent} Luni`);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('../navbar/nav.html')  
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
            })
            .catch(error => console.error('Eroare la încărcarea navbar-ului:', error));
    } else {
        console.error('Elementul navbar-container nu a fost găsit');
    }
});

