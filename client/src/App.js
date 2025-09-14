import React, { useState } from 'react';
import ColeccionList from './components/ColeccionList';
import ColeccionForm from './components/ColeccionForm';
import PrendaList from './components/PrendaList';
import PrendaForm from './components/PrendaForm';
import UsuarioList from './components/UsuarioList';
import UsuarioForm from './components/UsuarioForm';
import './App.css'; // aqui se importan los estilos CSS globales

// el componente principal de la aplicacion
function App() {
  // estado para forzar una recarga de las listas
  // cada vez que 'refresh' cambia, los componentes con la 'key' se vuelven a renderizar
  const [refresh, setRefresh] = useState(false);

  // funcion para cambiar el estado 'refresh' y activar la recarga
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h1>Gestor de Proyectos de Moda</h1>
      <hr />

      {/* seccion de colecciones */}
      <ColeccionForm onColeccionAgregada={handleRefresh} />
      {/* la 'key' fuerza a que ColeccionList se vuelva a renderizar
        cuando el estado 'refresh' cambia
      */}
      <ColeccionList key={'colecciones-' + refresh} onColeccionModificada={handleRefresh} />
      <hr />

      {/* seccion de prendas */}
      <PrendaForm onPrendaAgregada={handleRefresh} />
      <PrendaList key={'prendas-' + refresh} onPrendaModificada={handleRefresh} />
      <hr />

      {/* seccion de usuarios */}
      <UsuarioForm onUsuarioAgregado={handleRefresh} />
      <UsuarioList key={'usuarios-' + refresh} onUsuarioModificado={handleRefresh} />
    </div>
  );
}

export default App;