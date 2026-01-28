import { useState } from "react";

export function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion } = job;
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
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button className={buttonClasses} onClick={handleApplyClick}>
        {buttonText}
      </button>
    </article>
  );
}
