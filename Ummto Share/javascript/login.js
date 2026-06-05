/* Charge le seed users si absent (data.js pas inclus ici) */
const SEED = [
  { id: 1, fullname: "Amine Ait-Said", email: "amine@ummto.dz", password: "Helper2025", major: "Informatique", year: "M1", helper: true, points: 75 },
  { id: 2, fullname: "Lina Ouali", email: "lina@ummto.dz", password: "Etudiant1", major: "Mathématiques", year: "L2", helper: false, points: 12 },
  { id: 3, fullname: "Sofiane Hamici", email: "sofiane@ummto.dz", password: "Sofiane22", major: "Génie électrique", year: "L3", helper: true, points: 42 }
];
if (!localStorage.getItem("ummto_users")) {
  localStorage.setItem("ummto_users", JSON.stringify(SEED));
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const email    = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  let ok = true;
  if (!RX_EMAIL.test(email))   { showError("email", "Email invalide."); ok = false; }
  if (password.length < 1)     { showError("password", "Mot de passe requis."); ok = false; }
  if (!ok) return;

  const users = JSON.parse(localStorage.getItem("ummto_users") || "[]");
  const user = users.find(function (u) { return u.email === email && u.password === password; });

  if (!user) {
    showFormMessage("Email ou mot de passe incorrect.", "error");
    return;
  }
  setCurrentUser(user);
  showFormMessage("Connexion réussie ! Bienvenue " + user.fullname.split(" ")[0] + ".", "success");
  setTimeout(function () { window.location.href = "resources.html"; }, 900);
});
