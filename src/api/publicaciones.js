// publicaciones.js
import api from "./axios";

export const getPublicaciones = async () => {
  const res = await api.get("/publicaciones");
  return res.data;
};

export const getPublicacionesPorUsuario = async (userId) => {
  const res = await api.get(`/usuarios/${userId}/publicaciones`);
  return res.data;
};

export const crearPublicacion = async (data) => {
  const res = await api.post("/publicaciones", data);
  return res.data;
};

export const eliminarPublicacion = async (id) => {
  const res = await api.delete(`/publicaciones/${id}`);
  return res.data;
};
