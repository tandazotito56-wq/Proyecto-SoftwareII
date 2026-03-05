$(document).ready(function() {
    // Verificar si está logueado
    const loggedUser = sessionStorage.getItem('loggedUser');
    if (!loggedUser) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = '../login-registro/login.html';
    }

    // Mostrar nombre de usuario en la navbar
    if ($('#navbarPerfil').length) {
        $('#navbarPerfil').html(`<i class="bi bi-person"></i> ${loggedUser}`);
    }
});

function cerrarSesion() {
    sessionStorage.removeItem('loggedUser');
    alert('Has cerrado sesión.');
    window.location.href = 'index.html';
}
