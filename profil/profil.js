// Get loans from localStorage or initialize empty array
let loans = [];

function loadLoans() {
    const storedLoans = localStorage.getItem('userLoans');
    if (storedLoans) {
        loans = JSON.parse(storedLoans);
    }
    updateStats();
    displayLoans();
}

function updateStats() {
    const totalLoans = loans.length;
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const avgDuration = totalLoans > 0 ? loans.reduce((sum, loan) => sum + loan.duration, 0) / totalLoans : 0;

    document.getElementById('totalLoans').textContent = totalLoans;
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('ro-RO');
    document.getElementById('avgDuration').textContent = avgDuration.toFixed(1);
}

function displayLoans() {
    const loansList = document.getElementById('loansList');
    loansList.innerHTML = '';

    if (loans.length === 0) {
        loansList.innerHTML = '<div class="loan-item" style="text-align: center; color: #666;">Nu aveți credite înregistrate</div>';
        return;
    }

    // Sort loans by date (newest first)
    const sortedLoans = [...loans].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedLoans.forEach(loan => {
        const loanItem = document.createElement('div');
        loanItem.className = 'loan-item';
        
        const formattedDate = new Date(loan.date).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        loanItem.innerHTML = `
            <div class="loan-header">
                <div class="loan-amount">${loan.amount.toLocaleString('ro-RO')} Lei</div>
                <div class="loan-duration">${loan.duration} Luni</div>
            </div>
            <div class="loan-date">Data: ${formattedDate}</div>
        `;

        loansList.appendChild(loanItem);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadLoans);
