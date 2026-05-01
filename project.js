const detailRoot = document.querySelector("#project-detail");
const params = new URLSearchParams(window.location.search);
const project = window.portfolioProjects.find((item) => item.id === params.get("id"));

function list(items) {
  return items.length ? items.map((item) => `<span>${item}</span>`).join("") : "<span>Not specified yet</span>";
}

function renderMedia(media) {
  if (!media.length) {
    return `
      <article class="detail-media-card media-placeholder">
        <span>Add screenshots or videos for this project in data/projects.js</span>
      </article>
    `;
  }

  return media
    .map((item, index) => {
      const label = `Media ${index + 1}`;

      if (item.type === "video") {
        return `
          <article class="detail-media-card">
            <video src="${item.src}" controls poster="${item.poster || ""}"></video>
            <span class="media-badge">${label}</span>
          </article>
        `;
      }

      return `
        <article class="detail-media-card">
          <img src="${item.src}" alt="${item.alt}" />
          <span class="media-badge">${label}</span>
        </article>
      `;
    })
    .join("");
}

function renderContributors(project) {
  const contributors = project.contributors.length ? project.contributors : ["Team Collaboration"];

  return contributors
    .map((name) => {
      const githubLink = name === "Team Collaboration" ? "" : `<a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>`;
      return `
        <div class="contributor-row">
          <span>${name}</span>
          ${githubLink}
        </div>
      `;
    })
    .join("");
}

function renderMoreProjects(currentProject) {
  return window.portfolioProjects
    .filter((item) => item.id !== currentProject.id)
    .slice(0, 4)
    .map((item) => `<a href="project.html?id=${item.id}">${item.title}</a>`)
    .join("");
}

if (!project) {
  detailRoot.innerHTML = `
    <section class="empty-state">
      <h1>Project not found</h1>
      <p>Return to the project archive and choose an available project.</p>
      <a class="button primary" href="index.html#projects">Back to Projects</a>
    </section>
  `;
} else {
  const teamLabel = project.contributors.length ? "Team Collaboration" : "Team Collaboration";
  const finalProjectButton = project.finalLink
    ? `<a class="button primary" href="${project.finalLink}" target="_blank" rel="noreferrer">Open Final Project</a>`
    : `<span class="button secondary">Final project link coming soon</span>`;

  document.title = `${project.title} | Hassan Ahmed Portfolio`;
  detailRoot.innerHTML = `
    <a class="detail-back" href="index.html#projects">Back to portfolio</a>

    <section class="detail-hero-block reveal visible">
      <p class="eyebrow">${teamLabel}</p>
      <h1>${project.title}</h1>
      <p>${project.shortDescription}</p>
      <div class="quick-facts detail-tags">
        <span>Software Engineer</span>
        <span>${project.category}</span>
        <span>${teamLabel}</span>
      </div>
    </section>

    <section class="detail-showcase">
      <div class="detail-media-grid">
        ${renderMedia(project.media)}
      </div>

      <aside class="summary-card">
        <p class="eyebrow">Project Summary</p>
        <h3>Outcome</h3>
        <p>${project.longDescription}</p>
        <h3>Problem</h3>
        <p>
          The challenge was turning course concepts into a clear working project with understandable
          structure, practical flows, and enough polish to present as part of a Computer Science portfolio.
        </p>
        <h3>What I Practiced</h3>
        <p>
          This project strengthened ${project.skillsLearned.slice(0, 5).join(", ") || "software engineering"}
          through implementation, testing, and iteration.
        </p>
        <div class="contact-actions">${finalProjectButton}</div>
      </aside>
    </section>

    <section class="detail-lower-grid">
      <article class="stack-card">
        <p class="eyebrow">Stack</p>
        <h3>Programming Languages</h3>
        <div class="pill-list">${list(project.languages)}</div>
        <h3>Libraries / Tools</h3>
        <div class="pill-list">${list(project.libraries)}</div>
        <h3>Skills Learned</h3>
        <div class="pill-list">${list(project.skillsLearned)}</div>
      </article>

      <article class="contributors-card">
        <p class="eyebrow">Contributors</p>
        ${renderContributors(project)}
      </article>
    </section>

    <section class="more-projects-card">
      <p class="eyebrow">More Projects</p>
      <div class="more-projects-list">${renderMoreProjects(project)}</div>
    </section>
  `;
}

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--glow-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--glow-y", `${event.clientY}px`);
});
