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
    let remainingBudget = budgetInfo.dailyBudget;
    // Calculate remaining budget considering today's date
    Object.keys(budgetInfo.expenses).forEach(date => {
        if (date === today) {
            remainingBudget -= budgetInfo.expenses[date];
        }
    });

    document.getElementById('budget-info').innerHTML = `
        <p>Daily Budget: ${budgetInfo.dailyBudget}</p>
        <p>Today's Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    `;
}

// Display budget info on load
document.addEventListener('DOMContentLoaded', displayBudgetInfo);
