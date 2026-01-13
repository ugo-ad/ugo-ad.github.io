// ============================================
// js/modals.js - Gestion des Modals & Skills
// ============================================

// FONCTIONS UTILITAIRES - MODALS
// ============================================

/** Ouvre une modal */
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  el.classList.add("active");
}

/** Ferme une modal */
function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  el.classList.remove("active");
}

// EVENT LISTENERS - Fermeture des modals
// ============================================

/** Fermer les modals avec la touche Échap */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal("skillsModal");
    closeModal("projectsModal");
  }
});

/** Fermer les modals en cliquant sur le fond */
window.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.classList.contains("modal-overlay")) {
    target.classList.remove("active");
  }
});

// RENDU DES CARTES SKILLS
// ============================================

/** Crée une carte skill */
function renderSkillCard(skill) {
  const safeSkill = skill || {};
  const card = document.createElement("div");
  card.className = "skill-card";

  const icon = document.createElement("span");
  icon.className = "skill-icon";
  icon.textContent = typeof safeSkill.icon === "string" ? safeSkill.icon : "";
  card.appendChild(icon);

  const name = document.createElement("p");
  name.className = "skill-name";
  name.textContent = typeof safeSkill.name === "string" ? safeSkill.name : "";
  card.appendChild(name);

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  const progressFill = document.createElement("div");
  progressFill.className = "progress-fill";

  const pctRaw = Number(safeSkill.progress ?? safeSkill.progress);
  const pct = Number.isFinite(pctRaw) ? Math.min(Math.max(pctRaw, 0), 100) : 0;
  progressFill.style.width = pct + "%";

  // calcul automatique du label de niveau selon le pourcentage
  function levelLabelFromPct(p) {
    if (p >= 90) return "Expert";
    if (p >= 70) return "Avancé";
    if (p >= 50) return "Intermédiaire";
    if (p >= 25) return "Débutant";
    return "Novice";
  }

  const computedLevel = levelLabelFromPct(pct);

  progressBar.appendChild(progressFill);
  card.appendChild(progressBar);

  const level = document.createElement("p");
  level.className = "skill-level";
  // prefer explicit safeSkill.level text if present, otherwise use computed label
  level.textContent = typeof safeSkill.level === "string" && safeSkill.level.trim().length > 0 ? safeSkill.level : computedLevel;
  card.appendChild(level);

  return card;
}

/** Remplit la modal skills avec les données */
function renderSkillsModal() {
  if (typeof SKILLS_DATA !== "object" || SKILLS_DATA === null) return;

  const socContainer = document.getElementById("skillsSOC");
  const forensicsContainer = document.getElementById("skillsForensics");
  const infraContainer = document.getElementById("skillsInfra");
  const scriptingContainer = document.getElementById("skillsScripting");

  if (socContainer && Array.isArray(SKILLS_DATA.soc)) {
    SKILLS_DATA.soc.forEach((skill) => socContainer.appendChild(renderSkillCard(skill)));
  }
  if (forensicsContainer && Array.isArray(SKILLS_DATA.forensics)) {
    SKILLS_DATA.forensics.forEach((skill) => forensicsContainer.appendChild(renderSkillCard(skill)));
  }
  if (infraContainer && Array.isArray(SKILLS_DATA.infra)) {
    SKILLS_DATA.infra.forEach((skill) => infraContainer.appendChild(renderSkillCard(skill)));
  }
  if (scriptingContainer && Array.isArray(SKILLS_DATA.scripting)) {
    SKILLS_DATA.scripting.forEach((skill) => scriptingContainer.appendChild(renderSkillCard(skill)));
  }
}

// INITIALISATION - Rendre les skills
// ============================================

window.addEventListener("load", renderSkillsModal);

// ============================================
// AUTO-COMMANDES TERMINAL (#projects)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash !== "#projects") return;

  const input = document.getElementById("terminalInput");
  if (!(input instanceof HTMLInputElement)) return;

  // Liste des commandes à exécuter dans l'ordre
  const commands = ["projects", "clear"];

  function dispatchEnter(value) {
    input.value = value;
    const evt = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true
    });
    input.dispatchEvent(evt);
  }

  const stepDelay = 80;
  commands.forEach((cmd, index) => {
    setTimeout(() => dispatchEnter(cmd), index * stepDelay);
  });
});
