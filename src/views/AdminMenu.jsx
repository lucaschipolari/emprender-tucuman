import React from "react";
import { Link } from "react-router-dom"; // Todavía necesitamos react-router-dom para las redirecciones
import "../styles/adminMenu.css";
const AdminSimpleMenu = () => {
  return (
    <div className="d-flex flex-column align-items-center p-4 bg-light">
      <h3 className="mb-4 text-dark">Opciones del Administrador</h3>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {/* Enlaces de navegación */}
        <Link to="/admin/dashboard" className="btn btn-primary btn-lg">
          Dashboard de Usuarios
        </Link>
        <Link to="/admin/usuarios" className="btn btn-info btn-lg">
          Gestión de Usuarios
        </Link>
      </div>

      <div className="d-flex justify-content-center gap-3">
        {/* Botones que no van a ninguna parte */}
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => alert("¡Este botón aún no tiene función asignada!")}
        >
          Botón Extra 1
        </button>
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => alert("¡Este otro botón tampoco hace nada aún!")}
        >
          Botón Extra 2
        </button>
      </div>
    </div>
  );
};

export default AdminSimpleMenu;
