import React, { useEffect, useState } from "react";
import "./PublicationCard.css";
import moment from "moment";
import api from "../../api/axios";
import usePublicacionStore from "../../stores/usePublicationStore.js"; // importa tu store

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
  setMostrarFormulario,
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
    setMostrarFormulario(true); // le llega como prop
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
  const nombreCategoria =
    categorias.find((c) => String(c.id) === String(categoriaId))?.nombre ||
    "Sin categoría";

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

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card mb-3 shadow-sm">
        <div className="row g-0">
          <div className="col-4 d-flex align-items-center justify-content-center p-2">
            <img
              src={urlImagenPrincipal}
              className="img-fluid rounded-start"
              alt={titulo}
              style={{
                maxHeight: "150px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="col-8">
            <div className="card-body p-2">
              <h5 className="card-title mb-1">{titulo}</h5>

              <p className="card-text mb-1">
                {estaEnOferta ? (
                  <>
                    <span className="text-danger fw-bold me-2">
                      ${precioOferta}
                    </span>
                    <span className="text-muted text-decoration-line-through">
                      ${precio}
                    </span>
                  </>
                ) : (
                  <span className="fw-bold">${precio}</span>
                )}
              </p>
              <p className="card-text mb-1">
                <strong>Categoría:</strong> {nombreCategoria}
              </p>

              <p className="card-text mb-1">
                <strong>Stock:</strong> {cantidadDisponible}
              </p>

              <p className="card-text mb-1">
                <strong>Estado:</strong>{" "}
                <span className={activa ? "text-success" : "text-danger"}>
                  {activa ? "Activo" : "Pausado"}
                </span>
              </p>

              <p className="card-text mb-1">
                <small className="text-muted">
                  {moment(fechaPublicacion).format("DD/MM/YYYY")}
                </small>
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
