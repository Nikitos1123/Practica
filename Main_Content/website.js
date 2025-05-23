document.addEventListener('DOMContentLoaded', function() {
    // Check if we're coming from a logout action
    const isLogout = sessionStorage.getItem('isLogout');
    if (isLogout) {
        sessionStorage.removeItem('isLogout');
        sessionStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html';
        return;
    }

    // Normal session check
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../auth/login.html';
        return;
    }

    try {
        const userData = JSON.parse(currentUser);
        const loginTime = new Date(userData.loginTime);
        const currentTime = new Date();
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);

        if (hoursSinceLogin >= 24) {
            sessionStorage.removeItem('currentUser');
            window.location.href = '../auth/login.html';
            return;
        }

        // If we have a valid session, load the page content
        loadPageContent();
    } catch (error) {
        console.error('Error parsing user data:', error);
        sessionStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html';
        return;
    }
});

function loadPageContent() {
    // Form elements
    const creditForm = document.getElementById('creditForm');
    const creditSlider = document.getElementById('creditSlider');
    const termSlider = document.getElementById('termSlider');
    const interestRateSlider = document.getElementById('interestRateSlider');
    const creditValue = document.getElementById('creditValue');
    const termValue = document.getElementById('termValue');
    const interestRateValue = document.getElementById('interestRateValue');
    const monthlyRate = document.getElementById('monthlyRate');
    const submitBtn = document.getElementById('submitBtn');
    const personalCodeInput = document.getElementById('personalCode');
    const phoneNumberInput = document.getElementById('phoneNumber');

    // Constants
    const MIN_CREDIT = 1000;
    const MAX_CREDIT = 10000;
    const MIN_TERM = 6;
    const MAX_TERM = 60;

    // Update calculations and display
    function updateCalculations() {
        const amount = parseInt(creditSlider.value);
        const term = parseInt(termSlider.value);
        const monthlyInterestRate = parseFloat(interestRateSlider.value) / 100; // Convert percentage to decimal

        // Update displayed values with proper formatting
        creditValue.textContent = amount.toLocaleString('ro-RO');
        termValue.textContent = term;
        interestRateValue.textContent = monthlyInterestRate.toFixed(2);

        // Calculate monthly payment
        const monthlyPayment = (amount * monthlyInterestRate) / 
            (1 - Math.pow(1 + monthlyInterestRate, -term));

        // Calculate monthly interest amount (this changes based on remaining balance)
        // For the first month, it's the full amount * monthly rate
        const firstMonthInterest = amount * monthlyInterestRate;
        
        // For the last month, it's much smaller
        const lastMonthInterest = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, -term));
        
        // Show the average monthly interest
        const averageMonthlyInterest = (firstMonthInterest + lastMonthInterest) / 2;

        // Update monthly rate with proper formatting
        monthlyRate.textContent = monthlyPayment.toFixed(2);

        // Update interest rates display
        document.getElementById('monthlyInterestRate').textContent = (monthlyInterestRate * 100).toFixed(2);
        document.getElementById('annualInterestRate').textContent = (monthlyInterestRate * 12 * 100).toFixed(2);
        document.getElementById('monthlyInterestAmount').textContent = averageMonthlyInterest.toFixed(2);
    }

    // Validate personal code
    function validatePersonalCode(code) {
        return /^[0-9]{13}$/.test(code);
    }

    // Validate phone number
    function validatePhoneNumber(phone) {
        return /^[0-9]{8,9}$/.test(phone);
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const helpText = formGroup.querySelector('.help-text');
        helpText.textContent = message;
        helpText.style.color = '#ff4444';
        input.setCustomValidity(message);
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const helpText = formGroup.querySelector('.help-text');
        helpText.style.color = '#666';
        input.setCustomValidity('');
    }

    // Event listeners for validation
    personalCodeInput.addEventListener('input', function() {
        if (!validatePersonalCode(this.value)) {
            showError(this, 'Introduceți exact 13 cifre');
        } else {
            clearError(this);
        }
    });

    phoneNumberInput.addEventListener('input', function() {
        if (!validatePhoneNumber(this.value)) {
            showError(this, 'Introduceți 8-9 cifre');
        } else {
            clearError(this);
        }
    });

    // Form submission
    creditForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all inputs
        const isPersonalCodeValid = validatePersonalCode(personalCodeInput.value);
        const isPhoneValid = validatePhoneNumber(phoneNumberInput.value);

        if (!isPersonalCodeValid || !isPhoneValid) {
            if (!isPersonalCodeValid) {
                showError(personalCodeInput, 'Introduceți exact 13 cifre');
            }
            if (!isPhoneValid) {
                showError(phoneNumberInput, 'Introduceți 8-9 cifre');
            }
            return;
        }

        // Disable submit button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Se procesează...';

        // Simulate form submission
        setTimeout(() => {
            const formData = {
                creditAmount: creditSlider.value,
                term: termSlider.value,
                personalCode: personalCodeInput.value,
                phoneNumber: phoneNumberInput.value,
                date: new Date().toISOString() // Add current date
            };

            // Save the credit to localStorage
            const currentUser = sessionStorage.getItem('currentUser');
            if (currentUser) {
                const userData = JSON.parse(currentUser);
                let userLoans = JSON.parse(localStorage.getItem('userLoans') || '[]');
                
                // Add new loan
                userLoans.push({
                    amount: parseInt(formData.creditAmount),
                    duration: parseInt(formData.term),
                    date: formData.date
                });
                
                // Save updated loans
                localStorage.setItem('userLoans', JSON.stringify(userLoans));
            }

            // Show success message
            alert(`Cererea a fost trimisă cu succes!\nSuma: ${creditValue.textContent} Lei\nTermen: ${termValue.textContent} Luni`);

            // Reset form
            creditForm.reset();
            updateCalculations();
            submitBtn.disabled = false;
            submitBtn.textContent = 'TRIMITE CERERE';
        }, 1000);
    });

    // Initialize calculations
    updateCalculations();

    // Add event listeners for sliders
    creditSlider.addEventListener('input', updateCalculations);
    termSlider.addEventListener('input', updateCalculations);
    interestRateSlider.addEventListener('input', updateCalculations);
}

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
