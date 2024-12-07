import { calcularBalance } from './utils.js';
import { validarMonto, validarTipo } from './validators.js';

const transactionForm = document.getElementById('transaction-form');
const balanceAmount = document.getElementById('balance-amount');
const transactionList = document.getElementById('transaction-list');

let transacciones = [];

const actualizarBalance = () => {
  const balance = calcularBalance(transacciones);
  balanceAmount.textContent = `$${balance}`;
};

const agregarTransaccion = (tipo, monto) => {
  const hora = new Date().toLocaleTimeString();  // Se obtiene la hora actual
  const transaccion = {
    tipo,
    monto,
    hora
  };

  // Se agrega la transacción al array
  transacciones.push(transaccion);

  // Crear un nuevo elemento de lista para mostrar la transacción
  const li = document.createElement('li');
  li.classList.add(tipo === 'income' ? 'income' : 'expense');
  li.innerHTML = `${tipo === 'income' ? 'Ingreso' : 'Gasto'}: $${monto} - Hora: ${hora}`;
  transactionList.appendChild(li);

  // Actualiza el balance
  actualizarBalance();
};

// Se escucha el evento submit para agregar transacciones
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = document.getElementById('transaction-type').value;
  const monto = parseFloat(document.getElementById('transaction-amount').value);

  if (!validarMonto(monto) || !validarTipo(tipo)) {
    alert('Monto o tipo de transacción inválido');
    return;
  }

  agregarTransaccion(tipo, monto);
  transactionForm.reset(); // Limpiar formulario
});
