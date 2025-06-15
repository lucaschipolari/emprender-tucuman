import { useState } from "react";

export const QuickFilters = ({ usuarios, roles, onFilter }) => {
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const filtros = [
    { id: "todos", label: "Todos", count: usuarios.length },
    {
      id: "activos",
      label: "Activos",
      count: usuarios.filter((u) => u.activo).length,
    },
    {
      id: "inactivos",
      label: "Inactivos",
      count: usuarios.filter((u) => !u.activo).length,
    },
    ...roles.map((rol) => ({
      id: `rol-${rol.id}`,
      label: rol.nombre,
      count: usuarios.filter((u) => u.rolId === rol.id).length,
    })),
  ];

  const aplicarFiltro = (filtroId) => {
    setFiltroActivo(filtroId);

    let usuariosFiltrados = usuarios;

    if (filtroId === "activos") {
      usuariosFiltrados = usuarios.filter((u) => u.activo);
    } else if (filtroId === "inactivos") {
      usuariosFiltrados = usuarios.filter((u) => !u.activo);
    } else if (filtroId.startsWith("rol-")) {
      const rolId = parseInt(filtroId.replace("rol-", ""));
      usuariosFiltrados = usuarios.filter((u) => u.rolId === rolId);
    }

    onFilter(usuariosFiltrados);
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      {filtros.map((filtro) => (
        <button
          key={filtro.id}
          className={`btn btn-sm ${
            filtroActivo === filtro.id ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => aplicarFiltro(filtro.id)}
        >
          {filtro.label}
          <span className="badge bg-secondary ms-1">{filtro.count}</span>
        </button>
      ))}
    </div>
  );
};
