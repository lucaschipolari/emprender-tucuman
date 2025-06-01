import React from "react";
import "./PublicationCard.css";

const PublicationCard = () => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card mb-3 shadow-sm">
        <div className="row g-0">
          <div className="col-4 d-flex align-items-center justify-content-center p-2">
            <img
              src="/producto.png"
              className="img-fluid rounded-start"
              alt="Producto"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">Nombre del producto</h5>
              <p className="card-text mb-1">
                <strong>Precio:</strong> $12.000
              </p>
              <p className="card-text mb-1">
                <strong>Comentarios:</strong> 5
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">4.5 ★</span>
                <div>
                  <button className="btn btn-outline-secondary btn-sm me-2">
                    Pausar
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
