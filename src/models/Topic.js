const db = require('../config/database');

const Topic = {
    // Obtener todos los temas (ordenados por votos descendente)
    getAll: (callback) => {
        const sql = 'SELECT * FROM topics ORDER BY votes DESC';
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    },

    // Crear un nuevo tema
    create: (title, callback) => {
        const sql = 'INSERT INTO topics (title) VALUES (?)';
        // Usamos function() aquí para acceder a "this.lastID"
        db.run(sql, [title], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    // Eliminar un tema
    delete: (id, callback) => {
        const sql = 'DELETE FROM topics WHERE id = ?';
        db.run(sql, [id], (err) => {
            callback(err);
        });
    },

    // Incrementar votos de un tema
    voteUp: (id, callback) => {
        // Actualiza la tabla topics, pone la columna votes = votes + 1 donde ID sea X
        const sql = 'UPDATE topics SET votes = votes + 1 WHERE id = ?';
        db.run(sql, [id], (err) => {
            callback(err);
        });
    }
};

module.exports = Topic