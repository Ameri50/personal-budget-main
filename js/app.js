// Variables globales
let totalIngresos = 0;
let totalGastos = 0;
const transactions = [];

// Elemento para la fecha y hora
const datetimeElement = document.getElementById("datetime");

// Función para actualizar la fecha y hora actual
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString(); // Formato de fecha (dd/mm/yyyy)
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }; // Formato de 24 horas
    const time = now.toLocaleTimeString([], timeOptions); // Obtener la hora en formato de 24 horas
    datetimeElement.textContent = `${date} ${time}`;
}

// Actualizar la fecha y hora cada segundo (1000 ms)
setInterval(updateDateTime, 1000);

// Función para agregar una transacción
function addTransaction(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    const date = new Date().toLocaleString();

    const transaction = {
        id: Date.now(), // Usar timestamp como ID único
        description,
        amount,
        type,
        category,
        date // Incluir fecha en la transacción
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateTransactionsList();
    updateSummary();

    event.target.reset(); // Limpiar formulario
}

// Función para actualizar la interfaz de usuario
function updateUI() {
    document.getElementById('total-ingresos').innerText = `$${totalIngresos.toFixed(2)}`;
    document.getElementById('total-gastos').innerText = `$${totalGastos.toFixed(2)}`;
    document.getElementById('balance').innerText = `$${(totalIngresos - totalGastos).toFixed(2)}`;
}

// Función para actualizar el resumen de transacciones
function updateSummary() {
    totalIngresos = transactions
        .filter(t => t.type === 'ingreso')
        .reduce((acc, t) => acc + t.amount, 0);

    totalGastos = transactions
        .filter(t => t.type === 'gasto')
        .reduce((acc, t) => acc + t.amount, 0);

    updateUI();
}

// Cargar transacciones desde localStorage al iniciar
function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions.push(...JSON.parse(storedTransactions));
        updateSummary();
        updateTransactionsList();
    }
}

// Crear un elemento de transacción
function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type} - ${transaction.category})`;

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

// Función para eliminar una transacción
function deleteTransaction(transactionId) {
    const filteredTransactions = transactions.filter(t => t.id !== transactionId);
    transactions.length = 0; // Vaciar el array de transacciones
    transactions.push(...filteredTransactions); // Rellenar con las transacciones restantes

    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateSummary();
    updateTransactionsList();
}

// Función para actualizar la lista de transacciones
function updateTransactionsList() {
    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = ''; // Limpiar lista actual

    transactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        transactionsList.appendChild(transactionElement);
    });
}

// Evento de envío del formulario
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

// Evento para eliminar todas las transacciones
document.getElementById('delete-all-transactions').addEventListener('click', () => {
    transactions.length = 0; // Vaciar el array de transacciones
    localStorage.removeItem('transactions'); // Eliminar del localStorage
    updateSummary(); // Actualizar resumen
    updateTransactionsList(); // Actualizar lista
});

// Cargar transacciones al iniciar
loadTransactions();