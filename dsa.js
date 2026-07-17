// Runs once the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DSA page loaded successfully");

  const problemInput = document.getElementById("problemInput");
  const difficultyInput = document.getElementById("difficultyInput");
  const addBtn = document.getElementById("addBtn");
  const dsaList = document.getElementById("dsaList");
  const totalSolvedEl = document.getElementById("totalSolved");
  const currentStreakEl = document.getElementById("currentStreak");

  // Load saved problems from localStorage, or start empty
  let problems = JSON.parse(localStorage.getItem("dsaProblems")) || [];

  // Streak = consecutive days with at least one solve, counting back from today.
  // If today has no entry yet, streak stays "alive" as long as yesterday has one.
  function calculateStreak() {
    if (problems.length === 0) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const dates = [...new Set(problems.map(p => p.date))]
      .map(d => new Date(d).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a); // most recent first

    const today = new Date().setHours(0, 0, 0, 0);
    let streak = 0;
    let expected = today;

    for (const date of dates) {
      const diff = Math.round((expected - date) / oneDay);

      if (diff === 0) {
        streak++;
        expected -= oneDay;
      } else if (diff === 1 && streak === 0) {
        streak++;
        expected = date - oneDay;
      } else {
        break; // gap found, streak ends
      }
    }
    return streak;
  }

  // Render problem list + stats
  function renderProblems() {
    // Empty state
    if (problems.length === 0) {
      dsaList.innerHTML = `<p class="empty-state">No problems logged yet. Add your first one above 👆</p>`;
      totalSolvedEl.textContent = 0;
      currentStreakEl.textContent = 0;
      return;
    }

    dsaList.innerHTML = "";

    // Show most recent first
    [...problems].reverse().forEach((item) => {
      const div = document.createElement("div");
      div.className = "dsa-item " + item.difficulty; // colors whole card by difficulty

      div.innerHTML = `
        <div class="dsa-info">
          <span class="dsa-name">${item.name}</span>
          <span class="dsa-date">${item.date}</span>
        </div>
        <div>
          <span class="difficulty-badge ${item.difficulty}">${item.difficulty}</span>
          <button class="dsa-delete" onclick="deleteProblem(${item.id})">🗑️</button>
        </div>
      `;

      dsaList.appendChild(div);
    });

    totalSolvedEl.textContent = problems.length;
    currentStreakEl.textContent = calculateStreak();
  }

  // Save to localStorage
  function saveProblems() {
    localStorage.setItem("dsaProblems", JSON.stringify(problems));
  }

  // Add new solved problem
  function addProblem() {
    const name = problemInput.value.trim();
    const difficulty = difficultyInput.value;

    if (name === "") {
      problemInput.focus();
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    problems.push({
      id: Date.now(),
      name,
      difficulty,
      date: today
    });

    saveProblems();
    renderProblems();

    problemInput.value = "";
    problemInput.focus(); // ready for next entry
  }

  addBtn.addEventListener("click", addProblem);

  // Allow Enter key to submit
  problemInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addProblem();
  });

  // Delete a problem entry — attached to window for inline onclick access
  window.deleteProblem = function (id) {
    problems = problems.filter(p => p.id !== id);
    saveProblems();
    renderProblems();
  };

  renderProblems(); // initial render
});