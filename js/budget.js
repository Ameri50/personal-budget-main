// findTransactionById: Busca una transacción por su ID
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.id === id);
  }
  
  // filterTransactionsByType: Filtra transacciones por tipo
  function filterTransactionsByType(transactions, type) {
    return transactions.filter(transaction => transaction.type === type);
  }
  
  // getTotalByType: Suma montos de transacciones de un tipo específico
  function getTotalByType(transactions, type) {
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }
  
  // Exportar funciones (para usar en otros archivos)
  export { findTransactionById, filterTransactionsByType, getTotalByType };
  