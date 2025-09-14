const mongoose = require('mongoose');

// aqui se define el esquema para el modelo de Usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // el correo electronico debe ser unico
        trim: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['diseñador', 'modelista', 'fotógrafo'], // el rol debe ser uno de estos 3 valores
        trim: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

// aqui se crea el modelo 'Usuario' a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;