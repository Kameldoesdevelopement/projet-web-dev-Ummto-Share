/* Gestion de la session utilisateur via localStorage. */

function getCurrentUser() {
  const raw = localStorage.getItem("ummto_session");
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem("ummto_session", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("ummto_session");
  window.location.href = "../index.html";
}

/* Met à jour la barre de nav si un user est connecté. */
document.addEventListener("DOMContentLoaded", function () {
  const user = getCurrentUser();
  const navList = document.querySelector(".nav-links");
  if (!user || !navList) return;

  // Retire les liens connexion / inscription
  navList.querySelectorAll("a").forEach(function (a) {
    const href = a.getAttribute("href") || "";
    if (href.endsWith("login.html") || href.endsWith("register.html")) {
      a.parentElement.remove();
    }
  });

  const liUser = document.createElement("li");
  liUser.innerHTML = "👋 " + user.fullname.split(" ")[0] +
    " <small style='color:var(--muted)'>(" + user.points + " pts)</small>";
  navList.appendChild(liUser);

  const liOut = document.createElement("li");
  const aOut = document.createElement("a");
  aOut.href = "#";
  aOut.textContent = "Déconnexion";
  aOut.className = "btn-cta";
  aOut.addEventListener("click", function (e) { e.preventDefault(); logout(); });
  liOut.appendChild(aOut);
  navList.appendChild(liOut);
});
