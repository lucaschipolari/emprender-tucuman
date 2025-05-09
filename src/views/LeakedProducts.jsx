import React, { useState } from "react";
import FilterSelector from "../components/LeakedStore/FilterSelector";
import CardLeakedSeccion from "../components/LeakedStore/CardLeakedSeccion";
import "../styles/LeakedProducts.css";
const LeakedProducts = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };
  return (
    <div className="d-flex productos-filtrados">
      {" "}
      <button className="boton-filtros" onClick={toggleFiltros}>
        Filtros
      </button>
      <div className="area-filtros">
        <FilterSelector />
      </div>
      <div className="flex-grow-1 p-3">
        <CardLeakedSeccion />
      </div>
    </div>
  );
};

export default LeakedProducts;
