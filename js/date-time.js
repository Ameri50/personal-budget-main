// Solo se importa en caso de necesitar manipular más profundamente la fecha y hora.
export function formatDate(date) {
    return new Date(date).toLocaleString();
  }
  