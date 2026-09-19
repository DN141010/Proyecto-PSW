const botonesNavegacion = document.querySelectorAll("[data-seccion]");
const secciones = document.querySelectorAll(".seccion");
const formularioRegistro = document.querySelector("#formulario-registro");
const formularioIngreso = document.querySelector("#formulario-ingreso");

function mostrarMensaje(elemento, texto, tipo) {
	elemento.textContent = texto;
	elemento.className = `mensaje ${tipo}`;
}

function mostrarSeccion(nombre) {
	secciones.forEach((seccion) => {
		seccion.classList.toggle("activa", seccion.id === nombre);
	});

	botonesNavegacion.forEach((boton) => {
		boton.classList.toggle("activo", boton.dataset.seccion === nombre);
	});
}

botonesNavegacion.forEach((boton) => {
	boton.addEventListener("click", () => mostrarSeccion(boton.dataset.seccion));
});

formularioRegistro.addEventListener("submit", (evento) => {
	evento.preventDefault();

	const nombre = document.querySelector("#rg_name").value;
	const correo = document.querySelector("#rg_email").value;
	const contrasena = document.querySelector("#rg_password").value;
	const confirmacion = document.querySelector("#rg_confirmacion").value;
	const mensaje = document.querySelector("#mensaje-registro");

	if (contrasena !== confirmacion) {
		mostrarMensaje(mensaje, "Las contraseñas no coinciden.", "error");
		return;
	}


	localStorage.setItem("usuarioPixelStore", JSON.stringify({ nombre, correo, contrasena }));
	mostrarMensaje(mensaje, "Registro exitoso. Ya puedes ingresar.", "correcto");
	formularioRegistro.reset();
});

formularioIngreso.addEventListener("submit", (evento) => {
	evento.preventDefault();

	const correo = document.querySelector("#in_email").value;
	const contrasena = document.querySelector("#in_password").value;
	const mensaje = document.querySelector("#mensaje-ingreso");

	if (correo === "admin@pixelstore.com" && contrasena === "admin123") {
		mostrarMensaje(mensaje, "Bienvenido, Administrador.", "correcto");
		window.location.href = "../Admin/panel.html";
		return;
	}

	const usuario = JSON.parse(localStorage.getItem("usuarioPixelStore"));

	if (usuario && usuario.correo === correo && usuario.contrasena === contrasena) {
		mostrarMensaje(mensaje, `Bienvenido, ${usuario.nombre}.`, "correcto");
		window.location.href = "../Productos/productos.html";
	} else {
		mostrarMensaje(mensaje, "Correo o contraseña incorrectos.", "error");
	}
});



const botonesToggle = document.querySelectorAll(".btn-toggle-password");

botonesToggle.forEach((boton) => {
	boton.addEventListener("click", () => {
		const targetId = boton.dataset.target;
		const inputContrasena = document.getElementById(targetId);

		if (inputContrasena.type === "password") {
			inputContrasena.type = "text";
			boton.textContent = "Ocultar";
		} else {
			inputContrasena.type = "password";
			boton.textContent = "Ver";
		}
	});
});
