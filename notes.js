// Runs once the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Notes page loaded successfully");

  const subjectInput = document.getElementById("subjectInput");
  const noteInput = document.getElementById("noteInput");
  const addBtn = document.getElementById("addBtn");
  const notesList = document.getElementById("notesList");
  const subjectFilter = document.getElementById("subjectFilter");

  // Load saved notes from localStorage, or start empty
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Rebuild the subject filter dropdown based on unique subjects
  function renderFilterOptions() {
    const subjects = [...new Set(notes.map(n => n.subject))]; // unique subjects
    subjectFilter.innerHTML = '<option value="all">All</option>';

    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectFilter.appendChild(option);
    });
  }

  // Render notes (optionally filtered by subject)
  function renderNotes() {
    const selected = subjectFilter.value;
    notesList.innerHTML = "";

    const filtered = selected === "all"
      ? notes
      : notes.filter(n => n.subject === selected);

    filtered.forEach((note) => {
      const div = document.createElement("div");
      div.className = "note-card";

      div.innerHTML = `
        <button class="note-delete" onclick="deleteNote(${note.id})">🗑️</button>
        <span class="note-subject">${note.subject}</span>
        <p class="note-text">${note.text}</p>
      `;

      notesList.appendChild(div);
    });
  }

  // Save current notes array to localStorage
  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Add a new note
  addBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    const text = noteInput.value.trim();

    if (subject === "" || text === "") return; // skip empty entries

    notes.push({
      id: Date.now(), // unique id based on timestamp
      subject,
      text
    });

    saveNotes();
    renderFilterOptions();
    renderNotes();

    subjectInput.value = "";
    noteInput.value = "";
  });

  // Delete a note by id — attached to window for inline onclick access
  window.deleteNote = function (id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderFilterOptions();
    renderNotes();
  };

  // Re-render when filter changes
  subjectFilter.addEventListener("change", renderNotes);

  // Initial render
  renderFilterOptions();
  renderNotes();
});