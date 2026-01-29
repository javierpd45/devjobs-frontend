import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Cancelar la petición si el componente se desmonta antes de que termine.
    const controller = new AbortController();

    async function fetchData() {
      const signal = controller.signal;

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const dataRes = await response.json();
        setData(dataRes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Función de limpieza: Se ejecuta si el usuario cambia de página rápidamente.
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
