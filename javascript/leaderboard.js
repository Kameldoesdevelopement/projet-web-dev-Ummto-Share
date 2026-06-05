/* Classement des helpers avec filtre par filière. */

const tbody = document.getElementById("leaderboardBody");
const majorFilter = document.getElementById("filterMajor");
const emptyMsg = document.getElementById("emptyLeaderboard");

function renderLeaderboard() {
  const selected = majorFilter ? majorFilter.value : "all";
  const list = getUsers()
    .slice()
    .filter(function (u) { return selected === "all" || u.major === selected; })
    .sort(function (a, b) { return b.points - a.points; });

  tbody.innerHTML = "";
  if (list.length === 0) {
    if (emptyMsg) emptyMsg.hidden = false;
    return;
  }
  if (emptyMsg) emptyMsg.hidden = true;

  list.forEach(function (u, i) {
    const lvl = levelFor(u.points);
    const isMentor = lvl.name === "Mentor";
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      "<td>" + u.fullname + (u.helper ? " 🤝" : "") + (isMentor ? " <span class='seller-tag'>💼 Vendeur de cours</span>" : "") + "</td>" +
      "<td>" + u.major + "</td>" +
      "<td><span class='badge " + lvl.className + "'>" + lvl.name + "</span></td>" +
      "<td><strong>" + u.points + "</strong></td>";
    tbody.appendChild(tr);
  });
}

if (majorFilter) {
  majorFilter.addEventListener("change", renderLeaderboard);
}
renderLeaderboard();
