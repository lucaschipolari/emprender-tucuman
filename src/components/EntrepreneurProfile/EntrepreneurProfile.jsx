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

const EntrepreneurProfile = () => {
  return (
    <div className="profile-card">
      <div className="area-perfil">
        <div className="banner">
          <img
            src="/logoEmprenderTucuman.jpeg"
            alt="Banner"
            className="banner-img"
          />
          <div className="logo-container">
            <img src="/emprendedor-ana.png" alt="Logo" className="logo-img" />
          </div>
          <button className="edit-button">Editar perfil</button>
        </div>

        <div className="profile-body">
          <h2 className="profile-title">MI emprendimiento</h2>
          <p className="description">
            Productos orgánicos <span className="divider">|</span> XX.XXX
            seguidores
          </p>
          <p className="location">
            <FaMapMarkerAlt /> Rivadavia 1000, San Miguel de Tucumán, Tucumán,
            Argentina
          </p>
          <div className="social-icons">
            <FaInstagram />
            <FaWhatsapp />
            <FaFacebookF />
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
