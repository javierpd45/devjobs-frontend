import { useState, useEffect } from "react";
import { HttpError } from "../utils/HttpError";

export function useFetchJobs(url, retryCount) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Cancelar la petición si el componente se desmonta antes de que termine.
    const controller = new AbortController();

    async function fetchJobs() {
      const signal = controller.signal;

      try {
        //delay 5s
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new HttpError(
            response.status,
            response.statusText,
            response.url,
          );
        }
        const json = await response.json();

        setData(json.data);
        setTotal(json.total);
      } catch (error) {
        if (error.name === "AbortError") return; // Petición cancelada{

        // Si no es un objeto de error HTTP, crear uno genérico
        const errorInfo =
          error instanceof HttpError
            ? error
            : {
                message: error.message,
                type: "network",
                url,
              };

        setError(errorInfo);

        setError(errorInfo);
        // if (process.env.NODE_ENV === "production") {
        //   Sentry.captureException(error);
        // } else {
        console.error("Error fetching jobs:", errorInfo);
        // }
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

    // Función de limpieza: Se ejecuta si el usuario cambia de página rápidamente.
    return () => controller.abort();
  }, [url, retryCount]);

  return { data, loading, error, total };
}
