// Crear instancia global
var presupuesto = new Budget();

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    const transaction = new Transaction(type, amount, description);
    transaction.category = category;

    presupuesto.add(transaction);
    updateUI();
});

function updateUI() {
    const transactionsList = document.getElementById('transactions-list');
    const totalSpan = document.getElementById('total');

    // Limpiar lista actual
    transactionsList.innerHTML = '';

    // Agregar transacciones
    presupuesto.transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.description} - ${presupuesto.formatAmount(transaction.amount)} (${transaction.type})`;
        transactionsList.appendChild(li);
    });

    // Actualizar total
    totalSpan.textContent = presupuesto.formatAmount(presupuesto.calculateTotal());
}