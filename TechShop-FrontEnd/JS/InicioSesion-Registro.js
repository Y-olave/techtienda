// Esperar a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const registrarse = document.getElementById('registrarse');
    const iniciarSesion = document.getElementById('iniciar-sesion');
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const formRecuperar = document.getElementById('form-recuperar');
    const tituloForm = document.getElementById('titulo-form');
    const volverLogin = document.getElementById('volver-login');

    // Evento para mostrar el formulario de registro
    registrarse.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace
        formLogin.style.display = 'none'; // Ocultar el formulario de inicio de sesión
        formRegistro.style.display = 'block'; // Mostrar el formulario de registro
        tituloForm.textContent = 'Registrarse'; // Cambiar el título del formulario
    });

    // Evento para mostrar el formulario de iniciar sesión
    iniciarSesion.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace
        formRegistro.style.display = 'none'; // Ocultar el formulario de registro
        formLogin.style.display = 'block'; // Mostrar el formulario de inicio de sesión
        tituloForm.textContent = 'Iniciar sesión'; // Cambiar el título del formulario
        formRegistro.reset(); // Reiniciar el formulario de registro
    });

    // Evento para mostrar el formulario de recuperación de contraseña
    const recuperar = document.getElementById('recuperar');
    recuperar.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace
        formLogin.style.display = 'none'; // Ocultar el formulario de inicio de sesión
        formRecuperar.style.display = 'block'; // Mostrar el formulario de recuperación
        tituloForm.textContent = 'Recuperar Contraseña'; // Cambiar el título del formulario
    });

    // Evento para volver al formulario de iniciar sesión desde recuperación de contraseña
    volverLogin.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace
        formRecuperar.style.display = 'none'; // Ocultar el formulario de recuperación
        formLogin.style.display = 'block'; // Mostrar el formulario de inicio de sesión
        tituloForm.textContent = 'Iniciar sesión'; // Cambiar el título del formulario
        formRecuperar.reset(); // Reiniciar el formulario de recuperación
    });

    // Manejo del envío del formulario de recuperación de contraseña
    formRecuperar.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar el envío del formulario

        const email = document.getElementById('email-recuperar').value; // Obtener el email

        // Simulación de envío de correo de recuperación
        console.log(`Enviando enlace de recuperación a: ${email}`);

        // Mostrar un mensaje de confirmación
        alert(`Se ha enviado un enlace de recuperación a ${email}. Por favor revisa tu bandeja de entrada.`);
        
        // Restablecer el formulario
        formRecuperar.reset(); // Reiniciar el formulario
        formRecuperar.style.display = 'none'; // Ocultar formulario de recuperación
        formLogin.style.display = 'block'; // Volver al inicio de sesión
        tituloForm.textContent = 'Iniciar sesión'; // Cambiar el título del formulario
    });

    // Manejo del envío del formulario de inicio de sesión
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar el envío del formulario

        const username = document.getElementById('username').value; // Obtener el nombre de usuario
        const password = document.getElementById('password').value; // Obtener la contraseña
        const role = document.getElementById('role').value; // Obtener el rol

        console.log(`Iniciando sesión con usuario: ${username}, rol: ${role}`);

        // Validación para asegurarse de que los campos estén llenos
        if (!username || !password || !role) {
            alert('Por favor, completa todos los campos.'); // Avisar al usuario
            return;
        }

        // Redirección según el rol seleccionado
        if (role === 'admin') {
            console.log('Redirigiendo al Panel de Administrador...');
            window.location.href = 'PanelAdmin.html'; // Redirigir al panel de administrador
        } else if (role === 'cliente') {
            console.log('Redirigiendo al Panel de Cliente...');
            window.location.href = 'PanelCliente.html'; // Redirigir al panel de cliente
        } else {
            alert('Rol no reconocido'); // Mensaje de error si el rol no es válido
        }
    });
});
