const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbName = path.join(__dirname, '../learnit.sqlite');

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
        initTables();
    }
});

// Función para crear tablas si no existen
function initTables() {
    db.serialize(() => {
        // Tabla Temas
        db.run(`CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            votes INTEGER DEFAULT 0
        )`);

        // Tabla Enlaces ( con FK al tema)
        db.run(`CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            votes INTEGER DEFAULT 0,
            topic_id INTEGER,
            FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
        )`);

        console.log('Tablas verificadas/creadas correctamente');
    });
}

// Exportamos la instancia de la base de datos
module.exports = db;
