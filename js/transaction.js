// Función para eliminar una transacción
function deleteTransaction(index) {
  const transaction = transactions[index];
  if (transaction.type === 'ingreso') {
      totalIngresos -= transaction.amount;
  } else {
      totalGastos -= transaction.amount;
  }
  transactions.splice(index, 1);
  updateUI();
}

// Función para renderizar la lista de transacciones
function renderTransactions() {
  const transactionsList = document.getElementById('transactions-list');
  transactionsList.innerHTML = '';

  transactions.forEach((transaction, index) => {
      const li = document.createElement('li');
      li.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type} - ${transaction.category})`;
      
      // Agregar la fecha y hora
      const dateSpan = document.createElement('span');
      dateSpan.innerText = ` [${transaction.date}]`; // Mostrar la fecha
      dateSpan.style.fontStyle = 'italic'; // Estilo opcional
      li.appendChild(dateSpan);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Eliminar';
      deleteBtn.onclick = () => deleteTransaction(index);
      
      li.appendChild(deleteBtn);
      transactionsList.appendChild(li);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement('li');
  li.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type} - ${transaction.category})`;

  // Agregar la fecha y hora
  const dateSpan = document.createElement('span');
  dateSpan.innerText = ` [${transaction.date}]`; // Mostrar la fecha
  dateSpan.style.fontStyle = 'italic'; // Estilo opcional
  li.appendChild(dateSpan);

  // Crear botón de eliminación
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';
  deleteButton.onclick = () => deleteTransaction(transaction.id); // Asociar la función de eliminación
  deleteButton.style.marginLeft = '10px'; // Espacio entre el texto y el botón
  li.appendChild(deleteButton);

  return li;
}

function deleteTransaction(transactionId) {
  // Filtrar la transacción que se va a eliminar
  const filteredTransactions = transactions.filter(t => t.id !== transactionId);
  transactions.length = 0; // Vaciar el array de transacciones
  transactions.push(...filteredTransactions); // Rellenar con las transacciones restantes

  // Actualizar localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Actualizar la interfaz
  updateSummary(); // Recalcular los totales
  updateTransactionsList(); // Volver a renderizar la lista
}