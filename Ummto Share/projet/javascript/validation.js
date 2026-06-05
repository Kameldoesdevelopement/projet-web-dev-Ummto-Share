/* Expressions régulières et helpers de validation. */

const RX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RX_NAME  = /^[A-Za-zÀ-ÿ' -]{2,60}$/;
const RX_PWD   = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const RX_URL   = /^https?:\/\/[^\s]+\.[^\s]+/;

function showError(name, message) {
  const el = document.querySelector("[data-error-for='" + name + "']");
  if (el) el.textContent = message || "";
}

function clearErrors(form) {
  form.querySelectorAll(".error").forEach(function (e) { e.textContent = ""; });
}

function showFormMessage(text, type) {
  const box = document.getElementById("formMessage");
  if (!box) return;
  box.textContent = text;
  box.className = "form-message " + (type === "success" ? "success-bg" : "error-bg");
}
