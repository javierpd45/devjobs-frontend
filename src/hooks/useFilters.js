import { useEffect, useState } from "react";
import { useRouter } from "./useRouter";

const RESULTS_PER_PAGE = 4;

export const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const storageFilters = localStorage.getItem("jobApp_filters");
    const params = new URLSearchParams(window.location.search);
    return {
      technology: storageFilters
        ? JSON.parse(storageFilters).technology
        : params.get("technology") || "",
      location: storageFilters
        ? JSON.parse(storageFilters).location
        : params.get("type") || "",
      experienceLevel: storageFilters
        ? JSON.parse(storageFilters).experienceLevel
        : params.get("level") || "",
    };
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    return Number.isNaN(Number(page)) || page === null ? 1 : Number(page);
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    const storageTextToFilter = localStorage.getItem("jobApp_textToFilter");
    const params = new URLSearchParams(window.location.search);
    return storageTextToFilter ? storageTextToFilter : params.get("text") || "";
  });

  const { navigateTo } = useRouter();

  const hasFilters =
    filters.technology !== "" ||
    filters.location !== "" ||
    filters.experienceLevel !== "" ||
    textToFilter !== ""
      ? true
      : false;

  // Guardar filtros en el localStorage
  useEffect(() => {
    if (hasFilters) {
      localStorage.setItem("jobApp_filters", JSON.stringify(filters));
      localStorage.setItem("jobApp_textToFilter", textToFilter);
    }
  }, [filters, textToFilter, hasFilters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (textToFilter) params.append("text", textToFilter);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.location) params.append("type", filters.location);
    if (filters.experienceLevel)
      params.append("level", filters.experienceLevel);

    if (currentPage > 1) params.append("page", currentPage);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl);
  }, [filters, currentPage, textToFilter, navigateTo]);

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
    localStorage.removeItem("jobApp_filters");
    localStorage.removeItem("jobApp_textToFilter");
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
