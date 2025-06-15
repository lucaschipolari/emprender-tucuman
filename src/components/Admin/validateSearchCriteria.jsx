export const validateSearchCriteria = (criterios) => {
  const errores = [];

  if (criterios.texto && criterios.texto.length < 2) {
    errores.push("El texto de búsqueda debe tener al menos 2 caracteres");
  }

  if (criterios.email && !isValidEmail(criterios.email)) {
    errores.push("El formato del email no es válido");
  }

  if (
    criterios.nivelMinimo &&
    (criterios.nivelMinimo < 1 || criterios.nivelMinimo > 3)
  ) {
    errores.push("El nivel mínimo debe estar entre 1 y 3");
  }

  return {
    isValid: errores.length === 0,
    errores,
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
