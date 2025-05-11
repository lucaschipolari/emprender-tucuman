import React from "react";
import "./HeroCarousel.css";
const HeroCarousel = () => {
  return (
    <div
      className="carousel slide bg-green-custom  p-4 rounded"
      id="heroCarousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-flex flex-column align-items-start">
            <h1 className="display-6 fw-bold">
              Todos los emprendimientos en un mismo lugar
            </h1>
            <p className="text-muted">
              Descubre lo que Tucumán tiene para ofrecerte.
            </p>
            <button className="btn btn-outline-success mt-2">
              Ir a tienda
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <div className="d-flex gap-1">
          <span
            className="dot bg-dark rounded-circle"
            style={{ width: "10px", height: "10px" }}
          ></span>
          <span
            className="dot bg-secondary rounded-circle"
            style={{ width: "10px", height: "10px" }}
          ></span>
          <span
            className="dot bg-secondary rounded-circle"
            style={{ width: "10px", height: "10px" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
