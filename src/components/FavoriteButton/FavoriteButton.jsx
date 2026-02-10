import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";

export function FavoriteButton({ jobId }) {
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  // const isFavorite = useFavoritesStore((state) => state.isFavorite);
  // const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      disabled={!isLoggedIn}
      aria-label={
        isFavorite(jobId) ? "Eliminar de favoritos" : "Agregar a favoritos"
      }
    >
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  );
}
