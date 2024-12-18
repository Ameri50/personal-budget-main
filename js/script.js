var itemsPerPage = 5; // Número de elementos a mostrar por página
var currentPage = 1; // Número de la página actual
var totalPages = 5; // Total de páginas

// Validar la entrada del formulario
function validateForm() {
    var articulo = document.getElementById("articulo").value; // Obtener el nombre del artículo
    var cantidad = document.getElementById("cantidad").value; // Obtener la cantidad
    var precio = document.getElementById("precio").value; // Obtener el precio
    var proveedor = document.getElementById("proveedor").value; // Obtener el proveedor
    var duracion = document.getElementById("duracion").value; // Obtener la duración

    // Verificar si se ha proporcionado el nombre del artículo
    if (articulo == "") {
        alert("Debes indicar el nombre del artículo"); // Alerta si falta el nombre del artículo
        return false; // La validación falla
    }
    return true; // La validación es exitosa
}

// Seleccionar una categoría del menú desplegable
function selectCategoria(categoria) {
    document.getElementById("categoria").value = categoria; // Establecer la categoría seleccionada
    document.getElementById("dropdownCategoria").innerHTML = categoria; // Actualizar la visualización del menú desplegable
}

// Formatear un valor monetario a Pesos Chilenos
function formatCurrency(value) {
    return parseFloat(value).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

// Formatear la entrada de precio para incluir separadores de miles
function formatInputPrice(input) {
    let value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = parseInt(value).toLocaleString('es-CL'); // Formatear el valor
    }

    input.value = formattedValue; // Actualizar el valor de entrada
}

// Mostrar una notificación tipo toast
function mostrarToast(titulo, mensaje, tipo = 'info', duracion = 4000) {
    const toastEl = document.getElementById('liveToast'); // Obtener el elemento toast
    
    // Establecer el contenido del encabezado y cuerpo del toast
    toastEl.querySelector('.toast-header strong').textContent = titulo;
    toastEl.querySelector('.toast-body').textContent = mensaje;
    
    toastEl.className = `toast ${tipo}`; // Establecer la clase del tipo de toast
    
    // Inicializar y mostrar el toast
    const toast = new bootstrap.Toast(toastEl, {
        delay: duracion,
        autohide: true
    });
    toast.show();
}

// Agregar datos al almacenamiento local y actualizar la visualización
function AddData() {
    const articulo = document.getElementById("articulo").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = parseFloat(document.getElementById("precio").value.replace(/[^0-9.-]+/g,""));
    const proveedor = document.getElementById("proveedor").value;
    const categoria = document.getElementById("categoria").value;
    const duracion = document.getElementById("duracion").value;

    // Obtener la fecha y hora actual
    const fechaHora = new Date().toLocaleString('es-CL');

    const total = cantidad * precio;

    // Guardar el nuevo producto en el almacenamiento local
    let productList = JSON.parse(localStorage.getItem("productList")) || [];
    productList.push({
        articulo,
        cantidad,
        precio,
        proveedor,
        categoria,
        duracion,
        total,
        fechaHora // Agregar fecha y hora a los datos
    });
    localStorage.setItem("productList", JSON.stringify(productList));

    // Mostrar los datos actualizados
    showData();
}
// Mostrar datos en la tabla
function showData() {
    const productList = JSON.parse(localStorage.getItem("productList")) || [];
    const tableBody = document.getElementById("crudTable").getElementsByTagName("tbody")[0];

    // Limpiar el contenido actual de la tabla
    tableBody.innerHTML = "";

    // Llenar la tabla con los datos
    productList.forEach(product => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${product.articulo}</td>
            <td>${product.cantidad}</td>
            <td>${formatCurrency(product.precio)}</td>
            <td>${product.proveedor}</td>
            <td>${product.categoria}</td>
            <td>${product.duracion}</td>
            <td>${formatCurrency(product.total)}</td>
            <td>${product.fechaHora}</td> <!-- Mostrar la fecha y hora -->
            <td>
                <button onclick="editData(${productList.indexOf(product)})">Editar</button>
                <button onclick="deleteData(${productList.indexOf(product)})">Eliminar</button>
            </td>
        `;
    });

    updateTotalSum(); // Actualizar la suma total si es necesario
}

    // Crear filas de la tabla para los productos mostrados
    displayedProducts.forEach(function (element, index) {
        let originalIndex = productList.length - 1 - (startIndex + index); // Calcular índice original para eliminar/actualizar
        html += "<tr>";
        html += "<td>" + element.articulo + "</td>";
        html += "<td>" + element.cantidad + "</td>";
        html += "<td>" + formatCurrency(element.precio) + "</td>";
        html += "<td>" + element.proveedor + "</td>";
        html += "<td>" + element.categoria + "</td>";
        html += "<td>" + element.duracion + "</td>";
        html += "<td>" + formatCurrency(element.total) + "</td>";
        html += `<td>
                    <button onclick="deleteData(${originalIndex})" class="btn btn-danger">Borrar</button>
                    <button onclick="updateData(${originalIndex})" class="btn btn-warning m-1">Editar</button>
                  </td>`;
        html += "</tr>";

        totalSum += parseFloat(element.total); // Actualizar la suma total
    });

    document.querySelector("#crudTable tbody").innerHTML = html; // Actualizar el cuerpo de la tabla
    calculateTotalSum(); // Actualizar la suma total general

    // Crear botones de paginación
    let paginationHtml = '<button class="btn btn-danger" onclick="changePage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>&lt;</button>';
    paginationHtml += '<button class="btn btn-danger" onclick="changePage(1)">Primero</button>';
    
    // Paginación dinámica según el total de páginas
    if (totalPages > 5) {
        let startPage = currentPage - 2;
        let endPage = currentPage + 2;
        if (startPage < 1) {
            startPage = 1;
            endPage = 5;
        } else if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - 4;
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += '<button class="btn btn-danger" onclick="changePage(' + i + ')" ' + (currentPage === i ? 'style="background-color: #7a2640"' : '') + '>' + i + '</button>';
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += '<button class="btn btn-danger" onclick="changePage(' + i + ')" ' + (currentPage === i ? 'style="background-color: #7a2640"' : '') + '>' + i + '</button>';
        }
    }
    paginationHtml += '<button class="btn btn-danger" onclick="changePage(' + totalPages + ')">Último</button>';
    paginationHtml += '<button class="btn btn-danger" onclick="changePage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>&gt;</button>';

    document.querySelector("#pagination").innerHTML = paginationHtml; // Actualizar la visualización de la paginación


// Cargar datos cuando el contenido del DOM esté listo
document.addEventListener('DOMContentLoaded', (event) => {
    showData(); // Mostrar datos al cargar la página
});

// Cambiar la página actual y actualizar la visualización de datos
function changePage(newPage) {
    if (newPage < 1) {
        currentPage = 1; // Asegurarse de que la página no sea menor que 1
    } else if (newPage > totalPages) {
        currentPage = totalPages; // Asegurarse de que la página no exceda el total de páginas
    } else {
        currentPage = newPage; // Establecer la nueva página actual
    }
    showData(); // Actualizar la visualización de datos
}

// Eliminar un producto de la lista
function deleteData(index) {
    var productList = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];
    productList.splice(index, 1); // Eliminar el producto de la lista
    localStorage.setItem("productList", JSON.stringify(productList)); // Actualizar el almacenamiento local
    showData(); // Actualizar visualización de datos
    calculateTotalSum(); // Actualizar la visualización de la suma total
}

// Cargar los datos del producto en el formulario para editar
function updateData(index) {
    document.getElementById("Submit").style.display = "none"; // Ocultar botón de enviar
    document.getElementById("Update").style.display = "block"; // Mostrar botón de actualizar

    // Agregar oyentes para actualización en tiempo real del total
    document.getElementById("cantidad").addEventListener("input", updateTotal);
    document.getElementById("precio").addEventListener("input", updateTotal);

    var productList = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];

    // Rellenar los campos del formulario con los datos del producto seleccionado
    document.getElementById("articulo").value = productList[index].articulo;
    document.getElementById("cantidad").value = productList[index].cantidad;
    document.getElementById("precio").value = productList[index].precio;
    document.getElementById("proveedor").value = productList[index].proveedor;
    document.getElementById("categoria").value = productList[index].categoria;
    document.getElementById("duracion").value = productList[index].duracion;
    document.getElementById("total").value = productList[index].total;

    // Actualizar los datos del producto al hacer clic en el botón de actualizar
    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) { // Validar las entradas del formulario
            // Actualizar los datos del producto
            productList[index].articulo = document.getElementById("articulo").value;
            productList[index].cantidad = document.getElementById("cantidad").value;
            productList[index].precio = parseFloat(document.getElementById("precio").value.replace(/\./g, '').replace(',', '.'));
            productList[index].proveedor = document.getElementById("proveedor").value;
            productList[index].categoria = document.getElementById("categoria").value;
            productList[index].duracion = document.getElementById("duracion").value;
            productList[index].total = parseInt(document.getElementById("cantidad").value) * productList[index].precio; // Recalcular total

            localStorage.setItem("productList", JSON.stringify(productList)); // Actualizar almacenamiento local

            showData(); // Actualizar visualización de datos

            // Restablecer los campos de entrada
            document.getElementById("articulo").value = "";
            document.getElementById("cantidad").value = "0";
            document.getElementById("precio").value = "0";
            document.getElementById("proveedor").value = "";
            document.getElementById("duracion").value = "";
            document.getElementById("total").value = "";

            document.getElementById("dropdownCategoria").innerHTML = "Seleccionar Categoría"; // Reiniciar menú desplegable de categorías

            document.getElementById("Submit").style.display = "block"; // Mostrar botón de enviar
            document.getElementById("Update").style.display = "none"; // Ocultar botón de actualizar
        }
    }
}

// Cargar datos cuando el contenido del DOM esté listo
document.addEventListener('DOMContentLoaded', (event) => {
    showData(); // Mostrar datos al cargar la página
});

// Cambiar la página actual y actualizar la visualización de datos
function changePage(newPage) {
    if (newPage < 1) {
        currentPage = 1; // Asegurarse de que la página no sea menor que 1
    } else if (newPage > totalPages) {
        currentPage = totalPages; // Asegurarse de que la página no exceda el total de páginas
    } else {
        currentPage = newPage; // Establecer la nueva página actual
    }
    showData(); // Actualizar la visualización de datos
}

// Eliminar un producto de la lista
function deleteData(index) {
    var productList = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];
    productList.splice(index, 1); // Eliminar el producto de la lista
    localStorage.setItem("productList", JSON.stringify(productList)); // Actualizar el almacenamiento local
    showData(); // Actualizar visualización de datos
    calculateTotalSum(); // Actualizar la visualización de la suma total
}

// Cargar los datos del producto en el formulario para editar
function updateData(index) {
    document.getElementById("Submit").style.display = "none"; // Ocultar botón de enviar
    document.getElementById("Update").style.display = "block"; // Mostrar botón de actualizar

    // Agregar oyentes para actualización en tiempo real del total
    document.getElementById("cantidad").addEventListener("input", updateTotal);
    document.getElementById("precio").addEventListener("input", updateTotal);

    var productList = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];

    // Rellenar los campos del formulario con los datos del producto seleccionado
    document.getElementById("articulo").value = productList[index].articulo;
    document.getElementById("cantidad").value = productList[index].cantidad;
    document.getElementById("precio").value = productList[index].precio;
    document.getElementById("proveedor").value = productList[index].proveedor;
    document.getElementById("categoria").value = productList[index].categoria;
    document.getElementById("duracion").value = productList[index].duracion;
    document.getElementById("total").value = productList[index].total;

    // Actualizar los datos del producto al hacer clic en el botón de actualizar
    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) { // Validar las entradas del formulario
            // Actualizar los datos del producto
            productList[index].articulo = document.getElementById("articulo").value;
            productList[index].cantidad = document.getElementById("cantidad").value;
            productList[index].precio = parseFloat(document.getElementById("precio").value.replace(/\./g, '').replace(',', '.'));
            productList[index].proveedor = document.getElementById("proveedor").value;
            productList[index].categoria = document.getElementById("categoria").value;
            productList[index].duracion = document.getElementById("duracion").value;
            productList[index].total = parseInt(document.getElementById("cantidad").value) * productList[index].precio; // Recalcular total

            localStorage.setItem("productList", JSON.stringify(productList)); // Actualizar almacenamiento local

            showData(); // Actualizar visualización de datos

            // Restablecer los campos de entrada
            document.getElementById("articulo").value = "";
            document.getElementById("cantidad").value = "0";
            document.getElementById("precio").value = "0";
            document.getElementById("proveedor").value = "";
            document.getElementById("duracion").value = "";
            document.getElementById("total").value = "";

            document.getElementById("dropdownCategoria").innerHTML = "Seleccionar Categoría"; // Reiniciar menú desplegable de categorías

            document.getElementById("Submit").style.display = "block"; // Mostrar botón de enviar
            document.getElementById("Update").style.display = "none"; // Ocultar botón de actualizar
        }
    }
}

// Exportar datos a un archivo de Excel
function exportToExcel() {
    var productList = JSON.parse(localStorage.getItem("productList")) || []; // Recuperar la lista de productos

    var data = [
        ["Artículo", "Cantidad", "Precio", "Proveedor", "Categoría", "Duración", "", "Total"]
    ];

    // Preparar datos para la exportación a Excel
    productList.forEach(function (product) {
        data.push([
            product.articulo,
            product.cantidad,
            formatCurrency(product.precio),
            product.proveedor,
            product.categoria,
            product.duracion,
            "",
            formatCurrency(product.total)
        ]);
    });

    var separacionColumnas = XLSX.utils.aoa_to_sheet(data); // Crear hoja a partir de los datos

    // Establecer anchos de columna
    separacionColumnas["!cols"] = [
        { width: 35 },
        { width: 10 },
        { width: 15 },
        { width: 20 },
        { width: 15 },
        { width: 15 },
        { width: 20 },
        { width: 20 }
    ];
    separacionColumnas["!cols"][7].alignment = { horizontal: "center", vertical: "center" }; // Alinear al centro la columna total

    var wb = XLSX.utils.book_new(); // Crear nuevo libro de trabajo
    XLSX.utils.book_append_sheet(wb, separacionColumnas, "DatosTransacciones"); // Añadir hoja al libro

    // Generar nombre de archivo basado en la fecha actual
    var currentDate = new Date(); // Obtener la fecha actual
    var day = String(currentDate.getDate()).padStart(2, '0'); // Obtener el día y rellenar con cero si es necesario
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Obtener el mes (base 0, así que sumar 1) y rellenar con cero
    var year = currentDate.getFullYear(); // Obtener el año completo

    // Formatear la fecha como DD-MM-YYYY
    var dateFormatted = day + '-' + month + '-' + year;

    // Crear el nombre del archivo para el archivo de Excel
    var fileName = 'DatosTransacciones_' + dateFormatted + '.xlsx';

    // Escribir el libro en un archivo con el nombre generado
    XLSX.writeFile(wb, fileName);

    // Mostrar una notificación de éxito
    mostrarToast('Éxito', 'La planilla de Excel acaba de ser exportada a la carpeta de Descargas', 'success', 4000);
}

// Función para exportar datos de productos como un archivo JSON
function exportToJSON() {
    try {
        const productList = JSON.parse(localStorage.getItem("productList")) || [];
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(productList))}`;
        
        const formattedDate = getFormattedDateJSON(); // Obtener fecha y hora formateadas
        
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `Respaldo_${formattedDate}.json`); // Incluir fecha y hora en el nombre del archivo
        
        // Resto del código...
    } catch (error) {
        // Manejo de errores...
    }
}

// Función para exportar datos de productos como un archivo JSON
function exportToJSON() {
    try {
        // Recuperar la lista de productos del almacenamiento local o inicializar como un array vacío
        const productList = JSON.parse(localStorage.getItem("productList")) || [];
        
        // Crear una cadena de datos para el archivo JSON
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(productList))}`;
        
        // Obtener la fecha formateada actual para el nombre del archivo
        const formattedDate = getFormattedDateJSON();
        
        // Crear un elemento de ancla temporal para descargar el archivo
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `Respaldo_${formattedDate}.json`);
        
        // Adjuntar el ancla al cuerpo y activar un clic para descargar
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        document.body.removeChild(downloadAnchorNode); // Eliminar el ancla después de la descarga
        
        // Mostrar una notificación de éxito
        mostrarToast('Éxito', 'El respaldo acaba de ser exportado a la carpeta de Descargas', 'success', 4000);
    } catch (error) {
        // Registrar el error y mostrar una notificación de error
        console.error("Error al exportar datos:", error);
        mostrarToast('Error', 'Hubo un error al exportar los datos. Por favor, intenta de nuevo.', 'danger', 4000);
    }
}

// Función para importar datos de productos desde un archivo JSON
function importFromJSON(event) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (!file) {
        // Si no se selecciona ningún archivo, mostrar una notificación de advertencia
        mostrarToast('Advertencia', 'Por favor, selecciona un archivo.', 'info', 4000);
        return;
    }

    // Verificar si el tipo de archivo es JSON
    if (file.type !== "application/json") {
        mostrarToast('Advertencia', 'Por favor, selecciona un archivo JSON.', 'info', 4000);
        return;
    }

    const reader = new FileReader(); // Crear un FileReader para leer el archivo
    reader.onload = function(event) {
        try {
            // Analizar los datos JSON del archivo
            const jsonData = JSON.parse(event.target.result);
            localStorage.setItem("productList", JSON.stringify(jsonData)); // Guardar en el almacenamiento local
            
            // Mostrar una notificación de éxito y refrescar los datos mostrados
            mostrarToast('Éxito', 'Respaldo cargado con éxito', 'success', 4000);
            showData();
        } catch (error) {
            // Registrar cualquier error de análisis y mostrar una notificación de error
            console.error("Error al analizar el archivo JSON:", error);
            mostrarToast('Error', 'El archivo no es un JSON válido. Por favor, selecciona un archivo JSON válido.', 'danger', 4000);
        }
    };
    
    // Manejar cualquier error que ocurra al leer el archivo
    reader.onerror = function(event) {
        console.error("Error al leer el archivo:", event.target.error);
        mostrarToast('Error', 'Hubo un error al leer el archivo. Por favor, intenta de nuevo.', 'danger', 4000);
    };
    
    // Leer el archivo como texto
    reader.readAsText(file);
}