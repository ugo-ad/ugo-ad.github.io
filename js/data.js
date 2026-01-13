/* DONNÉES: COMPÉTENCES */
const SKILLS_DATA = {
  soc: [
    { icon: "📊", name: "SIEM", level: "Avancé", progress: 85 },
    { icon: "🔍", name: "Log Analysis", level: "Avancé", progress: 80 },
    { icon: "🎯", name: "Threat Hunting", level: "Intermédiaire+", progress: 75 },
  ],
  forensics: [
    { icon: "💾", name: "Memory Forensics", level: "Avancé", progress: 82 },
    { icon: "🔬", name: "DFIR", level: "Avancé", progress: 78 },
    { icon: "📋", name: "Artefacts Windows", level: "Avancé", progress: 80 },
  ],
  infra: [
    { icon: "🖥️", name: "Linux", level: "Expert", progress: 88 },
    { icon: "🪟", name: "Windows Server", level: "Avancé", progress: 85 },
    { icon: "🔧", name: "Networking", level: "Avancé", progress: 80 },
  ],
  scripting: [
    { icon: "🐍", name: "Python", level: "Avancé", progress: 85 },
    { icon: "⚙️", name: "PowerShell", level: "Avancé", progress: 82 },
    { icon: "🐧", name: "Bash", level: "Expert", progress: 88 },
  ],
};

/* DONNÉES: PROJETS */
const PROJECTS_DATA = [
  {
    id: "ISR-AUDIT",
    title: "Projet ISR Audit & Remédiation",
    icon: "🔐",
    shortDesc: "Audit et remédiation d'une infrastructure réseau sécurisée",
    url: "project-ISR-Audit.html",
    tags: ["Centreon", "OPNSense", "Proxmox", "Dolibarr", "PingCastle"],
  },
  {
    id: "REVERSE-CAMERA-A9",
    title: "Projet Reverse Engineering Caméra A9",
    icon: "🔬",
    shortDesc: "Projet Reverse Engineering Caméra Wifi A9",
    url: "Reverse_Camera_A9.html",
    tags: ["REVERSE Engineering", "IoT Security", "Oscilloscope", "UART/JTAG", "Burp Suite"],
  },
  {
    id: "carte-interactive",
    title: "Carte interactive",
    icon: "📝",
    shortDesc: "Carte interactive des clients, prospects et fournisseurs",
    url: "project-carte-interactive.html",
    tags: ["Python", "JavaScript", "Folium", "Tkinter", "Pandas"],
  },
  {
    id: "pentest-dvwa",
    title: "Simulation de pentest sur DVWA",
    icon: "🎯",
    shortDesc: "Projet de Pentest et d'exploitation de la DVWA",
    url: "project-pentest-dvwa.html",
    tags: ["NMAP", "XSS", "IDOR", "FILE INCLUSION", "SQL INJECTION"],
  },
];

/* DONNÉES: SLIDER COMPÉTENCES */
const SKILLS_SLIDER_DATA = [
  {
    title: "Network Forensics",
    icon: "🕸️",
    desc: "Analyse PCAP approfondie, reconstruction de flux et détection d'anomalies protocolaires.",
    tags: ["Wireshark", "NetworkMiner", "Brim", "Nmap"],
    level: 88
  },
  {
    title: "SOC & SIEM",
    icon: "🛡️",
    desc: "Surveillance temps réel et ingénierie de détection. Gestion des alertes et création de dashboards.",
    tags: ["Splunk", "Wazuh", "Kibana", "ElasticStack"],
    level: 72
  },
  {
    title: "Digital Forensics",
    icon: "🔍",
    desc: "Investigation numérique sur endpoints (Disque/RAM). Extraction de preuves forensiques.",
    tags: ["Volatility 3", "FTK Imager", "KAPE", "ALEAPP/iLEAPP"],
    level: 72
  },
  {
    title: "Scripting & Dev",
    icon: "🐍",
    desc: "Création d'outils d'analyse et automatisation des tâches du SOC.",
    tags: ["Python", "PowerShell", "Bash", "Arduino"],
    level: 60
  },
  {
    title: "OSINT & Intel",
    icon: "🌍",
    desc: "Recherche de renseignement sur les menaces et investigation en sources ouvertes.",
    tags: ["Maltego", "Sherlock", "Wayback Machine", "Google Dorks"],
    level: 50
  },
  {
    title: "Malware Triage",
    icon: "🦠",
    desc: "Analyse statique et comportementale de fichiers suspects pour qualification rapide.",
    tags: ["VirusTotal", "PDF-Parser", "Detect It Easy", "Procmon"],
    level: 35
  }
];

let currentSkillIndex = 0;

function initSkillsSlider() {
  const stackContainer = document.getElementById('skillsCardStack');
  const dotsContainer = document.getElementById('skillDots');

  if (!stackContainer) return;

  stackContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  SKILLS_SLIDER_DATA.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = `skill-card-3d ${index === 0 ? 'active' : ''}`;
    if (index === 1) card.classList.add('next');

    card.innerHTML = `
      <div class="card-icon-big">${skill.icon}</div>
      <div class="card-title-big">${skill.title}</div>
    `;
    stackContainer.appendChild(card);

    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dotsContainer.appendChild(dot);
  });

  updateSkillDetails(0);
}

function updateSkillDetails(index) {
  const skill = SKILLS_SLIDER_DATA[index];

  document.getElementById('skillIconDisplay').textContent = skill.icon;
  document.getElementById('skillTitleDisplay').textContent = skill.title;
  document.getElementById('skillDescDisplay').textContent = skill.desc;

  const tagsContainer = document.getElementById('skillTagsDisplay');
  tagsContainer.innerHTML = skill.tags.map(tag => `<span>${tag}</span>`).join('');

  const progressEl = document.getElementById('skillProgressDisplay');
  if (progressEl) progressEl.style.width = `${skill.level}%`;

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  const levelTextEl = document.getElementById('skillLevelText');
  if (levelTextEl) {
    let label = "Débutant";
    if (skill.level >= 90) label = "Expert";
    else if (skill.level >= 70) label = "Avancé";
    else if (skill.level >= 50) label = "Intermédiaire";
    else if (skill.level >= 25) label = "Débutant";
    else label = "Novice";

    levelTextEl.textContent = label;
    levelTextEl.style.color = skill.level >= 80 ? 'var(--color-teal-300)' : 'rgba(255,255,255,0.7)';
  }

  const stepSpans = document.querySelectorAll('.progress-steps-labels span');
  if (stepSpans && stepSpans.length === 5) {
    let stepIndex = 0;
    if (skill.level >= 90) stepIndex = 4;
    else if (skill.level >= 70) stepIndex = 3;
    else if (skill.level >= 50) stepIndex = 2;
    else if (skill.level >= 25) stepIndex = 1;

    stepSpans.forEach((sp, i) => {
      sp.classList.toggle('active-step', i === stepIndex);
    });
  }
}

function nextSkill() {
  if (currentSkillIndex < SKILLS_SLIDER_DATA.length - 1) {
    changeSlide(currentSkillIndex + 1);
  } else {
    changeSlide(0);
  }
}

function prevSkill() {
  if (currentSkillIndex > 0) {
    changeSlide(currentSkillIndex - 1);
  } else {
    changeSlide(SKILLS_SLIDER_DATA.length - 1);
  }
}

function changeSlide(newIndex) {
  const cards = document.querySelectorAll('.skill-card-3d');

  cards[currentSkillIndex].classList.remove('active');
  cards.forEach(c => c.classList.remove('next', 'prev'));

  cards[newIndex].classList.add('active');
  let nextIndex = (newIndex + 1) % SKILLS_SLIDER_DATA.length;
  cards[nextIndex].classList.add('next');

  currentSkillIndex = newIndex;
  updateSkillDetails(newIndex);
}
