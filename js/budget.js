// Función para calcular el balance
function calculateBalance() {
  return totalIngresos - totalGastos;
}

// Función para obtener el total de ingresos
function getTotalIngresos() {
  return totalIngresos;
}

// Función para obtener el total de gastos
function getTotalGastos() {
  return totalGastos;
}

// Actualizar el balance al iniciar la aplicación
function initializeBudget() {
  document.getElementById('total-ingresos').innerText = `$${totalIngresos.toFixed(2)}`;
  document.getElementById('total-gastos').innerText = `$${totalGastos.toFixed(2)}`;
  document.getElementById('balance').innerText = `$${calculateBalance().toFixed(2)}`;
}

function updateTransactionsList() {
  const transactionsList = document.getElementById('transactions-list');
  transactionsList.innerHTML = ''; // Limpiar lista actual

  transactions.forEach(transaction => {
      const transactionElement = createTransactionElement(transaction);
      transactionsList.appendChild(transactionElement);
  });
}