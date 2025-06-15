import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  Star,
  CalendarDays,
  TrendingUp,
  UserCheck,
  Download,
  RefreshCw,
  Activity,
} from "lucide-react";

// Hook personalizado para obtener datos del admin
const useAdmindata = (filtroTiempo = 6) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para generar datos simulados
  const generarDatosMock = (meses) => {
    const hoy = new Date();
    const chartDataMeses = [];
    const chartDataRegistros = [];

    for (let i = meses - 1; i >= 0; i--) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      const mes = fecha.toLocaleDateString("es-ES", {
        month: "short",
        year: "2-digit",
      });

      chartDataMeses.push({
        mes,
        publicaciones: Math.floor(Math.random() * 50) + 10,
      });

      chartDataRegistros.push({
        mes,
        registros: Math.floor(Math.random() * 30) + 5,
      });
    }

    const chartDataTipos = [
      { tipo: "Cliente", cantidad: 156, porcentaje: 65 },
      { tipo: "Emprendedor", cantidad: 67, porcentaje: 28 },
      { tipo: "Administrador", cantidad: 17, porcentaje: 7 },
    ];

    const usuarios = [
      {
        id: 1,
        nombre: "María González",
        email: "maria@email.com",
        tipo: "Emprendedor",
        activo: true,
      },
      {
        id: 2,
        nombre: "Juan Pérez",
        email: "juan@email.com",
        tipo: "Cliente",
        activo: true,
      },
      {
        id: 3,
        nombre: "Ana Rodríguez",
        email: "ana@email.com",
        tipo: "Emprendedor",
        activo: false,
      },
      {
        id: 4,
        nombre: "Carlos López",
        email: "carlos@email.com",
        tipo: "Cliente",
        activo: true,
      },
      {
        id: 5,
        nombre: "Laura Martín",
        email: "laura@email.com",
        tipo: "Emprendedor",
        activo: true,
      },
    ];

    const publicaciones = [
      {
        id: 1,
        titulo: "Artesanías en Cuero",
        usuarioId: 1,
        fechaPublicacion: new Date(2024, 11, 15).toISOString(),
        activa: true,
        calificacion: 4.5,
      },
      {
        id: 2,
        titulo: "Repostería Casera",
        usuarioId: 3,
        fechaPublicacion: new Date(2024, 11, 10).toISOString(),
        activa: true,
        calificacion: 4.8,
      },
      {
        id: 3,
        titulo: "Productos de Limpieza Eco",
        usuarioId: 5,
        fechaPublicacion: new Date(2024, 11, 8).toISOString(),
        activa: false,
        calificacion: 4.2,
      },
      {
        id: 4,
        titulo: "Joyería Artesanal",
        usuarioId: 1,
        fechaPublicacion: new Date(2024, 11, 5).toISOString(),
        activa: true,
        calificacion: 4.7,
      },
      {
        id: 5,
        titulo: "Plantas Decorativas",
        usuarioId: 5,
        fechaPublicacion: new Date(2024, 11, 2).toISOString(),
        activa: true,
        calificacion: 4.3,
      },
    ];

    const topEmprendedores = [
      { nombre: "María González", publicaciones: 12, activo: true },
      { nombre: "Laura Martín", publicaciones: 8, activo: true },
      { nombre: "Ana Rodríguez", publicaciones: 5, activo: false },
      { nombre: "Pedro Jiménez", publicaciones: 4, activo: true },
      { nombre: "Carmen Ruiz", publicaciones: 3, activo: true },
    ];

    const totalUsuarios = usuarios.length;
    const usuariosActivos = usuarios.filter((u) => u.activo).length;
    const totalPublicaciones = publicaciones.length;
    const publicacionesActivas = publicaciones.filter((p) => p.activa).length;
    const promedioCalificaciones =
      publicaciones.reduce((acc, p) => acc + p.calificacion, 0) /
      publicaciones.length;

    const resumen = {
      totalUsuarios,
      usuariosActivos,
      tasaActivacionUsuarios: Math.round(
        (usuariosActivos / totalUsuarios) * 100
      ),
      totalPublicaciones,
      publicacionesActivas,
      tasaActivacionPublicaciones: Math.round(
        (publicacionesActivas / totalPublicaciones) * 100
      ),
      calificacionGeneral: promedioCalificaciones.toFixed(1),
    };

    return {
      resumen,
      chartDataMeses,
      chartDataRegistros,
      chartDataTipos,
      usuarios,
      publicaciones,
      topEmprendedores,
    };
  };

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 800));

      const datosMock = generarDatosMock(filtroTiempo);
      setData(datosMock);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError(
        "Error al cargar las estadísticas. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const refrescar = () => {
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, [filtroTiempo]);

  return { data, loading, error, refrescar };
};

// Función para exportar estadísticas
const exportarEstadisticas = async (formato, data) => {
  try {
    let contenido;
    let nombreArchivo;
    let tipoMime;

    if (formato === "json") {
      contenido = JSON.stringify(data, null, 2);
      nombreArchivo = `estadisticas_${
        new Date().toISOString().split("T")[0]
      }.json`;
      tipoMime = "application/json";
    } else if (formato === "csv") {
      const csvData = [];

      csvData.push("RESUMEN DE ESTADÍSTICAS");
      csvData.push(`Total Usuarios,${data.resumen.totalUsuarios}`);
      csvData.push(`Usuarios Activos,${data.resumen.usuariosActivos}`);
      csvData.push(`Total Publicaciones,${data.resumen.totalPublicaciones}`);
      csvData.push(
        `Publicaciones Activas,${data.resumen.publicacionesActivas}`
      );
      csvData.push(`Calificación General,${data.resumen.calificacionGeneral}`);
      csvData.push("");

      csvData.push("PUBLICACIONES POR MES");
      csvData.push("Mes,Publicaciones");
      data.chartDataMeses.forEach((item) => {
        csvData.push(`${item.mes},${item.publicaciones}`);
      });
      csvData.push("");

      csvData.push("TIPOS DE USUARIO");
      csvData.push("Tipo,Cantidad,Porcentaje");
      data.chartDataTipos.forEach((item) => {
        csvData.push(`${item.tipo},${item.cantidad},${item.porcentaje}%`);
      });

      contenido = csvData.join("\n");
      nombreArchivo = `estadisticas_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      tipoMime = "text/csv";
    }

    const blob = new Blob([contenido], { type: tipoMime });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Error exportando estadísticas:", error);
    throw new Error("Error al exportar las estadísticas");
  }
};

// Estilos personalizados para el dashboard
const customStyles = `
  .dashboard-card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .dashboard-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .metric-card {
    border: none;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .metric-card .card-body {
    padding: 1.5rem;
  }
  
  .metric-icon {
    opacity: 0.8;
  }
  
  .bg-gradient-primary {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  }
  
  .bg-gradient-success {
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  }
  
  .bg-gradient-warning {
    background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
  }
  
  .bg-gradient-info {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
  }
  
  .spinner-border-lg {
    width: 3rem;
    height: 3rem;
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
  
  .btn-group .btn-check:checked + .btn {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
  }
  
  .chart-container {
    height: 300px;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }
  
  .error-container {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .top-entrepreneur-item {
    border-left: 4px solid #007bff;
    transition: border-color 0.2s ease;
  }
  
  .top-entrepreneur-item:hover {
    border-left-color: #0056b3;
    background-color: #f8f9fa;
  }
`;

const AdminDashboard = () => {
  const [filtroTiempo, setFiltroTiempo] = useState(6);
  const { loading, error, data, refrescar } = useAdmindata(filtroTiempo);

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

  const handleExportar = async (formato) => {
    if (!data) return;

    try {
      await exportarEstadisticas(formato, data);
      alert(`Estadísticas exportadas en formato ${formato.toUpperCase()}`);
    } catch (error) {
      alert("Error al exportar estadísticas");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="loading-overlay">
          <div className="text-center">
            <div
              className="spinner-border spinner-border-lg text-primary mb-3"
              role="status"
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h4 className="text-muted">Cargando estadísticas...</h4>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="container-fluid">
          <div className="error-container">
            <div className="text-center">
              <div
                className="alert alert-danger shadow"
                role="alert"
                style={{ maxWidth: "500px" }}
              >
                <Activity size={48} className="text-danger mb-3" />
                <h4 className="alert-heading">Error al cargar datos</h4>
                <p className="mb-3">{error}</p>
                <button className="btn btn-outline-danger" onClick={refrescar}>
                  <RefreshCw size={16} className="me-2" />
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{customStyles}</style>
      <div className="container-fluid p-4 bg-light min-vh-100">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h2 mb-0 text-dark d-flex align-items-center">
              <TrendingUp className="me-2 text-primary" size={32} />
              Dashboard Administrativo
            </h1>
            <p className="text-muted mt-2">
              Panel de control y estadísticas del sistema
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card dashboard-card">
              <div className="card-body">
                <h6 className="card-title mb-3">
                  <CalendarDays size={18} className="me-2 text-primary" />
                  Filtros de Tiempo
                </h6>
                <div className="btn-group" role="group">
                  {[3, 6, 12].map((meses) => (
                    <React.Fragment key={meses}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="filtroTiempo"
                        id={`${meses}meses`}
                        value={meses}
                        checked={filtroTiempo === meses}
                        onChange={(e) =>
                          setFiltroTiempo(parseInt(e.target.value))
                        }
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`${meses}meses`}
                      >
                        {meses} meses
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card dashboard-card">
              <div className="card-body">
                <h6 className="card-title mb-3">
                  <Download size={18} className="me-2 text-success" />
                  Acciones
                </h6>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleExportar("json")}
                  >
                    <Download size={14} className="me-1" />
                    JSON
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleExportar("csv")}
                  >
                    <Download size={14} className="me-1" />
                    CSV
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={refrescar}
                  >
                    <RefreshCw size={14} className="me-1" />
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de resumen */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card metric-card bg-gradient-primary text-white dashboard-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-1 opacity-90">
                      Total Usuarios
                    </h6>
                    <h2 className="mb-1 fw-bold">
                      {data.resumen.totalUsuarios}
                    </h2>
                    <small className="opacity-75">
                      {data.resumen.usuariosActivos} activos (
                      {data.resumen.tasaActivacionUsuarios}%)
                    </small>
                  </div>
                  <Users size={40} className="metric-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card metric-card bg-gradient-success text-white dashboard-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-1 opacity-90">
                      Publicaciones
                    </h6>
                    <h2 className="mb-1 fw-bold">
                      {data.resumen.totalPublicaciones}
                    </h2>
                    <small className="opacity-75">
                      {data.resumen.publicacionesActivas} activas (
                      {data.resumen.tasaActivacionPublicaciones}%)
                    </small>
                  </div>
                  <Activity size={40} className="metric-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card metric-card bg-gradient-warning text-white dashboard-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-1 opacity-90">
                      Emprendedores
                    </h6>
                    <h2 className="mb-1 fw-bold">
                      {data.chartDataTipos.find((t) => t.tipo === "Emprendedor")
                        ?.cantidad || 0}
                    </h2>
                    <small className="opacity-75">
                      {data.chartDataTipos.find((t) => t.tipo === "Emprendedor")
                        ?.porcentaje || 0}
                      % del total
                    </small>
                  </div>
                  <TrendingUp size={40} className="metric-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card metric-card bg-gradient-info text-white dashboard-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-1 opacity-90">
                      Rating Promedio
                    </h6>
                    <h2 className="mb-1 fw-bold">
                      {data.resumen.calificacionGeneral}
                    </h2>
                    <small className="opacity-75">
                      De todas las publicaciones
                    </small>
                  </div>
                  <Star size={40} className="metric-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row mb-4">
          <div className="col-lg-8 mb-3">
            <div className="card dashboard-card">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <CalendarDays className="me-2 text-primary" size={20} />
                  Publicaciones por Mes
                </h5>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartDataMeses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="publicaciones"
                        stroke="#007bff"
                        fill="#007bff"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-3">
            <div className="card dashboard-card">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <UserCheck className="me-2 text-success" size={20} />
                  Tipos de Usuario
                </h5>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.chartDataTipos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ tipo, porcentaje }) =>
                          `${tipo} (${porcentaje}%)`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="cantidad"
                      >
                        {data.chartDataTipos.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-8 mb-3">
            <div className="card dashboard-card">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <Users className="me-2 text-info" size={20} />
                  Registros de Usuarios por Mes
                </h5>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.chartDataRegistros}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="registros" fill="#28a745" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-3">
            <div className="card dashboard-card">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <TrendingUp className="me-2 text-warning" size={20} />
                  Top Emprendedores
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {data.topEmprendedores.map((emprendedor, index) => (
                    <div
                      key={index}
                      className="list-group-item top-entrepreneur-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h6 className="mb-1 fw-semibold">
                          {emprendedor.nombre}
                        </h6>
                        <small
                          className={`text-${
                            emprendedor.activo ? "success" : "danger"
                          }`}
                        >
                          {emprendedor.activo ? "Activo" : "Inactivo"}
                        </small>
                      </div>
                      <div>
                        <span className="badge bg-primary rounded-pill">
                          {emprendedor.publicaciones} pub.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de actividad reciente */}
        <div className="row">
          <div className="col-12">
            <div className="card dashboard-card">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <Activity className="me-2 text-secondary" size={20} />
                  Actividad Reciente
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 fw-semibold">Usuario</th>
                        <th className="border-0 fw-semibold">Acción</th>
                        <th className="border-0 fw-semibold">Publicación</th>
                        <th className="border-0 fw-semibold">Fecha</th>
                        <th className="border-0 fw-semibold">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.publicaciones.slice(0, 10).map((pub) => {
                        const usuario = data.usuarios.find(
                          (u) => u.id === pub.usuarioId
                        );
                        return (
                          <tr key={pub.id}>
                            <td className="fw-medium">
                              {usuario?.nombre || "Usuario desconocido"}
                            </td>
                            <td>
                              <span className="badge bg-info">
                                Nueva publicación
                              </span>
                            </td>
                            <td className="text-muted">{pub.titulo}</td>
                            <td className="text-muted">
                              {new Date(
                                pub.fechaPublicacion
                              ).toLocaleDateString("es-ES")}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  pub.activa ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {pub.activa ? "Activa" : "Pausada"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
