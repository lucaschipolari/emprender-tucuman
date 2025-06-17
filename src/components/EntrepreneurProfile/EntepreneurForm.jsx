import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./EntepreneurForm.css";
import { uploadImagen } from "../../api/publicaciones";
import { editarEmprendedor } from "../../api/emprendedores.js";
import { getCategorias } from "../../api/categorias.js";

const EntepreneurForm = ({ emprendedor, onClose, handleActionCompleted }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      direccion: "",
      instagram: "",
      whatsApp: "",
      facebook: "",
      categoriaId: "",
    },
  });

  const [categorias, setCategorias] = useState([]);

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
    if (emprendedor && categorias.length > 0) {
      reset({
        nombre: emprendedor.nombre || "",
        descripcion: emprendedor.descripcion || "",
        direccion: emprendedor.direccion || "",
        instagram: emprendedor.instagram || "",
        whatsApp: emprendedor.whatsApp || "",
        facebook: emprendedor.facebook || "",
        categoriaId: emprendedor.categoriaId
          ? emprendedor.categoriaId.toString()
          : "",
      });
    }
  }, [emprendedor, categorias, reset]);

  const onSubmit = async (data) => {
    try {
      let portadaUrl = emprendedor.portada;
      let fotoPerfilUrl = emprendedor.fotoPerfil;

      if (data.nuevaPortada?.[0]) {
        const res = await uploadImagen(data.nuevaPortada[0]);
        portadaUrl = res.url;
      }

      if (data.nuevaFotoPerfil?.[0]) {
        const res = await uploadImagen(data.nuevaFotoPerfil[0]);
        fotoPerfilUrl = res.url;
      }

      const actualizado = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        direccion: data.direccion,
        instagram: data.instagram,
        whatsApp: data.whatsApp,
        facebook: data.facebook,
        categoriaId: parseInt(data.categoriaId),
        historia: emprendedor.historia || "",
        fotoPerfil: fotoPerfilUrl,
        fotoPortada: portadaUrl,
      };

      await editarEmprendedor(actualizado);
      alert("Perfil actualizado correctamente.");
      handleActionCompleted();
      onClose();
    } catch (error) {
      console.error("Error al actualizar emprendedor:", error);
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <div
      className="modal fade show d-block bg-dark bg-opacity-50"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">Editar perfil del emprendedor</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="form-grid">
              {/* Campo Nombre */}
              <div>
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre", { required: true })}
                />
              </div>

              {/* Campo Dirección */}
              <div>
                <label className="form-label">Dirección:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("direccion")}
                />
              </div>

              {/* Campo Descripción */}
              <div className="form-grid-full">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  {...register("descripcion")}
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="form-label">Instagram:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("instagram")}
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="form-label">WhatsApp:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("whatsApp")}
                />
              </div>

              {/* Facebook */}
              <div>
                <label className="form-label">Facebook:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("facebook")}
                />
              </div>

              {/* Categoría */}
              <div>
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
                    <option key={cat.id} value={cat.id.toString()}>
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

              {/* Historia */}
              <div className="form-grid-full">
                <label className="form-label">Historia:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  {...register("historia")}
                />
              </div>

              {/* Imagen de portada */}
              <div className="form-grid-full">
                <label className="form-label">Imagen de portada:</label>
                {emprendedor.portada && (
                  <div className="mb-2 text-center">
                    <img
                      src={emprendedor.portada}
                      alt="Portada actual"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  className="form-control"
                  {...register("nuevaPortada")}
                  accept="image/*"
                />
              </div>

              {/* Foto de perfil */}
              <div className="form-grid-full">
                <label className="form-label">Foto de perfil:</label>
                {emprendedor.fotoPerfil && (
                  <div className="mb-2 text-center">
                    <img
                      src={emprendedor.fotoPerfil}
                      alt="Perfil actual"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  className="form-control"
                  {...register("nuevaFotoPerfil")}
                  accept="image/*"
                />
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
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntepreneurForm;
