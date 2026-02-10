import { Link } from "../Link/Link.jsx";
import styles from "./JobCard.module.css";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton.jsx";
import { ApplyButton } from "../ApplyButton/ApplyButton.jsx";

export function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion, id } = job;
  const { modalidad, nivel, technology } = job.data;

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

        <ApplyButton jobId={id} />
        <FavoriteButton jobId={id} />
      </div>
    </article>
  );
}
