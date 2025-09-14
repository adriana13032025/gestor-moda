const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// RUTA GET - leer todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// RUTA POST - crear un nuevo usuario
router.post('/', async (req, res) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        rol: req.body.rol
    });

    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA PUT - actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            return res.status(404).json({ message: 'No se encuentra el usuario' });
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const usuarioActualizado = await usuario.save();
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// RUTA DELETE - eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            return res.status(404).json({ message: 'No se encuentra el usuario' });
        }

        await Usuario.deleteOne({ _id: req.params.id });
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;