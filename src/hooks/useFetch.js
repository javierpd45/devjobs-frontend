import { useState, useEffect } from "react";

export function useFetchJobs(url) {
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
          throw new Error("Error en la petición");
        }
        const json = await response.json();

        setLoading(false);
        setData(json.data);
        setTotal(json.total);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
    fetchJobs();

    // Función de limpieza: Se ejecuta si el usuario cambia de página rápidamente.
    return () => controller.abort();
  }, [url]);

  return { data, loading, error, total };
}
