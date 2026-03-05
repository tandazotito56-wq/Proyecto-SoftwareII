$(document).ready(function() {
    // Función para toggle visibility de password
    function togglePasswordVisibility(inputId, buttonId) {
        $(buttonId).click(function() {
            const input = $(inputId);
            const icon = $(this).find('i');
            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
                icon.removeClass('bi-eye').addClass('bi-eye-slash');
            } else {
                input.attr('type', 'password');
                icon.removeClass('bi-eye-slash').addClass('bi-eye');
            }
        });
    }

    // Aplicar toggle a passwords
    togglePasswordVisibility('#password', '#togglePassword');
    togglePasswordVisibility('#confirmPassword', '#toggleConfirmPassword');

    // Llenar automáticamente código de teléfono según país
    $('#pais').change(function() {
        const selectedOption = $(this).find('option:selected');
        const codigo = selectedOption.data('code') || '';
        $('#codigoTelefono').val(codigo);
    });

    // Función para validar email
    function validateEmail(email) {
        return email.includes('@');
    }

    // Función para validar password (para registro)
    function validatePassword(password) {
        return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    }

    // Obtener usuarios de localStorage
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Guardar usuarios en localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Verificar si es página de login o registro
    const isLogin = window.location.pathname.includes('login.html');
    const isRegistro = window.location.pathname.includes('registro.html');

    // Manejar submit del formulario
    $('form').submit(function(e) {
        e.preventDefault();

        if (isLogin) {
            // Login
            const email = $('#email').val().trim();
            const password = $('#password').val();

            if (!email || !password) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            if (!validateEmail(email)) {
                alert('El correo electrónico debe contener "@".');
                return;
            }

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert('Inicio de sesión exitoso.');
                // Guardar usuario logueado
                sessionStorage.setItem('loggedUser', user.username);
                // Redirigir a index.html en pagina/
                window.location.href = '../pagina/index.html';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        } else if (isRegistro) {
            // Registro
            const nombres = $('#nombres').val().trim();
            const apellidos = $('#apellidos').val().trim();
            const username = $('#username').val().trim();
            const email = $('#email').val().trim();
            const pais = $('#pais').val().trim();
            const telefono = $('#telefono').val().trim();
            const codigoTelefono = $('#codigoTelefono').val().trim();
            const password = $('#password').val();
            const confirmPassword = $('#confirmPassword').val();

            if (!nombres || !apellidos || !username || !email || !pais || !telefono || !password || !confirmPassword) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            // Validar nombres y apellidos: solo letras y espacios
            if (!/^[a-zA-Z\s]+$/.test(nombres)) {
                alert('Los nombres solo pueden contener letras y espacios.');
                return;
            }
            if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
                alert('Los apellidos solo pueden contener letras y espacios.');
                return;
            }

            if (!validateEmail(email)) {
                alert('El correo electrónico debe contener "@".');
                return;
            }

            // Validar teléfono: solo números
            if (!/^[0-9]+$/.test(telefono)) {
                alert('El número telefónico solo puede contener números.');
                return;
            }

            if (!validatePassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const users = getUsers();
            const existingUser = users.find(u => u.email === email || u.username === username);

            if (existingUser) {
                alert('El correo electrónico o nombre de usuario ya están registrados.');
                return;
            }

            // Guardar nuevo usuario
            users.push({
                nombres,
                apellidos,
                username,
                email,
                pais,
                telefono,
                codigoTelefono,
                password
            });
            saveUsers(users);

            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            // Redirigir a login
            window.location.href = 'login.html';
        }
    });
});
