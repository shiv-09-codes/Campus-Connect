document.addEventListener("DOMContentLoaded", () => {
  const subjectInput = document.getElementById("subjectInput");
  const noteInput = document.getElementById("noteInput");
  const addBtn = document.getElementById("addBtn");
  const notesList = document.getElementById("notesList");
  const subjectFilter = document.getElementById("subjectFilter");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function renderFilterOptions() {
    const subjects = [...new Set(notes.map(n => n.subject))];
    subjectFilter.innerHTML = '<option value="all">All</option>';
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectFilter.appendChild(option);
    });
  }

  function renderNotes() {
    const selected = subjectFilter.value;
    const filtered = selected === "all" ? notes : notes.filter(n => n.subject === selected);

    if (filtered.length === 0) {
      notesList.innerHTML = `<p class="empty-state">No notes yet. Add one above.</p>`;
      return;
    }

    notesList.innerHTML = "";
    filtered.forEach((note) => {
      const div = document.createElement("div");
      div.className = "note-card";
      div.innerHTML = `
        <button class="note-delete" onclick="deleteNote(${note.id})">✕</button>
        <span class="note-subject">${note.subject}</span>
        <p class="note-text">${note.text}</p>
      `;
      notesList.appendChild(div);
    });
  }

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function addNote() {
    const subject = subjectInput.value.trim();
    const text = noteInput.value.trim();
    if (subject === "" || text === "") return;
    notes.push({ id: Date.now(), subject, text });
    saveNotes();
    renderFilterOptions();
    renderNotes();
    subjectInput.value = "";
    noteInput.value = "";
    subjectInput.focus();
  }

  addBtn.addEventListener("click", addNote);

  window.deleteNote = function (id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderFilterOptions();
    renderNotes();
  };

  subjectFilter.addEventListener("change", renderNotes);

  renderFilterOptions();
  renderNotes();
});