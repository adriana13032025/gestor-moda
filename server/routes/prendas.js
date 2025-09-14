const express = require('express');
const router = express.Router();
const Prenda = require('../models/Prenda');

// RUTA GET - leer todas las prendas
router.get('/', async (req, res) => {
    try {
        const prendas = await Prenda.find();
        res.json(prendas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// RUTA POST - crear una nueva prenda
router.post('/', async (req, res) => {
    const prenda = new Prenda({
        nombre_prenda: req.body.nombre_prenda,
        tipo_prenda: req.body.tipo_prenda
    });

    try {
        const nuevaPrenda = await prenda.save();
        res.status(201).json(nuevaPrenda);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA PUT - actualizar una prenda por su ID
router.put('/:id', async (req, res) => {
    try {
        const prenda = await Prenda.findById(req.params.id);
        if (prenda == null) {
            return res.status(404).json({ message: 'No se encuentra la prenda' });
        }

        prenda.nombre_prenda = req.body.nombre_prenda;
        prenda.tipo_prenda = req.body.tipo_prenda;

        const prendaActualizada = await prenda.save();
        res.json(prendaActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA DELETE - eliminar una prenda por su ID
router.delete('/:id', async (req, res) => {
    try {
        const prenda = await Prenda.findById(req.params.id);
        if (prenda == null) {
            return res.status(404).json({ message: 'No se encuentra la prenda' });
        }

        await Prenda.deleteOne({ _id: req.params.id });
        res.json({ message: 'Prenda eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;