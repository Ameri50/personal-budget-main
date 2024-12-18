import {
    findTransactionById,
    filterTransactionsByType,
    getTotalByType
  } from "./Budget.js";
  
  import {
    updateCategories,
    hasTransactionsOverAmount,
    areAllTransactionsValid,
    formatDescription,
    getTransactionType,
    splitTags
  } from "";
  
  // searchTransactions: Busca transacciones por descripción
  function searchTransactions(transactions, keyword) {
    return transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  // formatAmount: Formatea montos numéricos
  function formatAmount(amount) {
    return amount.toLocaleString("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }
  
  // getMonthName: Extrae y devuelve el mes de una fecha
  function getMonthName(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return monthNames[date.getMonth()];
  }
  
  // Ejemplo de transacciones (array de prueba)
  const transactions = [
    { id: 1, description: "Comida", amount: 50, type: "gasto", category: "alimentación", date: "2024-06-17" },
    { id: 2, description: "Salario", amount: 1000, type: "ingreso", category: "trabajo", date: "2024-06-01" },
  ];
  
  // Ejemplo de uso
  console.log(findTransactionById(transactions, 1));
  console.log(filterTransactionsByType(transactions, "gasto"));
  console.log(getTotalByType(transactions, "ingreso"));
  console.log(formatAmount(1000));
  console.log(getMonthName("2024-06-17"));
  