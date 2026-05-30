// Context/SolicitudesContext.jsx
import { createContext, useContext, useState } from "react";
import solicitudesIniciales from "../data/solicitudes";

const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {

  const inicializar = () => {
    const guardado = localStorage.getItem("solicitudes");
    if (!guardado) {
      localStorage.setItem("solicitudes", JSON.stringify(solicitudesIniciales));
      return solicitudesIniciales;
    }
    return JSON.parse(guardado);
  };

  const [solicitudes, setSolicitudes] = useState(inicializar);

  const guardar = (lista) => {
    setSolicitudes(lista);
    localStorage.setItem("solicitudes", JSON.stringify(lista));
  };

  const crearSolicitud = (nuevaSolicitud) => {
    const solicitud = {
      ...nuevaSolicitud,
      id: solicitudes.length + 1,
      estado: "pendiente",
    };
    guardar([...solicitudes, solicitud]);
  };

  const cancelarSolicitud = (id) => {
    guardar(solicitudes.map((s) =>
      s.id === id && s.estado === "pendiente"
        ? { ...s, estado: "cancelada" }
        : s
    ));
  };

  const hayConflicto = (objetoId, fechaInicio, fechaFin, solicitudId) => {
    return solicitudes.some((s) =>
      s.objetoId === objetoId &&
      s.estado === "aprobada" &&
      s.id !== solicitudId &&
      fechaInicio <= s.fechaFin &&
      fechaFin >= s.fechaInicio
    );
  };

  const aprobarSolicitud = (id) => {
    const solicitud = solicitudes.find((s) => s.id === id);
    if (!solicitud) return { exito: false, mensaje: "Solicitud no encontrada" };
    if (hayConflicto(solicitud.objetoId, solicitud.fechaInicio, solicitud.fechaFin, id)) {
      return { exito: false, mensaje: "Ya existe un préstamo aprobado en esas fechas" };
    }
    guardar(solicitudes.map((s) =>
      s.id === id ? { ...s, estado: "aprobada" } : s
    ));
    return { exito: true, mensaje: "Solicitud aprobada" };
  };

  const rechazarSolicitud = (id) => {
    guardar(solicitudes.map((s) =>
      s.id === id ? { ...s, estado: "rechazada" } : s
    ));
  };

  return (
    <SolicitudesContext.Provider value={{
      solicitudes,
      crearSolicitud,
      cancelarSolicitud,
      aprobarSolicitud,
      rechazarSolicitud,
    }}>
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudesContext);
