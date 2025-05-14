import CardEmprendimiento from "./CardEmprendimiento"; 
import './TiendaOnline.css';

const CarouselEmprendimiento = () => {
  return (
    <div className="carousel-container">
      <div className="row g-0">
        {/* Flecha izquierda en columna separada */}
        <div className="col-1 d-flex align-items-center justify-content-center">
          <button
            className="btn carousel-nav-btn"
            type="button"
            data-bs-target="#carouselEmprendimientos"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
        </div>
        
        {/* Contenido del carousel en columna central */}
        <div className="col-10">
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
        
        {/* Flecha derecha en columna separada */}
        <div className="col-1 d-flex align-items-center justify-content-center">
          <button
            className="btn carousel-nav-btn"
            type="button"
            data-bs-target="#carouselEmprendimientos"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselEmprendimiento;