import { useRouter } from "../hooks/useRouter.js";

export function NotFoundPage() {
  const { navigateTo } = useRouter();

  const styles = {
    error: {
      textAlign: "center",
    },
    errorTitle: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
  };

  return (
    <main>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={styles.error}>
          <h2 style={styles.errorTitle}>404 - Página no encontrada</h2>
          <button onClick={() => navigateTo("/")}>Volver al inicio</button>
        </div>
      </div>
    </main>
  );
}
