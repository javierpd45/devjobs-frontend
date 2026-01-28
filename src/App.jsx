import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import jobsData from "./data.json";

const RESULTS_PER_PAGE = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [textFilter, setTextFilter] = useState("");
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });

  const jobsFiltersByFilters = jobsData.filter((job) => {
    const technologies = Array.isArray(job.data.technology)
      ? job.data.technology.join(", ")
      : job.data.technology;

    return (
      (filters.technology === "" ||
        technologies
          .toLowerCase()
          .includes(filters.technology.toLowerCase())) &&
      (filters.location === "" ||
        job.ubicacion.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.experienceLevel === "" ||
        job.data.nivel.toLowerCase() === filters.experienceLevel.toLowerCase())
    );
  });

  const jobsWithTextFilter =
    textFilter === ""
      ? jobsFiltersByFilters
      : jobsFiltersByFilters.filter((job) => {
          const text = textFilter.toLowerCase();
          return job.titulo.toLowerCase().includes(text);
        });

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const pageResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (filters) => {
    setCurrentPage(1);
    setFilters(filters);
  };

  const handleTextFilter = (newTextFilter) => {
    setTextFilter(newTextFilter);
    setCurrentPage(1);
  };
  return (
    <>
      <Header />
      <main>
        <SearchFormSection
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
        />

        <section>
          <JobListings jobs={pageResults} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
