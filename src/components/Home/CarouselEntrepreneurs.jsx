import React from "react";

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
                  {/* Primera card: siempre visible */}
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src="https://via.placeholder.com/286x180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card 1</h5>
                        <p className="card-text">Contenido de la card 1.</p>
                        <a href="#" className="btn btn-primary">
                          Go
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Segunda card: solo en pantallas medianas en adelante */}
                  <div className="col-md-4 d-none d-md-flex justify-content-center mb-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src="https://via.placeholder.com/286x180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card 2</h5>
                        <p className="card-text">Contenido de la card 2.</p>
                        <a href="#" className="btn btn-primary">
                          Go
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Tercera card: solo en pantallas medianas en adelante */}
                  <div className="col-md-4 d-none d-md-flex justify-content-center mb-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src="https://via.placeholder.com/286x180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card 3</h5>
                        <p className="card-text">Contenido de la card 3.</p>
                        <a href="#" className="btn btn-primary">
                          Go
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
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
