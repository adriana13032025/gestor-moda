const express = require('express');
const router = express.Router();
const Coleccion = require('../models/Coleccion');

// RUTA GET - leer todas las colecciones
router.get('/', async (req, res) => {
    try {
        const colecciones = await Coleccion.find();
        res.json(colecciones); // Responde con la lista de colecciones
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// RUTA POST - crear una nueva coleccion
router.post('/', async (req, res) => {
    const coleccion = new Coleccion({
        nombre_coleccion: req.body.nombre_coleccion,
        temporada: req.body.temporada
    });

    try {
        const nuevaColeccion = await coleccion.save(); // aqui guarda la nueva coleccion en la base de datos
        res.status(201).json(nuevaColeccion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA PUT - actualizar una coleccion por su ID
router.put('/:id', async (req, res) => {
    try {
        const coleccion = await Coleccion.findById(req.params.id);
        if (coleccion == null) {
            return res.status(404).json({ message: 'No se encuentra la colección' });
        }

        // aqui actualiza los campos con los nuevos valores del cuerpo de la peticion
        coleccion.nombre_coleccion = req.body.nombre_coleccion;
        coleccion.temporada = req.body.temporada;

        const coleccionActualizada = await coleccion.save();
        res.json(coleccionActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA DELETE - eliminar una coleccion por su ID
router.delete('/:id', async (req, res) => {
    try {
        const coleccion = await Coleccion.findById(req.params.id);
        if (coleccion == null) {
            return res.status(404).json({ message: 'No se encuentra la colección' });
        }

        await Coleccion.deleteOne({ _id: req.params.id }); // aqui elimina el documento
        res.json({ message: 'Colección eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;