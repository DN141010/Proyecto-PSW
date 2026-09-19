const botonesProducto = document.querySelectorAll(".boton-seleccionar");
const contadorCarrito = document.querySelector("#contador-carrito");
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
const listaCarrito = document.querySelector("#lista-carrito");
const totalPagar = document.querySelector("#total-pagar");
const btnComprar = document.querySelector("#btn-comprar");

let cantidadCarrito = 0;
let total = 0;

botonesProducto.forEach((boton) => {
    boton.addEventListener("click", () => {
        if (!boton.classList.contains("seleccionado")) {
            // Cambiar estado del botón
            boton.classList.add("seleccionado");
            boton.textContent = "Agregado";
            
            // Obtener datos del producto
            const articulo = boton.closest('.producto');
            const nombre = articulo.querySelector('h2').textContent;
            const precioTexto = articulo.querySelector('.precio').textContent;
            // Limpiar el precio (quitar $ y puntos) para sumarlo
            const precioNumero = parseInt(precioTexto.replace('$', '').replace('.', ''));
            
            // Actualizar variables
            cantidadCarrito++;
            total += precioNumero;
            
            // Actualizar UI del Header
            contadorCarrito.textContent = `🛒 Carrito (${cantidadCarrito})`;
            
            // Quitar mensaje vacío si existe
            const msjVacio = document.querySelector("#mensaje-vacio");
            if (msjVacio) {
                msjVacio.remove();
            }
            
            // Agregar al resumen visual
            const li = document.createElement('li');
            li.innerHTML = `<span>${nombre}</span> <strong>${precioTexto}</strong>`;
            listaCarrito.appendChild(li);
            
            // Actualizar total y habilitar compra
            totalPagar.textContent = `$${total.toLocaleString('es-CO')}`;
            btnComprar.disabled = false;
        }
    });
});

// Simular compra
btnComprar.addEventListener("click", () => {
    alert(`¡Compra exitosa!\nHas pagado un total de $${total.toLocaleString('es-CO')} por ${cantidadCarrito} producto(s).`);
    
    // Reiniciar todo
    cantidadCarrito = 0;
    total = 0;
    contadorCarrito.textContent = `🛒 Carrito (0)`;
    listaCarrito.innerHTML = '<li id="mensaje-vacio">No has agregado ningún producto.</li>';
    totalPagar.textContent = `$0`;
    btnComprar.disabled = true;
    
    // Reiniciar botones
    botonesProducto.forEach(boton => {
        boton.classList.remove("seleccionado");
        boton.textContent = "Seleccionar";
    });
});

// Cerrar sesión
btnCerrarSesion.addEventListener("click", (evento) => {
    evento.preventDefault();
    localStorage.removeItem("usuarioPixelStore");
    window.location.href = "../Login/login.html";
});