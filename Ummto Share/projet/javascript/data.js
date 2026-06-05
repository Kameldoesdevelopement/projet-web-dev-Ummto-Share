/* Données initiales : utilisateurs et ressources.
   Stockées en localStorage pour persister entre les pages. */

const SEED_USERS = [
  { id: 1, fullname: "Belaicha Kamel",         email: "kamel@ummto.dz",   password: "Helper2025", major: "Informatique",     year: "M2", helper: true, points: 142 },
  { id: 2, fullname: "Terki Said",             email: "said@ummto.dz",    password: "Said1234",   major: "Génie électrique", year: "M1", helper: true, points: 118 },
  { id: 3, fullname: "Mohammed Seghir Dalia",  email: "dalia@ummto.dz",   password: "Dalia2025",  major: "Mathématiques",    year: "M2", helper: true, points: 96  },
  { id: 4, fullname: "Toumert Maya",           email: "maya@ummto.dz",    password: "Maya2025",   major: "Biologie",         year: "L3", helper: true, points: 64  },
  { id: 5, fullname: "Leticia",                email: "leticia@ummto.dz", password: "Leticia25",  major: "Physique",         year: "L3", helper: true, points: 48  }
];

const SEED_RESOURCES = [
  { id: 1, title: "Cours d'Algorithmique L1",       major: "Informatique",     type: "Cours",  description: "Notes complètes du semestre 1 : variables, conditions, boucles, complexité.", link: "https://example.com/algo-l1.pdf",   author: "Belaicha Kamel",        helpful: 24, date: "2025-10-12" },
  { id: 2, title: "TD Analyse 1 — Suites & limites",major: "Mathématiques",    type: "TD",     description: "Série de 20 exercices corrigés sur les suites numériques.",                    link: "https://example.com/td-analyse.pdf",author: "Mohammed Seghir Dalia", helpful: 18, date: "2025-11-02" },
  { id: 3, title: "Examen Électronique 2024",       major: "Génie électrique", type: "Examen", description: "Sujet d'examen final 2024 + corrigé détaillé.",                                 link: "https://example.com/exam-elec.pdf", author: "Terki Said",            helpful: 21, date: "2025-09-30" },
  { id: 4, title: "Projet Web — Site e-commerce",   major: "Informatique",     type: "Projet", description: "Code source d'un mini site e-commerce HTML/CSS/JS.",                            link: "https://example.com/projet-web.zip",author: "Belaicha Kamel",        helpful: 17, date: "2025-12-01" },
  { id: 5, title: "Cours Mécanique du point",       major: "Physique",         type: "Cours",  description: "Polycopié : cinématique, dynamique, énergétique.",                              link: "https://example.com/meca.pdf",      author: "Leticia",               helpful: 9,  date: "2025-10-20" },
  { id: 6, title: "TP Biologie cellulaire",         major: "Biologie",         type: "TD",     description: "Compte-rendu de TP : observation au microscope, mitose, méiose.",               link: "https://example.com/tp-bio.pdf",    author: "Toumert Maya",          helpful: 11, date: "2025-11-15" }
];

/*change la clé pour ré-initialiser les données quand le seed évolue. */
const USERS_KEY = "ummto_users_v3";
const RESOURCES_KEY = "ummto_resources_v3";

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return [...SEED_USERS];
  }
  return JSON.parse(raw);
}
function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

function getResources() {
  const raw = localStorage.getItem(RESOURCES_KEY);
  if (!raw) {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(SEED_RESOURCES));
    return [...SEED_RESOURCES];
  }
  return JSON.parse(raw);
}
function saveResources(list) {
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
}

function levelFor(points) {
  if (points >= 100) return { name: "Mentor", className: "badge-mentor" };
  if (points >= 60)  return { name: "Or",     className: "badge-gold" };
  if (points >= 30)  return { name: "Argent", className: "badge-silver" };
  if (points >= 10)  return { name: "Bronze", className: "badge-bronze" };
  return { name: "Newbie", className: "badge-newbie" };
}
