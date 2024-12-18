// updateCategories: Actualiza las categorías usando map()
function updateCategories(transactions, newCategory) {
    return transactions.map(transaction => ({
      ...transaction,
      category: newCategory
    }));
  }
  
  // hasTransactionsOverAmount: Verifica si alguna transacción supera un monto
  function hasTransactionsOverAmount(transactions, amount) {
    return transactions.some(transaction => transaction.amount > amount);
  }
  
  // areAllTransactionsValid: Verifica si todos los montos son positivos
  function areAllTransactionsValid(transactions) {
    return transactions.every(transaction => transaction.amount > 0);
  }
  
  // formatDescription: Limpia espacios en blanco de la descripción
  function formatDescription(description) {
    return description.trim();
  }
  
  // getTransactionType: Normaliza el tipo de transacción
  function getTransactionType(type) {
    return type.toLowerCase();
  }
  
  // splitTags: Divide un string de tags en un array
  function splitTags(tags) {
    return tags.split(",").map(tag => tag.trim());
  }
  
  // Exportar funciones
  export {
    updateCategories,
    hasTransactionsOverAmount,
    areAllTransactionsValid,
    formatDescription,
    getTransactionType,
    splitTags
  };
  