import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { HttpError } from "../utils/HttpError.js";
import { Loading } from "../components/Loading/Loading.jsx";
import { NotFoundPage } from "./404.jsx";
import { Link } from "../components/Link/Link.jsx";
import styles from "./Detail.module.css";
import { JobSection } from "../components/JobSection/JobSection.jsx";

export function JobDetail() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;
    let isCurrent = true;
    const constroller = new AbortController();

    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`, {
      signal: constroller.signal,
    })
      .then((response) => {
        // Muy importante: fetch no lanza error con 404 o 500
        if (!response.ok)
          throw new HttpError({
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            message: `No se pudo obtener el trabajo con ID ${jobId}`,
          });
        return response.json();
      })
      .then((data) => {
        setJob(data);
      })
      .catch((error) => {
        // No es un error real, solo se abortó la petición
        if (error.name === "AbortError") return;

        const errorInfo =
          error instanceof HttpError
            ? error
            : {
                message: error.message,
                type: "network",
              };
        setError(errorInfo);
        console.error("Error al obtener el trabajo:", errorInfo);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
      constroller.abort();
    };
  }, [jobId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !job) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link href={"/search"} className={styles.breadcrumbButton}>
              Empleos
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
          </nav>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{job.titulo}</h1>
          <p className={styles.meta}>
            {job.empresa} | {job.ubicacion}
          </p>
        </header>

        <button className={styles.applyButton}>Aplicar ahora</button>
        <JobSection
          title="Descripción del puesto"
          content={job.content.description}
        />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
    </main>
  );
}
