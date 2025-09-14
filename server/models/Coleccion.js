const mongoose = require('mongoose');

// aqui se define el esquema para el modelo de Coleccion
const coleccionSchema = new mongoose.Schema({
    nombre_coleccion: {
        type: String,
        required: true, // el nombre de la coleccion es obligatorio
        unique: true, // no puede haber dos colecciones con el mismo nombre
        trim: true // elimina los espacios en blanco al inicio y final
    },
    temporada: {
        type: String,
        required: true,
        trim: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now // asigna la fecha actual por defecto
    }
});

// crea el modelo 'Coleccion' a partir del esquema
const Coleccion = mongoose.model('Coleccion', coleccionSchema);

module.exports = Coleccion;