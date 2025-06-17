import React, { useState } from "react";
import UsuarioModal from "./UsuarioModal";
import UsuarioTabla from "./UsuarioTabla";
import "./UsuarioPanel.css";

const UsuarioPanel = () => {
  const [showModal, setShowModal] = useState(false);

  // Filtros controlados
  const [filters, setFilters] = useState({
    nombre: "",
    email: "",
    estado: "",
    fechaCreacion: "",
  });

  // Filtros a usar cuando se hace clic en Buscar
  const [searchParams, setSearchParams] = useState(null);

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setSearchParams({ ...filters });
  };

  return (
    <div className="custom-UsuarioPanel">
      <section className="usuario-header">
        <button className="btn-nuevo-usuario" onClick={abrirModal}>
          + Nuevo usuario
        </button>
      </section>

      <section className="usuario-filtros">
        <p className="usuario-filtros-titulos">Filtros</p>
        <div className="filtros-grid">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
            value={filters.nombre}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
          />
          <select
            name="estado"
            value={filters.estado}
            onChange={handleChange}
          >
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <input
            type="date"
            name="fechaCreacion"
            value={filters.fechaCreacion}
            onChange={handleChange}
          />
          <button className="btn-buscar w-100" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </section>

      <section className="usuario-tabla">
        <UsuarioTabla filters={searchParams} />
      </section>

      {showModal && <UsuarioModal onClose={cerrarModal} />}
    </div>
  );
};

export default UsuarioPanel;
