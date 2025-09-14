import React, { useState, useEffect } from 'react';
import axios from 'axios';

// aqui componentes del formulario para agregar o editar colecciones
const ColeccionForm = ({ onColeccionAgregada, coleccionActual }) => {
    // estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [temporada, setTemporada] = useState('');

    // aqui se rellena el formulario si se pasa una coleccion para editar
    useEffect(() => {
        if (coleccionActual) {
            setNombre(coleccionActual.nombre_coleccion);
            setTemporada(coleccionActual.temporada);
        } else {
            // aqui se limpian los campos si no se esta editando
            setNombre('');
            setTemporada('');
        }
    }, [coleccionActual]);

    // funcion que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (coleccionActual) {
                // si existe, actualiza la coleccion (PUT)
                await axios.put(`http://localhost:5000/api/colecciones/${coleccionActual._id}`, {
                    nombre_coleccion: nombre,
                    temporada: temporada
                });
                alert('Colección actualizada con éxito!');
            } else {
                // si no existe, crea una nueva coleccion (POST)
                await axios.post('http://localhost:5000/api/colecciones', {
                    nombre_coleccion: nombre,
                    temporada: temporada
                });
                alert('Colección agregada con éxito!');
            }
            onColeccionAgregada();
            // aqui se limpian los campos del formulario despues de la operacion
            setNombre('');
            setTemporada('');
        } catch (error) {
            console.error("Hubo un error en la operación:", error);
            alert('Error en la operación.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{coleccionActual ? 'Editar Colección' : 'Agregar Nueva Colección'}</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
                <label>Temporada:</label>
                <input type="text" value={temporada} onChange={(e) => setTemporada(e.target.value)} required />
            </div>
            <button type="submit">{coleccionActual ? 'Actualizar Colección' : 'Agregar Colección'}</button>
            {coleccionActual && (
                <button type="button" onClick={() => onColeccionAgregada()}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default ColeccionForm;