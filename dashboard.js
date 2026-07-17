// Runs once the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard page loaded successfully");

  // Dummy data — replace with real data later (localStorage / backend)
  const data = {
    assignmentsPending: 3,
    notesSaved: 12,
    dsaSolved: 45,
    streak: 7
  };

  // Update stat cards
  document.getElementById("assignmentCount").textContent = data.assignmentsPending;
  document.getElementById("notesCount").textContent = data.notesSaved;
  document.getElementById("dsaCount").textContent = data.dsaSolved;
  document.getElementById("streakCount").textContent = data.streak;

  // Calculate overall completion (example logic)
  const totalTasks = 60; // arbitrary target
  const completed = data.notesSaved + data.dsaSolved;
  const percent = Math.min(Math.round((completed / totalTasks) * 100), 100);

  // Animate progress bar
  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").textContent = percent + "% complete";
});