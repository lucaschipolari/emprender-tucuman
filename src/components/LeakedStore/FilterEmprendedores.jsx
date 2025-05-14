import React from "react";

const FilterEmprendedores = () => {
  return (
    <div className="">
      <h5 className="mb-4">Filtrar Emprendedores</h5>

      <div className="mb-3">
        <label className="form-label">Buscar</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del emprendedor"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select className="form-select">
          <option value="">Todas</option>
          <option value="tecnologia">Tecnología</option>
          <option value="alimentos">Alimentos</option>
          <option value="moda">Moda</option>
          <option value="artesanias">Artesanías</option>
        </select>
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
        <label className="form-label">Ventas mínimas</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 50 ventas"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio de productos (mín - máx)</label>
        <div className="d-flex gap-2">
          <input type="number" className="form-control" placeholder="Mín." />
          <input type="number" className="form-control" placeholder="Máx." />
        </div>
      </div>

      <button className="btn-aplicar-filtros w-100">Aplicar filtros</button>
    </div>
  );
};

export default FilterEmprendedores;
