// Runs once the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Assignment page loaded successfully");

  const input = document.getElementById("assignmentInput");
  const dateInput = document.getElementById("dueDateInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("assignmentList");

  // Load saved assignments from localStorage, or start empty
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  // Render all assignments to the page
  function renderAssignments() {
    list.innerHTML = ""; // clear before re-render

    assignments.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "assignment-item" + (item.completed ? " completed" : "");

      div.innerHTML = `
        <div class="assignment-info">
          <span class="assignment-name">${item.name}</span>
          <span class="assignment-due">Due: ${item.due || "No date set"}</span>
        </div>
        <div class="assignment-actions">
          <button onclick="toggleComplete(${index})">✅</button>
          <button onclick="deleteAssignment(${index})">🗑️</button>
        </div>
      `;

      list.appendChild(div);
    });
  }

  // Save current state to localStorage
  function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  // Add new assignment
  addBtn.addEventListener("click", () => {
    const name = input.value.trim();
    const due = dateInput.value;

    if (name === "") return; // don't add empty entries

    assignments.push({ name, due, completed: false });
    saveAssignments();
    renderAssignments();

    input.value = "";
    dateInput.value = "";
  });

  // Toggle complete/incomplete — attached to window so inline onclick can access it
  window.toggleComplete = function (index) {
    assignments[index].completed = !assignments[index].completed;
    saveAssignments();
    renderAssignments();
  };

  // Delete an assignment
  window.deleteAssignment = function (index) {
    assignments.splice(index, 1);
    saveAssignments();
    renderAssignments();
  };

  renderAssignments(); // initial render on load
});