const svgChevronDown = document.querySelector(".chevron-down");
const filters = document.querySelector(".filters");

// Manejo de evento click en los filtros con delegación de eventos
filters?.addEventListener("click", (event) => {
  const jobs = document.querySelectorAll(".job-listing-card");
  const element = event.target;

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
    jobs.forEach((job) => {
      const modalidad = job.getAttribute("data-modalidad");
      const isShown =
        filterButton.getAttribute("value") === "" ||
        filterButton.getAttribute("value") === modalidad;
      job.classList.toggle("hide-job", !isShown);

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
