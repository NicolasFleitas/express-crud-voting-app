const db = require('../config/database');

const Link = {
    // Obtiene todos los enlaces y ordena en memoria (es más eficiente)
    getAll: (callback) => {
        const sql = 'SELECT * FROM links ORDER BY votes DESC';
        db.all(sql, [], (err, rows) => {
            // Si hay error, 'err' tendrá datos, si no, 'rows' tendrá la lista
            callback(err, rows);
        });
    },

    // Crear un nuevo enlace asociado a un tema específico (topic_id)
    create: (topic_id, title, url, callback) => {
        const sql = 'INSERT INTO links (topic_id, title, url) VALUES (?, ?, ?)';
        db.run(sql, [topic_id, title, url], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    // Eliminar un enlace por su ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM links WHERE id = ?';
        db.run(sql, [id], (err) => {
            callback(err);
        });
    },

    // Incrementar votos de un enlace
    voteUp: (id, callback) => {
        const sql = 'UPDATE links SET votes = votes + 1 WHERE id = ?';
        db.run(sql, [id], (err) => {
            callback(err);
        });
    }
};

module.exports = Link;