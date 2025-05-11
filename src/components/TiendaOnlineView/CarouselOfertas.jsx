import React from 'react'

const CarouselOfertas = () => {
  return (
    <div id="carouselTiendaOnline" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner mx-5">
            <div className="carousel-item active">
            <div className="row row-cols-1 row-cols-md-4 g-3">
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Título de la tarjeta</h5>
                        <p className="card-text">
                            Un texto de ejemplo rápido para colocar cerca del título de la tarjeta y
                            componer la mayor parte del contenido de la tarjeta.
                        </p>
                        <a href="#" className="btn btn-primary">
                            Ir a algún lugar
                        </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">Título de la tarjeta</h5>
                        <p className="card-text">
                            Otro texto de ejemplo...
                        </p>
                        <a href="#" className="btn btn-primary">
                            Ir a algún lugar
                        </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Título de la tarjeta</h5>
                    <p className="card-text">
                        Otro texto de ejemplo...
                    </p>
                    <a href="#" className="btn btn-primary">
                        Ir a algún lugar
                    </a>
                    </div>
                </div>
                </div>
                <div className="col">
                </div>
            </div>
            </div>

            <div className="carousel-item">
            <div className="row row-cols-1 row-cols-md-4 g-3">
            </div>
            </div>
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselTiendaOnline"
            data-bs-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselTiendaOnline"
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
        </button>
    </div>
  )
}

export default CarouselOfertas