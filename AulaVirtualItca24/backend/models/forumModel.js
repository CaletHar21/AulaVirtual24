const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    comentario: { type: String, required: true },
    cursoId: { type: mongoose.Schema.Types.ObjectId, required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { collection: 'foros' }); // Aseguramos el nombre de la colección 'foros'

module.exports = mongoose.model('Foro', forumSchema);
