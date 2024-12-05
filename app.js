// Variables globales
const transactions = [];
let ascendingOrder = true;
let filterType = 'todos'; // 'ingreso', 'gasto', or 'todos'

// Referencias al DOM
const form = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const categorySelect = document.getElementById('category');
const transactionsList = document.getElementById('transactions-list');
const sortButton = document.getElementById('sort-button');
const filterButton = document.getElementById('filter-button'); // Botón de filtro

// Lista de categorías
const categorias = ['Alimentos', 'Entretenimiento', 'Vivienda', 'Transporte', 'Salud'];

// Agregar las categorías al select
categorias.forEach(categoria => {
  const option = document.createElement('option');
  option.value = categoria;
  option.textContent = categoria;
  categorySelect.appendChild(option);
});

// Función para agregar transacción
function agregarTransaccion(tipo, monto, categoria) {
  if (monto <= 0 || isNaN(monto)) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  const transaccion = { tipo, monto: parseFloat(monto), categoria };
  transactions.push(transaccion);
  alert(`Transacción agregada: ${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'} de $${monto.toFixed(2)} en la categoría ${categoria}`);
  actualizarHistorial();
}

// Función para actualizar historial de transacciones
function actualizarHistorial() {
  transactionsList.innerHTML = '';
  if (transactions.length === 0) {
    transactionsList.innerHTML = '<li>No hay transacciones registradas.</li>';
    return;
  }

  // Filtrar las transacciones según el tipo seleccionado
  const filteredTransactions = transactions.filter(trans => {
    if (filterType === 'todos') return true;
    return trans.tipo === filterType;
  });

  // Mostrar las transacciones filtradas
  filteredTransactions.forEach(({ tipo, monto, categoria }) => {
    const li = document.createElement('li');
    li.textContent = `${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}: $${monto.toFixed(2)} (Categoría: ${categoria})`;
    li.style.color = tipo === 'ingreso' ? 'green' : 'red';
    transactionsList.appendChild(li);
  });
}

// Ordenar transacciones por monto
sortButton.addEventListener('click', () => {
  if (transactions.length === 0) {
    alert("No hay transacciones para ordenar.");
    return;
  }

  transactions.sort((a, b) => (ascendingOrder ? a.monto - b.monto : b.monto - a.monto));
  ascendingOrder = !ascendingOrder;
  actualizarHistorial();
});

// Filtrar transacciones por tipo
filterButton.addEventListener('click', () => {
  const selectedFilter = document.querySelector('input[name="filter"]:checked');
  if (selectedFilter) {
    filterType = selectedFilter.value;
    actualizarHistorial();
  }
});

// Manejo del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const monto = parseFloat(amountInput.value);
  const tipo = typeSelect.value;
  const categoria = categorySelect.value;

  if (isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  agregarTransaccion(tipo, monto, categoria);

  // Limpiar formulario
  form.reset();
});
