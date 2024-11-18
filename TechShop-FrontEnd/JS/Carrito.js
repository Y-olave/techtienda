// Función para cargar el carrito
function loadCart() {
    // Obtener el carrito del almacenamiento local o inicializarlo como un array vacío
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let cartTable = document.querySelector("#cartTable tbody"); // Seleccionar el cuerpo de la tabla del carrito
    let totalPrice = 0; // Variable para almacenar el precio total de los productos
    let shippingCost = 5000; // Costo de envío fijo
    
    // Limpiar el contenido de la tabla del carrito
    cartTable.innerHTML = "";
    
    // Recorrer cada producto en el carrito
    cart.forEach((product, index) => {
        let row = document.createElement("tr"); // Crear una nueva fila para la tabla
        
        // Celda para la imagen del producto
        let imageCell = document.createElement("td");
        let image = document.createElement("img");
        image.src = product.image; // Establecer la fuente de la imagen
        image.alt = product.name; // Texto alternativo para la imagen
        image.width = 80; // Ancho de la imagen
        image.height = 80; // Alto de la imagen
        imageCell.appendChild(image); // Agregar la imagen a la celda
        
        // Celda para el nombre del producto
        let nameCell = document.createElement("td");
        nameCell.textContent = product.name; // Asignar el nombre del producto
        
        // Celda para el precio del producto
        let priceCell = document.createElement("td");
        // Convertir el precio a número y formatearlo con decimales y miles
        priceCell.textContent = "$" + parseFloat(product.price).toLocaleString('es-CL', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Celda para la cantidad del producto
        let quantityCell = document.createElement("td");
        let quantityInput = document.createElement("input");
        quantityInput.type = "number"; // Tipo de input para la cantidad
        quantityInput.value = product.quantity; // Valor inicial de la cantidad
        quantityInput.min = 1; // Valor mínimo de la cantidad
        quantityInput.onchange = function () {
            // Actualizar la cantidad cuando cambie el valor del input
            updateQuantity(index, quantityInput.value);
        };
        quantityCell.appendChild(quantityInput); // Agregar el input a la celda
        
        // Celda para el total del producto (precio * cantidad)
        let totalCell = document.createElement("td");
        // Multiplicar el precio por la cantidad y formatearlo
        totalCell.textContent = "$" + (parseFloat(product.price) * product.quantity).toLocaleString('es-CL', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Celda para el botón de eliminar
        let actionCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar"; // Texto del botón
        deleteButton.onclick = function () {
            // Eliminar el producto del carrito
            removeFromCart(index);
        };
        actionCell.appendChild(deleteButton); // Agregar el botón a la celda
        
        // Agregar todas las celdas a la fila
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(actionCell);
        
        // Agregar la fila a la tabla del carrito
        cartTable.appendChild(row);
        
        // Calcular el precio total acumulado
        totalPrice += parseFloat(product.price) * product.quantity;
    });
    
    // Actualizar la descripción del envío
    document.getElementById("shippingOption").textContent = "Envío a domicilio";
    document.getElementById("shippingDescription").textContent = "Entrega a domicilio";
    
    // Mostrar el subtotal, costo de envío y precio total en la interfaz
    document.getElementById("subtotal").textContent = "$" + totalPrice.toLocaleString('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    document.getElementById("shippingCost").textContent = "$" + shippingCost.toLocaleString('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    document.getElementById("totalPrice").textContent = "$" + (totalPrice + shippingCost).toLocaleString('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
  }
  
  // Función para actualizar la cantidad de un producto
  function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')); // Obtener el carrito
    cart[index].quantity = parseInt(quantity); // Actualizar la cantidad del producto
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito actualizado
    loadCart(); // Recargar el carrito para mostrar los cambios
  }
  
  // Función para eliminar un producto del carrito
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')); // Obtener el carrito
    cart.splice(index, 1); // Eliminar el producto de la lista
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito actualizado
    loadCart(); // Recargar el carrito
  }
  
  // Función para proceder al pago
  function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')); // Obtener el carrito
    
    // Verificar que el carrito no esté vacío
    if (cart.length > 0) {
        const address = document.getElementById("addressInput").value; // Obtener dirección
        const commune = document.getElementById("communeSelect").value; // Obtener comuna
        // Validar que se ingresaron dirección y comuna
        if (!address || !commune) {
            alert("Por favor, ingresa tu dirección de despacho y selecciona una comuna.");
            return;
        }
        
        // Guardar el carrito en localStorage antes de redirigir
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirigir a la página de pago
        window.location.href = "Pago.html";
    } else {
        alert("Tu carrito está vacío."); // Mensaje si el carrito está vacío
    }
  }
  
  // Función para redirigir a pago
  function redirigirPago() {
    checkout(); // Llamar a la función de pago
  }
  
  // Evento para cargar el carrito al iniciar la página
  window.onload = loadCart; // Cargar el carrito al cargar la ventana
  