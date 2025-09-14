import React, { useState, useEffect } from 'react';
import axios from 'axios';

// componente del formulario para agregar o editar usuarios
const UsuarioForm = ({ onUsuarioAgregado, usuarioActual }) => {
    // aqui estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');

    // aqui rellena el formulario si se pasa un usuario para editar
    useEffect(() => {
        if (usuarioActual) {
            setNombre(usuarioActual.nombre);
            setEmail(usuarioActual.email);
            setRol(usuarioActual.rol);
        } else {
            // aqui limpia los campos si no se esta editando
            setNombre('');
            setEmail('');
            setRol('');
        }
    }, [usuarioActual]);

    // funcion que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuarioActual) {
                // si existe, actualiza el usuario (PUT)
                await axios.put(`http://localhost:5000/api/usuarios/${usuarioActual._id}`, {
                    nombre: nombre,
                    email: email,
                    rol: rol
                });
                alert('Usuario actualizado con éxito!');
            } else {
                // si no existe, crea un nuevo usuario (POST)
                await axios.post('http://localhost:5000/api/usuarios', {
                    nombre: nombre,
                    email: email,
                    rol: rol
                });
                alert('Usuario agregado con éxito!');
            }
            onUsuarioAgregado();
            // aqui limpia los campos del formulario despues de la operacion
            setNombre('');
            setEmail('');
            setRol('');
        } catch (error) {
            console.error("Hubo un error en la operación:", error);
            alert('Error en la operación.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{usuarioActual ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Rol:</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="">Selecciona un rol</option>
                    <option value="diseñador">Diseñador</option>
                    <option value="modelista">Modelista</option>
                    <option value="fotógrafo">Fotógrafo</option>
                </select>
            </div>
            <button type="submit">{usuarioActual ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
            {usuarioActual && (
                <button type="button" onClick={() => onUsuarioAgregado()}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default UsuarioForm;