// routes/foroRoutes.js
const express = require('express');
const router = express.Router();
const Foro = require('../models/forumModel');

// Ruta para obtener todos los foros
// Ruta para obtener todos los foros
router.get('/foros', async (req, res) => {
    try {
        const foros = await Foro.find();
        res.json(foros);
    } catch (error) {
        console.error('Error al obtener los foros:', error);
        res.status(500).json({ error: 'Error al obtener los foros.' });
    }
});

// Ruta para crear un nuevo foro
router.post('/foros', async (req, res) => {  
    const { titulo, comentario, cursoId, usuarioId } = req.body;
    try {
        const newForo = new Foro({ titulo, comentario, cursoId, usuarioId });
        await newForo.save();
        res.status(201).json(newForo);
    } catch (error) {
        console.error('Error al crear el foro:', error);
        res.status(500).json({ error: 'Error al crear el foro.', details: error.message });
    }
});

// Ruta para editar un foro
router.put('/foros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, comentario } = req.body;
    try {
        const updatedForo = await Foro.findByIdAndUpdate(id, { titulo, comentario }, { new: true });
        res.json(updatedForo);
    } catch (error) {
        console.error('Error al editar el foro:', error);
        res.status(500).json({ error: 'Error al editar el foro.' });
    }
});

// Ruta para eliminar un foro
router.delete('/foros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Foro.findByIdAndDelete(id);
        res.json({ message: 'Foro eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el foro:', error);
        res.status(500).json({ error: 'Error al eliminar el foro.' });
    }
});

module.exports = router;
