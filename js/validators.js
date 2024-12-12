// Validaciones para transacciones
const TransactionValidator = {
  isValidTransaction: function(transaction) {
      // Validaciones exhaustivas
      if (!transaction) return false;
      
      // Validar propiedades requeridas
      const requiredProps = ['id', 'type', 'amount', 'description'];
      const missingProps = requiredProps.filter(prop => !transaction.hasOwnProperty(prop));
      if (missingProps.length > 0) {
          console.warn(`Propiedades faltantes: ${missingProps.join(', ')}`);
          return false;
      }
      
      // Validar tipo
      const validTypes = ['ingreso', 'gasto'];
      if (!validTypes.includes(transaction.type)) {
          console.warn(`Tipo de transacción inválido: ${transaction.type}`);
          return false;
      }
      
      // Validar monto
      if (typeof transaction.amount !== 'number' || transaction.amount <= 0) {
          console.warn(`Monto inválido: ${transaction.amount}`);
          return false;
      }
      
      // Validar descripción
      if (!transaction.description || transaction.description.trim() === '') {
          console.warn('Descripción no puede estar vacía');
          return false;
      }
      
      return true;
  },
  
  validateAmount: function(amount) {
      return typeof amount === 'number' && 
             !isNaN(amount) && 
             amount > 0;
  },
  
  validateDescription: function(description) {
      return description && 
             typeof description === 'string' && 
             description.trim().length > 0;
  }
};

// Validaciones para presupuesto
const BudgetValidator = {
  isValidBudget: function(budget) {
      // Verificar que sea una instancia de Budget
      if (!(budget instanceof Budget)) {
          console.warn('No es una instancia válida de Budget');
          return false;
      }
      
      // Verificar que tenga un array de transacciones
      if (!Array.isArray(budget.transactions)) {
          console.warn('Transacciones no son un array');
          return false;
      }
      
      // Validar cada transacción
      const invalidTransactions = budget.transactions.filter(
          transaction => !TransactionValidator.isValidTransaction(transaction)
      );
      
      if (invalidTransactions.length > 0) {
          console.warn(`Hay ${invalidTransactions.length} transacciones inválidas`);
          return false;
      }
      
      return true;
  },
  
  validateTransactionList: function(transactions) {
      return transactions.every(TransactionValidator.isValidTransaction);
  }
};

// Validaciones de categorías
const CategoryValidator = {
  VALID_INCOME_CATEGORIES: ['Salario', 'Ventas', 'Otros'],
  VALID_EXPENSE_CATEGORIES: ['Alimentación', 'Transporte', 'Servicios', 'Otros'],
  
  isValidCategory: function(category, type) {
      if (type === 'ingreso') {
          return this.VALID_INCOME_CATEGORIES.includes(category);
      }
      if (type === 'gasto') {
          return this.VALID_EXPENSE_CATEGORIES.includes(category);
      }
      return false;
  }
};

// Función de exportación si se usa módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
      DateUtils,
      MoneyUtils,
      StorageUtils,
      IDUtils,
      TransactionValidator,
      BudgetValidator,
      CategoryValidator
  };
}