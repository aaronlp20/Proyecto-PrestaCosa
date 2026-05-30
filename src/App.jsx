// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { ObjetosProvider } from "./Context/ObjetosContext";
import { SolicitudesProvider } from "./Context/SolicitudesContext";

import MainLayout from "./Components/MainLayout";
import Inicio from "./Components/Inicio";
<<<<<<< HEAD
import Explorar from "./Components/Explorar.jsx";
import Login from "./Components/Iniciar-Registrar-Sesion/login";
import Register from "./Components/Iniciar-Registrar-Sesion/register";
import Perfil from "./Components/Perfil/perfil";
import MisObjetos from "./Components/Mis-Objetos/MisObjetos";
import DetalleObjeto from "./Components/DetalleObjeto";
import MisSolicitudes from "./Components/Mis-Solicitudes/MisSolicitudes";
=======
import Explorar from "./Components/Explorar";
import Login from "./Iniciar-Registrar-Sesion/login";
import Register from "./Iniciar-Registrar-Sesion/register";
import Perfil from "./Components/Perfil";
import MisObjetos from "./Components/MisObjetos";
import DetalleObjeto from "./Components/DetalleObjeto";
import MisSolicitudes from "./Components/MisSolicitudes";
>>>>>>> main
import SolicitudesRecibidas from "./Components/SolicitudesRecibidas";

const RutaProtegida = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
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