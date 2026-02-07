import { useId } from "react";

export function ContactPage() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("Datos de contacto:", data);
    alert("¡Mensaje enviado con éxito!");
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Contacta con nosotros</h1>
      <p style={styles.subtitle}>
        ¿Tienes dudas o quieres publicar una oferta? Escríbenos.
      </p>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.field}>
          <label htmlFor={nameId} style={styles.label}>
            Nombre completo
          </label>
          <input
            id={nameId}
            name="userName"
            type="text"
            placeholder="Tu nombre..."
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label htmlFor={emailId} style={styles.label}>
            Correo electrónico
          </label>
          <input
            id={emailId}
            name="userEmail"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label htmlFor={messageId} style={styles.label}>
            Mensaje
          </label>
          <textarea
            id={messageId}
            name="userMessage"
            placeholder="¿En qué podemos ayudarte?"
            required
            rows="5"
            style={{ ...styles.input, ...styles.textarea }}
          />
        </div>

        <button type="submit" style={styles.button}>
          Enviar mensaje
        </button>
      </form>
    </main>
  );
}

// Estilos basados en la UI de tu captura de pantalla
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    color: "#fff",
    minHeight: "calc(100vh - 200px)", // Ajuste para dejar espacio a Header/Footer
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "30px",
  },
  formCard: {
    backgroundColor: "rgba(30, 41, 59, 0.5)", // Fondo semitransparente como tus cards
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f8fafc",
  },
  input: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "12px",
    color: "#fff",
    outline: "none",
    fontSize: "16px",
  },
  textarea: {
    resize: "vertical",
  },
  button: {
    backgroundColor: "#0091ff", // El azul "Aplicar" de tu imagen
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s",
  },
};

export default ContactPage;
