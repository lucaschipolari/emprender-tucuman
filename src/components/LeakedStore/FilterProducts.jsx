import React from "react";
import "./FilterProducts.css";

const FilterProducts = () => {
  return (
    <div className="">
      <h5 className="mb-4">Filtrar Productos</h5>

      <div className="mb-3">
        <label className="form-label">Buscar</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del producto"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio (mín - máx)</label>
        <div className="d-flex gap-2">
          <input type="number" className="form-control" placeholder="Mín." />
          <input type="number" className="form-control" placeholder="Máx." />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Calificación mínima</label>
        <select className="form-select">
          <option value="">Todas</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} estrellas o más
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Mínimo de comentarios</label>
        <input type="number" className="form-control" placeholder="Ej: 10" />
      </div>

      <button className="btn-aplicar-filtros w-100">Aplicar filtros</button>
    </div>
  );
};

export default FilterProducts;
