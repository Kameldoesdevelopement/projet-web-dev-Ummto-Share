const user = getCurrentUser();
const form = document.getElementById("uploadForm");
const gate = document.getElementById("authGate");

if (!user) {
  gate.hidden = false;
  form.querySelectorAll("input, select, textarea, button").forEach(function (el) {
    el.disabled = true;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const title = document.getElementById("title").value.trim();
  const major = document.getElementById("major").value;
  const type  = document.getElementById("type").value;
  const desc  = document.getElementById("description").value.trim();
  const link  = document.getElementById("link").value.trim();

  let ok = true;
  if (title.length < 4)      { showError("title", "Titre trop court (4 caractères minimum)."); ok = false; }
  if (!major)                { showError("major", "Choisis une filière."); ok = false; }
  if (!type)                 { showError("type", "Choisis un type."); ok = false; }
  if (desc.length < 10)      { showError("description", "Description trop courte."); ok = false; }
  if (!RX_URL.test(link))    { showError("link", "URL invalide (doit commencer par http(s)://)."); ok = false; }
  if (!ok) return;

  const resources = getResources();
  resources.unshift({
    id: Date.now(),
    title: title, major: major, type: type, description: desc,
    link: link, author: user.fullname, helpful: 0,
    date: new Date().toISOString().slice(0, 10)
  });
  saveResources(resources);

  // Récompense : +5 points
  const users = getUsers();
  const me = users.find(function (u) { return u.id === user.id; });
  if (me) {
    me.points += 5;
    saveUsers(users);
    setCurrentUser(me);
  }

  showFormMessage("Ressource publiée ! +5 points 🎉", "success");
  form.reset();
  setTimeout(function () { window.location.href = "resources.html"; }, 1200);
});
