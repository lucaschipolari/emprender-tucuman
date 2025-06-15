import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { obtenerRolesDisponibles } from "../../api/usuarios";

const UserTable = ({
  usuarios,
  setUsuarios,
  onChangeRol,
  onEliminarUsuario,
  onDesactivarUsuario,
}) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const response = await obtenerRolesDisponibles();
        setRoles(response);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };

    cargarRoles();
  }, []);

  // ✅ Función mejorada para cambiar rol que actualiza el estado local
  const handleChangeRol = async (usuarioId, { rolId }) => {
    try {
      // Llamada al backend usando la función original
      await onChangeRol(usuarioId, { rolId });

      // ✅ Actualizar el estado local inmediatamente después del éxito
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === usuarioId ? { ...usuario, rolId: rolId } : usuario
        )
      );

      console.log("Rol actualizado exitosamente en la interfaz");
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      throw error; // Re-lanzar para que UserRow pueda manejarlo
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol / Permisos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <UserRow
            key={usuario.id}
            usuario={usuario}
            onChangeRol={handleChangeRol} // ✅ Usar la función mejorada
            roles={roles}
            onDesactivarUsuario={onDesactivarUsuario}
            onEliminarUsuario={onEliminarUsuario}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
