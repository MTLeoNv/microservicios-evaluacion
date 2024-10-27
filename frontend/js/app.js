document.addEventListener('DOMContentLoaded', function() {
    function mostrarError(mensaje) {
        alert(mensaje);
    }

    // Cargar usuarios
    document.getElementById('cargarUsuarios').addEventListener('click', function() {
        fetch('https://api-gateway-o5lb.onrender.com/usuarios/list.usuarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en el servidor de usuarios');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let usuariosList = document.getElementById('usuariosList');
                usuariosList.innerHTML = ''; 
                
                data.data.users.forEach(usuario => {
                    let row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.correo}</td>
                    `;
                    usuariosList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al cargar usuarios:', error);
                mostrarError('El servicio de usuarios no está disponible actualmente.');
            });
    });

    // Cargar productos
    document.getElementById('cargarProductos').addEventListener('click', function() {
        fetch('https://api-gateway-o5lb.onrender.com/productos/list.productos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en el servidor de productos');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let productosList = document.getElementById('productosList');
                productosList.innerHTML = '';
                
                data.data.products.forEach(producto => {
                    let row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio}</td>
                        <td>${producto.stock}</td>
                    `;
                    productosList.appendChild(row);
                });
            })
            .catch(err => {
                console.error('Error al cargar productos:', err);
                mostrarError('El servicio de productos no está disponible actualmente.');
            });
    });

    // Manejo del formulario de añadir producto
    document.getElementById('addProductoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;

        fetch('https://api-gateway-o5lb.onrender.com/productos/add.producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, precio, stock })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en el servidor al añadir producto');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert(data.data.message);

            document.getElementById('nombre').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('stock').value = '';

            document.getElementById('cargarProductos').click();
        })
        .catch(err => {
            console.error('Error al añadir producto:', err);
            mostrarError('El servicio de productos no está disponible actualmente.');
        });
    });

    // Manejo del formulario de añadir usuario
    document.getElementById('addUsuarioForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombreUsuario').value;
        const correo = document.getElementById('correo').value;

        fetch('https://api-gateway-o5lb.onrender.com/usuarios/add.usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, correo })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en el servidor al añadir usuario');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert(data.data.message);

            document.getElementById('nombreUsuario').value = '';
            document.getElementById('correo').value = '';

            document.getElementById('cargarUsuarios').click();
        })
        .catch(err => {
            console.error('Error al añadir usuario:', err);
            mostrarError('El servicio de usuarios no está disponible actualmente.');
        });
    });
});
