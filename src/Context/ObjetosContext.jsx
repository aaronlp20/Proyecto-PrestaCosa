// Context/ObjetosContext.jsx
import { createContext, useContext, useState } from "react";
import objetosIniciales from "../data/objetos";

const ObjetosContext = createContext();

export const ObjetosProvider = ({ children }) => {

  const inicializar = () => {
    const guardado = localStorage.getItem("objetos");
    if (!guardado) {
      localStorage.setItem("objetos", JSON.stringify(objetosIniciales));
      return objetosIniciales;
    }
    return JSON.parse(guardado);
  };

  const [objetos, setObjetos] = useState(inicializar);

  const guardar = (lista) => {
    setObjetos(lista);
    localStorage.setItem("objetos", JSON.stringify(lista));
  };

  const agregarObjeto = (nuevoObjeto) => {
    const objeto = {
      ...nuevoObjeto,
      id: objetos.length + 1,
      rating: 0,
    };
    guardar([...objetos, objeto]);
  };

  const editarObjeto = (id, datosActualizados) => {
    guardar(objetos.map((obj) =>
      obj.id === id ? { ...obj, ...datosActualizados } : obj
    ));
  };

  const eliminarObjeto = (id) => {
    guardar(objetos.filter((obj) => obj.id !== id));
  };

  return (
    <ObjetosContext.Provider value={{ objetos, agregarObjeto, editarObjeto, eliminarObjeto }}>
      {children}
    </ObjetosContext.Provider>
  );
};

export const useObjetos = () => useContext(ObjetosContext);
