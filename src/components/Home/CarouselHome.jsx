import React from "react";
import "./CarouselHome.css";
const CarouselHome = () => {
  return (
    <div className="contenedor-carousel">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade custom-carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-image-wrapper d-flex align-items-center flex-column">
              <img
                src="../public/tucumanCerro.png"
                className="carousel-background"
                alt="imagen de cerro"
              />
              <div class="carousel-caption-custom">
                <div>
                  <h2 className="titulo">EMPRENDER </h2>
                  <h2 className="titulo">TUCUMÁN</h2>
                </div>
                <div>
                  <h3 className="subtitulo">Cerca.Local.Real</h3>
                </div>
                <button></button>
              </div>

              <div className="carousel-overlay" />
              <div className="carousel-bottom-fade" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselHome;
