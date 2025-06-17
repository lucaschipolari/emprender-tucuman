import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  crearPublicacion,
  editarPublicacion,
  uploadImagen,
} from "../../api/publicaciones";
import usePublicacionStore from "../../stores/usePublicationStore.js";
import { getCategorias } from "../../api/categorias.js";
import "./FormularioPublicacion.css";
const FormularioPublicacion = ({ onClose, handleActionCompleted }) => {
  const { publicacionSeleccionada, clearPublicacionSeleccionada } =
    usePublicacionStore();
  const [categorias, setCategorias] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: "",
      precio: "",
      descripcion: "",
      cantidadDisponible: "",
      estaEnOferta: false,
      precioOferta: "",
    },
  });
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategorias(res);
      } catch (err) {
        console.error("Error al obtener categorías", err);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    // Solo ejecuta reset cuando las categorías ya están cargadas
    if (publicacionSeleccionada && categorias.length > 0) {
      reset({
        titulo: publicacionSeleccionada.titulo,
        precio: publicacionSeleccionada.precio,
        descripcion: publicacionSeleccionada.descripcion,
        cantidadDisponible: publicacionSeleccionada.cantidadDisponible,
        estaEnOferta: Boolean(publicacionSeleccionada.estaEnOferta),
        precioOferta: publicacionSeleccionada.precioOferta || "",
        urlImagenPrincipal: publicacionSeleccionada.urlImagenPrincipal,
        categoriaId: publicacionSeleccionada.categoriaId.toString(),
      });
    } else if (!publicacionSeleccionada) {
      reset();
    }
  }, [publicacionSeleccionada, categorias, reset]);

  const onSubmit = async (data) => {
    try {
      if (publicacionSeleccionada) {
        let urlFinal = publicacionSeleccionada.urlImagenPrincipal;

        const nuevaImagen = data.nuevaImagen;
        if (nuevaImagen && nuevaImagen.length > 0) {
          const uploadRes = await uploadImagen(nuevaImagen[0]);
          urlFinal = uploadRes.url;
          console.log("Respuesta de uploadImagen:", uploadRes);
        }

        const actualizada = {
          titulo: data.titulo,
          precio: parseFloat(data.precio),
          descripcion: data.descripcion,
          cantidadDisponible: parseInt(data.cantidadDisponible),
          estaEnOferta: data.estaEnOferta || false,
          categoriaId: parseInt(data.categoriaId),
          precioOferta: data.estaEnOferta
            ? parseFloat(data.precioOferta)
            : null,
          imagenUrl: urlFinal, // <- asegurate que el backend lo reciba como "imagenUrl"
        };

        await editarPublicacion(publicacionSeleccionada.id, actualizada);
        alert("Publicación editada exitosamente");
      } else {
        const uploadRes = await uploadImagen(data.imagen[0]);

        const nuevaPublicacion = {
          titulo: data.titulo,
          descripcion: data.descripcion,
          precio: parseFloat(data.precio),
          estaEnOferta: data.estaEnOferta,
          precioOferta: data.precioOferta
            ? parseFloat(data.precioOferta)
            : null,
          cantidadDisponible: parseInt(data.cantidadDisponible),
          categoriaId: parseInt(data.categoriaId),
          imagenUrl: uploadRes.url,
        };

        await crearPublicacion(nuevaPublicacion);
        alert("Publicación creada exitosamente.");
      }

      reset();
      clearPublicacionSeleccionada();
      handleActionCompleted();
      onClose();
    } catch (error) {
      console.error("Error al enviar publicación:", error);
      alert("Error al procesar la publicación.");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">
                {publicacionSeleccionada
                  ? "Editar publicación"
                  : "Crear nueva publicación"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Título:</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("titulo", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Categoría:</label>
                    <select
                      className={`form-select ${
                        errors.categoriaId ? "is-invalid" : ""
                      }`}
                      {...register("categoriaId", {
                        required: "La categoría es obligatoria",
                      })}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.categoriaId && (
                      <div className="invalid-feedback">
                        {errors.categoriaId.message}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Descripción:</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      {...register("descripcion", { required: true })}
                    />
                  </div>

                  <div className="col-6 col-md-6">
                    <label className="form-label">Cantidad disponible:</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("cantidadDisponible", {
                        required: true,
                        min: 0,
                      })}
                    />
                  </div>

                  <div className="col-6 col-md-6">
                    <label className="form-label">Precio:</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      {...register("precio", { required: true })}
                    />
                  </div>

                  <div className="col-12 col-md-6 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      {...register("estaEnOferta")}
                      id="ofertaCheck"
                    />
                    <label className="form-check-label" htmlFor="ofertaCheck">
                      ¿Está en oferta?
                    </label>
                  </div>

                  {watch("estaEnOferta") && (
                    <div className="col-12 col-md-6">
                      <label className="form-label">Precio de oferta:</label>
                      <input
                        type="number"
                        step="0.01"
                        className={`form-control ${
                          errors.precioOferta ? "is-invalid" : ""
                        }`}
                        {...register("precioOferta", {
                          required: "El precio de oferta es obligatorio",
                          validate: (value) => {
                            const precio = parseFloat(watch("precio"));
                            const oferta = parseFloat(value);
                            if (isNaN(oferta))
                              return "Debe ser un número válido";
                            if (oferta >= precio)
                              return "El precio de oferta debe ser menor al precio normal";
                            return true;
                          },
                        })}
                      />
                      {errors.precioOferta && (
                        <div className="invalid-feedback">
                          {errors.precioOferta.message}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="col-12">
                    <label className="form-label">Imagen:</label>
                    {publicacionSeleccionada ? (
                      <>
                        <div className="mb-2 text-center">
                          <img
                            src={publicacionSeleccionada.urlImagenPrincipal}
                            alt="Imagen actual"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "100px", objectFit: "cover" }}
                          />
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          {...register("nuevaImagen")}
                          name="nuevaImagen"
                        />
                      </>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        {...register("nuevaImagen")}
                        name="nuevaImagen"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {publicacionSeleccionada ? "Guardar cambios" : "Publicar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPublicacion;
