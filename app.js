function setupBudget() {
    const dailyBudget = document.getElementById('daily-budget').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const budgetInfo = {
        dailyBudget,
        startDate,
        endDate,
        expenses: {}
    };

    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    displayBudgetInfo();
}

function addExpense() {
    const expenseAmount = document.getElementById('expense-amount').value;
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const budgetInfo = JSON.parse(localStorage.getItem('budgetInfo'));
    if (!budgetInfo.expenses[today]) {
        budgetInfo.expenses[today] = 0;
    }
    budgetInfo.expenses[today] += parseFloat(expenseAmount);
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    displayBudgetInfo();
}

function displayBudgetInfo() {
    const budgetInfo = JSON.parse(localStorage.getItem('budgetInfo'));
    if (!budgetInfo) return;

    const today = new Date().toISOString().split('T')[0];
    let remainingBudget = parseFloat(budgetInfo.dailyBudget); // Ensure dailyBudget is a number

    // Calculate remaining budget considering today's date
    Object.keys(budgetInfo.expenses).forEach(date => {
        if (date === today) {
            // Ensure each expense is treated as a number
            remainingBudget -= parseFloat(budgetInfo.expenses[date]);
        }
    });

    // Ensure remainingBudget is a number before calling toFixed
    if (!isNaN(remainingBudget)) {
        document.getElementById('budget-info').innerHTML = `
            <p>Daily Budget: ${parseFloat(budgetInfo.dailyBudget).toFixed(2)}</p>
            <p>Today's Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('budget-info').innerHTML = 'Error calculating remaining budget.';
    }
}

// Display budget info on load
document.addEventListener('DOMContentLoaded', displayBudgetInfo);
