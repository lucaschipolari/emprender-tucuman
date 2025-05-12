import React from "react";

const EntrepreneurCard = ({
  businessName = "Gomitas Bakery",
  ownerName = "De Sofia Perez",
  quote = "Mi emprendimiento nació como una idea que hablé con mis papás en la pieza de mi cuarto cuando me sentía muy mal",
  imgLink = "../public/emprendedor-ana.png",
}) => {
  return (
    <div
      className="card"
      style={{ maxWidth: "18rem", backgroundColor: "#d1e7dd" }}
    >
      <div className="card-body text-center">
        <img src={imgLink} className="img-fluid" alt="" />
        <h2 className="card-title fw-bold">{businessName}</h2>
        <h3 className="card-subtitle mb-3">{ownerName}</h3>

        <p className="card-text fst-italic">"{quote}"</p>
        <button className="btn btn-success"> Conocer más</button>
      </div>
    </div>
  );
};

export default EntrepreneurCard;
