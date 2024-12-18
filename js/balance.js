// Variable global para almacenar el gráfico de categorías
var categoryChart; 

// Función para generar el gráfico de categorías
function generateChart() {
    // Obtener la lista de productos desde el almacenamiento local
    var productList = JSON.parse(localStorage.getItem("productList")) || [];

    // Objeto para almacenar los totales por categoría
    var categoryData = {};

    // Recorrer la lista de productos y acumular el total por cada categoría
    productList.forEach(function(product) {
        if (categoryData[product.categoria]) {
            categoryData[product.categoria] += product.total;
        } else {
            categoryData[product.categoria] = product.total;
        }
    });

    // Extraer las etiquetas (categorías) y los valores (totales)
    var labels = Object.keys(categoryData);
    var values = Object.values(categoryData);

    // Si ya existe un gráfico, destruirlo antes de crear uno nuevo
    if (categoryChart) {
        categoryChart.destroy();
    }

    // Crear un nuevo gráfico de tipo "pie" (pastel)
    var ctx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total por cada categoría',
                data: values,
                backgroundColor: labels.map((_, i) => `hsl(${i * 360 / labels.length}, 70%, 50%)`),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 12
                        },
                        color: 'green' // Color de las etiquetas de la leyenda
                    }
                }
            }
        }
    });
}

// Evento que se ejecuta cuando el contenido del DOM está completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Generar el gráfico cuando se carga la página
    generateChart();

    // Evento para descargar el gráfico como archivo PDF
    document.getElementById('downloadPDF').addEventListener('click', function() {
        downloadPDF();
    });
});

// Función para descargar el gráfico como imagen PNG
function downloadChartAsPNG() {
    var link = document.createElement('a');
    link.href = categoryChart.toBase64Image();
    link.download = 'gráfico_categorías.png';
    link.click();
}

// Función para descargar el gráfico como archivo PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'letter');

    // Convertir el gráfico a una imagen usando html2canvas
    html2canvas(document.getElementById('categoryChart')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = 180;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Añadir título al PDF
        pdf.setFontSize(16);
        pdf.text('Total por categorías', 105, 10, null, null, 'center');

        let y = 20;

        // Si la imagen no cabe en la página, añadir una nueva página
        if (y + imgHeight > pageHeight) {
            pdf.addPage();
            y = 20; 
        }

        // Añadir la imagen del gráfico al PDF
        pdf.addImage(imgData, 'PNG', 15, y, imgWidth, imgHeight);

        // Guardar el archivo PDF
        pdf.save('grafico_categorias.pdf');
    });
}
