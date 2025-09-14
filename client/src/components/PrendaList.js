import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrendaForm from './PrendaForm';

// componente para mostrar la lista de prendas
const PrendaList = ({ onPrendaModificada }) => {
    const [prendas, setPrendas] = useState([]);
    const [prendaAEditar, setPrendaAEditar] = useState(null);

    // funcion para obtener las prendas de la API
    const fetchPrendas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/prendas');
            setPrendas(response.data);
        } catch (error) {
            console.error("Hubo un error al obtener las prendas:", error);
        }
    };

    // useEffect para cargar las prendas al iniciar
    useEffect(() => {
        fetchPrendas();
    }, [onPrendaModificada]);

    // funcion para eliminar una prenda
    const handleEliminar = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta prenda?");
        if (confirmacion) {
            try {
                // aqui envia una peticion DELETE
                await axios.delete(`http://localhost:5000/api/prendas/${id}`);
                alert('Prenda eliminada con éxito!');
                fetchPrendas();
            } catch (error) {
                console.error("Hubo un error al eliminar la prenda:", error);
                alert('Error al eliminar la prenda.');
            }
        }
    };

    // funcion para editar una prenda
    const handleEditar = (prenda) => {
        setPrendaAEditar(prenda);
    };

    // funcion para cancelar la edicion
    const handleCancelarEdicion = () => {
        setPrendaAEditar(null);
    };

    return (
        <div>
            <h2>Lista de Prendas</h2>
            {prendaAEditar && (
                <PrendaForm
                    prendaActual={prendaAEditar}
                    onPrendaAgregada={() => {
                        fetchPrendas();
                        handleCancelarEdicion();
                    }}
                />
            )}
            {prendas.length > 0 ? (
                <ul>
                    {prendas.map(prenda => (
                        <li key={prenda._id}>
                            {prenda.nombre_prenda} ({prenda.tipo_prenda})
                            <div className="actions">
                                <button onClick={() => handleEditar(prenda)}>Editar</button>
                                <button onClick={() => handleEliminar(prenda._id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay prendas para mostrar.</p>
            )}
        </div>
    );
};

export default PrendaList;