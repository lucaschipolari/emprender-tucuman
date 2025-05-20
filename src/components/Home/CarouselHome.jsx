import React from "react";
import "./CarouselHome.css";
import { Link } from "react-router-dom";
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
                <div className="mt-5">Ir a:</div>
                <div className="d-flex justify-content-center align-items-center gap-3 btn-container ">
                  <Link to={"/emprendedores"} className="btn-emprendedores">
                    Emprendedores
                  </Link>
                  <Link to={"/tiendaonline"} className="btn-tienda">
                    Tienda
                  </Link>
                </div>
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
