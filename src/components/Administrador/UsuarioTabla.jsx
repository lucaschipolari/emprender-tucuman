import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersFn, getRolesFn, deleteUserFn } from "../../api/user.js";

import Swal from 'sweetalert2';

const UsuarioTabla = ({ filters }) => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const allUsers = await getUsersFn();
      
      if (!filters) return allUsers;

      return allUsers.filter(user => {
        const matchNombre = filters.nombre ? user.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) : true;
        const matchEmail = filters.email ? user.email.toLowerCase().includes(filters.email.toLowerCase()) : true;
        const matchEstado = filters.estado ? user.estado === filters.estado : true;
        const matchFecha = filters.fechaCreacion ? user.fechaCreacion?.startsWith(filters.fechaCreacion) : true;

        return matchNombre && matchEmail && matchEstado && matchFecha;
      });
    }
  });

  const { data: roles, } = useQuery({
    queryKey: ["roles"],
    queryFn: getRolesFn,
  }); 

  const getRolNombre = (rolId) => {
    const rol = roles.find(r => r.id === rolId);
    return rol ? rol.nombre : "Sin rol";
  };

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (isError) return <p>Error cargando usuarios.</p>;
  if (users.length === 0) return <p>No hay usuarios que coincidan.</p>;

  const handleDelete = (user) => {
  Swal.fire({
    title: `¿Estás seguro?`,
    text: `Vas a eliminar al usuario ${user.nombre}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then(async(result) => {
    if (result.isConfirmed) {
      try {
        await deleteUserFn(user.Id);
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
        queryClient.invalidateQueries(["users"]);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      }
    }
  });
};


  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre de usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Fecha de creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>{getRolNombre(user.rolId)}</td>
            <td>{user.activo ? "Activo" : "Inactivo"}</td>
            <td>{user.fechaRegistro}</td>
            <td>
              <button className="btn btn-warning btn-sm me-1" title="Ver">
                <i className="bi bi-eye"></i>
                </button>
                <button className="btn btn-primary btn-sm me-1" title="Editar">
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-danger btn-sm" title="Eliminar" onClick={()=>handleDelete(user)}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsuarioTabla;
