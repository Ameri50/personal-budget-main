export function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function getCurrentDate() {
  return new Date().toLocaleDateString();
}
