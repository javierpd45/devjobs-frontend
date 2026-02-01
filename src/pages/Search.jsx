import { useEffect } from "react";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Loading } from "../components/Loading.jsx";
import { useFilters } from "../hooks/useFilters.js";
import { useFetchJobs } from "../hooks/useFetch.js";

export function SearchPage() {
  const {
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextToFilter,
    query,
    RESULTS_PER_PAGE,
    handleClear,
    hasFilters,
    filters,
    textToFilter,
  } = useFilters();

  const {
    data: jobs,
    total,
    loading,
  } = useFetchJobs(`https://jscamp-api.vercel.app/api/jobs?${query}`);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  useEffect(() => {
    document.title = `Resultados: (${total}, Página ${currentPage} - DevJobs)`;
  }, [total, currentPage]);

  return (
    <>
      <main>
        <SearchFormSection
          onSearch={handleSearch}
          onTextToFilter={handleTextToFilter}
          onClear={handleClear}
          hasFilters={hasFilters}
          filters={filters}
          textToFilter={textToFilter}
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
