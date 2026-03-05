$(document).ready(function() {
    const loggedUser = sessionStorage.getItem('loggedUser');
    
    // Mostrar opciones según si está logueado
    if (loggedUser) {
        $('#login-info').show();
        // Hide login link, show perfil dropdown
        $('.navbar-nav .nav-item:last-child').hide();
        // Mostrar username en la navbar
        $('#navbarPerfil').html(`<i class="bi bi-person"></i> ${loggedUser}`);
    } else {
        $('#login-info').hide();
        // Show login link, hide perfil dropdown
        $('.navbar-nav .nav-item:nth-child(6)').hide();
    }
});

function cerrarSesion() {
    sessionStorage.removeItem('loggedUser');
    alert('Has cerrado sesión.');
    window.location.href = 'index.html';
}
