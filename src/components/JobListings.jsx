import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs }) {
  return (
    <>
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
