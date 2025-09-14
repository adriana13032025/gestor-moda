import React, { useState, useEffect } from 'react';
import axios from 'axios';

// componente del formulario para agregar o editar prendas
const PrendaForm = ({ onPrendaAgregada, prendaActual }) => {
    // estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');

    // aqui rellena el formulario si se pasa una prenda para editar
    useEffect(() => {
        if (prendaActual) {
            setNombre(prendaActual.nombre_prenda);
            setTipo(prendaActual.tipo_prenda);
        } else {
            // aqui limpia los campos si no se esta editando
            setNombre('');
            setTipo('');
        }
    }, [prendaActual]);

    // funcion que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (prendaActual) {
                // si existe, actualiza la prenda (PUT)
                await axios.put(`http://localhost:5000/api/prendas/${prendaActual._id}`, {
                    nombre_prenda: nombre,
                    tipo_prenda: tipo
                });
                alert('Prenda actualizada con éxito!');
            } else {
                // si no existe, crea una nueva prenda (POST)
                await axios.post('http://localhost:5000/api/prendas', {
                    nombre_prenda: nombre,
                    tipo_prenda: tipo
                });
                alert('Prenda agregada con éxito!');
            }
            onPrendaAgregada();
            // aqui limpia los campos del formulario despues de la operacion
            setNombre('');
            setTipo('');
        } catch (error) {
            console.error("Hubo un error en la operación:", error);
            alert('Error en la operación.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{prendaActual ? 'Editar Prenda' : 'Agregar Nueva Prenda'}</h2>
            <div>
                <label>Nombre de la Prenda:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
                <label>Tipo de Prenda:</label>
                <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
            </div>
            <button type="submit">{prendaActual ? 'Actualizar Prenda' : 'Agregar Prenda'}</button>
            {prendaActual && (
                <button type="button" onClick={() => onPrendaAgregada()}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default PrendaForm;