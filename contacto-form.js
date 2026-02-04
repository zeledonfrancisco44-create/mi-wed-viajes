// Lógica para el formulario de contacto y el querystring de paquete

document.addEventListener('DOMContentLoaded', function () {
  // Mostrar paquete seleccionado si viene en el querystring
  const params = new URLSearchParams(window.location.search);
  const paquete = params.get('paquete');
  const paqueteDiv = document.getElementById('paquete-seleccionado');
  const mensajeInput = document.getElementById('mensaje');
  if (paquete) {
    paqueteDiv.textContent = `Paquete seleccionado: ${paquete}`;
    if (mensajeInput) {
      mensajeInput.value = `Hola, quiero información del paquete ${paquete}`;
    }
  }

  // Validación y envío del formulario
  const form = document.getElementById('contacto-form');
  const mensajesDiv = document.getElementById('form-mensajes');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      mensajesDiv.innerHTML = '';
      let errores = [];
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      // Validaciones
      if (nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres.');
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        errores.push('El email no es válido.');
      }
      if (mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres.');
      }
      if (errores.length > 0) {
        mensajesDiv.innerHTML = '<ul style="color:red;">' + errores.map(e => `<li>${e}</li>`).join('') + '</ul>';
        return;
      }
      // Éxito
      mensajesDiv.innerHTML = '<span style="color:green;">Mensaje enviado</span>';
      form.reset();
      if (paquete) {
        // Si había paquete, volver a prellenar el mensaje
        mensajeInput.value = `Hola, quiero información del paquete ${paquete}`;
      }
    });
  }
});
