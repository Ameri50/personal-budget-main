// Variables globales
const transactions = [];
let ascendingOrder = true;

// Referencias al DOM
const form = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsList = document.getElementById('transactions-list');
const sortButton = document.getElementById('sort-button');

// Función para agregar transacción
function agregarTransaccion(tipo, monto) {
  if (monto <= 0 || isNaN(monto)) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  const transaccion = { tipo, monto: parseFloat(monto) };
  transactions.push(transaccion);
  actualizarHistorial();
}

// Función para actualizar historial de transacciones
function actualizarHistorial() {
  transactionsList.innerHTML = '';
  transactions.forEach(({ tipo, monto }) => {
    const li = document.createElement('li');
    li.textContent = `${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}: $${monto.toFixed(2)}`;
    li.style.color = tipo === 'ingreso' ? 'green' : 'red';
    transactionsList.appendChild(li);
  });
}

// Ordenar transacciones por monto
sortButton.addEventListener('click', () => {
  transactions.sort((a, b) => (ascendingOrder ? a.monto - b.monto : b.monto - a.monto));
  ascendingOrder = !ascendingOrder;
  actualizarHistorial();
});

// Manejo del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const monto = parseFloat(amountInput.value);
  const tipo = typeSelect.value;

  agregarTransaccion(tipo, monto);

  // Limpiar formulario
  form.reset();
});
