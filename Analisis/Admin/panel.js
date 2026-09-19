const btnNuevoProducto = document.getElementById('btn-nuevo-producto');
const btnCancelar = document.getElementById('btn-cancelar');
const contenedorFormulario = document.getElementById('contenedor-formulario');
const formularioProducto = document.getElementById('formulario-producto');

// Mostrar el formulario
btnNuevoProducto.addEventListener('click', () => {
    contenedorFormulario.classList.remove('oculto');
});

// Ocultar el formulario
btnCancelar.addEventListener('click', () => {
    contenedorFormulario.classList.add('oculto');
    formularioProducto.reset();
});

// Simular guardado
formularioProducto.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    // Obtener datos
    const nombre = document.getElementById('pd_nombre').value;
    const categoria = document.getElementById('pd_categoria').value;
    const precio = document.getElementById('pd_precio').value;

    // Crear nueva fila
    const tbody = document.getElementById('lista-productos');
    const tr = document.createElement('tr');
    
    // Simular un ID consecutivo (contar filas actuales + 1)
    const nuevoId = tbody.querySelectorAll('tr').length + 1;

    tr.innerHTML = `
        <td>${nuevoId}</td>
        <td>${nombre}</td>
        <td>${categoria}</td>
        <td>$${parseInt(precio).toLocaleString('es-CO')}</td>
        <td><button class="btn-editar">Editar</button> <button class="btn-eliminar">Eliminar</button></td>
    `;
    
    tbody.appendChild(tr);

    alert('Producto guardado exitosamente.');
    contenedorFormulario.classList.add('oculto');
    formularioProducto.reset();
});

// Cerrar sesión
const btnCerrarSesion = document.querySelector('.enlace-sesion');
if(btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', (evento) => {
        evento.preventDefault();
        // El admin no usa localStorage en esta versión simple, pero por seguridad limpiamos
        localStorage.removeItem('usuarioPixelStore');
        window.location.href = "../Login/login.html";
    });
}
