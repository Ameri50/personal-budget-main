// Puedes usar este archivo para manejar el historial, por ejemplo, con el almacenamiento local (localStorage).
export function saveTransactionHistory(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  export function loadTransactionHistory() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
  }
  