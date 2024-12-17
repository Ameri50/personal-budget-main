export function validateForm(description, amount, category) {
  const errors = [];

  if (!description.trim()) {
      errors.push("La descripción no puede estar vacía.");
  }

  if (isNaN(amount) || amount <= 0) {
      errors.push("El monto debe ser un número mayor a 0.");
  }

  if (!category) {
      errors.push("Debes seleccionar una categoría.");
  }

  if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      alert(errorMessage);
      return false;
  }

  return true;
}
