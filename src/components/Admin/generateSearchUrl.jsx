export const generateSearchUrl = (criterios) => {
  const params = new URLSearchParams();

  Object.entries(criterios).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value.toString());
      }
    }
  });

  return `${window.location.origin}${
    window.location.pathname
  }?${params.toString()}`;
};
