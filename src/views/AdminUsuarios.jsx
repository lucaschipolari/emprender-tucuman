import React, { useEffect, useState } from "react";
import UserTable from "../components/Admin/UserTable";
import {
  obtenerUsuarios,
  cambiarRolUsuario,
  eliminarUsuario,
  desactivarUsuario,
} from "../api/usuarios";
import Admin from "../components/Admin/Admin";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("Error al cargar los usuarios");
    } finally {
      setCargando(false);
    }
  };
  const eliminarUsuarios = async (id) => {
    await eliminarUsuario(id); // Importado de tu archivo api
    await cargarUsuarios();
  };

  const desactivarUsuarios = async (id) => {
    await desactivarUsuario(id);
    await cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ✅ Función simplificada que solo maneja la llamada al backend
  const manejarCambioRol = async (usuarioId, { rolId }) => {
    try {
      setCargando(true);
      setError(null);

      // Llamada al backend con el formato esperado por UserTable
      const resultado = await cambiarRolUsuario(usuarioId, { rolId });

      if (!resultado.success && !resultado.ok) {
        throw new Error(resultado.message || "Error al cambiar rol");
      }

      return resultado;
    } catch (err) {
      console.error("Error al cambiar rol:", err);
      setError("Error al cambiar el rol del usuario");
      throw err; // Re-lanzar para que UserTable lo maneje
    } finally {
      setCargando(false);
    }
  };

  if (cargando && usuarios.length === 0) {
    return (
      <Admin>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </Admin>
    );
  }

  return (
    <Admin>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <UserTable
        usuarios={usuarios}
        setUsuarios={setUsuarios} // ✅ Pasar setUsuarios para que UserTable pueda actualizar el estado
        onChangeRol={manejarCambioRol}
        cargando={cargando}
        onEliminarUsuario={eliminarUsuarios}
        onDesactivarUsuario={desactivarUsuarios}
      />

      {cargando && usuarios.length > 0 && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div className="toast show" role="alert">
            <div className="toast-body d-flex align-items-center">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></div>
              Actualizando roles...
            </div>
          </div>
        </div>
      )}
    </Admin>
  );
};

export default AdminUsuarios;
