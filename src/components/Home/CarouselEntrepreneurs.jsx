import React from "react";
import EntrepreneurCard from "./EnterpreneurCard";

const CarouselEntrepreneurs = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center m-5">
        <h2>Nuestros emprendedores</h2>
      </div>
      <div className="container-fluid my-5">
        <div id="carouselExampleIndicators" className="carousel slide">
          {/* Indicadores */}
          <div className="carousel-indicators">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {[0, 1, 2].map((slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
              >
                <div className="row justify-content-center">
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                    <EntrepreneurCard />
                  </div>

                  <div className="col-md-4 d-none d-md-flex justify-content-center mb-4">
                    <EntrepreneurCard />
                  </div>

                  <div className="col-md-4 d-none d-md-flex justify-content-center mb-4">
                    <EntrepreneurCard />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev custom-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next custom-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselEntrepreneurs;
