import React, { useEffect, useState, useMemo } from "react";
import UserRow from "./UserRow";
import { obtenerRolesDisponibles } from "../../api/usuarios";

const UserTableWithSearch = ({
  usuarios,
  setUsuarios,
  onChangeRol,
  onEliminarUsuario,
  onDesactivarUsuario,
}) => {
  const [roles, setRoles] = useState([]);

  // Estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRol, setSelectedRol] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos"); // todos, activos, inactivos
  const [sortField, setSortField] = useState("nombre");
  const [sortDirection, setSortDirection] = useState("asc");
  const [permisoFilter, setPermisoFilter] = useState("");

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

  // Función para obtener permisos por rol
  const getPermisos = (rolId) => {
    if (!roles.length) return [];
    const rol = roles.find((r) => r.id === rolId);
    const nivel = rol ? rol.nivel : 1;
    const permisos = [];
    if (nivel >= 1) permisos.push("Comprar");
    if (nivel >= 2) permisos.push("Vender");
    if (nivel >= 3) permisos.push("Administrar");
    return permisos;
  };

  // Función principal de filtrado y búsqueda
  const usuariosFiltrados = useMemo(() => {
    let filtered = [...usuarios];

    // 1. Búsqueda por texto (nombre o email)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (usuario) =>
          usuario.nombre.toLowerCase().includes(term) ||
          usuario.email.toLowerCase().includes(term)
      );
    }

    // 2. Filtro por rol
    if (selectedRol) {
      filtered = filtered.filter(
        (usuario) => usuario.rolId === parseInt(selectedRol)
      );
    }

    // 3. Filtro por estado (activo/inactivo)
    if (statusFilter !== "todos") {
      filtered = filtered.filter((usuario) => {
        if (statusFilter === "activos") return usuario.activo;
        if (statusFilter === "inactivos") return !usuario.activo;
        return true;
      });
    }

    // 4. Filtro por permisos
    if (permisoFilter) {
      filtered = filtered.filter((usuario) => {
        const permisos = getPermisos(usuario.rolId);
        return permisos.includes(permisoFilter);
      });
    }

    // 5. Ordenamiento
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case "nombre":
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "rol":
          const aRol = roles.find((r) => r.id === a.rolId);
          const bRol = roles.find((r) => r.id === b.rolId);
          aValue = aRol ? aRol.nombre.toLowerCase() : "";
          bValue = bRol ? bRol.nombre.toLowerCase() : "";
          break;
        case "estado":
          aValue = a.activo;
          bValue = b.activo;
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [
    usuarios,
    searchTerm,
    selectedRol,
    statusFilter,
    sortField,
    sortDirection,
    permisoFilter,
    roles,
  ]);

  // Función para cambiar ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Función para limpiar todos los filtros
  const limpiarFiltros = () => {
    setSearchTerm("");
    setSelectedRol("");
    setStatusFilter("todos");
    setPermisoFilter("");
    setSortField("nombre");
    setSortDirection("asc");
  };

  // Función mejorada para cambiar rol
  const handleChangeRol = async (usuarioId, { rolId }) => {
    try {
      await onChangeRol(usuarioId, { rolId });
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === usuarioId ? { ...usuario, rolId: rolId } : usuario
        )
      );
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      throw error;
    }
  };

  // Función de búsqueda avanzada por múltiples criterios
  const busquedaAvanzada = (criterios) => {
    const { nombre, email, rol, permisos, activo } = criterios;

    return usuarios.filter((usuario) => {
      const cumpleNombre =
        !nombre || usuario.nombre.toLowerCase().includes(nombre.toLowerCase());
      const cumpleEmail =
        !email || usuario.email.toLowerCase().includes(email.toLowerCase());
      const cumpleRol = !rol || usuario.rolId === parseInt(rol);
      const cumpleEstado = activo === undefined || usuario.activo === activo;

      let cumplePermisos = true;
      if (permisos && permisos.length > 0) {
        const permisosUsuario = getPermisos(usuario.rolId);
        cumplePermisos = permisos.every((permiso) =>
          permisosUsuario.includes(permiso)
        );
      }

      return (
        cumpleNombre &&
        cumpleEmail &&
        cumpleRol &&
        cumpleEstado &&
        cumplePermisos
      );
    });
  };

  const exportarResultados = (formato = "json") => {
    try {
      console.log("Iniciando exportación con formato:", formato);

      // Verificar que las variables existan
      if (!usuariosFiltrados) {
        throw new Error("usuariosFiltrados no está definido");
      }

      if (!Array.isArray(usuariosFiltrados)) {
        throw new Error("usuariosFiltrados no es un array");
      }

      if (usuariosFiltrados.length === 0) {
        alert("No hay usuarios para exportar");
        return;
      }

      if (!roles) {
        throw new Error("roles no está definido");
      }

      if (typeof getPermisos !== "function") {
        throw new Error("getPermisos no es una función");
      }

      const datos = usuariosFiltrados.map((usuario) => {
        const rol = roles.find((r) => r.id === usuario.rolId);
        return {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: rol ? rol.nombre : "Sin rol",
          permisos: getPermisos(usuario.rolId),
          activo: usuario.activo,
        };
      });

      console.log("Datos procesados:", datos);
      console.log("Cantidad de registros:", datos.length);

      if (formato === "csv") {
        const headers = ["ID", "Nombre", "Email", "Rol", "Permisos", "Activo"];
        const csvContent = [
          headers.join(","),
          ...datos.map((row) =>
            [
              row.id,
              `"${row.nombre}"`,
              `"${row.email}"`,
              `"${row.rol}"`,
              `"${row.permisos.join("; ")}"`,
              row.activo ? "Sí" : "No",
            ].join(",")
          ),
        ].join("\n");

        console.log("Contenido CSV generado");
        descargarArchivo(csvContent, "usuarios_filtrados.csv", "text/csv");
      } else {
        const jsonContent = JSON.stringify(datos, null, 2);
        console.log("Contenido JSON generado");
        console.log("Tamaño del JSON:", jsonContent.length, "caracteres");

        descargarArchivo(
          jsonContent,
          "usuarios_filtrados.json",
          "application/json"
        );
      }
    } catch (error) {
      console.error("Error en exportarResultados:", error);
      alert("Error al exportar: " + error.message);
    }
  };

  // Función auxiliar para descargar archivos
  const descargarArchivo = (contenido, nombreArchivo, tipoMime) => {
    try {
      console.log("Iniciando descarga de:", nombreArchivo);

      const blob = new Blob([contenido], { type: tipoMime });
      console.log("Blob creado, tamaño:", blob.size, "bytes");

      const url = URL.createObjectURL(blob);
      console.log("URL del objeto creada:", url);

      const a = document.createElement("a");
      a.href = url;
      a.download = nombreArchivo;
      a.style.display = "none";

      // Agregar al DOM, hacer click y remover
      document.body.appendChild(a);

      a.click();

      // Limpiar después de un pequeño delay
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error en descargarArchivo:", error);
      throw error;
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const activeFiltersCount = [
    searchTerm,
    selectedRol,
    statusFilter !== "todos" ? statusFilter : "",
    permisoFilter,
  ].filter(Boolean).length;

  return (
    <div className="user-table-container">
      {/* Panel de búsqueda y filtros */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            Búsqueda y Filtros de Usuarios
            {activeFiltersCount > 0 && (
              <span className="badge bg-primary ms-2">
                {activeFiltersCount} filtros activos
              </span>
            )}
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {/* Búsqueda por texto */}
            <div className="col-md-4">
              <label className="form-label">Buscar por nombre o email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Escriba para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro por rol */}
            <div className="col-md-3">
              <label className="form-label">Filtrar por rol</label>
              <select
                className="form-select"
                value={selectedRol}
                onChange={(e) => setSelectedRol(e.target.value)}
              >
                <option value="">Todos los roles</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por estado */}
            <div className="col-md-2">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="activos">Activos</option>
                <option value="inactivos">Inactivos</option>
              </select>
            </div>

            {/* Filtro por permisos */}
            <div className="col-md-3">
              <label className="form-label">Filtrar por permiso</label>
              <select
                className="form-select"
                value={permisoFilter}
                onChange={(e) => setPermisoFilter(e.target.value)}
              >
                <option value="">Todos los permisos</option>
                <option value="Comprar">Comprar</option>
                <option value="Vender">Vender</option>
                <option value="Administrar">Administrar</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="row mt-3">
            <div className="col-12">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={limpiarFiltros}
                disabled={activeFiltersCount === 0}
              >
                Limpiar filtros
              </button>
              <button
                className="btn btn-outline-success me-2"
                onClick={() => exportarResultados("json")}
                disabled={usuariosFiltrados.length === 0}
              >
                Exportar JSON
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => exportarResultados("csv")}
                disabled={usuariosFiltrados.length === 0}
              >
                Exportar CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de resultados */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">
          Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
        </span>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Ordenar por: {sortField} {getSortIcon(sortField)}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSort("nombre")}
              >
                Nombre {getSortIcon("nombre")}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSort("rol")}
              >
                Rol {getSortIcon("rol")}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSort("estado")}
              >
                Estado {getSortIcon("estado")}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("nombre")}
              >
                Nombre {getSortIcon("nombre")}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("rol")}
              >
                Rol / Permisos {getSortIcon("rol")}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <UserRow
                  key={usuario.id}
                  usuario={usuario}
                  onChangeRol={handleChangeRol}
                  roles={roles}
                  onDesactivarUsuario={onDesactivarUsuario}
                  onEliminarUsuario={onEliminarUsuario}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="text-muted">
                    <i className="fas fa-search fa-2x mb-2"></i>
                    <p>
                      No se encontraron usuarios que coincidan con los criterios
                      de búsqueda
                    </p>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={limpiarFiltros}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableWithSearch;
