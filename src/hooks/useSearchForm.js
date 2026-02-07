import { useEffect, useRef, useState } from "react";

export const useSearchForm = (
  idTechnology,
  idLocation,
  idExperienceLevel,
  idText,
  onSearch,
  onTextToFilter,
  textToFilter,
) => {
  const [searchText, setSearchText] = useState(() => textToFilter);
  const timeoutId = useRef(null);

  useEffect(() => {
    setSearchText(textToFilter);
  }, [textToFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Si el cambio viene del input de texto
    if (event.target.name === idText) {
      const text = event.target.value;
      setSearchText(text); //actualizamos el input inmediatamente

      // Debounce: Cancelar el timeout anterior
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        onTextToFilter(text);
      }, 500); // Ejecutar la función después de 500 ms
    }
    // Si el cambio viene de los selects
    else {
      const formData = new FormData(event.currentTarget);
      const filters = {
        technology: formData.get(idTechnology),
        location: formData.get(idLocation),
        experienceLevel: formData.get(idExperienceLevel),
      };

      onSearch(filters);
    }
  };

  return { searchText, handleSubmit };
};
