import { useState } from "react";
import { UserSearchManager } from "./utilities";

export const AdvancedSearchModal = ({
  usuarios,
  roles,
  onSearch,
  onClose,
  isOpen,
}) => {
  const [criterios, setCriterios] = useState({
    texto: "",
    rol: "",
    activo: null,
    permisos: [],
    nivelMinimo: null,
  });

  const handleSearch = () => {
    const searchManager = new UserSearchManager(usuarios, roles);
    const resultados = searchManager.busquedaCombinada(criterios);
    onSearch(resultados, criterios);
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Búsqueda Avanzada</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Texto</label>
                <input
                  type="text"
                  className="form-control"
                  value={criterios.texto}
                  onChange={(e) =>
                    setCriterios({ ...criterios, texto: e.target.value })
                  }
                  placeholder="Buscar en nombre o email"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  value={criterios.rol}
                  onChange={(e) =>
                    setCriterios({ ...criterios, rol: e.target.value })
                  }
                >
                  <option value="">Todos</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={criterios.activo === null ? "" : criterios.activo}
                  onChange={(e) =>
                    setCriterios({
                      ...criterios,
                      activo:
                        e.target.value === ""
                          ? null
                          : e.target.value === "true",
                    })
                  }
                >
                  <option value="">Todos</option>
                  <option value="true">Activos</option>
                  <option value="false">Inactivos</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Nivel mínimo de rol</label>
                <select
                  className="form-select"
                  value={criterios.nivelMinimo || ""}
                  onChange={(e) =>
                    setCriterios({
                      ...criterios,
                      nivelMinimo: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                >
                  <option value="">Cualquiera</option>
                  <option value="1">Nivel 1 (Cliente)</option>
                  <option value="2">Nivel 2 (Vendedor)</option>
                  <option value="3">Nivel 3 (Administrador)</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Permisos requeridos</label>
                <div className="d-flex gap-3">
                  {["Comprar", "Vender", "Administrar"].map((permiso) => (
                    <div key={permiso} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={criterios.permisos.includes(permiso)}
                        onChange={(e) => {
                          const nuevosPermisos = e.target.checked
                            ? [...criterios.permisos, permiso]
                            : criterios.permisos.filter((p) => p !== permiso);
                          setCriterios({
                            ...criterios,
                            permisos: nuevosPermisos,
                          });
                        }}
                      />
                      <label className="form-check-label">{permiso}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
