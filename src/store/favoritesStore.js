import { create } from "zustand";

export const useFavoritesStore = create((set, get, store) => ({
  // Estado inicial
  favorites: [],

  clearFavorites: () => set(store.getInitialState()),

  // Acciones para actualizar el estado
  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId],
    }));
  },

  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId),
    }));
  },

  isFavorite: (jobId) => {
    return get().favorites.includes(jobId);
  },

  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get();
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
  },

  countFavorites: () => get().favorites.length,
}));
