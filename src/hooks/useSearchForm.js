import { useEffect, useState } from "react";

let timeoutId = null;

export const useSearchForm = (
  idTechnology,
  idLocation,
  idExperienceLevel,
  idText,
  onSearch,
  onTextToFilter,
  textToFilter,
) => {
  const [searchText, setSearchText] = useState(textToFilter);

  useEffect(() => {
    setSearchText(textToFilter);
  }, [textToFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (event.target.name === idText) {
      return; // Ya lo manejamos en onChange
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text); //actualizamos el input inmediatamente

    // Debounce: Cancelar el timeout anterior
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      onTextToFilter(text);
    }, 500); // Ejecutar la función después de 500 ms
  };

  return { searchText, handleSubmit, handleTextChange };
};
