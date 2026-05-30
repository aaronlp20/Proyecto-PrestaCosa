// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { ObjetosProvider } from "./Context/ObjetosContext";
import { SolicitudesProvider } from "./Context/SolicitudesContext";

import MainLayout from "./Componentes/MainLayout";
import Inicio from "./Componentes/Inicio";
import Explorar from "./Componentes/Explorar";
import Login from "./Componentes/Login";
import Register from "./Componentes/Register";
import Perfil from "./Componentes/Perfil";
import MisObjetos from "./Componentes/MisObjetos";
import DetalleObjeto from "./Componentes/DetalleObjeto";
import MisSolicitudes from "./Componentes/MisSolicitudes";
import SolicitudesRecibidas from "./Componentes/SolicitudesRecibidas";

function App() {

  // ← AQUÍ adentro, no afuera
  const RutaProtegida = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <ObjetosProvider>
        <SolicitudesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<RutaProtegida><MainLayout><Inicio /></MainLayout></RutaProtegida>} />
              <Route path="/explorar" element={<RutaProtegida><MainLayout><Explorar /></MainLayout></RutaProtegida>} />
              <Route path="/perfil" element={<RutaProtegida><MainLayout><Perfil /></MainLayout></RutaProtegida>} />
              <Route path="/mis-objetos" element={<RutaProtegida><MainLayout><MisObjetos /></MainLayout></RutaProtegida>} />
              <Route path="/objeto/:id" element={<RutaProtegida><MainLayout><DetalleObjeto /></MainLayout></RutaProtegida>} />
              <Route path="/mis-solicitudes" element={<RutaProtegida><MainLayout><MisSolicitudes /></MainLayout></RutaProtegida>} />
              <Route path="/solicitudes-recibidas" element={<RutaProtegida><MainLayout><SolicitudesRecibidas /></MainLayout></RutaProtegida>} />
            </Routes>
          </BrowserRouter>
        </SolicitudesProvider>
      </ObjetosProvider>
    </AuthProvider>
  );
}

export default App;