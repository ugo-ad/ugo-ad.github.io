// ============================================
// js/projects.js - Gestion des Projets
// ============================================

// Crée une carte projet
function renderProjectCard(project) {
  const safeProject = project || {};

  const card = document.createElement("div");
  card.className = "project-card";

  // Header (icon)
  const header = document.createElement("div");
  header.className = "project-header";
  header.textContent = typeof safeProject.icon === "string" ? safeProject.icon : "📦";
  card.appendChild(header);

  // Body
  const body = document.createElement("div");
  body.className = "project-body";

  const h3 = document.createElement("h3");
  h3.className = "project-title";
  h3.textContent = typeof safeProject.title === "string" ? safeProject.title : "Untitled";
  body.appendChild(h3);

  const p = document.createElement("p");
  p.className = "project-desc";
  p.textContent = typeof safeProject.shortDesc === "string" ? safeProject.shortDesc : "";
  body.appendChild(p);

  const tagList = document.createElement("div");
  tagList.className = "tag-list";

  if (Array.isArray(safeProject.tags)) {
    safeProject.tags.forEach((t) => {
      if (typeof t !== "string") return;
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagList.appendChild(span);
    });
  }

  body.appendChild(tagList);
  card.appendChild(body);

  // URL sanitization helper : http(s) ou chemins relatifs uniquement, pas de javascript:
  function isSafeUrl(u) {
    if (!u || typeof u !== "string") return false;
    const trimmed = u.trim();

    // Pas de CR/LF/tab
    if (/[\n\r\t]/.test(trimmed)) return false;

    // Si schéma explicite, n'autoriser que http(s)
    if (/^[a-z0-9+.-]+:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
      return false;
    }

    // Pas de javascript: même déguisé
    if (/^javascript:/i.test(trimmed)) return false;

    return true;
  }

  card.addEventListener("click", () => {
    const target = safeProject.url || safeProject.link || null;
    if (!target) {
      console.warn("Aucun fichier de projet local ou lien externe pour:", safeProject.id || safeProject.title);
      return;
    }

    if (!isSafeUrl(target)) {
      console.warn("URL de projet bloquée pour raisons de sécurité:", target);
      return;
    }

    // Liens absolus externes
    if (/^https?:\/\//i.test(target)) {
      window.open(target, "_blank", "noopener,noreferrer");
      return;
    }

    // Chemin relatif local
    const href = target.startsWith("/") ? target : "projects/" + target;

    // Détecter la page d'origine (welcome ou index/terminal)
    const pathname = (window.location.pathname || "").toLowerCase();
    let from = null;
    if (pathname.includes('index')) from = 'index';
    else if (pathname.includes('terminal')) from = 'terminal';

    if (from) {
      // ajouter le paramètre sans utiliser l'API URL (compatible file://)
      const sep = href.includes('?') ? '&' : '?';
      window.location.href = href + sep + 'from=' + encodeURIComponent(from);
      return;
    }

    window.location.href = href;
  });

  return card;
}

// Remplit la grille des projets
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) {
    console.error("projectGrid introuvable dans le DOM");
    return;
  }

  // Supporte les cas où PROJECTS_DATA est global ou non
  const projectsData =
    (typeof window !== "undefined" && window.PROJECTS_DATA)
      ? window.PROJECTS_DATA
      : (typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : null);

  if (!Array.isArray(projectsData)) {
    console.error("PROJECTS_DATA manquant ou invalide");
    grid.innerHTML =
      '<p style="color:#94a3b8;text-align:center;padding:40px;">Aucun projet trouvé (PROJECTS_DATA invalide).</p>';
    return;
  }

  grid.innerHTML = "";
  projectsData.forEach((project) => {
    grid.appendChild(renderProjectCard(project));
  });
}

// Init au chargement
document.addEventListener("DOMContentLoaded", renderProjects);
