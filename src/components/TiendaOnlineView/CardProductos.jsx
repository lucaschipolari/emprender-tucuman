const CardProductos = () => {
  return (
    <div className="card rounded-3">
        <div className="img-contenedor">
          <img src="https://www.katiaribeiro.com.br/wp-content/uploads/2023/09/image-3657.png.webp" className="card-img-top img-size-card-producto" alt="Tejido a crochet amigurumi vaca" />
        </div>
        <div className="card-body">
            <h5 className="card-title text-size-mediano w-100 text-center text-sm-start">Vaquita amigurumi</h5>
            <div className="d-sm-flex justify-content-between align-items-center">
              <p className="card-text mb-2 fw-bold text-size-pequeño w-100 w-sm-auto text-center text-sm-start">
                $6.000
              </p>
              <div className="bg-verde-fuerte text-center rounded-3 px-2 py-1 w-100 w-sm-auto">
                <a href="#" className="text-decoration-none text-blanco text-size-pequeño d-block">
                  Más info
                </a>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CardProductos