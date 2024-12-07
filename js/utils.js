export const calcularBalance = (transacciones) => {
    return transacciones.reduce((total, trans) => {
      return total + trans.monto;
    }, 0);
  };
  