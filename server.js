const express = require('express');
const path = require('path');
const app = express();

// Importa configuración de base de datos (ejecuta el código de conexión)
require('./config/database');

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios (POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (CSS, JS del cliente)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba  (para verificar si funciona)
app.get('/', (request, response) => {
    response.send('<h1> Hola! El servidor Learn It, Love It está vivo. </h1>');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

