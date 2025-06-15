import React, { useEffect, useState } from "react";
import EntrepreneurProfile from "../components/EntrepreneurProfile/EntrepreneurProfile";
import Options from "../components/EntrepreneurProfile/Options";
import PublicationCard from "../components/EntrepreneurProfile/PublicationCard";
import FormularioPublicacion from "../components/EntrepreneurProfile/FormularioPublicacion";
import { getPublicaciones } from "../api/publicaciones.js";
import usePublicacionStore from "../stores/usePublicationStore.js";

const EntrepreneurPrivate = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { clearPublicacionSeleccionada } = usePublicacionStore();

  const handleCrearClick = () => {
    clearPublicacionSeleccionada();
    setMostrarFormulario(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPublicaciones();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };

    fetchData();
  }, []);
  const refreshPublicaciones = async () => {
    try {
      const data = await getPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    }
  };

  const handleActionCompleted = () => {
    refreshPublicaciones();
  };

  return (
    <div>
      <EntrepreneurProfile />
      <Options onCrearClick={handleCrearClick} />
      {mostrarFormulario && (
        <FormularioPublicacion
          onClose={() => setMostrarFormulario(false)}
          handleActionCompleted={handleActionCompleted}
        />
      )}

      <div className="row m-1">
        <div className="container mt-4">
          <h2 className="mb-3">Lista de Publicaciones</h2>
          {publicaciones.length > 0 ? (
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
                  setMostrarFormulario={setMostrarFormulario}
                  categoriaId={pub.categoriaId}
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
