$(document).ready(function() {
    // Verificar si está logueado
    const loggedUser = sessionStorage.getItem('loggedUser');
    if (!loggedUser) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = '../login-registro/login.html';
    }

    // Mostrar nombre de usuario en la navbar
    $('#navbarPerfil').html(`<i class="bi bi-person"></i> ${loggedUser}`);

    // Cargar datos del usuario
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loggedUser);
    if (!user) {
        alert('Usuario no encontrado.');
        window.location.href = '../login-registro/login.html';
        return;
    }

    // Mostrar datos
    let profileHtml = `
        <div class="row">
            <div class="col-md-6">
                <h3>Datos Personales</h3>
                <p><strong>Nombres:</strong> ${user.nombres}</p>
                <p><strong>Apellidos:</strong> ${user.apellidos}</p>
                <p><strong>Usuario:</strong> 
                    <span id="username-display">${user.username}</span>
                    <input type="text" class="form-control form-control-sm d-none" id="username-edit" value="${user.username}">
                </p>
                <p><strong>País:</strong> ${user.pais}</p>
                <p><strong>Teléfono:</strong> <span class="private">Privado</span></p>
                <p><strong>Correo electrónico:</strong> <span class="private">Privado</span></p>
                <p><strong>Contraseña:</strong> <span class="private">Privado</span></p>
            </div>
            <div class="col-md-6">
                <h3>Información Adicional</h3>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Dirección:</label>
                    <div class="input-group">
                        <span id="direccion-display">${user.direccion || 'No especificada'}</span>
                        <input type="text" class="form-control form-control-sm d-none" id="direccion-edit" value="${user.direccion || ''}">
                        <button type="button" class="btn btn-outline-info btn-sm" id="edit-btn" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </div>
                </div>
                <div id="save-btn-group" style="display:none;" class="mb-3">
                    <button type="button" class="btn btn-success btn-sm me-2" id="save-btn">
                        <i class="bi bi-check"></i> Guardar
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" id="cancel-btn">
                        <i class="bi bi-x"></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h3>Opciones de Cuenta</h3>
                <button class="btn btn-danger btn-sm" onclick="eliminarCuenta()"><i class="bi bi-trash"></i> Eliminar Cuenta</button>
            </div>
        </div>
    `;
    $('#profile-content').html(profileHtml);

    // Botón de editar
    $(document).on('click', '#edit-btn', function() {
        $('#username-display').addClass('d-none');
        $('#username-edit').removeClass('d-none');
        $('#direccion-display').addClass('d-none');
        $('#direccion-edit').removeClass('d-none');
        $('#edit-btn').addClass('d-none');
        $('#save-btn-group').show();
    });

    // Botón de guardar
    $(document).on('click', '#save-btn', function() {
        const newUsername = $('#username-edit').val().trim();
        const newDireccion = $('#direccion-edit').val().trim();

        if (!newUsername) {
            alert('El nombre de usuario no puede estar vacío.');
            return;
        }

        // Validar que el username sea único (si cambió)
        if (newUsername !== user.username) {
            const existingUser = users.find(u => u.username === newUsername && u.username !== user.username);
            if (existingUser) {
                alert('El nombre de usuario ya está en uso.');
                return;
            }
        }

        // Actualizar usuario
        user.username = newUsername;
        user.direccion = newDireccion;
        localStorage.setItem('users', JSON.stringify(users));

        // Si cambió el username en sessionStorage, actualizar
        if (newUsername !== loggedUser) {
            sessionStorage.setItem('loggedUser', newUsername);
            $('#navbarPerfil').html(`<i class="bi bi-person"></i> ${newUsername}`);
        }

        // Actualizar interfaz
        $('#username-display').text(newUsername).removeClass('d-none');
        $('#username-edit').addClass('d-none');
        $('#direccion-display').text(newDireccion || 'No especificada').removeClass('d-none');
        $('#direccion-edit').addClass('d-none');
        $('#edit-btn').removeClass('d-none');
        $('#save-btn-group').hide();

        alert('Cambios guardados correctamente.');
    });

    // Botón de cancelar
    $(document).on('click', '#cancel-btn', function() {
        $('#username-display').removeClass('d-none');
        $('#username-edit').addClass('d-none');
        $('#direccion-display').removeClass('d-none');
        $('#direccion-edit').addClass('d-none');
        $('#edit-btn').removeClass('d-none');
        $('#save-btn-group').hide();
    });
});

function cerrarSesion() {
    sessionStorage.removeItem('loggedUser');
    alert('Has cerrado sesión.');
    window.location.href = 'index.html';
}

function eliminarCuenta() {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        const loggedUser = sessionStorage.getItem('loggedUser');
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.username !== loggedUser);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.removeItem('loggedUser');
        alert('Tu cuenta ha sido eliminada.');
        window.location.href = '../login-registro/login.html';
    }
}
