import './TiendaOnline.css';

const categorias = [
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Deportes', icono: '⚽' },
];

const Categorias = () => {
  return (
    <div className="categorias-wrapper p-4 bg-blanco">
      <div className="categoria-container p-4 rounded">
        <div className="row g-4">
          {categorias.map((cat, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="categoria-card d-flex align-items-center p-3 shadow-sm rounded">
                <div className="icono-categoria me-3 d-flex align-items-center justify-content-center shadow">
                  <span style={{ fontSize: '24px' }}>{cat.icono}</span>
                </div>
                <span className="fw-medium">{cat.nombre}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <div className="bg-verde-fuerte text-center mt-3 rounded-3 p-2"> 
            <a href="#" className="text-decoration-none text-blanco">
                Ver más
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Categorias;
