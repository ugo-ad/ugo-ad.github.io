// ============================================
// js/terminal.js - Logique du Terminal
// ============================================

const screenEl = document.getElementById("terminalScreen");
const inputEl = document.getElementById("terminalInput");
const yearFooterEl = document.getElementById("yearFooter");

yearFooterEl.textContent = new Date().getFullYear();

const USERNAME = "cyber-analyst";

const STATE = {
  history: [],
  historyIndex: -1,
};

// ============================================
// COMMANDES DU TERMINAL
// ============================================

const COMMANDS = {
  help: {
    description: "Liste les commandes disponibles",
    handler: () => [
      { text: "Commandes disponibles:", className: "section-title" },
      { text: "  help      " + " — liste les commandes" },
      { text: "  about     " + " — présentation rapide" },
      { text: "  skills    " + " — stack & compétences (interface visuelle)" },
      { text: "  projects  " + " — projets sélectionnés (cartes visuelles)" },
      { text: "  rankings  " + " — classements CTF & certifications" },
      { text: "  contact   " + " — me contacter" },
      { text: "  clear     " + " — nettoyer le terminal" },
      { text: " " },
    ],
  },
  about: {
    description: "Présentation du profil",
    handler: () => [
      { text: "# À propos", className: "section-title" },
      { text: "" },
      { text: "  Étudiant en cybersécurité (2e année Guardia CS, France)" },
      { text: "  Spécialisé en blue team / défense & détection" },
      { text: "  Passionné par le SOC, forensique et la réponse à incident" },
      { text: " " },
      { text: "# Objectif:", className: "section-title" },
      { text: "    → Construire des systèmes résilients, et détecter les attaques" },
      { text: "    → Trouver un stage de 2–3 mois à partir de mai 2026." },
      { text: "    → Trouver une alternance 1 semaine / 2 semaines à partir de septembre 2026." },
      { text: " " },
      { text: "# Profil:", className: "section-title" },
      { text: "    • Curieux, autonome, et habitué au travail en équipe sur projets techniques." },
      { text: "    • Confortable sur Windows / Linux pour l’investigation et le durcissement." },
      { text: "    • Habitué aux CTFs, labs quotidiens et environnements réalistes." },
      { text: " " },
    ],
  },
  skills: {
    description: "Compétences avec interface visuelle",
    handler: () => {
      // Si la page contient une section `#skills`, on y scroll et on initialise le slider
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        try { skillsSection.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { }
        setTimeout(() => {
          if (typeof window.initSkillsSlider === "function") {
            window.initSkillsSlider();
          }
        }, 300);
      } else {
        // Sinon, on ouvre la modal legacy (index.html) comme auparavant
        openModal("skillsModal");
        setTimeout(() => {
          if (typeof window.initSkillsSlider === "function") {
            window.initSkillsSlider();
          }
        }, 50);
      }
      return [
        { text: "" },
        { text: "# Compétences", className: "section-title" },
        { text: "" },
        { text: "Interface complète en cours de chargement..." },
        { text: "Vue: SOC, Forensique, Infrastructure, Scripting" },
      ];
    },
  },
  projects: {
    description: "Projets avec cartes visuelles",
    handler: () => {
      openModal("projectsModal");
      return [
        { text: "" },
        { text: "# Projets", className: "section-title" },
        { text: "" },
        { text: "Galerie de projets en cours de chargement..." },
        { text: "Clic sur une carte pour ouvrir la page dédiée" },
      ];
    },
  },
  rankings: {
    description: "Accès à la page rankings (CTF & certifications)",
    handler: () => {
      window.location.href = "rankings.html?from=terminal";
      return [
        { text: "" },
        { text: "Redirection vers la page rankings..." },
      ];
    },
  },
  contact: {
    description: "Moyens de contact",
    handler: () => [
      { text: "# Contact", className: "section-title" },
      { text: "  Email:    " + "ugo.ad.contact@gmail.com", className: "output-line" },
      { text: "  GitHub:   " + "https://github.com/ugo-ad", className: "output-line" },
      { text: "  LinkedIn: " + "https://www.linkedin.com/in/ugoanglesdesrumaux/", className: "output-line" },
      { text: " " },
    ],
  },
  clear: {
    description: "Nettoie l'écran",
    handler: () => {
      screenEl.innerHTML = "";
      // Affiche le prompt vide comme un terminal prêt à saisir
      try {
        appendPromptEcho("");
      } catch (e) {
        // fallback: si appendPromptEcho non disponible, rien
        console.warn("Impossible d'afficher le prompt après clear:", e);
      }
      if (inputEl && typeof inputEl.focus === "function") inputEl.focus();
      return [];
    },
  },
};

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/** Ajoute une ligne au terminal */
function appendLine(line) {
  if (!screenEl || !line || typeof line.text !== "string") return;
  const div = document.createElement("div");
  div.classList.add("prompt-line");
  if (line.className) div.classList.add(line.className);
  div.textContent = line.text;
  screenEl.appendChild(div);
  screenEl.scrollTop = screenEl.scrollHeight;
}

/** Ajoute l'echo de la commande saisie */
function appendPromptEcho(cmd) {
  if (!screenEl) return;
  const div = document.createElement("div");
  div.classList.add("prompt-line");

  const part1 = document.createElement("span");
  part1.className = "prompt-prefix";
  part1.textContent = `┌──(${USERNAME}@portfolio)-[`;
  const path = document.createElement("span");
  path.className = "prompt-path";
  path.textContent = "~/";
  const closing = document.createElement("span");
  closing.className = "prompt-prefix";
  closing.textContent = "]";

  div.appendChild(part1);
  div.appendChild(path);
  div.appendChild(closing);
  div.appendChild(document.createElement("br"));

  const prompt = document.createElement("span");
  prompt.className = "prompt-prefix";
  prompt.textContent = "└─$";
  div.appendChild(prompt);
  div.appendChild(document.createTextNode(" "));

  const cmdSpan = document.createElement("span");
  cmdSpan.className = "cmd";
  cmdSpan.textContent = cmd || "";
  div.appendChild(cmdSpan);

  screenEl.appendChild(div);
  screenEl.scrollTop = screenEl.scrollHeight;
}

// escapeHtml pas utilisé, tu peux le supprimer ou l’utiliser si un jour tu passes à innerHTML

function handleCommand(rawInput) {
  const input = (rawInput || "").trim();
  if (!input) return;

  appendPromptEcho(input);
  STATE.history.push(input);
  STATE.historyIndex = STATE.history.length;

  const [cmd, ...rest] = input.split(" ");
  const command = (cmd || "").toLowerCase();

  if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) {
    appendLine({ text: "  Commande inconnue: '" + command + "'" });
    appendLine({ text: "  Tape 'help' pour voir les commandes disponibles." });
    return;
  }

  const result = COMMANDS[command].handler(rest);
  if (Array.isArray(result)) {
    result.forEach((line) => appendLine(line));
  }
}

function initialIntro() {
  const introLines = [
    { text: "# Portfolio – Terminal Mode", className: "section-title" },
    { text: "  Bienvenue dans mon portfolio en mode terminal." },
    { text: "  Navigue avec des commandes comme dans un shell." },
    { text: "  Tape 'help' pour afficher les commandes." },
    { text: " " },
  ];

  let i = 0;
  function typeNext() {
    if (i >= introLines.length) return;
    appendLine(introLines[i]);
    i++;
    setTimeout(typeNext, 50);
  }
  typeNext();
}

if (inputEl) {
  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = inputEl.value;
      inputEl.value = "";
      handleCommand(value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (STATE.history.length === 0) return;
      STATE.historyIndex = Math.max(0, STATE.historyIndex - 1);
      inputEl.value = STATE.history[STATE.historyIndex] || "";
      setTimeout(() => {
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }, 0);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (STATE.history.length === 0) return;
      STATE.historyIndex = Math.min(STATE.history.length, STATE.historyIndex + 1);
      inputEl.value =
        STATE.historyIndex === STATE.history.length ? "" : STATE.history[STATE.historyIndex];
      setTimeout(() => {
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }, 0);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const current = inputEl.value.trim();
      if (!current) return;
      const matches = Object.keys(COMMANDS).filter((c) =>
        c.startsWith(current.toLowerCase())
      );
      if (matches.length === 1) {
        inputEl.value = matches[0];
      }
    }
  });

  window.addEventListener("load", () => {
    inputEl.focus();
    initialIntro();
  });

  window.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement &&
      event.target.classList.contains("modal-overlay")) {
      // ne rien faire
    } else {
      inputEl.focus();
    }
  });
}