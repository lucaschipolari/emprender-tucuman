export const parseSearchUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const criterios = {};

  for (const [key, value] of params) {
    if (key === "permisos") {
      criterios[key] = value.split(",");
    } else if (key === "activo") {
      criterios[key] = value === "true";
    } else if (key === "nivelMinimo" || key === "rol") {
      criterios[key] = parseInt(value);
    } else {
      criterios[key] = value;
    }
  }

  return criterios;
};
