document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const fullname = document.getElementById("fullname").value.trim();
  const email    = document.getElementById("email").value.trim().toLowerCase();
  const major    = document.getElementById("major").value;
  const year     = document.getElementById("year").value;
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirm").value;
  const helper   = document.getElementById("helper").checked;

  let ok = true;
  if (!RX_NAME.test(fullname))  { showError("fullname", "Nom invalide (lettres uniquement)."); ok = false; }
  if (!RX_EMAIL.test(email))    { showError("email", "Email invalide."); ok = false; }
  if (!major)                   { showError("major", "Choisis ta filière."); ok = false; }
  if (!year)                    { showError("year", "Choisis ton année."); ok = false; }
  if (!RX_PWD.test(password))   { showError("password", "8+ caractères, 1 majuscule, 1 chiffre."); ok = false; }
  if (password !== confirm)     { showError("confirm", "Les mots de passe ne correspondent pas."); ok = false; }
  if (!ok) return;

  const users = JSON.parse(localStorage.getItem("ummto_users") || "[]");
  if (users.some(function (u) { return u.email === email; })) {
    showError("email", "Cet email est déjà utilisé.");
    return;
  }

  const newUser = {
    id: Date.now(),
    fullname: fullname, email: email, password: password,
    major: major, year: year, helper: helper, points: 0
  };
  users.push(newUser);
  localStorage.setItem("ummto_users", JSON.stringify(users));
  setCurrentUser(newUser);

  showFormMessage("Inscription réussie ! Redirection…", "success");
  setTimeout(function () { window.location.href = "resources.html"; }, 1100);
});

/* Initialise le seed users s'il n'existe pas */
if (typeof getUsers === "function") { /* noop */ }
if (!localStorage.getItem("ummto_users")) {

}
