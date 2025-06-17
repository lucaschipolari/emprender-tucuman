import api from "./axios";

export const obtenerEmprendedor = async () => {
  const res = await api.get(`/Emprendimiento/emprendedor`);
  return res.data.data;
};
export const editarEmprendedor = async (data) => {
  const res = await api.put("/Emprendimiento/editar", data);
  return res.data;
};
