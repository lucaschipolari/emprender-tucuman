import { create } from "zustand";

const usePublicacionStore = create((set) => ({
  publicacionSeleccionada: null,
  setPublicacionSeleccionada: (pub) => set({ publicacionSeleccionada: pub }),
  clearPublicacionSeleccionada: () => set({ publicacionSeleccionada: null }),
}));

export default usePublicacionStore;
