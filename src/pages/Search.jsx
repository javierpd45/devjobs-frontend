import { useEffect } from "react";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Loading } from "../components/Loading.jsx";
import { useFilters } from "../hooks/useFilters.js";
import { useFetchJobs } from "../hooks/useFetch.js";

const RESULTS_PER_PAGE = 4;

export function SearchPage() {
  const {
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextToFilter,
    query,
  } = useFilters();

  const {
    data: jobs,
    total,
    loading,
  } = useFetchJobs(`https://jscamp-api.vercel.app/api/jobs?${query}`);

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

  useEffect(() => {
    document.title = `Resultados: (${total}, Página ${currentPage} - DevJobs)`;
  }, [total, currentPage]);

  return (
    <>
      <main>
        <SearchFormSection
          onSearch={handleSearch}
          onTextToFilter={handleTextToFilter}
        />

        <section>
          {loading ? <Loading /> : <JobListings jobs={jobs} />}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </>
  );
}
