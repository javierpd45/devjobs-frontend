import { useState } from "react";
import { Pagination } from "../components/Pagination/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings/JobListings.jsx";
import { Loading } from "../components/Loading/Loading.jsx";
import { useFilters } from "../hooks/useFilters.js";
import { useFetchJobs } from "../hooks/useFetch.js";
import { ErrorComponent } from "../components/ErrorComponent/ErrorComponent.jsx";

export function SearchPage() {
  const [retryCount, setRetryCount] = useState(0);

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

  const url = `https://jscamp-api.vercel.app/api/jobs?${query}`;

  const { data: jobs, total, loading, error } = useFetchJobs(url, retryCount);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const getTitle = () => {
    if (loading) return "Cargando empleos...";
    if (error) return "Error al cargar empleos";
    if (total === 0) return "No se encontraron empleos";
    return `Resultados: ${total}, Página ${currentPage} - DevJobs`;
  };

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
  };

  return (
    <>
      <main>
        <title>{getTitle()}</title>

        <SearchFormSection
          onSearch={handleSearch}
          onTextToFilter={handleTextToFilter}
          onClear={handleClear}
          hasFilters={hasFilters}
          filters={filters}
          textToFilter={textToFilter}
        />

        <section>
          <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

          {error ? (
            <ErrorComponent message={error} onRetry={handleRetry} />
          ) : loading ? (
            <Loading />
          ) : (
            <JobListings jobs={jobs} />
          )}
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

export default SearchPage;
