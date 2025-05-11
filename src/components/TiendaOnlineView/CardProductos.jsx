const CardProductos = () => {
  return (
    <div className="card rounded-5">
        <div className="img-contenedor">
          <img src="https://www.katiaribeiro.com.br/wp-content/uploads/2023/09/image-3657.png.webp" className="card-img-top img-size-card-producto" alt="Tejido a crochet amigurumi vaca" />
        </div>
        <div className="card-body">
            <h5 className="card-title">Vaquita amigurumi</h5>
            <div className="row">
              <p className="card-text col-6">
                  $6.000
              </p>
              <div className="col-6">
                <div className="bg-verde-fuerte text-center rounded-3">
                  <a href="#" className="text-decoration-none text-blanco text-size-pequeño">
                      Más info
                  </a>
                </div>
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default CardProductos