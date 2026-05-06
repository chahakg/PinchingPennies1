
// Category colors
const categoryColors = {
  Food:          "#FF552E",
  Groceries:     "#f59e0b",
  Transport:     "#3b82f6",
  Textbooks:     "#8b5cf6",
  Entertainment: "#ec4899",
  Rent:          "#14b8a6",
  Other:         "#6b7280",
};

// State
let budget = 500;
let expenses = [];

// ---- Set Budget ----
function setBudget() {
  const input = document.getElementById("budgetInput");
  const val = parseFloat(input.value);
  if (!val || val <= 0) {
    alert("Please enter a valid budget amount.");
    return;
  }
  budget = val;
  input.value = "";
  updateSummary();
}

// ---- Add Expense ----
function addExpense() {
  const name     = document.getElementById("expenseName").value.trim();
  const amount   = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;

  if (!name) {
    alert("Please enter a description for this expense.");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  expenses.push({ name, amount, category });

  // Clear inputs
  document.getElementById("expenseName").value    = "";
  document.getElementById("expenseAmount").value  = "";

  renderExpenses();
  updateSummary();
}

// ----  Expense List ----
function renderExpenses() {
  const list = document.getElementById("expenseList");

  if (expenses.length === 0) {
    list.innerHTML = '<div class="empty-state">No expenses yet. Log your first one! 👆</div>';
    return;
  }

  // Show newest first
  list.innerHTML = [...expenses].reverse().map(exp => `
    <div class="expense-item">
      <div class="expense-left">
        <div class="category-dot" style="background:${categoryColors[exp.category] || '#6b7280'}"></div>
        <div>
          <div class="expense-name">${exp.name}</div>
          <div class="expense-cat">${exp.category}</div>
        </div>
      </div>
      <div class="expense-amount">-$${exp.amount.toFixed(2)}</div>
    </div>
  `).join("");
}

// ---- Update Summary ----
function updateSummary() {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining  = budget - totalSpent;
  const pct        = Math.min((totalSpent / budget) * 100, 100);

  // Simple points: 10 pts per $10 under budget, min 0
  const points = remaining > 0 ? Math.floor(remaining / 10) * 5 : 0;

  document.getElementById("spentDisplay").textContent    = `$${totalSpent.toFixed(2)}`;
  document.getElementById("budgetDisplay").textContent   = `$${budget.toFixed(2)}`;
  document.getElementById("progressBar").style.width     = `${pct}%`;
  document.getElementById("progressPct").textContent     = `${Math.round(pct)}% used`;
  document.getElementById("pointsDisplay").textContent   = `${points} pts`;

  const remEl = document.getElementById("remainingDisplay");
  remEl.textContent = `$${Math.abs(remaining).toFixed(2)}`;
  remEl.className   = `value ${remaining >= 0 ? "green" : "red"}`;
  if (remaining < 0) remEl.textContent = `-$${Math.abs(remaining).toFixed(2)}`;

  // Turn progress bar red if over budget
  document.getElementById("progressBar").style.background =
    pct >= 100
      ? "linear-gradient(90deg, #ef4444, #f87171)"
      : "linear-gradient(90deg, var(--orange), var(--orange-light))";
}
