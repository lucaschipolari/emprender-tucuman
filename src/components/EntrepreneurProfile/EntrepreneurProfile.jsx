import React from "react";
import "./EntrepreneurProfile.css";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaComments,
  FaUserPlus,
  FaShareAlt,
} from "react-icons/fa";

const EntrepreneurProfile = ({ emprendedor, handleCrearClickEmprendedor }) => {
  if (!emprendedor) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-card">
      <div className="area-perfil">
        <div className="banner">
          <img
            src={emprendedor.portada || "/logoEmprenderTucuman.jpeg"}
            alt="Banner"
            className="banner-img"
          />
          <div className="logo-container">
            <img
              src={emprendedor.fotoPerfil || "/emprendedor-ana.png"}
              alt="Foto de perfil"
              className="logo-img"
            />
          </div>
          <button className="edit-button" onClick={handleCrearClickEmprendedor}>
            Editar perfil
          </button>
        </div>

        <div className="profile-body">
          <h2 className="profile-title">{emprendedor.nombre}</h2>
          <p className="description">
            {emprendedor.descripcion || "Sin descripción"}{" "}
            <span className="divider">|</span> XX.XXX seguidores
          </p>
          <p className="location">
            <FaMapMarkerAlt /> {emprendedor.direccion || "Sin dirección"}
          </p>
          <div className="social-icons">
            {emprendedor.instagram && (
              <a href={emprendedor.instagram} target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            )}
            {emprendedor.whatsApp && (
              <a
                href={`https://wa.me/${emprendedor.whatsApp}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            )}
            {emprendedor.facebook && (
              <a href={emprendedor.facebook} target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="profile-footer">
        <FaComments />
        <FaUserPlus />
        <FaShareAlt />
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
