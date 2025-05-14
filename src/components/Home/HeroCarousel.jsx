import React from "react";
import "./HeroCarousel.css";

const HeroCarousel = () => {
  return (
    <div
      id="heroCarousel"
      className="carousel slide contenedor-carousel"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner h-100">
        <div className="carousel-item active h-100">
          <div className="d-flex flex-column align-items-start p-5 bg-green-custom min-vh-70">
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
        <div className="carousel-item">
          <div className="d-flex flex-column align-items-start p-5 bg-green-custom min-vh-70">
            <h1 className="display-6 fw-bold">
              Apoya a los emprendedores locales
            </h1>
            <p className="text-muted">Productos únicos, hechos con amor.</p>
            <button className="btn btn-outline-success mt-2">
              Ver productos
            </button>
          </div>
        </div>
      </div>

      {/* Controles nativos */}
      <button
        className="carousel-control-prev custom-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next custom-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;
