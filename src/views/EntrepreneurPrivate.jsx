import React, { useEffect, useState } from "react";
import EntrepreneurProfile from "../components/EntrepreneurProfile/EntrepreneurProfile";
import Options from "../components/EntrepreneurProfile/Options";
import PublicationCard from "../components/EntrepreneurProfile/PublicationCard";
import FormularioPublicacion from "../components/EntrepreneurProfile/FormularioPublicacion";
import usePublicacionStore from "../stores/usePublicationStore.js";
import PublicationCardSkeleton from "../components/EntrepreneurProfile/PublicationCardSkeleton.jsx";
import { obtenerMisPublicaciones } from "../api/publicaciones.js";
import { obtenerEmprendedor } from "../api/emprendedores.js";
import EntepreneurForm from "../components/EntrepreneurProfile/EntepreneurForm.jsx";
const EntrepreneurPrivate = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mostrarFormularioPublicacion, setMostrarFormularioPublicacion] =
    useState(false);
  const [mostrarFormularioEmprendedor, setMostrarFormularioEmprendedor] =
    useState(false);
  const [emprendedor, setEmprendedor] = useState(false);
  const { clearPublicacionSeleccionada } = usePublicacionStore();
  const [isLoading, setIsLoading] = useState(true);

  const handleCrearClickEmprendedor = () => {
    setMostrarFormularioEmprendedor(true);
  };
  const handleCrearClickPublicacion = () => {
    clearPublicacionSeleccionada();
    setMostrarFormularioPublicacion(true);
  };

  // EXTRAÍDO para reutilizarlo
  const fetchEmprendedor = async () => {
    try {
      const data = await obtenerEmprendedor();
      setEmprendedor(data);
    } catch (error) {
      console.error("Error al obtener emprendedor:", error);
    }
  };

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await obtenerMisPublicaciones();
        setPublicaciones(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setIsLoading(false);
      }
    };

    fetchPublicaciones();
    fetchEmprendedor();
  }, []);

  const refreshPublicaciones = async () => {
    setIsLoading(true);
    try {
      const data = await obtenerMisPublicaciones();
      setTimeout(() => {
        setPublicaciones(data);
        setIsLoading(false);
      }, 20);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
      setIsLoading(false);
    }
  };

  // 🔁 ACTUALIZA EMPRENDEDOR Y CIERRA FORMULARIO
  const handleActionPerfilEmprendedor = async () => {
    await fetchEmprendedor();
    setMostrarFormularioEmprendedor(false);
  };

  const handleActionCompleted = () => {
    refreshPublicaciones();
  };

  return (
    <div>
      <EntrepreneurProfile
        emprendedor={emprendedor}
        handleCrearClickEmprendedor={handleCrearClickEmprendedor}
      />
      <Options onCrearClick={handleCrearClickPublicacion} />

      {mostrarFormularioPublicacion && (
        <FormularioPublicacion
          onClose={() => setMostrarFormularioPublicacion(false)}
          handleActionCompleted={handleActionCompleted}
        />
      )}

      {mostrarFormularioEmprendedor && (
        <EntepreneurForm
          emprendedor={emprendedor}
          onClose={() => setMostrarFormularioEmprendedor(false)}
          handleActionCompleted={handleActionPerfilEmprendedor}
        />
      )}

      <div className="row m-1">
        <div className="container mt-4">
          <h2 className="mb-3">Lista de Publicaciones</h2>
          {isLoading ? (
            <div className="row g-3">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <PublicationCardSkeleton key={i} />
                ))}
            </div>
          ) : publicaciones.length > 0 ? (
            <div className="row g-3">
              {publicaciones.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  id={pub.id}
                  urlImagenPrincipal={pub.urlImagenPrincipal}
                  titulo={pub.titulo}
                  descripcion={pub.descripcion}
                  precio={pub.precio}
                  precioOferta={pub.precioOferta}
                  estaEnOferta={pub.estaEnOferta}
                  cantidadDisponible={pub.cantidadDisponible}
                  activa={pub.activa}
                  fechaPublicacion={pub.fechaPublicacion}
                  onActionCompleted={handleActionCompleted}
                  setMostrarFormularioPublicacion={
                    setMostrarFormularioPublicacion
                  }
                  categoriaId={pub.categoriaId}
                  calificacionPromedio={pub.calificacionPromedio}
                />
              ))}
            </div>
          ) : (
            <p>No hay publicaciones disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurPrivate;
