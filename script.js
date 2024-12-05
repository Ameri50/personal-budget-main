let transactions = [];

const balanceElement = document.getElementById('balance');
const transactionsList = document.getElementById('transactions-list');
const sortButton = document.getElementById('sort-button');
const chartElement = document.getElementById('myChart');
let chart;

window.addEventListener('load', () => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions = savedTransactions;
  actualizarHistorial();
  actualizarBalance();
  actualizarGrafico();
});

document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const monto = parseFloat(document.getElementById('amount').value);
  const tipo = document.getElementById('type').value;

  if (isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  transactions.push({ tipo, monto });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  actualizarHistorial();
  actualizarBalance();
  actualizarGrafico();
  e.target.reset();
});

document.getElementById('filter-ingresos').addEventListener('click', () => mostrarTransacciones('ingreso'));
document.getElementById('filter-gastos').addEventListener('click', () => mostrarTransacciones('gasto'));
document.getElementById('filter-todos').addEventListener('click', () => mostrarTransacciones());

document.getElementById('export-button').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "transacciones.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

document.getElementById('import-button').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const importedTransactions = JSON.parse(event.target.result);
    transactions = transactions.concat(importedTransactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    actualizarHistorial();
    actualizarBalance();
    actualizarGrafico();
  };
  reader.readAsText(file);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function actualizarBalance() {
  const total = transactions.reduce((acc, t) => t.tipo === 'ingreso' ? acc + t.monto : acc - t.monto, 0);
  balanceElement.textContent = total.toFixed(2);
}

function actualizarHistorial() {
  transactionsList.innerHTML = '';
  transactions.forEach(({ tipo, monto }) => {
    const li = document.createElement('li');
    li.textContent = `${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}: $${monto.toFixed(2)}`;
    li.style.color = tipo === 'ingreso' ? 'green' : 'red';
    transactionsList.appendChild(li);
  });
}

function actualizarGrafico() {
  const ingresos = transactions.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastos = transactions.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);

  if (chart) chart.destroy();
  chart = new Chart(chartElement.getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Ingresos', 'Gastos'],
      datasets: [{
        data: [ingresos, gastos],
        backgroundColor: ['green', 'red'],
      }],
    },
  });
}
