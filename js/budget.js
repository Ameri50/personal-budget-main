// Inicializar el gráfico globalmente
let budgetChart = null;

// Función para inicializar el gráfico de presupuesto
function initializeBudgetChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    budgetChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Presupuesto',
                data: [0, 0], // Inicialmente sin datos
                backgroundColor: ['#4CAF50', '#F44336'],
                borderColor: ['#388E3C', '#D32F2F'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

// Función para actualizar el gráfico de presupuesto
function updateBudgetChart(ingresos, gastos) {
    if (!budgetChart) {
        initializeBudgetChart();
    }
    budgetChart.data.datasets[0].data = [ingresos, gastos];
    budgetChart.update();
}

// Función para validar entradas del formulario
function validateTransaction(description, amount, category) {
    const errors = [];
    if (!description.trim()) errors.push("La descripción no puede estar vacía.");
    if (isNaN(amount) || amount <= 0) errors.push("El monto debe ser un número positivo.");
    if (!category) errors.push("Debes seleccionar una categoría.");
    
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

// Función para mostrar transacciones en la tabla
function updateTransactionsTable() {
    const transactionsTableBody = document.querySelector("#transactions-table tbody");
    transactionsTableBody.innerHTML = ""; // Limpiar la tabla

    if (transactions.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="6" style="text-align: center; color: #999;">No hay transacciones registradas.</td>`;
        transactionsTableBody.appendChild(emptyRow);
    } else {
        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
                <td>
                    <button onclick="deleteTransactionById(${transaction.id})" class="delete-button">Eliminar</button>
                </td>
            `;
            transactionsTableBody.appendChild(row);
        });
    }
}

// Función para actualizar resumen de ingresos, gastos y balance
function updateSummary() {
    const totalIngresos = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount, 0);
    const totalGastos = transactions.filter(t => t.type === 'gasto').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIngresos - totalGastos;

    document.getElementById('total-ingresos').textContent = `$${totalIngresos.toFixed(2)}`;
    document.getElementById('total-gastos').textContent = `$${totalGastos.toFixed(2)}`;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    updateBudgetChart(totalIngresos, totalGastos);
    updateTransactionsTable();
}

// Función para cargar transacciones desde localStorage
function loadTransactions() {
    try {
        const storedTransactions = localStorage.getItem("transactions");
        transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
    } catch (error) {
        console.error("Error cargando transacciones:", error);
        transactions = [];
    }
    updateSummary();
}

// Función para agregar una nueva transacción
function addTransaction(event) {
    event.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (!validateTransaction(description, amount, category)) return;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateSummary();
    transactionForm.reset();
}

// Función para eliminar una transacción individual
function deleteTransactionById(transactionId) {
    if (confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
        transactions = transactions.filter(transaction => transaction.id !== transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateSummary();
    }
}

// Función para eliminar todas las transacciones
document.getElementById("delete-all-button").addEventListener("click", function () {
    if (confirm("¿Estás seguro de que quieres eliminar todas las transacciones?")) {
        transactions = [];
        localStorage.removeItem("transactions");
        updateSummary();
    }
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    initializeBudgetChart(); // Inicializa el gráfico
    loadTransactions(); // Carga las transacciones y actualiza la vista
    document.getElementById("transaction-form").addEventListener("submit", addTransaction);
});
