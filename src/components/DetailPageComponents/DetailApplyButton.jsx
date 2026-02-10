import styles from "./DetailApplyButton.module.css";
// import { useAuth } from "../../context/AuthContext.jsx";
import { useAuthStore } from "../../store/authStore.js";

export function DetailApplyButton() {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      <button disabled={!isLoggedIn} className={styles.applyButton}>
        {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
      </button>
    </>
  );
}
