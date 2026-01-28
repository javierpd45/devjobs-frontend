import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs }) {
  return (
    <>
      <h2>Resultados de búsqueda</h2>

      {jobs.length === 0 ? (
        <p>No se encontraron empleos.</p>
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
