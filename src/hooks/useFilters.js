import { useEffect, useState } from "react";

const RESULTS_PER_PAGE = 4;

export const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const storageFilters = localStorage.getItem("filters");
    return {
      technology: storageFilters ? JSON.parse(storageFilters).technology : "",
      location: storageFilters ? JSON.parse(storageFilters).location : "",
      experienceLevel: storageFilters
        ? JSON.parse(storageFilters).experienceLevel
        : "",
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [textToFilter, setTextToFilter] = useState(() => {
    const storageTextToFilter = localStorage.getItem("textToFilter");
    return storageTextToFilter ? storageTextToFilter : "";
  });

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("textToFilter", textToFilter);
  }, [filters, textToFilter]);

  const hasFilters =
    filters.technology !== "" ||
    filters.location !== "" ||
    filters.experienceLevel !== "" ||
    textToFilter !== ""
      ? true
      : false;

  //#region Datos filtrados en el frontend, comentado porque se debe hacer en el backend
  // const jobsFiltersByFilters = jobsData.filter((job) => {
  //   const technologies = Array.isArray(job.data.technology)
  //     ? job.data.technology.join(", ")
  //     : job.data.technology;

  //   return (
  //     (filters.technology === "" ||
  //       technologies
  //         .toLowerCase()
  //         .includes(filters.technology.toLowerCase())) &&
  //     (filters.location === "" ||
  //       job.ubicacion.toLowerCase() === filters.location.toLowerCase()) &&
  //     (filters.experienceLevel === "" ||
  //       job.data.nivel.toLowerCase() === filters.experienceLevel.toLowerCase())
  //   );
  // });

  // const jobsWithtextToFilter =
  //   textToFilter === ""
  //     ? jobsFiltersByFilters
  //     : jobsFiltersByFilters.filter((job) => {
  //         const text = textToFilter.toLowerCase();
  //         return job.titulo.toLowerCase().includes(text);
  //       });
  //#endregion

  //#region Datos paginados en el frontend, comentado porque se debe hacer en el backend
  // const pageResults = jobs.slice(
  //   (currentPage - 1) * RESULTS_PER_PAGE,
  //   currentPage * RESULTS_PER_PAGE,
  // );
  //#endregion

  // const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

  const params = new URLSearchParams();
  if (textToFilter) params.append("text", textToFilter);
  if (filters.technology) params.append("technology", filters.technology);
  if (filters.location) params.append("type", filters.location);
  if (filters.experienceLevel) params.append("level", filters.experienceLevel);

  const offset = (currentPage - 1) * RESULTS_PER_PAGE;
  params.append("limit", RESULTS_PER_PAGE);
  params.append("offset", offset);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (filters) => {
    setCurrentPage(1);
    setFilters(filters);
  };

  const handleTextToFilter = (newtextToFilter) => {
    setTextToFilter(newtextToFilter);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      technology: "",
      location: "",
      experienceLevel: "",
    });
    setTextToFilter("");
    setCurrentPage(1);
    localStorage.removeItem("filters");
    localStorage.removeItem("textToFilter");
  };

  return {
    query: params.toString(),
    currentPage,
    RESULTS_PER_PAGE,
    hasFilters,
    filters,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextToFilter,
    handleClear,
  };
};
