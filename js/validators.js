// Validar el formulario
function validateForm(description, amount) {
  if (description.trim() === '') {
      alert('La descripción es requerida.');
      return false;
  }
  if (!isNumber(amount) || amount <= 0) {
      alert('El monto debe ser un número positivo.');
      return false;
  }
  return true;
}