const express = require('express');
const path = require('path');
const app = express();
const topicsRoutes = require('./routes/topicRoutes');
const apiRoutes = require('./routes/apiRoutes');

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

// Rutas para temas (GET, POST, DELETE)
app.use('/', topicsRoutes);
app.use('/api', apiRoutes); // Usar las rutas con prefijo '/api'

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

