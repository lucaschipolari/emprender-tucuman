// adminStats.js
import { useEffect, useState } from "react";
import api from "./axios";

// Obtener estadísticas generales
export const getEstadisticasGenerales = async () => {
  try {
    const [usuariosRes, publicacionesRes, categoriasRes] = await Promise.all([
      api.get("/Usuario/usuarios"), // Ajusta la ruta según tu API
      api.get("/Publicacion/publicaciones"),
      api.get("/Categoria/categorias"),
    ]);

    return {
      usuarios: usuariosRes.data.data || usuariosRes.data,
      publicaciones: publicacionesRes.data.data || publicacionesRes.data,
      categorias: categoriasRes.data.data || categoriasRes.data,
    };
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    throw error;
  }
};

// Procesar datos para estadísticas por fecha
export const procesarEstadisticasPorFecha = (
  publicaciones,
  usuarios,
  mesesAtras = 6
) => {
  const ahora = new Date();
  const fechaLimite = new Date(
    ahora.getFullYear(),
    ahora.getMonth() - mesesAtras,
    1
  );

  // Publicaciones por mes
  const publicacionesPorMes = {};
  publicaciones.forEach((pub) => {
    const fecha = new Date(pub.fechaPublicacion);
    if (fecha >= fechaLimite) {
      const mesAno = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      const mesNombre = fecha.toLocaleString("es-ES", {
        month: "short",
        year: "2-digit",
      });

      if (!publicacionesPorMes[mesNombre]) {
        publicacionesPorMes[mesNombre] = {
          mes: mesNombre,
          publicaciones: 0,
          activas: 0,
          pausadas: 0,
          totalVentas: 0,
        };
      }

      publicacionesPorMes[mesNombre].publicaciones++;
      if (pub.activa) {
        publicacionesPorMes[mesNombre].activas++;
      } else {
        publicacionesPorMes[mesNombre].pausadas++;
      }

      // Si tienes campo de ventas o precio, puedes calcular totales
      if (pub.estaEnOferta && pub.precioOferta) {
        publicacionesPorMes[mesNombre].totalVentas += pub.precioOferta;
      } else if (pub.precio) {
        publicacionesPorMes[mesNombre].totalVentas += pub.precio;
      }
    }
  });

  // Registros de usuarios por mes
  const registrosPorMes = {};
  usuarios.forEach((usuario) => {
    const fecha = new Date(usuario.fechaRegistro || usuario.fechaCreacion);
    if (fecha >= fechaLimite) {
      const mesNombre = fecha.toLocaleString("es-ES", {
        month: "short",
        year: "2-digit",
      });

      if (!registrosPorMes[mesNombre]) {
        registrosPorMes[mesNombre] = {
          mes: mesNombre,
          registros: 0,
          emprendedores: 0,
          clientes: 0,
        };
      }

      registrosPorMes[mesNombre].registros++;

      // Ajusta según tu campo de tipo de usuario
      if (
        usuario.tipoUsuario === "emprendedor" ||
        usuario.rol === "emprendedor"
      ) {
        registrosPorMes[mesNombre].emprendedores++;
      } else {
        registrosPorMes[mesNombre].clientes++;
      }
    }
  });

  return {
    publicacionesPorMes: Object.values(publicacionesPorMes).sort((a, b) =>
      a.mes.localeCompare(b.mes)
    ),
    registrosPorMes: Object.values(registrosPorMes).sort((a, b) =>
      a.mes.localeCompare(b.mes)
    ),
  };
};

// Obtener estadísticas por categoría
export const getEstadisticasPorCategoria = (publicaciones, categorias) => {
  const estatsPorCategoria = {};

  publicaciones.forEach((pub) => {
    const categoria = categorias.find((c) => c.id === pub.categoriaId);
    const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";

    if (!estatsPorCategoria[nombreCategoria]) {
      estatsPorCategoria[nombreCategoria] = {
        nombre: nombreCategoria,
        totalPublicaciones: 0,
        publicacionesActivas: 0,
        promedioCalificacion: 0,
        sumCalificaciones: 0,
        contadorCalificaciones: 0,
        ventasTotales: 0,
      };
    }

    const stats = estatsPorCategoria[nombreCategoria];
    stats.totalPublicaciones++;

    if (pub.activa) {
      stats.publicacionesActivas++;
    }

    if (pub.calificacionPromedio) {
      stats.sumCalificaciones += pub.calificacionPromedio;
      stats.contadorCalificaciones++;
    }

    // Calcular ventas estimadas
    const precio = pub.estaEnOferta ? pub.precioOferta : pub.precio;
    if (precio) {
      stats.ventasTotales += precio;
    }
  });

  // Calcular promedios
  Object.values(estatsPorCategoria).forEach((stats) => {
    if (stats.contadorCalificaciones > 0) {
      stats.promedioCalificacion = (
        stats.sumCalificaciones / stats.contadorCalificaciones
      ).toFixed(1);
    }
  });

  return Object.values(estatsPorCategoria).sort(
    (a, b) => b.totalPublicaciones - a.totalPublicaciones
  );
};

// Obtener top emprendedores
export const getTopEmprendedores = (publicaciones, usuarios) => {
  const emprendedoreStats = {};

  publicaciones.forEach((pub) => {
    const usuario = usuarios.find((u) => u.id === pub.usuarioId);
    if (!usuario) return;

    if (!emprendedoreStats[usuario.id]) {
      emprendedoreStats[usuario.id] = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo,
        publicaciones: 0,
        publicacionesActivas: 0,
        calificacionPromedio: 0,
        sumCalificaciones: 0,
        contadorCalificaciones: 0,
        ventasEstimadas: 0,
      };
    }

    const stats = emprendedoreStats[usuario.id];
    stats.publicaciones++;

    if (pub.activa) {
      stats.publicacionesActivas++;
    }

    if (pub.calificacionPromedio) {
      stats.sumCalificaciones += pub.calificacionPromedio;
      stats.contadorCalificaciones++;
    }

    const precio = pub.estaEnOferta ? pub.precioOferta : pub.precio;
    if (precio) {
      stats.ventasEstimadas += precio;
    }
  });

  // Calcular promedios y ordenar
  return Object.values(emprendedoreStats)
    .map((stats) => ({
      ...stats,
      calificacionPromedio:
        stats.contadorCalificaciones > 0
          ? (stats.sumCalificaciones / stats.contadorCalificaciones).toFixed(1)
          : 0,
      tasaActivacion:
        stats.publicaciones > 0
          ? ((stats.publicacionesActivas / stats.publicaciones) * 100).toFixed(
              1
            )
          : 0,
    }))
    .sort((a, b) => b.publicaciones - a.publicaciones)
    .slice(0, 10);
};

// Hook personalizado para el dashboard
export const useAdminStats = (filtroTiempo = 6) => {
  const [stats, setStats] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const cargarStats = async () => {
    try {
      setStats((prev) => ({ ...prev, loading: true, error: null }));

      const { usuarios, publicaciones, categorias } =
        await getEstadisticasGenerales();

      const datosPorFecha = procesarEstadisticasPorFecha(
        publicaciones,
        usuarios,
        filtroTiempo
      );
      const datosPorCategoria = getEstadisticasPorCategoria(
        publicaciones,
        categorias
      );
      const topEmprendedores = getTopEmprendedores(publicaciones, usuarios);

      // Estadísticas generales
      const totalUsuarios = usuarios.length;
      const usuariosActivos = usuarios.filter((u) => u.activo).length;
      const totalPublicaciones = publicaciones.length;
      const publicacionesActivas = publicaciones.filter((p) => p.activa).length;

      // Distribución por tipo de usuario
      const usuariosPorTipo = usuarios.reduce((acc, usuario) => {
        const tipo = usuario.tipoUsuario || usuario.rol || "cliente";
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {});

      // Calificación promedio general
      const publicacionesConCalificacion = publicaciones.filter(
        (p) => p.calificacionPromedio
      );
      const calificacionGeneral =
        publicacionesConCalificacion.length > 0
          ? (
              publicacionesConCalificacion.reduce(
                (sum, p) => sum + p.calificacionPromedio,
                0
              ) / publicacionesConCalificacion.length
            ).toFixed(1)
          : 0;

      setStats({
        loading: false,
        error: null,
        data: {
          resumen: {
            totalUsuarios,
            usuariosActivos,
            totalPublicaciones,
            publicacionesActivas,
            tasaActivacionUsuarios:
              totalUsuarios > 0
                ? ((usuariosActivos / totalUsuarios) * 100).toFixed(1)
                : 0,
            tasaActivacionPublicaciones:
              totalPublicaciones > 0
                ? ((publicacionesActivas / totalPublicaciones) * 100).toFixed(1)
                : 0,
            calificacionGeneral,
          },
          chartDataMeses: datosPorFecha.publicacionesPorMes,
          chartDataRegistros: datosPorFecha.registrosPorMes,
          chartDataTipos: Object.entries(usuariosPorTipo).map(
            ([tipo, cantidad]) => ({
              tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
              cantidad,
              porcentaje: ((cantidad / totalUsuarios) * 100).toFixed(1),
            })
          ),
          datosPorCategoria,
          topEmprendedores,
          actividadReciente: publicaciones
            .sort(
              (a, b) =>
                new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
            )
            .slice(0, 15)
            .map((pub) => ({
              ...pub,
              usuario: usuarios.find((u) => u.id === pub.usuarioId),
            })),
        },
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
      setStats({
        loading: false,
        error: error.message || "Error al cargar datos",
        data: null,
      });
    }
  };

  useEffect(() => {
    cargarStats();
  }, [filtroTiempo]);

  return { ...stats, refrescar: cargarStats };
};

// Función para exportar estadísticas
export const exportarEstadisticas = async (formato = "json", datos) => {
  try {
    const reporteCompleto = {
      fechaGeneracion: new Date().toISOString(),
      resumen: datos.resumen,
      publicacionesPorMes: datos.chartDataMeses,
      registrosPorMes: datos.chartDataRegistros,
      distribucionUsuarios: datos.chartDataTipos,
      estadisticasPorCategoria: datos.datosPorCategoria,
      topEmprendedores: datos.topEmprendedores,
      actividadReciente: datos.actividadReciente,
    };

    if (formato === "json") {
      const blob = new Blob([JSON.stringify(reporteCompleto, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `estadisticas_admin_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (formato === "csv") {
      // Crear CSV con resumen y datos principales
      const csvData = [
        ["Métrica", "Valor"],
        ["Total Usuarios", datos.resumen.totalUsuarios],
        ["Usuarios Activos", datos.resumen.usuariosActivos],
        ["Total Publicaciones", datos.resumen.totalPublicaciones],
        ["Publicaciones Activas", datos.resumen.publicacionesActivas],
        ["Tasa Activación Usuarios (%)", datos.resumen.tasaActivacionUsuarios],
        [
          "Tasa Activación Publicaciones (%)",
          datos.resumen.tasaActivacionPublicaciones,
        ],
        ["Calificación General", datos.resumen.calificacionGeneral],
        [""],
        ["Top Emprendedores"],
        ["Nombre", "Publicaciones", "Activas", "Calificación"],
        ...datos.topEmprendedores.map((emp) => [
          emp.nombre,
          emp.publicaciones,
          emp.publicacionesActivas,
          emp.calificacionPromedio,
        ]),
      ];

      const csvContent = csvData
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `estadisticas_admin_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return true;
  } catch (error) {
    console.error("Error al exportar estadísticas:", error);
    throw error;
  }
};

// Función para obtener métricas en tiempo real
export const getMetricasEnTiempoReal = async () => {
  try {
    const [
      usuariosRes,
      publicacionesRes,
      // Si tienes endpoints específicos para métricas:
      // metricasRes = await api.get("/Admin/metricas-tiempo-real")
    ] = await Promise.all([
      api.get("/Usuario/usuarios"),
      api.get("/Publicacion/publicaciones"),
    ]);

    const usuarios = usuariosRes.data.data || usuariosRes.data;
    const publicaciones = publicacionesRes.data.data || publicacionesRes.data;

    // Métricas de las últimas 24 horas
    const ahora = new Date();
    const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);

    const nuevosUsuarios24h = usuarios.filter(
      (u) => new Date(u.fechaRegistro || u.fechaCreacion) >= hace24h
    ).length;

    const nuevasPublicaciones24h = publicaciones.filter(
      (p) => new Date(p.fechaPublicacion) >= hace24h
    ).length;

    return {
      nuevosUsuarios24h,
      nuevasPublicaciones24h,
      usuariosConectados: usuarios.filter((u) => u.activo).length, // Ajustar según tu lógica
      publicacionesVistas24h: 0, // Si tienes métricas de vistas
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error al obtener métricas en tiempo real:", error);
    throw error;
  }
};
