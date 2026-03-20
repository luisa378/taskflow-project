const formulario = document.getElementById('formulario');
const input = document.getElementById('nombreTarea');
const contenedor = document.getElementById('tarea');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = input.value.trim();

    if (nombre === '') return;

    const div = document.createElement('div');
    div.classList.add('tarea-item');

    const span = document.createElement('span');
    span.textContent = nombre;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', function() {
        div.remove();
    });

    div.appendChild(span);
    div.appendChild(botonEliminar);

    contenedor.appendChild(div);

    input.value = '';
});
