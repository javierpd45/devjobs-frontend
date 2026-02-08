import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

// Desactivar locaStorage para simular un entorno sin localStorage (por ejemplo, cuando el usuario tiene desactivado el almacenamiento local o en navegadores que no lo soportan)
// Object.defineProperty(window, "localStorage", { value: null });

const RESULTS_PER_PAGE = 4;

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const storageFilters = localStorage?.getItem("jobApp_filters");
    return {
      technology: storageFilters
        ? JSON.parse(storageFilters).technology
        : searchParams.get("technology") || "",
      location: storageFilters
        ? JSON.parse(storageFilters).location
        : searchParams.get("type") || "",
      experienceLevel: storageFilters
        ? JSON.parse(storageFilters).experienceLevel
        : searchParams.get("level") || "",
    };
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    const storagePage = localStorage?.getItem("jobApp_currentPage");
    return storagePage
      ? Number(storagePage)
      : Number.isNaN(Number(page)) || page === null
        ? 1
        : Number(page);
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    const storageTextToFilter = localStorage?.getItem("jobApp_textToFilter");
    return storageTextToFilter
      ? storageTextToFilter
      : searchParams.get("text") || "";
  });

  const hasFilters =
    filters.technology !== "" ||
    filters.location !== "" ||
    filters.experienceLevel !== "" ||
    textToFilter !== ""
      ? true
      : false;

  // Guardar filtros en el localStorage
  useEffect(() => {
    if (hasFilters || currentPage !== 1) {
      localStorage?.setItem("jobApp_filters", JSON.stringify(filters));
      localStorage?.setItem("jobApp_textToFilter", textToFilter);
      localStorage?.setItem("jobApp_currentPage", currentPage.toString());
    }

    if (
      // Limpiar localStorage si no hay filtros activos y estamos en la página 1
      currentPage === 1 &&
      filters.technology === "" &&
      filters.location === "" &&
      filters.experienceLevel === "" &&
      textToFilter === ""
    ) {
      localStorage?.removeItem("jobApp_filters");
      localStorage?.removeItem("jobApp_textToFilter");
      localStorage?.removeItem("jobApp_currentPage");
    }
  }, [filters, textToFilter, hasFilters, currentPage]);

  // Sincronizar los filtros con los parámetros de búsqueda en la URL
  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams(); // Limpiar los parámetros antes de establecer los nuevos para no mostrar limit y offset en la URL
      if (textToFilter) params.set("text", textToFilter);
      if (filters.technology) params.set("technology", filters.technology);
      if (filters.location) params.set("type", filters.location);
      if (filters.experienceLevel) params.set("level", filters.experienceLevel);

      if (currentPage > 1) params.set("page", currentPage);

      return params;
    });
  }, [filters, currentPage, textToFilter, setSearchParams]);

  // Calcular el offset para la paginación
  const offset = (currentPage - 1) * RESULTS_PER_PAGE;
  searchParams.set("limit", RESULTS_PER_PAGE);
  searchParams.set("offset", offset);

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

    // Limpiar los parámetros de búsqueda en la URL
    searchParams.delete("technology");
    searchParams.delete("type");
    searchParams.delete("level");
    searchParams.delete("text");
    searchParams.delete("page");

    setTextToFilter("");
    setCurrentPage(1);
    localStorage?.removeItem("jobApp_filters");
    localStorage?.removeItem("jobApp_textToFilter");
    localStorage?.removeItem("jobApp_currentPage");
  };

  return {
    query: searchParams.toString(),
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
