// validators.js

// Validar que el monto sea positivo
export const validarMonto = (monto) => {
    return monto > 0; // El monto debe ser mayor que 0
  };
  
  // Validar que el tipo de transacción sea 'income' o 'expense'
  export const validarTipo = (tipo) => {
    return tipo === 'income' || tipo === 'expense';
  };
  