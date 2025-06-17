import React from "react";
import "./UsuarioPanel.css";

const UsuarioModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Crear Nuevo Usuario</h2>
        {/* Aquí va el formulario o contenido que quieras */}
        <p>Aquí puedes poner el formulario para crear usuario.</p>
        <button onClick={onClose} className="btn-cerrar">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UsuarioModal;
