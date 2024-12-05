// Variables para el balance y lista de transacciones
let balance = 0;
const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const datetimeElement = document.getElementById('datetime');
const errorMessageElement = document.getElementById('error-message');

// Arreglo para almacenar las transacciones
let transactions = [];

// Función para actualizar la fecha y hora actual
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(); // Formato de fecha (dd/mm/yyyy)
  const time = now.toLocaleTimeString(); // Formato de hora (hh:mm:ss)
  datetimeElement.textContent = `${date} ${time}`;
}

// Función para actualizar el balance
function updateBalance(amount, type) {
  if (type === 'ingreso') {
    balance += amount;
  } else if (type === 'gasto') {
    balance -= amount;
  }
  balanceElement.textContent = balance.toFixed(2); // Mostrar el balance con 2 decimales
}

// Función para agregar una nueva transacción al historial
function addTransaction(amount, type) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Crear un objeto con la transacción
  const transaction = {
    amount: amount,
    type: type,
    date: date,
    time: time,
  };

  // Agregar la transacción al arreglo de transacciones
  transactions.push(transaction);

  // Ordenar las transacciones en orden descendente por defecto
  transactions.sort((a, b) => b.amount - a.amount);

  // Limpiar el historial y agregar las transacciones ordenadas
  renderTransactions();
}

// Función para renderizar las transacciones
function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((transaction) => {
    const listItem = document.createElement('div');
    listItem.classList.add('transaction-item');
    listItem.classList.add(transaction.type === 'ingreso' ? 'income' : 'expense');
    listItem.innerHTML = `
      <strong>${transaction.type === 'ingreso' ? 'Ingreso' : 'Gasto'}:</strong> 
      <span class="amount">$${transaction.amount.toFixed(2)}</span>
      <span> - Fecha: ${transaction.date} - Hora: ${transaction.time}</span>
    `;
    transactionList.appendChild(listItem);
  });
}

// Función para validar el monto ingresado
function validateAmount(amount) {
  if (isNaN(amount) || amount <= 0) {
    errorMessageElement.textContent = 'Por favor, ingresa un monto válido y mayor a 0.';
    return false;
  }
  errorMessageElement.textContent = ''; // Limpiar mensaje de error
  return true;
}

// Manejo del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (validateAmount(amount)) {
    updateBalance(amount, type);
    addTransaction(amount, type);
  }

  // Limpiar el formulario
  form.reset();
});

// Función para ordenar las transacciones en orden ascendente
function sortTransactionsAsc() {
  transactions.sort((a, b) => a.amount - b.amount);
  renderTransactions();
}

// Función para ordenar las transacciones en orden descendente
function sortTransactionsDesc() {
  transactions.sort((a, b) => b.amount - a.amount);
  renderTransactions();
}

// Agregar event listeners para los botones de ordenación
document.getElementById('sort-asc').addEventListener('click', sortTransactionsAsc);
document.getElementById('sort-desc').addEventListener('click', sortTransactionsDesc);

// Actualizar la fecha y hora al cargar la página
updateDateTime();

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);
  