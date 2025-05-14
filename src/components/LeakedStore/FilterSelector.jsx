import React, { useState } from "react";
import Filter from "./FilterProducts"; // Componente de filtro para productos
import FilterEmprendedores from "./FilterEmprendedores"; // Componente de filtro para emprendedores
import "./FilterSelector.css";
const FilterSelector = () => {
  const [selectedFilter, setSelectedFilter] = useState("productos"); // Estado para determinar qué filtro mostrar

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="filter-selector">
      <div className="d-flex gap-3 mb-4">
        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            id="productos"
            name="filterType"
            value="productos"
            checked={selectedFilter === "productos"}
            onChange={handleFilterChange}
          />
          <label htmlFor="productos" className="form-check-label ms-2 mb-0">
            Productos
          </label>
        </div>

        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            id="emprendedores"
            name="filterType"
            value="emprendedores"
            checked={selectedFilter === "emprendedores"}
            onChange={handleFilterChange}
          />
          <label htmlFor="emprendedores" className="form-check-label ms-2 mb-0">
            Emprendedores
          </label>
        </div>
      </div>

      {selectedFilter === "productos" && <Filter />}
      {selectedFilter === "emprendedores" && <FilterEmprendedores />}
    </div>
  );
};

export default FilterSelector;
