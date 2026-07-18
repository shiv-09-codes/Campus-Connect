document.addEventListener("DOMContentLoaded", () => {
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const dsaProblems = JSON.parse(localStorage.getItem("dsaProblems")) || [];

  const assignmentsPending = assignments.filter(a => !a.completed).length;
  const notesSaved = notes.length;
  const dsaSolved = dsaProblems.length;
  const streak = calculateDsaStreak(dsaProblems);

  document.getElementById("assignmentCount").textContent = assignmentsPending;
  document.getElementById("notesCount").textContent = notesSaved;
  document.getElementById("dsaCount").textContent = dsaSolved;
  document.getElementById("streakCount").textContent = streak;

  const assignmentsDone = assignments.filter(a => a.completed).length;
  const totalTarget = 60;
  const completed = assignmentsDone + notesSaved + dsaSolved;
  const percent = Math.min(Math.round((completed / totalTarget) * 100), 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").textContent = percent + "% complete";

  function calculateDsaStreak(problems) {
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
});