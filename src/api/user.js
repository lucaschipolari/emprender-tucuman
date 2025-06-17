import api from "./axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsersFn = async () => {
  try {
    const res = await api.get("/usuario/usuarios");
    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data.data?.message ||
      error.message ||
      "Ocurrió un error cargando la lista de usuarios";
    throw new Error(message);
  }
};

export const getRolesFn = async () => {
  const res = await api.get("/rol/roles");
  return res.data.data;
};

export const deleteUserFn = async (userId) => {
  try {
    await api.delete(`/usuario/usuarios/${userId}`);
  } catch (error) {
    const message =
      error.response?.data.data?.message ||
      error.message ||
      "Ocurrió un error intentando eliminar al usuario seleccionado";
    throw new Error(message);
  }
};

export const toggleUserFn = async (userId) => {
  try {
    await api.put(`/users/${userId}/toggle-admin`);
  } catch (error) {
    const message =
      error.response?.data.data?.message ||
      error.message ||
      "Ocurrió un error intentando cambiar el tipo de cuenta al usuario seleccionado";
    throw new Error(message);
  }
};
