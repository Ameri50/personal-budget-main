// Variables globales
let totalIngresos = 0;
let totalGastos = 0;
const transactions = [];

// Elementos DOM
const transactionsTableBody = document.querySelector('#transactions-table tbody');
const transactionsList = document.getElementById('transactions-list');

// Función para agregar una nueva transacción (Tabla y Lista)
function addTransaction(description, amount, type, category) {
    const transaction = {
        id: Date.now(), // Generar un ID único basado en timestamp
        description,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toLocaleString(),
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    renderTransactionRow(transaction); // Render en tabla
    updateTransactionsList();         // Render en lista
    updateSummary();                  // Actualizar totales
}

// Función para renderizar una transacción en la tabla
function renderTransactionRow(transaction) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.description}</td>
        <td>$${transaction.amount.toFixed(2)}</td>
        <td>${transaction.type}</td>
        <td>${transaction.category}</td>
        <td>${transaction.date}</td>
        <td>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Eliminar</button>
        </td>
    `;

    transactionsTableBody.appendChild(row);
}

// Función para renderizar la lista de transacciones (Vista alternativa)
function updateTransactionsList() {
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type} - ${transaction.category})
            <span style="font-style: italic;"> [${transaction.date}]</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" style="margin-left: 10px;">Eliminar</button>
        `;
        transactionsList.appendChild(li);
    });
}

// Función para eliminar una transacción por ID
window.deleteTransaction = function (transactionId) {
    const index = transactions.findIndex(t => t.id === transactionId);
    if (index > -1) {
        const transaction = transactions[index];

        // Actualizar totales según el tipo
        if (transaction.type === 'ingreso') {
            totalIngresos -= transaction.amount;
        } else {
            totalGastos -= transaction.amount;
        }

        // Eliminar transacción del arreglo
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Actualizar interfaz
        renderTransactionsTable();
        updateTransactionsList();
        updateSummary();
    }
};

// Función para renderizar toda la tabla de transacciones
function renderTransactionsTable() {
    transactionsTableBody.innerHTML = ''; // Limpiar tabla actual

    transactions.forEach(transaction => {
        renderTransactionRow(transaction);
    });
}

// Función para actualizar el resumen de totales
function updateSummary() {
    totalIngresos = transactions
        .filter(t => t.type === 'ingreso')
        .reduce((acc, t) => acc + t.amount, 0);

    totalGastos = transactions
        .filter(t => t.type === 'gasto')
        .reduce((acc, t) => acc + t.amount, 0);

    document.getElementById('total-ingresos').innerText = `$${totalIngresos.toFixed(2)}`;
    document.getElementById('total-gastos').innerText = `$${totalGastos.toFixed(2)}`;
    document.getElementById('balance').innerText = `$${(totalIngresos - totalGastos).toFixed(2)}`;
}

// Cargar transacciones al iniciar
function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions.push(...JSON.parse(storedTransactions));
        renderTransactionsTable();
        updateTransactionsList();
        updateSummary();
    }
}

// Inicializar al cargar la página
loadTransactions();
