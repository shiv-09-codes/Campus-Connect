document.addEventListener("DOMContentLoaded", () => {
  console.log("Placement page loaded successfully");

  const checklistEl = document.getElementById("checklist");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  // Default checklist items — only used the first time (no saved data yet)
  const defaultItems = [
    { id: 1, label: "Resume finalized", checked: false },
    { id: 2, label: "LinkedIn profile updated", checked: false },
    { id: 3, label: "50+ DSA problems solved", checked: false },
    { id: 4, label: "1 mock interview completed", checked: false },
    { id: 5, label: "Core subject revision done", checked: false },
    { id: 6, label: "Portfolio / GitHub updated", checked: false }
  ];

  // Load saved checklist, or fall back to defaults
  let items = JSON.parse(localStorage.getItem("placementChecklist")) || defaultItems;

  function renderChecklist() {
    checklistEl.innerHTML = "";

    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "checklist-item" + (item.checked ? " checked" : "");

      div.innerHTML = `
        <input type="checkbox" id="item-${item.id}" ${item.checked ? "checked" : ""}>
        <span>${item.label}</span>
      `;

      // Toggle on click anywhere in the row, not just the checkbox
      div.addEventListener("click", () => toggleItem(item.id));

      checklistEl.appendChild(div);
    });

    updateProgress();
  }

  function toggleItem(id) {
    items = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveChecklist();
    renderChecklist();
  }

  function updateProgress() {
    const total = items.length;
    const done = items.filter(i => i.checked).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "% ready";
  }

  function saveChecklist() {
    localStorage.setItem("placementChecklist", JSON.stringify(items));
  }

  renderChecklist(); // initial render
});