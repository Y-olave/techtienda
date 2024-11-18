// Obtener el elemento de entrada de búsqueda y el botón de búsqueda
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Obtener todos los productos y secciones del documento
const productos = document.querySelectorAll('.producto');
const secciones = document.querySelectorAll('h3');

// Añadir un evento de clic al botón de búsqueda y un evento de teclado al input
searchButton.addEventListener('click', buscarProductos);
searchInput.addEventListener('keyup', buscarProductos);

// Función para buscar productos basados en el texto ingresado
function buscarProductos() {
  // Obtener el texto de búsqueda en minúsculas
  const textoBuscar = searchInput.value.toLowerCase();
  let hayProductosVisibles = false;

  // Iterar sobre cada producto para verificar si contiene el texto de búsqueda
  productos.forEach((producto) => {
    const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
    if (nombreProducto.includes(textoBuscar)) {
      producto.style.display = 'block'; // Mostrar el producto si coincide
      hayProductosVisibles = true; // Indicar que hay al menos un producto visible
    } else {
      producto.style.display = 'none'; // Ocultar el producto si no coincide
    }
  });

  // Ocultar o mostrar las secciones basadas en la visibilidad de los productos
  secciones.forEach((seccion) => {
    // Obtener los productos en la sección actual
    const productosEnSeccion = Array.from(seccion.nextElementSibling.children);
    // Verificar si hay algún producto visible en la sección
    const hayProductosEnSeccion = productosEnSeccion.some((producto) => producto.style.display === 'block');

    // Mostrar u ocultar el encabezado de la sección según la visibilidad de los productos
    seccion.style.display = hayProductosEnSeccion ? 'block' : 'none';
  });
}

// Obtener todos los botones "Comprar ahora"
const comprarAhoraButtons = document.querySelectorAll('.producto button');

// Añadir un evento clic a cada botón de compra
comprarAhoraButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    console.log('Evento clic disparado');

    // Obtener el ID del producto basado en su índice
    const productoId = index + 1;
    console.log('ID del producto:', productoId);

    // Crear un objeto producto con detalles
    const producto = {
      id: productoId,
      name: productos[index].querySelector('p').textContent,
      price: parseFloat(productos[index].querySelectorAll('p')[1].textContent.replace('$', '')),
      quantity: 1
    };
    console.log('Objeto producto:', producto);

    // Obtener el carrito de localStorage o inicializarlo si no existe
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    carrito.push(producto); // Agregar el nuevo producto al carrito
    localStorage.setItem('cart', JSON.stringify(carrito)); // Guardar el carrito actualizado

    console.log('Producto agregado al carrito');
    alert('Producto agregado al carrito'); // Notificar al usuario
    window.location.href = 'Carrito.html'; // Redirigir al usuario a la página del carrito
  });
});
