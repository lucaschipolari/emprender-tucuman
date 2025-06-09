import api from "./axios";

export const getCategorias = async () => {
  let res = await api.get("/Categoria/categorias");
  return res.data.data;
};
