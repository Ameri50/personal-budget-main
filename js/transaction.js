document.addEventListener('DOMContentLoaded', () => {
    let transactions = [];
    let editTransactionId = null;

    const transactionsTableBody = document.querySelector('#transactions-table tbody');  // Correcto: tbody en lugar de table
    const totalIngresosElement = document.getElementById('total-ingresos');
    const totalGastosElement = document.getElementById('total-gastos');
    const balanceElement = document.getElementById('balance');

    // Cargar transacciones de localStorage
    function loadTransactions() {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions = storedTransactions;
        renderTransactionsTable();
        updateSummary();
    }

    // Agregar o editar transacción
    function addTransaction(description, amount, type, category) {
        if (editTransactionId) {
            // Editar transacción existente
            transactions = transactions.map(t =>
                t.id === editTransactionId
                    ? { ...t, description, amount: parseFloat(amount), type, category }
                    : t
            );
            editTransactionId = null;
        } else {
            // Agregar nueva transacción
            const transaction = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                type,
                category,
                date: new Date().toLocaleString(),
            };
            transactions.push(transaction);
        }

        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactionsTable();
        updateSummary();
    }

    // Eliminar transacción
    function deleteTransaction(id) {
        if (confirm('¿Estás seguro de eliminar esta transacción?')) {
            transactions = transactions.filter(t => t.id !== id);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            renderTransactionsTable();
            updateSummary();
        }
    }

    // Editar transacción
    function editTransaction(id) {
        const transaction = transactions.find(t => t.id === id);
        if (transaction) {
            document.getElementById('description').value = transaction.description;
            document.getElementById('amount').value = transaction.amount;
            document.getElementById('type').value = transaction.type;
            document.getElementById('category').value = transaction.category;

            editTransactionId = id;
        }
    }

    // Renderizar tabla de transacciones
    function renderTransactionsTable() {
        transactionsTableBody.innerHTML = '';
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="edit-button" data-id="${transaction.id}">Editar</button>
                    <button class="delete-button" data-id="${transaction.id}">Eliminar</button>
                </td>
            `;
            transactionsTableBody.appendChild(row);
        });
    }

    // Actualizar resumen
    function updateSummary() {
        const totalIngresos = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalGastos = transactions
            .filter(t => t.type === 'gasto')
            .reduce((sum, t) => sum + t.amount, 0);

        totalIngresosElement.textContent = `$${totalIngresos.toFixed(2)}`;
        totalGastosElement.textContent = `$${totalGastos.toFixed(2)}`;
        balanceElement.textContent = `$${(totalIngresos - totalGastos).toFixed(2)}`;
    }

    // Escuchar el formulario
    document.getElementById('transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value.trim();
        const amount = document.getElementById('amount').value;
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value.trim();

        if (!description || !amount || !type || !category || amount <= 0) {
            alert('Por favor completa todos los campos correctamente.');
            return;
        }

        addTransaction(description, amount, type, category);
        e.target.reset();
    });

    // Delegar eventos para eliminar y editar transacciones
    transactionsTableBody.addEventListener('click', (e) => {
        const button = e.target;
        const transactionId = button.getAttribute('data-id');
        
        if (button.classList.contains('edit-button')) {
            editTransaction(Number(transactionId));
        } else if (button.classList.contains('delete-button')) {
            deleteTransaction(Number(transactionId));
        }
    });

    // Inicializar funciones globales
    loadTransactions();
});
