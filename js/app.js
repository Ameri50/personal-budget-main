document.addEventListener("DOMContentLoaded", () => {
    let transactions = [];
    let balance = 0;
    let avgIncome = 0;
    let avgExpense = 0;
    let highestIncome = 0;
    let highestExpense = 0;
  
    const balanceElement = document.getElementById("balance-amount");
    const avgIncomeElement = document.getElementById("avg-income");
    const avgExpenseElement = document.getElementById("avg-expense");
    const highestIncomeElement = document.getElementById("highest-income");
    const highestExpenseElement = document.getElementById("highest-expense");
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const sortButton = document.getElementById("sort-transactions");
  
    // Añadir una transacción
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("amount").value);
      const type = document.getElementById("type").value;
  
      if (isNaN(amount) || amount <= 0) {
        return;
      }
  
      const transaction = { amount, type, date: new Date().toISOString() };
      transactions.push(transaction);
      updateBalance();
      updateStatistics();
      renderTransactions();
    });
  
    // Actualizar balance
function updateBalance() {
    balance = transactions.reduce((acc, transaction) => {
      // Si la transacción es un ingreso, sumamos el monto; si es un gasto, lo restamos.
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  
    // Si el balance es negativo, lo ponemos a 0
    if (balance < 0) {
      balance = 0;
    }
  
    // Actualiza el contenido del span con el id balance-amount con el valor calculado.
    balanceElement.textContent = `$${balance.toFixed(2)}`;
  }
  
    // Actualizar estadísticas
    function updateStatistics() {
      const incomeTransactions = transactions.filter(t => t.type === "income");
      const expenseTransactions = transactions.filter(t => t.type === "expense");
  
      avgIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0) / incomeTransactions.length || 0;
      avgExpense = expenseTransactions.reduce((acc, t) => acc + t.amount, 0) / expenseTransactions.length || 0;
  
      highestIncome = Math.max(...incomeTransactions.map(t => t.amount), 0);
  
      // Aquí se corrige el cálculo para el gasto más alto
      highestExpense = Math.max(...expenseTransactions.map(t => t.amount), 0);  // Se cambia de Math.min a Math.max
  
      avgIncomeElement.textContent = `Promedio de Ingresos: $${avgIncome.toFixed(2)}`;
      avgExpenseElement.textContent = `Promedio de Gastos: $${avgExpense.toFixed(2)}`;
      highestIncomeElement.textContent = `Ingreso más alto: $${highestIncome.toFixed(2)}`;
      highestExpenseElement.textContent = `Gasto más alto: $${highestExpense.toFixed(2)}`;
    }
  
    // Renderizar transacciones
    function renderTransactions() {
      transactionList.innerHTML = "";
      transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <div>
            <span>${transaction.type === "income" ? "Ingreso" : "Gasto"}: $${transaction.amount}</span>
            <span class="transaction-time">${new Date(transaction.date).toLocaleString()}</span>
          </div>
        `;
        transactionList.appendChild(listItem);
      });
    }
  
    // Ordenar transacciones por monto
    sortButton.addEventListener("click", () => {
      transactions.sort((a, b) => b.amount - a.amount);
      renderTransactions();
    });
  });
  