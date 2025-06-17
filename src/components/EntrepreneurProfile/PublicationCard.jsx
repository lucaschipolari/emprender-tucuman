import React, { useEffect, useState } from "react";
import "./PublicationCard.css";
import moment from "moment";
import api from "../../api/axios";
import usePublicacionStore from "../../stores/usePublicationStore.js";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PublicationCard = ({
  id,
  titulo,
  precio,
  descripcion,
  precioOferta,
  estaEnOferta,
  cantidadDisponible,
  urlImagenPrincipal,
  activa,
  categoriaId,
  fechaPublicacion,
  onActionCompleted,
  setMostrarFormularioPublicacion,
  calificacionPromedio,
}) => {
  const { setPublicacionSeleccionada } = usePublicacionStore();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await api.get("/Categoria/categorias");
        setCategorias(response.data.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleEditar = () => {
    setPublicacionSeleccionada({
      id,
      categoriaId,
      titulo,
      descripcion,
      precio,
      cantidadDisponible,
      urlImagenPrincipal,
      estaEnOferta,
      precioOferta,
    });
    setMostrarFormularioPublicacion(true);
  };

  const handlePausar = async () => {
    try {
      await api.put(`/Publicacion/pausar/${id}`);
      alert("Publicación pausada exitosamente");
      onActionCompleted();
    } catch (error) {
      console.error("Error al pausar:", error);
      alert("Error al pausar publicación");
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Confirma que desea eliminar esta publicación?"))
      return;

    try {
      await api.put(`/Publicacion/eliminar/${id}`);
      alert("Publicación eliminada exitosamente");
      onActionCompleted();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar publicación");
    }
  };

  const nombreCategoria =
    categorias.find((c) => String(c.id) === String(categoriaId))?.nombre ||
    "Sin categoría";

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card shadow-sm border rounded-3 h-100">
        <div className="row g-0">
          {/* Imagen */}
          <div className="col-4 d-flex align-items-center justify-content-center p-3">
            <img
              src={urlImagenPrincipal}
              className="img-fluid rounded-2"
              alt={titulo}
              style={{ maxHeight: "120px", objectFit: "contain" }}
            />
          </div>

          {/* Contenido */}
          <div className="col-8">
            <div className="card-body p-3">
              <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                <h6
                  className="card-title fw-semibold mb-0 text-truncate me-2 flex-grow-1"
                  style={{ maxWidth: "calc(100% - 80px)" }}
                >
                  {titulo}
                </h6>
                <div className="d-flex align-items-center gap-1 flex-shrink-0">
                  <span className="fw-bold">{calificacionPromedio}</span>
                  <FaStar className="text-warning" />
                </div>
              </div>
              <p className="mb-2">
                {estaEnOferta ? (
                  <>
                    <span className="text-success fw-bold">
                      ${precioOferta}
                    </span>
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${precio}
                    </span>
                  </>
                ) : (
                  <span className="fw-bold">${precio}</span>
                )}
              </p>

              <p className="text-muted small mb-1">
                <strong>Categoría:</strong> {nombreCategoria}
              </p>
              <p className="text-muted small mb-1">
                <strong>Stock:</strong> {cantidadDisponible}
              </p>
              <p className="text-muted small mb-1">
                <strong>Estado:</strong>{" "}
                <span className={activa ? "text-success" : "text-danger"}>
                  {activa ? "Activo" : "Pausado"}
                </span>
              </p>
              <p className="text-muted small mb-2">
                Publicado: {moment(fechaPublicacion).format("DD/MM/YYYY")}
              </p>

              <div className="d-flex justify-content-end gap-1">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleEliminar}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handlePausar}
                >
                  Pausar
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleEditar}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
