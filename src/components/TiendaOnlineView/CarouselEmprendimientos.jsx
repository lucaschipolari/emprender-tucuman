import CardEmprendimiento from "./CardEmprendimiento";
import './TiendaOnline.css';

const CarouselEmprendimiento = () => {
  return (
    <div className="carousel-container">
      <div className="row g-0">
        <div className="col-auto d-flex align-items-center button-container">
          <button
            className="btn carousel-nav-btn"
            type="button"
            data-bs-target="#carouselEmprendimientos"
            data-bs-slide="prev"
            aria-label="Anterior"
          >
            <div className="carousel-arrow arrow-prev"></div>
          </button>
        </div>
        
        <div className="col px-3 carousel-content">
          <div id="carouselEmprendimientos" className="carousel slide mt-4" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row g-3">
                  <div className="col-6 col-sm-4 col-md-4">
                    <CardEmprendimiento/>
                  </div>
                  <div className="col-6 col-sm-4 col-md-4">
                    <CardEmprendimiento/>
                  </div>
                  <div className="d-none d-sm-block col-4">
                    <CardEmprendimiento/>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row g-3">
                  <div className="col-6 col-sm-4 col-md-4">
                    <CardEmprendimiento/>
                  </div>
                  <div className="col-6 col-sm-4 col-md-4">
                    <CardEmprendimiento/>
                  </div>
                  <div className="d-none d-sm-block col-4">
                    <CardEmprendimiento/>
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
            data-bs-target="#carouselEmprendimientos"
            data-bs-slide="next"
            aria-label="Siguiente"
          >
            <div className="carousel-arrow arrow-next"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselEmprendimiento;