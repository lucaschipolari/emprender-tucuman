import React, { useState, useEffect } from "react";

const UserRow = ({
  usuario,
  onChangeRol,
  roles = [],
  onEliminarUsuario,
  onDesactivarUsuario,
}) => {
  const [cargando, setCargando] = useState(false);

  const colorMap = {
    Cliente: "secondary",
    Vendedor: "success",
    Administrador: "danger",
  };

  const rolActual =
    roles.length > 0
      ? roles.find((r) => r.id === usuario.rolId) || roles[0]
      : null;

  if (!roles.length || !rolActual) {
    return (
      <tr>
        <td>
          <div>
            <strong>{usuario.nombre}</strong>
            <br />
            <small className="text-muted">{usuario.email}</small>
          </div>
        </td>
        <td colSpan="3">
          <div className="text-center">
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            Cargando roles...
          </div>
        </td>
      </tr>
    );
  }

  const cambiarRol = async (nuevoRolId) => {
    if (nuevoRolId === usuario.rolId) return;

    setCargando(true);
    try {
      await onChangeRol(usuario.id, { rolId: nuevoRolId });
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    } finally {
      setCargando(false);
    }
  };

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

  const getRolColor = (rolNombre) => {
    return colorMap[rolNombre] || "secondary";
  };

  return (
    <tr>
      <td>
        <div className="d-flex flex-column">
          <strong>{usuario.nombre}</strong>
        </div>
      </td>

      <td className="align-middle">
        <div className="d-flex flex-column">
          <small className="text-muted">{usuario.email}</small>
        </div>
      </td>

      <td>
        <div className="d-flex flex-wrap gap-1">
          <span className={`badge bg-${getRolColor(rolActual.nombre)}`}>
            {rolActual.nombre}
          </span>
        </div>
        <div>
          {getPermisos(usuario.rolId).map((permiso) => (
            <span key={permiso} className="badge bg-light text-dark border">
              {permiso}
            </span>
          ))}
        </div>
      </td>

      <td>
        <div className="dropdown mb-2">
          <button
            className="btn btn-outline-primary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            disabled={cargando}
          >
            {cargando ? "Cambiando..." : "Cambiar Rol"}
          </button>
          <ul className="dropdown-menu">
            {roles
              .sort((a, b) => a.nivel - b.nivel)
              .map((rol) => (
                <li key={rol.id}>
                  <button
                    className={`dropdown-item ${
                      usuario.rolId === rol.id ? "active" : ""
                    }`}
                    onClick={() => cambiarRol(rol.id)}
                    disabled={cargando}
                  >
                    <span
                      className={`badge bg-${getRolColor(rol.nombre)} me-2`}
                    >
                      {rol.nombre}
                    </span>
                    {rol.descripcion}
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onEliminarUsuario(usuario.id)}
            disabled={cargando}
          >
            Eliminar
          </button>

          {usuario.activo ? (
            <button
              className="btn btn-sm btn-warning"
              onClick={() => onDesactivarUsuario(usuario.id)}
              disabled={cargando}
            >
              Desactivar
            </button>
          ) : (
            <button
              className="btn btn-sm btn-success"
              onClick={() => onDesactivarUsuario(usuario.id)}
              disabled={cargando}
            >
              Activar
            </button>
          )}

          <button
            className="btn btn-sm btn-info"
            // onClick={() => verDetalle(usuario.id)}
          >
            Ver
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
