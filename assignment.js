document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("assignmentInput");
  const dateInput = document.getElementById("dueDateInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("assignmentList");

  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  function renderAssignments() {
    if (assignments.length === 0) {
      list.innerHTML = `<p class="empty-state">No assignments yet. Add your first one above.</p>`;
      return;
    }
    list.innerHTML = "";
    assignments.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "assignment-item" + (item.completed ? " completed" : "");
      div.innerHTML = `
        <div class="assignment-info">
          <span class="assignment-name">${item.name}</span>
          <span class="assignment-due">Due: ${item.due || "No date set"}</span>
        </div>
        <div class="assignment-actions">
          <button onclick="toggleComplete(${index})">✓</button>
          <button onclick="deleteAssignment(${index})">✕</button>
        </div>
      `;
      list.appendChild(div);
    });
  }

  function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  function addAssignment() {
    const name = input.value.trim();
    const due = dateInput.value;
    if (name === "") { input.focus(); return; }
    assignments.push({ name, due, completed: false });
    saveAssignments();
    renderAssignments();
    input.value = "";
    dateInput.value = "";
    input.focus();
  }

  addBtn.addEventListener("click", addAssignment);
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") addAssignment(); });

  window.toggleComplete = function (index) {
    assignments[index].completed = !assignments[index].completed;
    saveAssignments();
    renderAssignments();
  };

  window.deleteAssignment = function (index) {
    assignments.splice(index, 1);
    saveAssignments();
    renderAssignments();
  };

  renderAssignments();
});