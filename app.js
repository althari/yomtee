function setupBudget() {
    const dailyBudget = document.getElementById('daily-budget').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!dailyBudget || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
    }

    const budgetInfo = {
        dailyBudget,
        startDate,
        endDate,
        expenses: {}
    };

    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    displayBudgetInfo();
    document.getElementById('budget-setup').style.display = 'none'; // Hide budget setup
    document.getElementById('expense-tracker').style.display = 'block'; // Show expense tracker
}

function addExpense() {
    const expenseAmount = document.getElementById('expense-amount').value;
    if (!expenseAmount) {
        alert('Please enter an expense amount.');
        return;
    }

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const budgetInfo = JSON.parse(localStorage.getItem('budgetInfo'));
    if (!budgetInfo.expenses[today]) {
        budgetInfo.expenses[today] = 0;
    }
    budgetInfo.expenses[today] += parseFloat(expenseAmount);
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    displayBudgetInfo();
}

function resetBudget() {
    localStorage.removeItem('budgetInfo');
    document.getElementById('budget-setup').style.display = 'block'; // Show budget setup
    document.getElementById('expense-tracker').style.display = 'none'; // Hide expense tracker
    document.getElementById('budget-info').innerHTML = ''; // Clear budget info
    // Optionally clear input fields
    document.getElementById('daily-budget').value = '';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
}

function displayBudgetInfo() {
    const budgetInfo = JSON.parse(localStorage.getItem('budgetInfo'));
    if (!budgetInfo) return;

    const today = new Date().toISOString().split('T')[0];
    let remainingBudget = parseFloat(budgetInfo.dailyBudget);

    Object.keys(budgetInfo.expenses).forEach(date => {
        if (date === today) {
            remainingBudget -= parseFloat(budgetInfo.expenses[date]);
        }
    });

    if (!isNaN(remainingBudget)) {
        document.getElementById('budget-info').innerHTML = `
            <p>Daily Budget: ${parseFloat(budgetInfo.dailyBudget).toFixed(2)}</p>
            <p>Today's Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('budget-info').innerHTML = 'Error calculating remaining budget.';
    }
}

// Initialize app based on existing budgetInfo in localStorage
function initApp() {
    const budgetInfo = JSON.parse(localStorage.getItem('budgetInfo'));
    if (budgetInfo) {
        document.getElementById('budget-setup').style.display = 'none';
        document.getElementById('expense-tracker').style.display = 'block';
    } else {
        document.getElementById('budget-setup').style.display = 'block';
        document.getElementById('expense-tracker').style.display = 'none';
    }
    displayBudgetInfo();
}

document.addEventListener('DOMContentLoaded', initApp);
