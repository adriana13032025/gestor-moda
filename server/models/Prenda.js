const mongoose = require('mongoose');

// aqui se define el esquema para el modelo de Prenda
const prendaSchema = new mongoose.Schema({
    nombre_prenda: {
        type: String,
        required: true,
        trim: true
    },
    tipo_prenda: {
        type: String,
        required: true,
        trim: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

// aqui se crea el modelo 'Prenda' a partir del esquema
const Prenda = mongoose.model('Prenda', prendaSchema);

module.exports = Prenda;