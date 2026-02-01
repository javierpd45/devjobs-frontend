import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      {jobs.length === 0 ? (
        <p
          style={{
            padding: "2rem",
            textWrap: "balance",
          }}
        >
          No se encontraron empleos.
        </p>
      ) : (
        <div className="jobs-listings">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
