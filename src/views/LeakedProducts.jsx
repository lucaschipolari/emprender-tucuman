import React, { useState, useEffect } from "react";
import FilterSelector from "../components/LeakedStore/FilterSelector";
import CardLeakedSeccion from "../components/LeakedStore/CardLeakedSeccion";
import FilterModal from "../components/LeakedStore/FilterModal";
import "../styles/LeakedProducts.css";
import { getPublicaciones } from "../api/publicaciones.js";

const LeakedProducts = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFiltros = () => setMostrarFiltros(true);
  const cerrarModal = () => setMostrarFiltros(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getPublicaciones();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

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
        <CardLeakedSeccion productos={productos} loading={loading} />
      </div>
    </div>
  );
};

export default LeakedProducts;
