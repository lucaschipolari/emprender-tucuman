import React from "react";
import "./PublicationCard.css";
const PublicationCard = () => {
  return (
    <div className="contenedor-publicacion col-12 col-md-4 col-lg-3">
      <div>
        <img src="../public/producto.png" className="producto" alt="" />
        <div>Nombre de publicacion</div>
      </div>
    </div>
  );
};

export default PublicationCard;
