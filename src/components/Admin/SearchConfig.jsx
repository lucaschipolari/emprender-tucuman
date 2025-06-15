export const SearchConfig = {
  // Configuración por defecto
  default: {
    caseSensitive: false,
    exactMatch: false,
    searchFields: ["nombre", "email"],
    fuzzyThreshold: 0.6,
    maxResults: 100,
    enableHistory: true,
    enableExport: true,
  },

  // Configuración para búsqueda estricta
  strict: {
    caseSensitive: true,
    exactMatch: true,
    searchFields: ["nombre", "email"],
    fuzzyThreshold: 0.9,
    maxResults: 50,
    enableHistory: false,
    enableExport: false,
  },

  // Configuración para búsqueda amplia
  wide: {
    caseSensitive: false,
    exactMatch: false,
    searchFields: ["nombre", "email", "descripcion"],
    fuzzyThreshold: 0.3,
    maxResults: 200,
    enableHistory: true,
    enableExport: true,
  },
};
