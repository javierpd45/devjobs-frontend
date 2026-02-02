import { useId, useState } from "react";
import styles from "./SearchFormSection.module.css";
import { useSearchForm } from "../hooks/useSearchForm";

export function SearchFormSection({
  onSearch,
  onTextToFilter,
  onClear,
  hasFilters,
  filters,
  textToFilter,
}) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  // Estado para saber qué campo está enfocado
  const [focusedField, setFocusedField] = useState(null);

  const { searchText, handleSubmit, handleTextChange } = useSearchForm(
    idTechnology,
    idLocation,
    idExperienceLevel,
    idText,
    onSearch,
    onTextToFilter,
    textToFilter,
  );

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    const newFilters = {
      ...filters, // mantén los demás valores
      [name]: value, // actualiza solo el que cambió
    };

    onSearch(newFilters);
  };

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form
        onSubmit={handleSubmit}
        onChange={handleSubmit}
        id="empleos-search-form"
        role="search"
      >
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            name={idText}
            id="empleos-search-input"
            type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
            value={searchText}
            onBlur={() => setFocusedField(null)}
            onFocus={() => setFocusedField(idText)}
            className={focusedField === idText ? styles.inputFocused : ""}
          />
        </div>

        <div className="search-filters">
          <select
            name={idTechnology}
            id="filter-technology"
            value={filters.technology}
            onChange={handleSelectChange}
          >
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select
            name={idLocation}
            id="filter-location"
            value={filters.location}
            onChange={handleSelectChange}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            name={idExperienceLevel}
            id="filter-experience-level"
            value={filters.experienceLevel}
            onChange={handleSelectChange}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={(event) => {
                event.currentTarget.form.reset(); // Esto limpia los inputs/selects visualmente
                onClear(); // Esto limpia el estado e internamente los filtros
              }}
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
