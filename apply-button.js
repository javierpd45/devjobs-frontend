const jobsListingSection = document.querySelector(".jobs-listings");

jobsListingSection.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.classList.add("is-applied"); // Se aplica la clase CSS al botón clickeado
  }
});

// - Comentarios con otros eventos interesantes

// Ejemplo Usando delegación de eventos, que es más eficiente
//#region : Ejemplo Manejo de evento click con delegación de eventos
// const jobSection = document.querySelector(".jobSection-listings");
// jobSection?.addEventListener("click", (event) => {
//   const element = event.target;

//   if (element.classList.contains("button-apply-job")) {
//     element.classList.add("is-applied"); // Se aplica la clase CSS al botón clickeado
//   }
// });
//#endregion

//#region: Ejemplos de manejo de eventos en formularios
// Ejemplo: Manejo de evento focusout en el formulario de búsqueda
// const searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("focusout", (event) => {
//   console.log("focusout event detected");
// });

// Ejemplo: Manejo de evento submit en el formulario de búsqueda
// y prevención del comportamiento por defecto
// const searchForm = document.querySelector("#search-form");

// searchForm?.addEventListener("submit", (event) => {
//   event.preventDefault();

//   console.log("se envio el formulario de búsqueda");
// });

//#endregion
