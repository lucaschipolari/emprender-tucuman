import CardProductos from "./CardProductos"; 

const CarouselOfertas = () => {
  return (
    <div id="carouselTiendaOnline" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-md-6 g-3">
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row row-cols-1 row-cols-sm-4 g-3">
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
                    <div className="col">
                        <CardProductos/>
                    </div>
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