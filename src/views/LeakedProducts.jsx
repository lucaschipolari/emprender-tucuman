import React, { useState } from "react";
import FilterSelector from "../components/LeakedStore/FilterSelector";
import CardLeakedSeccion from "../components/LeakedStore/CardLeakedSeccion";
import "../styles/LeakedProducts.css";
import FilterModal from "../components/LeakedStore/FilterModal";
const LeakedProducts = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const toggleFiltros = () => {
    setMostrarFiltros(true);
  };

  const cerrarModal = () => {
    setMostrarFiltros(false);
  };

  return (
    <div className="d-flex productos-filtrados">
      <button className="boton-filtros" onClick={toggleFiltros}>
        Filtros
      </button>
      <FilterModal isOpen={mostrarFiltros} onClose={cerrarModal} />
      <div className="area-filtros">
        <FilterSelector />
      </div>
      <div className="flex-grow-1 p-3 seccion-filtrada">
        <CardLeakedSeccion />
      </div>
    </div>
  );
};

export default LeakedProducts;
