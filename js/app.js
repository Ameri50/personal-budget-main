// Variables globales
let totalIngresos = 0;
let totalGastos = 0;
let transactions = []; // Transacciones
const datetimeElement = document.getElementById("datetime");
const transactionForm = document.getElementById("transaction-form");
const deleteAllButton = document.getElementById("delete-all-transactions");
const transactionsTableBody = document.querySelector("#transactions-table tbody");
const ingresosElement = document.getElementById("total-ingresos");
const gastosElement = document.getElementById("total-gastos");
const balanceElement = document.getElementById("balance");
const chartContainer = document.getElementById("budgetChart"); // Contenedor del gráfico

// Inicializar el gráfico con ApexCharts
let budgetChart;
function initializeChart() {
    budgetChart = new ApexCharts(chartContainer, {
        chart: {
            type: "donut", // Tipo de gráfico donut
            height: 350
        },
        series: [totalIngresos, totalGastos], // Datos iniciales (pueden ser 0 al principio)
        labels: ["Ingresos", "Gastos"],
        colors: ['#4caf50', '#f44336'], // Colores para Ingresos y Gastos
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val.toFixed(2); // Formato de tooltip
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: "100%"
                },
                legend: {
                    position: "bottom"
                }
            }
        }]
    });

    budgetChart.render(); // Renderiza el gráfico
}

// Actualizar gráfico con los nuevos datos
function updateChart() {
    budgetChart.updateOptions({
        series: [totalIngresos, totalGastos] // Actualiza los valores del gráfico
    });
}

// Actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    datetimeElement.textContent = `${date} ${time}`;
}
setInterval(updateDateTime, 1000);

// Agregar transacción
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

    updateView();
    transactionForm.reset();
}

// Eliminar transacción individual
function deleteTransactionById(transactionId) {
    if (confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
        transactions = transactions.filter(transaction => transaction.id !== transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateView();
    }
}

// Eliminar todas las transacciones
deleteAllButton.addEventListener("click", function () {
    if (confirm("¿Estás seguro de que quieres eliminar todas las transacciones?")) {
        transactions = [];
        localStorage.removeItem("transactions");
        updateView();
    }
});

// Actualizar resumen y gráfico
function updateSummary() {
    totalIngresos = transactions.filter(t => t.type === 'ingreso').reduce((acc, t) => acc + t.amount, 0);
    totalGastos = transactions.filter(t => t.type === 'gasto').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIngresos - totalGastos;

    ingresosElement.textContent = `$${totalIngresos.toFixed(2)}`;
    gastosElement.textContent = `$${totalGastos.toFixed(2)}`;
    balanceElement.textContent = `$${balance.toFixed(2)}`;

    updateChart(); // Actualiza el gráfico después de cada cambio
}

// Actualizar tabla de transacciones
function updateTransactionsTable() {
    transactionsTableBody.innerHTML = ""; // Limpiar tabla

    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
            <td>
                <button class="delete-btn" data-id="${transaction.id}">Eliminar</button>
            </td>
        `;
        transactionsTableBody.appendChild(row);
    });
}

// Actualizar toda la vista (resumen, tabla, gráfico)
function updateView() {
    updateTransactionsTable();
    updateSummary();
}

// Cargar transacciones desde localStorage
function loadTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
    updateView(); // Actualiza la vista al cargar transacciones
}

// Delegación de eventos para eliminar transacciones
transactionsTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const transactionId = parseInt(e.target.getAttribute("data-id"));
        deleteTransactionById(transactionId);
    }
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    initializeChart();
    loadTransactions(); // Carga las transacciones del localStorage y actualiza la vista
    transactionForm.addEventListener("submit", addTransaction); // Añade la transacción al enviar el formulario
});
