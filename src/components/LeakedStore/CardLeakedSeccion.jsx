// components/LeakedStore/CardLeakedSeccion.jsx
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getCategorias } from "../../api/categorias";
import "./CardLeakedSeccion.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardLeakedSeccion = ({ productos = [], loading }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);
  const nombreCategoria = (idCategoria) => {
    return (
      categorias.find((c) => String(c.id) === String(idCategoria))?.nombre ||
      "Sin categoría"
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="card shadow-sm h-100 border rounded-3">
                    <Skeleton height={200} className="card-img-top" />

                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <Skeleton
                          circle
                          width={40}
                          height={40}
                          className="me-2"
                        />
                        <div>
                          <Skeleton width={100} height={15} />
                          <Skeleton width={80} height={10} />
                        </div>
                      </div>

                      <Skeleton height={20} width={`80%`} className="mb-2" />
                      <Skeleton count={2} height={10} />

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <Skeleton width={60} height={20} />
                        <Skeleton width={40} height={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          : productos.map((producto, i) => (
              <div
                key={producto.id || i}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card shadow-sm h-100 border rounded-3">
                  <img
                    src={producto.urlImagenPrincipal}
                    className="card-img-top card-img-fixed"
                    alt={`Producto ${i + 1}`}
                  />

                  <div className="card-body d-flex flex-column  justify-content-between ">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={
                          producto.emprendedor?.fotoPerfil ||
                          "/emprendedor-miguel.png"
                        }
                        alt="imagen"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div>
                        <h6 className="mb-0">{producto.emprendedor?.nombre}</h6>
                        <span className="badge bg-primary badge-categoria">
                          {nombreCategoria(producto.categoriaId)}
                        </span>
                      </div>
                    </div>

                    <h5 className="card-title">{producto.nombre}</h5>

                    <p className="card-text text-muted small">
                      {producto.descripcion}
                    </p>

                    <div className="d-flex flex-wrap justify-content-between align-items-end mt-3 gap-1">
                      <div className="d-flex flex-column-reverse">
                        <span className="text-success fw-bold">
                          ${producto.precioOferta || producto.precio}
                        </span>
                        {producto.precioOferta && (
                          <small className="precio-viejo text-decoration-line-through">
                            ${producto.precio}
                          </small>
                        )}
                      </div>

                      <div className="text-warning d-flex align-items-center flex-nowrap align-bottom">
                        <span className="me-1 fw-semibold">
                          {producto.calificacionPromedio}
                        </span>
                        <div className="d-flex align-items-center gap-1">
                          <FaStar className="text-warning" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CardLeakedSeccion;
