// searchUtils.js - Utilidades adicionales para búsquedas

/**
 * Clase para manejar búsquedas avanzadas en la tabla de usuarios
 */
export class UserSearchManager {
  constructor(usuarios, roles) {
    this.usuarios = usuarios;
    this.roles = roles;
    this.historialBusquedas = [];
  }

  /**
   * Búsqueda por texto con coincidencias parciales
   */
  busquedaPorTexto(termino, campos = ["nombre", "email"]) {
    if (!termino.trim()) return this.usuarios;

    const terminoLower = termino.toLowerCase().trim();

    return this.usuarios.filter((usuario) => {
      return campos.some((campo) => {
        const valor = usuario[campo];
        return valor && valor.toLowerCase().includes(terminoLower);
      });
    });
  }

  /**
   * Búsqueda exacta por múltiples criterios
   */
  busquedaExacta(criterios) {
    return this.usuarios.filter((usuario) => {
      return Object.entries(criterios).every(([campo, valor]) => {
        if (valor === null || valor === undefined || valor === "") return true;
        return usuario[campo] === valor;
      });
    });
  }

  /**
   * Búsqueda por rango de fechas (si tuvieras campos de fecha)
   */
  busquedaPorRangoFecha(fechaInicio, fechaFin, campoFecha = "fechaCreacion") {
    if (!fechaInicio && !fechaFin) return this.usuarios;

    return this.usuarios.filter((usuario) => {
      const fecha = new Date(usuario[campoFecha]);

      if (fechaInicio && fecha < new Date(fechaInicio)) return false;
      if (fechaFin && fecha > new Date(fechaFin)) return false;

      return true;
    });
  }

  /**
   * Búsqueda por permisos específicos
   */
  busquedaPorPermisos(permisosRequeridos) {
    if (!permisosRequeridos || permisosRequeridos.length === 0)
      return this.usuarios;

    return this.usuarios.filter((usuario) => {
      const permisosUsuario = this.getPermisos(usuario.rolId);

      // Verificar si el usuario tiene TODOS los permisos requeridos
      return permisosRequeridos.every((permiso) =>
        permisosUsuario.includes(permiso)
      );
    });
  }

  /**
   * Búsqueda por nivel de rol
   */
  busquedaPorNivelRol(nivelMinimo, nivelMaximo = null) {
    return this.usuarios.filter((usuario) => {
      const rol = this.roles.find((r) => r.id === usuario.rolId);
      if (!rol) return false;

      const nivel = rol.nivel;

      if (nivel < nivelMinimo) return false;
      if (nivelMaximo && nivel > nivelMaximo) return false;

      return true;
    });
  }

  /**
   * Búsqueda difusa (fuzzy search) - busca coincidencias aproximadas
   */
  busquedaDifusa(termino, umbralSimilitud = 0.6) {
    if (!termino.trim()) return this.usuarios;

    return this.usuarios.filter((usuario) => {
      const similitudNombre = this.calcularSimilitud(termino, usuario.nombre);
      const similitudEmail = this.calcularSimilitud(termino, usuario.email);

      return Math.max(similitudNombre, similitudEmail) >= umbralSimilitud;
    });
  }

  /**
   * Búsqueda con autocompletado
   */
  obtenerSugerencias(termino, limite = 5) {
    if (!termino.trim()) return [];

    const terminoLower = termino.toLowerCase();
    const sugerencias = new Set();

    this.usuarios.forEach((usuario) => {
      // Sugerencias de nombres
      if (usuario.nombre.toLowerCase().includes(terminoLower)) {
        sugerencias.add(usuario.nombre);
      }

      // Sugerencias de emails
      if (usuario.email.toLowerCase().includes(terminoLower)) {
        sugerencias.add(usuario.email);
      }

      // Sugerencias de roles
      const rol = this.roles.find((r) => r.id === usuario.rolId);
      if (rol && rol.nombre.toLowerCase().includes(terminoLower)) {
        sugerencias.add(rol.nombre);
      }
    });

    return Array.from(sugerencias).slice(0, limite);
  }

  /**
   * Búsqueda combinada con múltiples filtros
   */
  busquedaCombinada(filtros) {
    let resultado = [...this.usuarios];

    // Aplicar cada filtro secuencialmente
    Object.entries(filtros).forEach(([tipoFiltro, valor]) => {
      if (!valor || (Array.isArray(valor) && valor.length === 0)) return;

      switch (tipoFiltro) {
        case "texto":
          resultado = resultado.filter(
            (usuario) =>
              usuario.nombre.toLowerCase().includes(valor.toLowerCase()) ||
              usuario.email.toLowerCase().includes(valor.toLowerCase())
          );
          break;

        case "rol":
          resultado = resultado.filter((usuario) => usuario.rolId === valor);
          break;

        case "activo":
          resultado = resultado.filter((usuario) => usuario.activo === valor);
          break;

        case "permisos":
          resultado = resultado.filter((usuario) => {
            const permisosUsuario = this.getPermisos(usuario.rolId);
            return valor.every((permiso) => permisosUsuario.includes(permiso));
          });
          break;

        case "nivelMinimo":
          resultado = resultado.filter((usuario) => {
            const rol = this.roles.find((r) => r.id === usuario.rolId);
            return rol && rol.nivel >= valor;
          });
          break;
      }
    });

    return resultado;
  }

  /**
   * Guardar búsqueda en historial
   */
  guardarBusquedaEnHistorial(criterios, resultados) {
    const busqueda = {
      id: Date.now(),
      fecha: new Date(),
      criterios,
      cantidadResultados: resultados.length,
      timestamp: Date.now(),
    };

    this.historialBusquedas.unshift(busqueda);

    // Mantener solo las últimas 10 búsquedas
    if (this.historialBusquedas.length > 10) {
      this.historialBusquedas = this.historialBusquedas.slice(0, 10);
    }

    return busqueda;
  }

  /**
   * Obtener historial de búsquedas
   */
  obtenerHistorial() {
    return this.historialBusquedas;
  }

  /**
   * Repetir búsqueda desde historial
   */
  repetirBusqueda(idBusqueda) {
    const busqueda = this.historialBusquedas.find((b) => b.id === idBusqueda);
    if (!busqueda) return [];

    return this.busquedaCombinada(busqueda.criterios);
  }

  /**
   * Exportar resultados de búsqueda
   */
  exportarResultados(usuarios, formato = "json", incluirDetalles = true) {
    const datos = usuarios.map((usuario) => {
      const base = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo,
      };

      if (incluirDetalles) {
        const rol = this.roles.find((r) => r.id === usuario.rolId);
        return {
          ...base,
          rol: rol ? rol.nombre : "Sin rol",
          nivelRol: rol ? rol.nivel : 0,
          permisos: this.getPermisos(usuario.rolId),
          descripcionRol: rol ? rol.descripcion : "",
        };
      }

      return base;
    });

    switch (formato) {
      case "csv":
        return this.convertirACSV(datos);
      case "xml":
        return this.convertirAXML(datos);
      case "excel":
        return this.convertirAExcel(datos);
      default:
        return JSON.stringify(datos, null, 2);
    }
  }

  /**
   * Métodos auxiliares
   */
  getPermisos(rolId) {
    const rol = this.roles.find((r) => r.id === rolId);
    const nivel = rol ? rol.nivel : 1;
    const permisos = [];
    if (nivel >= 1) permisos.push("Comprar");
    if (nivel >= 2) permisos.push("Vender");
    if (nivel >= 3) permisos.push("Administrar");
    return permisos;
  }

  calcularSimilitud(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const distancia = this.calcularDistanciaLevenshtein(longer, shorter);
    return (longer.length - distancia) / longer.length;
  }

  calcularDistanciaLevenshtein(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  convertirACSV(datos) {
    if (datos.length === 0) return "";

    const headers = Object.keys(datos[0]);
    const csvContent = [
      headers.join(","),
      ...datos.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (Array.isArray(value)) {
              return `"${value.join("; ")}"`;
            }
            return typeof value === "string" ? `"${value}"` : value;
          })
          .join(",")
      ),
    ].join("\n");

    return csvContent;
  }

  convertirAXML(datos) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<usuarios>\n';

    datos.forEach((usuario) => {
      xml += "  <usuario>\n";
      Object.entries(usuario).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          xml += `    <${key}>${value.join(", ")}</${key}>\n`;
        } else {
          xml += `    <${key}>${value}</${key}>\n`;
        }
      });
      xml += "  </usuario>\n";
    });

    xml += "</usuarios>";
    return xml;
  }
}

/**
 * Hook personalizado para búsquedas de usuarios
 */

/**
 * Componente de búsqueda avanzada reutilizable
 */

/**
 * Componente de filtros rápidos
 */

/**
 * Componente de estadísticas de búsqueda
 */

/**
 * Hook para búsqueda en tiempo real con debounce
 */

/**
 * Configuración de búsqueda personalizable
 */

/**
 * Validador de criterios de búsqueda
 */

/**
 * Generador de URLs de búsqueda para compartir
 */

/**
 * Parser de URLs de búsqueda
 */
