const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const input = document.getElementById('nombreTarea');
    const contenedor = document.getElementById('tarea');

    const nombre = input.value.trim();

    if (nombre === '') return;

    // Enviar al servidor sin usar await, usando promesas
    fetch('/api/task/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    })
        .then(function (resp) {
            if (!resp.ok) {
                return resp.json().then(function (err) {
                    console.error('Error al crear tarea:', err);
                    throw new Error('Error del servidor');
                }).catch(function () {
                    throw new Error('Error del servidor');
                });
            }
            return resp.json();
        })
        .then(function (data) {
            var tarea = (data && data.tarea) ? data.tarea : { nombre: nombre };
            createTaskElement(tarea);
            input.value = '';
        })
        .catch(function (error) {
            console.error('Error de red:', error);
        });
});

// Función para crear y renderizar el elemento de tarea
function createTaskElement(tarea) {
    const contenedor = document.getElementById('tarea');
    var div = document.createElement('div');
    div.classList.add('tarea-item');
    if (tarea.id) div.dataset.id = tarea.id;

    var span = document.createElement('span');
    span.textContent = tarea.name || tarea.nombre;

    var botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', function () {
        var id = div.dataset.id;
        if (!id) {
            div.remove();
            return;
        }

        fetch(`/api/task?id=${id}`, { method: 'DELETE' })
            .then(function (resp) {
                if (!resp.ok) return resp.json().then(function (err) { throw err; });
                return resp.json();
            })
            .then(function (data) {
                div.remove();
            })
            .catch(function (err) {
                console.error('Error al eliminar tarea:', err);
            });
    });

    div.appendChild(span);
    div.appendChild(botonEliminar);

    contenedor.appendChild(div);
}

// Cargar tareas al iniciar la app
(function loadTasks() {
    fetch('/api/task/', { method: 'GET' })
        .then(function (resp) {
            if (!resp.ok) throw new Error('Error al obtener tareas');
            return resp.json();
        })
        .then(function (data) {

            debugger;
            console.log(data)
            var tareas = (data && data.tareas) ? data.tareas : [];
            tareas.forEach(function (t) {
                createTaskElement(t);
            });
        })
        .catch(function (err) {
            console.error('No se pudieron cargar las tareas:', err);
        });
})();
