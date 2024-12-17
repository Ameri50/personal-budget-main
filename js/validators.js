export function validateForm(description, amount, category) {
  if (!description.trim() || amount <= 0 || !category) {
      alert("Por favor, completa todos los campos correctamente.");
      return false;
  }
  return true;
}
