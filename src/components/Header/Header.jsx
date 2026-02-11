import { Link, NavLink } from "../Link/Link";
// import { useAuth } from "../../context/AuthContext.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { useFavoritesStore } from "../../store/favoritesStore.js";

export function Header() {
  const { isLoggedIn } = useAuthStore();
  const { countFavorites } = useFavoritesStore();

  const numberOfFavorites = countFavorites();

  return (
    <header>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "white" }}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <NavLink href="/search">Empleos</NavLink>
        <NavLink href="/contact">Contacto</NavLink>
        {isLoggedIn && (
          <NavLink href="/profile">Profile (❤️ {numberOfFavorites})</NavLink>
        )}
      </nav>

      <HeaderUserButton />

      {/* <div>
        <devjobs-avatar
          service="google"
          username="google.com"
          size="32"
        ></devjobs-avatar>

        <devjobs-avatar
          service="google"
          username="netflix.com"
          size="32"
        ></devjobs-avatar>

        <devjobs-avatar
          service="google"
          username="vercel.com"
          size="32"
        ></devjobs-avatar>
      </div> */}
    </header>
  );
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore();
  const { clearFavorites } = useFavoritesStore();

  const handleLogout = () => {
    logout();
    clearFavorites(); // Limpia los favoritos al cerrar sesión
  };

  return isLoggedIn ? (
    <button onClick={handleLogout}>Cerrar sesión</button>
  ) : (
    <button onClick={login}>Iniciar sesión</button>
  );
};
