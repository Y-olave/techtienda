// Función para cargar el resumen del pedido
function loadOrderSummary() {
    // Obtener el carrito del localStorage o inicializarlo como un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Seleccionar la tabla donde se mostrará el resumen del pedido
    let cartTable = document.querySelector("#orderSummary tbody");
    let subtotal = 0; // Inicializar el subtotal a cero
    const shippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0; // Obtener costo de envío

    // Limpiar el contenido previo de la tabla
    cartTable.innerHTML = "";

    // Iterar sobre cada producto en el carrito
    cart.forEach(product => {
        let row = document.createElement("tr"); // Crear una nueva fila para la tabla

        // Crear celdas para el nombre, cantidad, precio y total del producto
        let nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        let quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity;

        let priceCell = document.createElement("td");
        priceCell.textContent = "$" + product.price.toFixed(2); // Formatear el precio a dos decimales

        let totalCell = document.createElement("td");
        totalCell.textContent = "$" + (product.price * product.quantity).toFixed(2); // Calcular total del producto

        // Añadir las celdas a la fila
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);

        // Añadir la fila a la tabla
        cartTable.appendChild(row);

        // Acumular el subtotal
        subtotal += product.price * product.quantity;
    });

    // Mostrar los totales en la interfaz
    document.getElementById("subtotalAmount").textContent = subtotal.toFixed(2);
    document.getElementById("shippingCost").textContent = shippingCost.toFixed(2);
    document.getElementById("totalAmount").textContent = (subtotal + shippingCost).toFixed(2);
}

// Función para simular el procesamiento del pago
function procesarPago(event) {
    event.preventDefault(); // Prevenir recarga de página al enviar el formulario

    // Obtener los datos del formulario de pago
    let nombre = document.getElementById("nombre").value;
    let numTarjeta = document.getElementById("numTarjeta").value;
    let fechaExp = document.getElementById("fechaExp").value;
    let cvv = document.getElementById("cvv").value;

    // Validar que la fecha de expiración tenga el formato correcto (MM/AA)
    const fechaExpRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Expresión regular para MM/AA
    const esFechaExpValida = fechaExpRegex.test(fechaExp);

    // Simulación de validación básica
    if (numTarjeta.length === 16 && cvv.length === 3 && esFechaExpValida) {
        document.getElementById("mensajePago").textContent = "Pago procesado exitosamente. Redirigiendo...";
        
        // Simulación de redirección a página de confirmación
        setTimeout(() => {
            window.location.href = "confirmacion.html"; // Redirige a la página de confirmación
        }, 2000);
    } else {
        document.getElementById("mensajePago").textContent = "Error en los datos. Verifica la información."; // Mensaje de error
    }
}

// Cargar resumen del pedido al cargar la página
window.onload = loadOrderSummary; // Ejecutar la función al cargar la ventana
