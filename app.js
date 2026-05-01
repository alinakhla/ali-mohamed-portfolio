const projectGrid = document.querySelector("#project-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCount = document.querySelector("#project-count");

if (projectCount) {
  projectCount.textContent = window.portfolioProjects.length;
}

function getCover(project) {
  const image = project.media.find((item) => item.type === "image");
  return image ? image.src : "";
}

function renderProjects(filter = "all") {
  const projects = window.portfolioProjects.filter((project) => {
    return filter === "all" || project.category === filter;
  });

  projectGrid.innerHTML = projects
    .map((project, index) => {
      const cover = getCover(project);
      const tags = project.languages.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");
      const thumb = cover
        ? `<img src="${cover}" alt="${project.title} preview" />`
        : `<span class="placeholder-label">${project.title}</span>`;

      return `
        <article class="project-card reveal visible" style="transition-delay: ${index * 55}ms">
          <a class="project-thumb" href="project.html?id=${project.id}" aria-label="Open ${project.title}">
            ${thumb}
          </a>
          <div class="project-content">
            <div class="meta-row">
              <span>${project.category}</span>
              <span>${project.contributors.length ? `${project.contributors.length + 1} members` : "Personal Project"}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.shortDescription}</p>
            <div class="project-tags">${tags}</div>
            <a class="project-link" href="project.html?id=${project.id}">View project details</a>
          </div>
        </article>
      `;
    })
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--glow-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--glow-y", `${event.clientY}px`);
});

renderProjects();
