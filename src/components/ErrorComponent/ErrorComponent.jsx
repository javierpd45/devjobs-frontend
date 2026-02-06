export function ErrorComponent({ message, onRetry }) {
  const getErrorMessage = (error) => {
    if (!navigator.onLine) {
      return "Parece que no tienes conexión a internet. Verifica tu red.";
    }

    if (error.message.includes("404")) {
      return "No pudimos encontrar los datos. Intenta de nuevo.";
    }

    if (error.message.includes("500") || error.message.includes("502")) {
      return "Nuestros servidores tienen problemas. Intenta más tarde.";
    }

    // Mensaje genérico
    return "No pudimos cargar los empleos. Por favor, intenta de nuevo.";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ alignSelf: "center" }}>{getErrorMessage(message)}</p>
      <button style={{ alignSelf: "center" }} onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}
