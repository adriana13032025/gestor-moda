import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';

// componente para mostrar la lista de usuarios
const UsuarioList = ({ onUsuarioModificado }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);

    // funcion para obtener los usuarios de la API
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Hubo un error al obtener los usuarios:", error);
        }
    };

    // useEffect para cargar los usuarios al iniciar
    useEffect(() => {
        fetchUsuarios();
    }, [onUsuarioModificado]);

    // funcion para eliminar un usuario
    const handleEliminar = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmacion) {
            try {
                // aqui envia una peticion DELETE
                await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
                alert('Usuario eliminado con éxito!');
                fetchUsuarios();
            } catch (error) {
                console.error("Hubo un error al eliminar el usuario:", error);
                alert('Error al eliminar el usuario.');
            }
        }
    };

    // funcion para editar un usuario
    const handleEditar = (usuario) => {
        setUsuarioAEditar(usuario);
    };

    // funcion para cancelar la edicion
    const handleCancelarEdicion = () => {
        setUsuarioAEditar(null);
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {usuarioAEditar && (
                <UsuarioForm
                    usuarioActual={usuarioAEditar}
                    onUsuarioAgregado={() => {
                        fetchUsuarios();
                        handleCancelarEdicion();
                    }}
                />
            )}
            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario._id}>
                            {usuario.nombre} - {usuario.rol}
                            <div className="actions">
                                <button onClick={() => handleEditar(usuario)}>Editar</button>
                                <button onClick={() => handleEliminar(usuario._id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios para mostrar.</p>
            )}
        </div>
    );
};

export default UsuarioList;