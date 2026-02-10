import { Link } from "../Link/Link";
import styles from "./DetailPageBreadCrumb.module.css";

export function DetailPageBreadCrumb({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href={"/search"} className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>
    </div>
  );
}
