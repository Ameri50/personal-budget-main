export function updateBalance(transactions, balanceElement) {
    let totalBalance = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalBalance += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalBalance -= transaction.amount;
      }
    });
  
    // Actualiza el monto en el elemento correspondiente
    balanceElement.textContent = `$${totalBalance.toFixed(2)}`;
  }
  
  export function addTransaction(transaction, transactionList) {
    const li = document.createElement('li');
    li.classList.add('transaction-item');
    li.innerHTML = `
      <div>
        <strong>${transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</strong> - $${transaction.amount.toFixed(2)}
        <div class="transaction-time">${transaction.date}</div>
      </div>
    `;
    transactionList.appendChild(li);
  }
  
  export function sortTransactions(transactions) {
    return transactions.sort((a, b) => b.amount - a.amount);
  }
  