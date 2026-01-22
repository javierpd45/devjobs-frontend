// const botones = document.querySelectorAll(".button-apply-job");

// botones.forEach(boton => {
//     boton.addEventListener("click", () => {
//         boton.classList.add("is-applied");
//     });
// });

// Ejemplo Usando delegación de eventos, que es más eficiente
const jobsListingSection = document.querySelector(".jobs-listings");

// jobsListingSection?.addEventListener("click", (event) => {
//   const element = event.target;

//   if (element.classList.contains("button-apply-job")) {
//     element.classList.add("is-applied"); // Se aplica la clase CSS al botón clickeado
//   }
// });

const svgChevronDown = document.querySelector(".chevron-down");
const filters = document.querySelector(".filters");
const filterOptions = document.querySelectorAll(".filter-options");
const secondFilter = filterOptions[1];

filters?.addEventListener("click", (event) => {
  const element = event.target;

  console.log(secondFilter.querySelector("ul"));

  if (element.tagName === "BUTTON") {
    // Abrir o cerrar el menú desplegable
    element.nextElementSibling.classList.toggle("is-visible");
  }

  if (element.tagName === "LI") {
    element.parentElement.classList.remove("is-visible");
    // Cambio de texto del botón al filtro seleccionado
    const filterButton = element.parentElement.previousElementSibling;
    const previousText = filterButton.textContent;
    filterButton.innerHTML = element.textContent + svgChevronDown.outerHTML;
    element.textContent = previousText;

    // Filtrado de empleos
    if (filterButton.textContent.trim().toLowerCase() === "remoto") {
      jobsListingSection?.querySelectorAll("ARTICLE").forEach((article) => {
        if (article.textContent.trim().toLocaleLowerCase().includes("remoto")) {
          article.classList.add("hide-job");
        }
      });
    } else if (
      secondFilter
        .querySelector("ul")
        .textContent.trim()
        .toLowerCase()
        .includes("remoto")
    ) {
      jobsListingSection?.querySelectorAll("ARTICLE").forEach((article) => {
        article.classList.remove("hide-job");
      });
    }
  }
});
