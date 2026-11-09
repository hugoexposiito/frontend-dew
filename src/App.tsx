import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<h1>Iniciar sesión</h1>} />
        <Route path="/perfil" element={<h1>Mi perfil</h1>} />
        <Route path="/productos" element={<h1>Productos</h1>} />
        <Route path="/usuarios" element={<h1>Usuarios</h1>} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;