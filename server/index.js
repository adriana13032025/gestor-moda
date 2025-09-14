const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Middleware para permitir peticiones desde el frontend

// aqui se crea una instancia de la aplicacion Express
const app = express();
// aqui define el puerto del servidor. usando el puerto del entorno 5000 por defecto
const PORT = process.env.PORT || 5000;

// Middleware (son funciones que procesan las peticiones)
// permite a Express leer y parsear datos en formato JSON que vienen en el cuerpo de la peticion (body)
app.use(express.json());
// aqui permite las peticiones de 'origen cruzado' (cross-origin),
// lo que significa que el frontend (en un puerto diferente) puede comunicarse con el backend
app.use(cors());

// aqui se definir las rutas de la API
// esto redirige las peticiones que llegan a '/api/colecciones' al archivo de rutas 'colecciones.js'
app.use('/api/colecciones', require('./routes/colecciones'));
// redirige las peticiones a '/api/prendas' al archivo 'prendas.js'
app.use('/api/prendas', require('./routes/prendas'));
// redirige las peticiones a '/api/usuarios' al archivo 'usuarios.js'
app.use('/api/usuarios', require('./routes/usuarios'));

// aqui esta la conexion a MongoDB
// aqui intenta conectar a la base de datos 'gestor-moda' en el servidor local
mongoose.connect('mongodb://localhost:27017/gestor-moda', {
    useNewUrlParser: true, // aqui usa el nuevo parser de URL de Mongo
    useUnifiedTopology: true, // aqui usa un nuevo motor de administracion de conexiones
}).then(() => {
    // se ejecuta si la conexion es exitosa
    console.log('Conexión a MongoDB exitosa');
}).catch(err => {
    // se ejecuta si hay un error en la conexion
    console.error('Error de conexión a MongoDB:', err);
});

// aqui esta una ruta de bienvenida (endpoint de prueba)
// cuando alguien visita la URL principal (por ejemplo, http://localhost:5000)
// el servidor responde con este mensaje
app.get('/', (req, res) => {
    res.send('API de gestión de proyectos de moda funcionando!');
});

// aqui inicia el servidor
// escucha las peticiones en el puerto definido
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));