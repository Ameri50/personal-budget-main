function Budget() {
  this.transactions = [];
}

Budget.prototype.add = function(transaction) {
  if (transaction.validate()) {
      this.transactions.push(transaction);
  }
};

Budget.prototype.remove = function(id) {
  this.transactions = this.transactions.filter(t => t.id !== id);
};

Budget.prototype.calculateTotal = function() {
  return this.transactions.reduce((total, transaction) => {
      return total + transaction.getSignedAmount();
  }, 0);
};

Budget.prototype.calculateBalance = function() {
  const ingresos = this.transactions
      .filter(t => t.type === 'ingreso')
      .reduce((sum, t) => sum + t.amount, 0);
  
  const gastos = this.transactions
      .filter(t => t.type === 'gasto')
      .reduce((sum, t) => sum + t.amount, 0);

  return ingresos - gastos;
};

Budget.prototype.formatAmount = function(amount) {
  return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
  }).format(amount);
};

Budget.prototype.getTransactionsByCategory = function(category) {
  return this.transactions.filter(t => t.category === category);
};

Budget.prototype.getCategorySubtotals = function() {
  const subtotals = {};
  this.transactions.forEach(t => {
      if (!subtotals[t.category]) {
          subtotals[t.category] = 0;
      }
      subtotals[t.category] += t.getSignedAmount();
  });
  return subtotals;
};