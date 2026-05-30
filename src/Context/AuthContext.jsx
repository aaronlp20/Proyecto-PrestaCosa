// Context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import usuariosIniciales from "../data/usuarios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const inicializarUsuarios = () => {
        const guardado = localStorage.getItem("usuarios");
        if (!guardado) {
            localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales)); //crear etiqueta usuarios(la clave) y su valor seran los usuarioIniciales, JSON.STRINGIFY sirve para Convierte cualquier objeto o array en un texto que localStorage sí puede guardar.
            return usuariosIniciales;
        }
        return JSON.parse(guardado);
    };

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [error, setError] = useState("");

    const login = (email, password) => {
        const usuarios = inicializarUsuarios();
        const encontrado = usuarios.find(
            (u) => u.email === email && u.password === password
        );
        if (encontrado) {
            setUser(encontrado);
            localStorage.setItem("user", JSON.stringify(encontrado));
            setError("");
            return true;
        } else {
            setError("Email o contraseña incorrectos");
            return false;
        }
    };

    const register = (nombre, email, password) => {
        const usuarios = inicializarUsuarios();
        const existe = usuarios.find((u) => u.email === email);
        if (existe) {
            setError("Ya existe una cuenta con ese email");
            return false;
        }
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre,
            email,
            password,
        };
        const nuevaLista = [...usuarios, nuevoUsuario];
        localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
        setUser(nuevoUsuario);
        localStorage.setItem("user", JSON.stringify(nuevoUsuario));
        setError("");
        return true;
    };

    const updateUser = (datos) => {
        setUser((prev) => {
            const actualizado = { ...prev, ...datos };

            // Actualiza la sesión activa
            localStorage.setItem("user", JSON.stringify(actualizado));

            // Actualiza también en la lista de usuarios ← esto faltaba
            const usuarios = inicializarUsuarios();
            const nuevaLista = usuarios.map((u) =>
                u.id === prev.id ? actualizado : u
            );
            localStorage.setItem("usuarios", JSON.stringify(nuevaLista));

            return actualizado;
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setError("");
    };

    return (
        <AuthContext.Provider value={{ user, error, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
