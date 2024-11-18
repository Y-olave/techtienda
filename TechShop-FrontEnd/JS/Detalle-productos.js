// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id'); // Extraer el ID del producto

// Fetchear el archivo JSON con los productos
fetch('JS/Productos.json')
  .then(response => response.json()) // Convertir la respuesta a formato JSON
  .then(data => {
    // Buscar el producto con el ID correspondiente en el array de productos
    const producto = data.find(producto => producto.id.toString() === productoId);

    if (producto) {
      // Mostrar los detalles del producto en la interfaz
      document.getElementById('nombre-producto').textContent = producto.nombre; // Nombre del producto
      document.getElementById('imagen-producto').src = producto.imagen; // Imagen del producto
      document.getElementById('descripcion-producto').textContent = producto.descripcion; // Descripción del producto
      document.getElementById('precio-producto').textContent = `$${producto.precio}`; // Precio del producto

      // Mostrar las características del producto
      const caracteristicas = producto.caracteristicas; // Obtener características del producto
      const listaCaracteristicas = document.getElementById('caracteristicas-producto');
      listaCaracteristicas.innerHTML = `
        <p><b>Tipo:</b> ${caracteristicas.tipo}</p>
        <p><b>Procesador:</b> ${caracteristicas.procesador}</p>
        <p><b>RAM:</b> ${caracteristicas.ram}</p>
        <p><b>Almacenamiento:</b> ${caracteristicas.almacenamiento}</p>
        <p><b>Gráfica:</b> ${caracteristicas.grafica}</p>
      `; // Mostrar cada característica

      // Añadir evento para agregar el producto al carrito
      document.getElementById('añadir-carrito').addEventListener('click', () => {
        agregarAlCarrito(producto); // Llamar a la función para agregar al carrito
        window.location.href = 'Carrito.html'; // Redireccionar a la página del carrito
      });

      // Añadir evento para volver a la página anterior
      document.getElementById('volver').addEventListener('click', () => {
        history.back(); // Volver a la página anterior en el historial
      });
    } else {
      // Si no se encuentra el producto, mostrar un mensaje y redirigir
      alert('Producto no encontrado');
      window.location.href = 'Productos.html'; // Redirigir a la página de productos
    }
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error); // Manejar errores en la carga de productos
  });

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  console.log(producto); // Mostrar el producto en la consola
  // Obtener el carrito actual del localStorage o inicializarlo como un array vacío
  const carrito = JSON.parse(localStorage.getItem('cart')) || [];

  // Agregar el producto al carrito
  carrito.push(producto);

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('cart', JSON.stringify(carrito));

  // Mostrar mensaje de éxito al usuario
  alert('Producto agregado al carrito');

  // Verificar que el producto se agregó correctamente mostrando el carrito en consola
  console.log('Carrito:', JSON.parse(localStorage.getItem('cart')));
}
