document.addEventListener('DOMContentLoaded', () => {
    function updateDatetime() {
        const datetimeElement = document.getElementById('datetime');
        const now = new Date();
        datetimeElement.textContent = now.toLocaleString('es-ES'); // Muestra la fecha y hora en formato español
    }

    // Actualizar la fecha y hora cada segundo
    setInterval(updateDatetime, 1000);
});
