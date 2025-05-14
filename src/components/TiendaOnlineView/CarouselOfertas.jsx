import ProductCard from "../Common/CardProduct";
import "./TiendaOnline.css";

const CarouselOfertas = () => {
  return (
    <div className="carousel-container">
      <div className="row g-0">
        <div className="col-auto d-flex align-items-center button-container">
          <button
            className="btn carousel-nav-btn"
            type="button"
            data-bs-target="#carouselTiendaOnline"
            data-bs-slide="prev"
          >
            <span className="carousel-arrow arrow-prev" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
        </div>
        <div className="col px-3 carousel-content">
          <div
            id="carouselTiendaOnline"
            className="carousel slide mt-2"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <ProductCard />
                  </div>
                  <div className="col-6 col-md-3">
                    <ProductCard />
                  </div>
                  <div className="d-none d-md-block col-md-3">
                    <ProductCard />
                  </div>
                  <div className="d-none d-md-block col-md-3">
                    <ProductCard />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <ProductCard />
                  </div>
                  <div className="col-6 col-md-3">
                    <ProductCard />
                  </div>
                  <div className="d-none d-md-block col-md-3">
                    <ProductCard />
                  </div>
                  <div className="d-none d-md-block col-md-3">
                    <ProductCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto d-flex align-items-center button-container">
          <button
            className="btn carousel-nav-btn"
            type="button"
            data-bs-target="#carouselTiendaOnline"
            data-bs-slide="next"
          >
            <span className="carousel-arrow arrow-next" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselOfertas;
