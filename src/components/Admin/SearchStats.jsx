export const SearchStats = ({ usuarios, usuariosFiltrados, roles }) => {
  const stats = {
    total: usuarios.length,
    filtrados: usuariosFiltrados.length,
    activos: usuariosFiltrados.filter((u) => u.activo).length,
    inactivos: usuariosFiltrados.filter((u) => !u.activo).length,
    porRol: roles.map((rol) => ({
      nombre: rol.nombre,
      count: usuariosFiltrados.filter((u) => u.rolId === rol.id).length,
    })),
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Estadísticas de Búsqueda</h6>
      </div>
      <div className="card-body">
        <div className="row text-center">
          <div className="col-md-3">
            <div className="stat-item">
              <h4 className="text-primary">{stats.filtrados}</h4>
              <small className="text-muted">Resultados</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <h4 className="text-success">{stats.activos}</h4>
              <small className="text-muted">Activos</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <h4 className="text-warning">{stats.inactivos}</h4>
              <small className="text-muted">Inactivos</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <h4 className="text-info">{stats.total}</h4>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <h6>Distribución por Rol</h6>
            {stats.porRol.map((rol) => (
              <div key={rol.nombre} className="d-flex justify-content-between">
                <span>{rol.nombre}:</span>
                <span className="badge bg-secondary">{rol.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
