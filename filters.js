import { setupPagination } from "./pagination.js";

// Paginación (valores por defecto)
const currentPage = 1;
const RESULTS_PER_PAGE = 3;
const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;

// Selección de elementos del DOM
const svgChevronDown = document.querySelector(".chevron-down");
const filters = document.querySelector(".filters");
let btnValues = []; // Array para almacenar los valores de los botones de filtro
let isShown; // Variable para controlar la visibilidad de los empleos

// Manejo de evento click en los filtros con delegación de eventos
filters?.addEventListener("click", (event) => {
  const jobs = document.querySelectorAll(".job-listing-card");
  const element = event.target;
  let jobCount = 0;

  if (
    element.closest(".filter-options") &&
    !element.tagName.toLowerCase().includes("div")
  ) {
    // Abrir o cerrar el menú desplegable (protegido si el clic es en svg/path)
    const dropdown = element.closest(".filter-options")?.querySelector("ul");
    dropdown?.classList.toggle("is-visible");
  }

  if (element.tagName.toLowerCase() === "li") {
    element.parentElement.classList.remove("is-visible");
    // Intercambio de texto del botón al filtro seleccionado
    const filterButton = element
      .closest(".filter-options")
      .querySelector("button");
    const previousText = filterButton.textContent;
    filterButton.innerHTML = element.textContent + svgChevronDown.outerHTML;
    element.textContent = previousText;

    // Intercambio de valor del botón para el filtrado
    const previousValue = filterButton.value;
    filterButton.setAttribute("value", element.getAttribute("value"));
    element.setAttribute("value", previousValue);

    //#region : Debugging - Mostrar valores intercambiados
    // console.log(
    //   `Valor de la lista -> ${element.textContent.trim()}: ` +
    //     element.getAttribute("value"),
    // );
    // console.log(
    //   `Valor del boton -> ${filterButton.textContent.trim()}: ` +
    //     filterButton.getAttribute("value"),
    // );
    // console.log("");
    //#endregion

    // Filtrado de empleos con getAtribute
    const previousFilterButtons = filters.querySelectorAll(".filter-button");
    btnValues = []; // Reiniciar el array de valores
    previousFilterButtons.forEach((btn) => {
      btnValues.push(btn.getAttribute("value").toLowerCase());
    });

    const jobsFiltered = [];
    jobs.forEach((job) => {
      const modalidad = job.getAttribute("data-modalidad").toLowerCase();
      const nivel = job.dataset.nivel.toLowerCase();
      const technology = job.dataset.technology.toLowerCase();

      isShown =
        (btnValues[0] === "" || technology.includes(btnValues[0])) &&
        (btnValues[1] === "" || modalidad.includes(btnValues[1])) &&
        (btnValues[2] === "" || nivel.includes(btnValues[2]));

      // job.classList.toggle("hide-job", !isShown);
      job.classList.add("hide-job");

      if (isShown) {
        jobsFiltered.push(job);
      }

      if (!isShown) {
        jobCount++;
      }

      //#region Alternativa con if else
      // if (
      //   filterButton.getAttribute("value") === "" ||
      //   filterButton.getAttribute("value") === modalidad
      // ) {
      //   job.classList.remove("hide-job");
      // } else {
      //   job.classList.add("hide-job");
      // }
      //#endregion
    });

    // Paginación de los empleos filtrados
    const jobsToShow = jobsFiltered.slice(startIndex, endIndex);
    jobsToShow.forEach((jobShown) => {
      jobs.forEach((job) => {
        if (job === jobShown) {
          job.classList.remove("hide-job");
        }
      });
    });

    // Antiguo filtro
    //#region : Filtrado de empleos (antiguo)
    // if (filterButton.textContent.trim().toLowerCase() === "remoto") {
    //   jobSection?.querySelectorAll("ARTICLE").forEach((article) => {
    //     if (
    //       !article.textContent.trim().toLocaleLowerCase().includes("remoto")
    //     ) {
    //       article.classList.add("hide-job");
    //     }
    //   });
    // } else if (
    //   element
    //     .closest(".filter-options")
    //     .querySelector("ul")
    //     .textContent.trim()
    //     .toLowerCase()
    //     .includes("remoto")
    // ) {
    //   jobSection?.querySelectorAll("ARTICLE").forEach((article) => {
    //     article.classList.remove("hide-job");
    //   });
    // }
    //#endregion

    // Eliminar el párrafo de resultados previo si existe
    if (document?.querySelector("#resultados-busqueda-info")) {
      document
        ?.querySelector("#resultados-de-busqueda")
        ?.removeChild(document?.querySelector("#resultados-busqueda-info"));
    }

    // Mostrar el número de resultados encontrados
    const resultadosBusqueda = document.createElement("p");
    resultadosBusqueda.id = "resultados-busqueda-info";
    resultadosBusqueda.textContent = `Mostrando ${jobs.length - jobCount} de ${jobs.length} ofertas`;
    document
      // .closest("main")
      .querySelector("#resultados-de-busqueda")
      .appendChild(resultadosBusqueda);

    // Reiniciar la paginación después del filtrado
    setupPagination(currentPage, RESULTS_PER_PAGE, jobsFiltered);
  }
});

// Cerrar los menús desplegables al hacer clic fuera de ellos
document.querySelector("html").addEventListener("click", (event) => {
  // console.log(event.target.tagName);
  if (!event.target.closest(".filter-options")) {
    filters
      .querySelectorAll("ul")
      .forEach((dropdown) => dropdown.classList.remove("is-visible"));
  }
});

// Search bar Debounce Functionality
let debounceTimeout;
const searchInput = document.querySelector("#search-input");

searchInput?.addEventListener("input", (event) => {
  // Limpiar el timeout previo
  clearTimeout(debounceTimeout);

  // Eliminar el párrafo de resultados previo si existe
  if (document?.querySelector("#resultados-busqueda-info")) {
    document
      ?.querySelector("#resultados-de-busqueda")
      ?.removeChild(document?.querySelector("#resultados-busqueda-info"));
  }

  // Establecer un nuevo timeout
  debounceTimeout = setTimeout(() => {
    // Lógica para filtrar los empleos según el texto de búsqueda
    const searchTerm = event.target.value.toLowerCase();
    const jobs = document.querySelectorAll(".job-listing-card");

    let jobCount = 0;
    const jobsFiltered = [];
    // Filtrar empleos
    jobs.forEach((job) => {
      const jobText = job.textContent.toLowerCase();
      const isVisible = jobText.includes(searchTerm);

      // job.classList.toggle("hide-job", !isVisible);
      job.classList.add("hide-job");

      if (isVisible) {
        jobsFiltered.push(job);
      }

      if (!isVisible) {
        jobCount++;
      }
    });

    // Paginación de los empleos filtrados
    const jobsToShow = jobsFiltered.slice(startIndex, endIndex);
    jobsToShow.forEach((jobShown) => {
      jobs.forEach((job) => {
        if (job === jobShown) {
          job.classList.remove("hide-job");
        }
      });
    });

    console.log(btnValues);

    // Mostrar el número de resultados encontrados
    const resultadosBusqueda = document.createElement("p");
    resultadosBusqueda.id = "resultados-busqueda-info";
    resultadosBusqueda.textContent = `Mostrando ${jobs.length - jobCount} de ${jobs.length} ofertas`;
    document
      .querySelector("#resultados-de-busqueda")
      .appendChild(resultadosBusqueda);

    // Reiniciar la paginación después del filtrado
    setupPagination(currentPage, RESULTS_PER_PAGE, jobsFiltered);
  }, 1000); // Tiempo de espera en milisegundos
});
