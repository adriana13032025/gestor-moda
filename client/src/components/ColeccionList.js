import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColeccionForm from './ColeccionForm';

// componente para mostrar la lista de colecciones
const ColeccionList = ({ onColeccionModificada }) => {
    // estado para guardar la lista de colecciones obtenida del backend
    const [colecciones, setColecciones] = useState([]);
    // estado para guardar la coleccion que se esta editando
    const [coleccionAEditar, setColeccionAEditar] = useState(null);

    // funcion para obtener las colecciones de la API
    const fetchColecciones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/colecciones');
            setColecciones(response.data);
        } catch (error) {
            console.error("Hubo un error al obtener las colecciones:", error);
        }
    };

    // useEffect para cargar las colecciones al iniciar el componente
    useEffect(() => {
        fetchColecciones();
    }, [onColeccionModificada]); // esto se ejecuta cada vez que hay una modificacion (agregar, editar, eliminar)

    // funcion para eliminar una coleccion (con confirmacion)
    const handleEliminar = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta colección?");
        if (confirmacion) {
            try {
                // aqui se envia una peticion DELETE al backend
                await axios.delete(`http://localhost:5000/api/colecciones/${id}`);
                alert('Colección eliminada con éxito!');
                fetchColecciones(); // aqui vuelve a cargar la lista
            } catch (error) {
                console.error("Hubo un error al eliminar la colección:", error);
                alert('Error al eliminar la colección.');
            }
        }
    };

    // aqui la funcion para preparar el formulario y editar una coleccion
    const handleEditar = (coleccion) => {
        setColeccionAEditar(coleccion);
    };

    // aqui la funcion para cancelar la edicion y volver al formulario de "Agregar"
    const handleCancelarEdicion = () => {
        setColeccionAEditar(null);
    };

    return (
        <div>
            <h2>Lista de Colecciones</h2>
            {/* aqui muestra el formulario de edicion si hay una coleccion para editar */}
            {coleccionAEditar && (
                <ColeccionForm
                    coleccionActual={coleccionAEditar}
                    onColeccionAgregada={() => {
                        fetchColecciones();
                        handleCancelarEdicion(); // aqui vuelve al formulario de "Agregar"
                    }}
                />
            )}
            {colecciones.length > 0 ? (
                <ul>
                    {colecciones.map(coleccion => (
                        <li key={coleccion._id}>
                            {coleccion.nombre_coleccion} - {coleccion.temporada}
                            <div className="actions">
                                <button onClick={() => handleEditar(coleccion)}>Editar</button>
                                <button onClick={() => handleEliminar(coleccion._id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay colecciones para mostrar.</p>
            )}
        </div>
    );
};

export default ColeccionList;