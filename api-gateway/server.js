const gateway = require('fast-gateway');
const cors = require('cors');

const port = 9001;

const server = gateway({
    beforeHandler: (req, res) => {
        cors()(req, res, () => {});
    },
    routes: [
        {
            prefix: '/usuarios',
            target: 'https://usuarios-service.onrender.com', // URL de Render para el servicio de usuarios
            hooks: {}
        },
        {
            prefix: '/productos',
            target: 'https://productos-service.onrender.com', // URL de Render para el servicio de productos
            hooks: {}
        }
    ]
});

server.start(port).then(server => {
    console.log('Gateway ejecutándose en el puerto: ' + port);
});
