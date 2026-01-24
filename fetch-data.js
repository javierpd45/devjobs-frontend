const loading = document.querySelector(".loading-container");
const jobContainer = document.querySelector(".jobs-listings");

const RESULTS_PER_PAGE = 3;

// Fetching data from data.json and creating job listing cards
async function fetchData(url) {
  const response = await fetch(url);
  const jobs = await response.json();

  if (loading) loading.remove();

  if (jobs.length === 0) {
    jobContainer.style.border = "none";
    jobContainer.innerHTML = "<h1>No hay empleos disponibles por ahora.</h1>";
    return;
  }

  return jobs;
}

const urlJobs = "./data.json";
const jobs = await fetchData(urlJobs);

jobs.forEach((job) => {
  const article = document.createElement("article");
  article.classList.add("job-listing-card");

  article.setAttribute("data-modalidad", job.data.modalidad);
  article.dataset.nivel = job.data.nivel;
  article.dataset.technology = job.data.technology;

  article.innerHTML = `<h3>${job.titulo}</h3>
        <p class="company-name">${job.empresa} | ${job.ubicacion}</p>
        <p>${job.descripcion}</p>
        <button class="button-apply-job">Aplicar</button>`;

  jobContainer.appendChild(article);
});
