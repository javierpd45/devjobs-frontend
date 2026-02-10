import { ApplyButton } from "../ApplyButton/ApplyButton";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
// import { DetailApplyButton } from "./DetailApplyButton";
import styles from "./DetailPageHeader.module.css";

export function DetailPageHeader({ job }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} | {job.ubicacion}
        </p>
      </header>

      <ApplyButton />
      <FavoriteButton jobId={job.id} />
    </>
  );
}
