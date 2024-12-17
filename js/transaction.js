document.addEventListener('DOMContentLoaded', () => {
    let transactions = [];
    let editTransactionId = null;

    const transactionsTableBody = document.querySelector('#transactions-table tbody');
    const totalIngresosElement = document.getElementById('total-ingresos');
    const totalGastosElement = document.getElementById('total-gastos');
    const balanceElement = document.getElementById('balance');
    const transactionForm = document.getElementById('transaction-form');

    // Validar y cargar transacciones de localStorage
    function loadTransactions() {
        try {
            const storedTransactions = localStorage.getItem('transactions');
            transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
        } catch (error) {
            console.error('Error cargando transacciones:', error);
            transactions = [];
            localStorage.removeItem('transactions');
        }
        renderTransactionsTable();
        updateSummary();
    }

    // Agregar o editar transacción
    function addTransaction(description, amount, type, category) {
        const parsedAmount = parseFloat(amount);
        if (editTransactionId !== null) {
            // Editar transacción existente
            transactions = transactions.map(t =>
                t.id === editTransactionId
                    ? { ...t, description, amount: parsedAmount, type, category }
                    : t
            );
            editTransactionId = null;
        } else {
            // Agregar nueva transacción
            const transaction = {
                id: Date.now(),
                description,
                amount: parsedAmount,
                type,
                category,
                date: new Date().toLocaleString(),
            };
            transactions.push(transaction);
        }

        saveTransactions();
        renderTransactionsTable();
        updateSummary();
    }

    // Eliminar transacción
    function deleteTransaction(id) {
        if (confirm('¿Estás seguro de eliminar esta transacción?')) {
            transactions = transactions.filter(t => t.id !== id);
            saveTransactions();
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

    // Guardar transacciones en localStorage
    function saveTransactions() {
        try {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
            console.error('Error guardando transacciones:', error);
        }
    }

    // Renderizar tabla de transacciones
    function renderTransactionsTable() {
        transactionsTableBody.innerHTML = '';
        if (transactions.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="6" style="text-align: center; color: #999;">No hay transacciones registradas.</td>`;
            transactionsTableBody.appendChild(emptyRow);
        } else {
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
    }

    // Actualizar resumen
    function updateSummary() {
        const totalIngresos = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalGastos = transactions
            .filter(t => t.type === 'gasto')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIngresos - totalGastos;

        totalIngresosElement.textContent = `$${totalIngresos.toFixed(2)}`;
        totalGastosElement.textContent = `$${totalGastos.toFixed(2)}`;
        balanceElement.textContent = `$${balance.toFixed(2)}`;
    }

    // Validar entradas del formulario
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value.trim();
        const amount = document.getElementById('amount').value;
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value.trim();

        if (!description || isNaN(amount) || parseFloat(amount) <= 0 || !type || !category) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        addTransaction(description, amount, type, category);
        transactionForm.reset();
    });

    // Delegar eventos para eliminar y editar transacciones
    transactionsTableBody.addEventListener('click', (e) => {
        const button = e.target;
        const transactionId = parseInt(button.getAttribute('data-id'), 10);

        if (button.classList.contains('edit-button')) {
            editTransaction(transactionId);
        } else if (button.classList.contains('delete-button')) {
            deleteTransaction(transactionId);
        }
    });

    // Inicializar funciones globales
    loadTransactions();
});
