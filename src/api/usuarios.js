import api from "./axios";

export const obtenerUsuarios = async () => {
  try {
    const res = await api.get("/usuario/usuarios");
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const cambiarRolUsuario = async (id, accion) => {
  try {
    const res = await api.put(`/usuario/usuarios/${id}/rol`, accion);

    console.log("Respuesta de API:", res.data);

    return res.data;
  } catch (error) {
    console.error("Error al cambiar rol usuario:", error);
    throw error;
  }
};

export const obtenerRolesDisponibles = async () => {
  try {
    const res = await api.get("/usuario/roles");
    return res.data.data || res.data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    await api.delete(`/usuario/usuarios/${id}`);
    alert("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    alert("No se pudo eliminar el usuario");
  }
};

export const desactivarUsuario = async (id) => {
  try {
    await api.put(`/usuario/usuarios/${id}/desactivar`);
  } catch (err) {
    console.error(err);
  }
};
