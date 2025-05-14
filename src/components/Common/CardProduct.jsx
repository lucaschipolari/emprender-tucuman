import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="card shadow-sm h-100 border rounded-3">
      <img
        src="../public/producto.png"
        className="card-img-top"
        alt="Producto"
      />

      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img
            src="../public/emprendedor-miguel.png"
            alt="Emprendedor"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div>
            <h6 className="mb-0">Emprendedor</h6>
            <span className="badge bg-primary">Categoría</span>
          </div>
        </div>

        <h5 className="card-title">Nombre del Producto</h5>

        <p className="card-text text-muted small">
          Breve descripción del producto.
        </p>

        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-1">
          <div>
            <span className="text-success fw-bold">$99.00</span>
            <span className="text-muted text-decoration-line-through ms-2">
              $120.00
            </span>
          </div>
          <div className="text-warning d-flex align-items-center flex-nowrap">
            <span className="me-1 fw-semibold">4.8</span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
