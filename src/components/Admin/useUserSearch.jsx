import { useEffect, useState } from "react";
import { UserSearchManager } from "./utilities";

export const useUserSearch = (usuarios, roles) => {
  const [searchManager] = useState(
    () => new UserSearchManager(usuarios, roles)
  );

  // Actualizar datos cuando cambien
  useEffect(() => {
    searchManager.usuarios = usuarios;
    searchManager.roles = roles;
  }, [usuarios, roles, searchManager]);

  return searchManager;
};
