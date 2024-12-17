// Inicializar el gráfico globalmente
let budgetChart = null;

// Función para actualizar el gráfico de presupuesto
function updateBudgetChart(ingresos, gastos) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    
    // Si el gráfico ya está creado, lo destruimos y lo recreamos
    if (budgetChart) {
        budgetChart.destroy();
    }
    
    // Crear un nuevo gráfico
    budgetChart = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Presupuesto',
                data: [ingresos, gastos], // Los datos que se mostrarán en el gráfico
                backgroundColor: ['#4CAF50', '#F44336'], // Colores para Ingresos y Gastos
                borderColor: ['#388E3C', '#D32F2F'], // Colores del borde
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': $' + tooltipItem.raw.toFixed(2); // Formato de los valores
                        }
                    }
                }
            }
        }
    });
}

// Función para actualizar la tabla de transacciones
function updateTransactionsTable() {
    const transactionsTableBody = document.querySelector("#transactions-table tbody");
    transactionsTableBody.innerHTML = ""; // Limpiar la tabla

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

// Función para actualizar el resumen de ingresos, gastos y balance
function updateSummary() {
    // Filtra las transacciones para obtener los ingresos y gastos
    const totalIngresos = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount, 0);
    const totalGastos = transactions.filter(t => t.type === 'gasto').reduce((sum, t) => sum + t.amount, 0);

    // Actualiza el resumen de los valores
    document.getElementById('total-ingresos').textContent = `$${totalIngresos.toFixed(2)}`;
    document.getElementById('total-gastos').textContent = `$${totalGastos.toFixed(2)}`;
    document.getElementById('balance').textContent = `$${(totalIngresos - totalGastos).toFixed(2)}`;
    
    // Actualiza el gráfico con los nuevos valores
    updateBudgetChart(totalIngresos, totalGastos);

    // Actualiza la tabla de transacciones
    updateTransactionsTable();
}

// Función para cargar transacciones desde localStorage y actualizar la vista
function loadTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
    updateSummary(); // Actualiza el resumen y el gráfico con las transacciones cargadas
}

// Función para agregar una nueva transacción
function addTransaction(event) {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (!description || isNaN(amount) || !category) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date: new Date().toLocaleString(),
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateSummary(); // Actualiza la vista inmediatamente después de agregar la transacción
    transactionForm.reset();
}

// Eliminar una transacción individual
function deleteTransactionById(transactionId) {
    if (confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
        transactions = transactions.filter(transaction => transaction.id !== transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateSummary(); // Actualiza la vista inmediatamente después de eliminar la transacción
    }
}

// Eliminar todas las transacciones
const deleteAllButton = document.getElementById("delete-all-button");
deleteAllButton.addEventListener("click", function () {
    if (confirm("¿Estás seguro de que quieres eliminar todas las transacciones?")) {
        transactions = [];
        localStorage.removeItem("transactions");
        updateSummary(); // Actualiza la vista inmediatamente después de eliminar todas las transacciones
    }
});

// Inicialización y carga de transacciones
document.addEventListener("DOMContentLoaded", () => {
    loadTransactions(); // Carga las transacciones del localStorage y actualiza la vista
    transactionForm.addEventListener("submit", addTransaction); // Añade la transacción al enviar el formulario
});
