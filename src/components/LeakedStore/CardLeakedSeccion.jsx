import React from "react";
import { FaStar } from "react-icons/fa";

const CardLeakedSeccion = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100 border rounded-3">
              {/* Imagen del producto */}
              <img
                src="../public/producto.png"
                className="card-img-top"
                alt={`Producto ${i + 1}`}
              />

              <div className="card-body">
                {/* Emprendedor y categoría */}
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="../public/emprendedor-miguel.png"
                    alt="Emprendedor"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h6 className="mb-0">Emprendedor {i + 1}</h6>
                    <span className="badge bg-primary">Categoría</span>
                  </div>
                </div>

                {/* Título del producto */}
                <h5 className="card-title">Producto Destacado {i + 1}</h5>

                {/* Descripción (puedes modificarla como desees) */}
                <p className="card-text text-muted small">
                  Una breve descripción del producto {i + 1}.
                </p>

                {/* Precio y calificación */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-1">
                  <div>
                    <span className="text-success fw-bold">$99.00</span>
                    <span className="text-muted text-decoration-line-through ms-2">
                      $120.00
                    </span>
                  </div>
                  <div className="text-warning d-flex align-items-center flex-nowrap">
                    <span className="me-1 fw-semibold">4.8</span>
                    {[...Array(5)].map((_, starIdx) => (
                      <FaStar key={starIdx} size={14} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLeakedSeccion;
