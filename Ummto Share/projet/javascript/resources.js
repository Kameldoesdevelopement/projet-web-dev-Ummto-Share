/* Affichage dynamique des ressources avec filtrage côté client. */

const list = document.getElementById("resourceList");
const empty = document.getElementById("emptyState");
const fMajor = document.getElementById("filterMajor");
const fType  = document.getElementById("filterType");
const fSearch = document.getElementById("filterSearch");

function render() {
  const all = getResources();
  const m = fMajor.value;
  const t = fType.value;
  const q = fSearch.value.trim().toLowerCase();

  const filtered = all.filter(function (r) {
    if (m !== "all" && r.major !== m) return false;
    if (t !== "all" && r.type !== t) return false;
    if (q && !(r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))) return false;
    return true;
  });

  list.innerHTML = "";
  if (filtered.length === 0) { empty.hidden = false; return; }
  empty.hidden = true;

  filtered.forEach(function (r) {
    const card = document.createElement("article");
    card.className = "resource-card";
    card.innerHTML =
      "<div class='resource-meta'>" +
        "<span class='tag'>" + r.major + "</span>" +
        "<span class='tag type'>" + r.type + "</span>" +
      "</div>" +
      "<h3>" + r.title + "</h3>" +
      "<p class='resource-desc'>" + r.description + "</p>" +
      "<div class='resource-foot'>" +
        "<span>par <strong>" + r.author + "</strong></span>" +
        "<button class='helpful-btn' data-id='" + r.id + "'>👍 Utile (" + r.helpful + ")</button>" +
      "</div>" +
      "<a href='" + r.link + "' target='_blank' rel='noopener' class='btn btn-primary' style='text-align:center'>Télécharger</a>";
    list.appendChild(card);
  });

  list.querySelectorAll(".helpful-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"), 10);
      markHelpful(id);
    });
  });
}

function markHelpful(id) {
  const user = getCurrentUser();
  if (!user) {
    alert("Connecte-toi pour marquer une ressource comme utile.");
    return;
  }
  const key = "ummto_voted_" + user.id;
  const voted = JSON.parse(localStorage.getItem(key) || "[]");
  if (voted.includes(id)) {
    alert("Tu as déjà voté pour cette ressource.");
    return;
  }
  voted.push(id);
  localStorage.setItem(key, JSON.stringify(voted));

  const resources = getResources();
  const r = resources.find(function (x) { return x.id === id; });
  if (!r) return;
  r.helpful += 1;
  saveResources(resources);

  // Récompense l'auteur (+2 pts par "utile" reçu)
  const users = getUsers();
  const author = users.find(function (u) { return u.fullname === r.author; });
  if (author) {
    author.points += 2;
    saveUsers(users);
    if (user.id === author.id) {
      user.points = author.points;
      setCurrentUser(user);
    }
  }
  render();
}

[fMajor, fType, fSearch].forEach(function (el) {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});
render();
