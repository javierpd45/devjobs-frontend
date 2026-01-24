const loading = document.querySelector(".loading-container");
const jobContainer = document.querySelector(".jobs-listings");

// Fetching data from data.json and creating job listing cards
async function fetchData() {
  const response = await fetch("./data.json");
  const jobs = await response.json();

  if (loading) loading.remove();

  if (jobs.length === 0) {
    jobContainer.style.border = "none";
    jobContainer.innerHTML = "<h1>No hay empleos disponibles por ahora.</h1>";
    return;
  }

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
}

fetchData();
