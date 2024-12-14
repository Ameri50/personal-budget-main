// Variables globales
let totalIngresos = 0;
let totalGastos = 0;
const transactions = [];

// Elementos del DOM
const datetimeElement = document.getElementById("datetime");
const transactionForm = document.getElementById("transaction-form");
const deleteAllButton = document.getElementById("delete-all-transactions");
const transactionsTableBody = document.querySelector("#transactions-table tbody");
const ingresosElement = document.getElementById("total-ingresos");
const gastosElement = document.getElementById("total-gastos");
const balanceElement = document.getElementById("balance");
const ctx = document.getElementById("budgetChart").getContext("2d");

// Inicializar el gráfico
let budgetChart;

function initializeChart() {
    budgetChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Ingresos", "Gastos"],
            datasets: [
                {
                    data: [0, 0],
                    backgroundColor: ["#4caf50", "#f44336"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            return `${label}: $${value.toFixed(2)}`;
                        },
                    },
                },
            },
        },
    });
}

// Actualizar los datos del gráfico
function updateChart() {
    budgetChart.data.datasets[0].data = [totalIngresos, totalGastos];
    budgetChart.update();
}

// Función para actualizar la fecha y hora
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    datetimeElement.textContent = `${date} ${time}`;
}
setInterval(updateDateTime, 1000);

// Función para agregar una transacción
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

    updateSummary();
    updateTransactionsTable();
    transactionForm.reset();
}

// Función para actualizar el resumen
function updateSummary() {
    totalIngresos = transactions
        .filter((t) => t.type === "ingreso")
        .reduce((acc, t) => acc + t.amount, 0);
    totalGastos = transactions
        .filter((t) => t.type === "gasto")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIngresos - totalGastos;

    ingresosElement.textContent = `$${totalIngresos.toFixed(2)}`;
    gastosElement.textContent = `$${totalGastos.toFixed(2)}`;
    balanceElement.textContent = `$${balance.toFixed(2)}`;

    updateChart(); // Actualizar el gráfico
}

// Función para actualizar la tabla de transacciones
function updateTransactionsTable() {
    transactionsTableBody.innerHTML = ""; // Limpiar la tabla

    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Eliminar</button>
            </td>
        `;
        transactionsTableBody.appendChild(row);
    });
}

// Función para eliminar una transacción
function deleteTransaction(transactionId) {
    const index = transactions.findIndex((t) => t.id === transactionId);
    if (index !== -1) {
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateSummary();
        updateTransactionsTable();
    }
}

// Evento para eliminar todas las transacciones
deleteAllButton.addEventListener("click", () => {
    transactions.length = 0;
    localStorage.removeItem("transactions");
    updateSummary();
    updateTransactionsTable();
});

// Función para cargar transacciones desde localStorage
function loadTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
        transactions.push(...JSON.parse(storedTransactions));
        updateSummary();
        updateTransactionsTable();
    }
}

// Inicialización
transactionForm.addEventListener("submit", addTransaction);
initializeChart();
loadTransactions();


// Cargar transacciones al iniciar
loadTransactions();
