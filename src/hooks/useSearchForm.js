import { useState } from "react";

export const useSearchForm = (
  idTechnology,
  idLocation,
  idExperienceLevel,
  onSearch,
  onTextFilter,
) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    onTextFilter(text);
  };

  return { searchText, handleSubmit, handleTextChange };
};
