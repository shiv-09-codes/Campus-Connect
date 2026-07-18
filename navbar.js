document.addEventListener("DOMContentLoaded", () => {
  const navbarHTML = `
    <header class="navbar">
      <h1 class="logo">Student Hub</h1>
      <nav>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="assignment.html">Assignments</a></li>
          <li><a href="notes.html">Notes</a></li>
          <li><a href="dsa.html">DSA</a></li>
          <li><a href="placement.html">Placement</a></li>
          <li><a href="profile.html">Profile</a></li>
        </ul>
      </nav>
    </header>
  `;
  document.getElementById("navbarContainer").innerHTML = navbarHTML;
  highlightActiveLink();
});

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}