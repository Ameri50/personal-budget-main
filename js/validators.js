export const validarMonto = (monto) => {
    return monto > 0; // El monto debe ser mayor que 0
  };
  
  export const validarTipo = (tipo) => {
    return tipo === 'income' || tipo === 'expense'; // Tipo debe ser ingreso o gasto
  };
  