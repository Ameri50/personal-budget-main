// Constructor
function Transaction(type, amount, description) {
  this.id = Date.now(); // ID único
  this.type = type; // ingreso/gasto
  this.amount = Math.abs(amount); // Valor absoluto
  this.description = description;
  this.createdAt = new Date(); 
}

Transaction.prototype.getFormattedDate = function() {
  return this.createdAt.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
  });
};

Transaction.prototype.getSignedAmount = function() {
  return this.type === 'gasto' ? -this.amount : this.amount;
};

Transaction.prototype.validate = function() {
  const validTypes = ['ingreso', 'gasto'];
  const validCategories = {
      ingreso: ['Salario', 'Ventas', 'Otros'],
      gasto: ['Alimentación', 'Transporte', 'Servicios', 'Otros']
  };

  return (
      this.amount > 0 && 
      validTypes.includes(this.type) &&
      this.description.trim() !== '' &&
      validCategories[this.type].includes(this.category)
  );
};