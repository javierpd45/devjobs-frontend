import styles from "./DetailApplyButton.module.css";
import { useAuth } from "../../context/AuthContext.jsx";

export function DetailApplyButton() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <button disabled={!isLoggedIn} className={styles.applyButton}>
        {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
      </button>
    </>
  );
}
