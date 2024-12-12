# Control de Presupuesto

## Descripción

La aplicación de Control de Presupuesto permite a los usuarios gestionar sus ingresos y gastos de manera sencilla y efectiva. Ofrece una interfaz intuitiva y funcionalidades clave para el seguimiento de las finanzas personales.

## Características

- **Agregar Transacciones**: Permite registrar ingresos y gastos con descripción, monto, tipo y categoría.
- **Eliminar Transacciones**: Cada transacción puede eliminarse individualmente.
- **Resumen Dinámico**: Muestra los totales de ingresos, gastos y balance actualizado automáticamente.
- **Fecha y Hora Actual**: Visualiza la fecha y hora en tiempo real.
- **Almacenamiento Local**: Las transacciones se guardan en `localStorage` para mantener la información entre sesiones.

## Estructura de Archivos

### HTML

- **index.html**: Contiene la estructura principal de la aplicación, incluyendo el formulario y el resumen de transacciones.

### JavaScript

- **utils.js**: Funciones utilitarias para diversas operaciones.
- **validators.js**: Validaciones de entrada del usuario.
- **transaction.js**: Lógica para agregar, eliminar y listar transacciones.
- **budget.js**: Cálculo de totales y promedios de ingresos y gastos.
- **app.js**: Lógica principal que gestiona eventos y actualiza la interfaz.

### CSS

- **styles.css**: Define el estilo general de la aplicación, mejorando la presentación y usabilidad.

## Conclusión

Esta aplicación es una herramienta eficaz para gestionar finanzas personales, facilitando el seguimiento de ingresos y gastos de manera organizada y accesible.
