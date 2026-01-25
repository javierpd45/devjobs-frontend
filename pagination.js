import "./fetch-data.js";

// Paginación inicial de los empleos
const currentPage = 1;
const RESULTS_PER_PAGE = 3;

const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
const endIndex = startIndex + RESULTS_PER_PAGE;

export function setupPagination(
  currentPage = 1,
  RESULTS_PER_PAGE = 3,
  jobs = document.querySelectorAll(".job-listing-card"),
) {
  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);
  // Si tienes 20 ofertas y 3 por página: Math.ceil(20/3) = 7 páginasCopiar

  const paginationContainer = document.querySelector(".pagination");

  // Limpiar la paginación existente
  paginationContainer.innerHTML = "";

  // Crear un botón por cada página
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "page-button";

    // Si es la página actual, añadir clase activa
    if (i === currentPage) {
      button.classList.add("is-active");
    }

    paginationContainer.appendChild(button);
  }
}

function initializeJobsPagination(
  jobs = document.querySelectorAll(".job-listing-card"),
) {
  jobs.forEach((job) => {
    job.classList.add("hide-job");
  });
  // Convertir NodeList a Array para poder usar slice
  const jobsArray = Array.from(jobs);
  // Mostrar los empleos de la página actual
  const jobsToShow = jobsArray.slice(startIndex, endIndex);
  jobsToShow.forEach((jobShown) => {
    jobs.forEach((job) => {
      if (job === jobShown) {
        job.classList.remove("hide-job");
      }
    });
  });
}

initializeJobsPagination();
setupPagination();
