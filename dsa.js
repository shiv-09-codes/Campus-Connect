document.addEventListener("DOMContentLoaded", () => {
  const problemInput = document.getElementById("problemInput");
  const difficultyInput = document.getElementById("difficultyInput");
  const addBtn = document.getElementById("addBtn");
  const dsaList = document.getElementById("dsaList");
  const totalSolvedEl = document.getElementById("totalSolved");
  const currentStreakEl = document.getElementById("currentStreak");

  let problems = JSON.parse(localStorage.getItem("dsaProblems")) || [];

  function calculateStreak() {
    if (problems.length === 0) return 0;
    const oneDay = 24 * 60 * 60 * 1000;
    const dates = [...new Set(problems.map(p => p.date))]
      .map(d => new Date(d).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);

    const today = new Date().setHours(0, 0, 0, 0);
    let streak = 0;
    let expected = today;

    for (const date of dates) {
      const diff = Math.round((expected - date) / oneDay);
      if (diff === 0) { streak++; expected -= oneDay; }
      else if (diff === 1 && streak === 0) { streak++; expected = date - oneDay; }
      else break;
    }
    return streak;
  }

  function renderProblems() {
    if (problems.length === 0) {
      dsaList.innerHTML = `<p class="empty-state">No problems logged yet. Add your first one above.</p>`;
      totalSolvedEl.textContent = 0;
      currentStreakEl.textContent = 0;
      return;
    }
    dsaList.innerHTML = "";
    [...problems].reverse().forEach((item) => {
      const div = document.createElement("div");
      div.className = "dsa-item " + item.difficulty;
      div.innerHTML = `
        <div class="dsa-info">
          <span class="dsa-name">${item.name}</span>
          <span class="dsa-date">${item.date}</span>
        </div>
        <div>
          <span class="difficulty-badge ${item.difficulty}">${item.difficulty}</span>
          <button class="dsa-delete" onclick="deleteProblem(${item.id})">✕</button>
        </div>
      `;
      dsaList.appendChild(div);
    });
    totalSolvedEl.textContent = problems.length;
    currentStreakEl.textContent = calculateStreak();
  }

  function saveProblems() {
    localStorage.setItem("dsaProblems", JSON.stringify(problems));
  }

  function addProblem() {
    const name = problemInput.value.trim();
    const difficulty = difficultyInput.value;
    if (name === "") { problemInput.focus(); return; }
    const today = new Date().toISOString().split("T")[0];
    problems.push({ id: Date.now(), name, difficulty, date: today });
    saveProblems();
    renderProblems();
    problemInput.value = "";
    problemInput.focus();
  }

  addBtn.addEventListener("click", addProblem);
  problemInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addProblem(); });

  window.deleteProblem = function (id) {
    problems = problems.filter(p => p.id !== id);
    saveProblems();
    renderProblems();
  };

  renderProblems();
});