// publicaciones.js
import api from "./axios";

export const getPublicaciones = async () => {
  const res = await api.get("/Publicacion/publicaciones");
  return res.data.data;
};
export const getPublicacionesEmprendedor = async () => {
  const res = await api.get("/Publicacion/publicaciones/emprendedor");
  return res.data.data;
};
export const getPublicacionesPorUsuario = async (userId) => {
  const res = await api.get(`/usuarios/${userId}/publicaciones`);
  return res.data;
};

export const crearPublicacion = async (data) => {
  const res = await api.post("/Publicacion/registrar", data);
  return res.data;
};

export const editarPublicacion = async (id, data) => {
  const res = await api.put(`/Publicacion/editar/${id}`, data);
  return res.data;
};

export const eliminarPublicacion = async (id) => {
  const res = await api.delete(`/publicaciones/${id}`);
  return res.data;
};

export const uploadImagen = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/Upload/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
export const obtenerMisPublicaciones = async () => {
  const res = await api.get(`/Publicacion/mis-publicaciones`);
  return res.data.data;
};

export const publicacionesPorEmprendedor = async (emprendimientoId) => {
  const res = await api.get(`/Publicacion/emprendedor/${emprendimientoId}`);
  return res.data.data;
};