import { useState } from "react";
import { Link } from "../Link/Link.jsx";
import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion, id } = job;
  const { modalidad, nivel, technology } = job.data;

  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";

  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={modalidad}
      data-nivel={nivel}
      data-technology={technology}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${id}`}>
            {titulo}
          </Link>
        </h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${id}`} className={styles.details}>
          Ver detalles
        </Link>
        <button className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}
