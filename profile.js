document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page loaded successfully");

  // View mode elements
  const profileView = document.getElementById("profileView");
  const avatarInitial = document.getElementById("avatarInitial");
  const viewName = document.getElementById("viewName");
  const viewBranch = document.getElementById("viewBranch");
  const viewEmail = document.getElementById("viewEmail");
  const viewBio = document.getElementById("viewBio");
  const editBtn = document.getElementById("editBtn");

  // Form elements
  const profileForm = document.getElementById("profileForm");
  const nameInput = document.getElementById("nameInput");
  const branchInput = document.getElementById("branchInput");
  const yearInput = document.getElementById("yearInput");
  const emailInput = document.getElementById("emailInput");
  const bioInput = document.getElementById("bioInput");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Default profile — used only if nothing saved yet
  const defaultProfile = {
    name: "Your Name",
    branch: "Computer Engineering",
    year: "3rd Year",
    email: "email@example.com",
    bio: "No bio added yet."
  };

  let profile = JSON.parse(localStorage.getItem("userProfile")) || defaultProfile;

  // Fill the view card with current profile data
  function renderView() {
    avatarInitial.textContent = profile.name.charAt(0).toUpperCase() || "S";
    viewName.textContent = profile.name;
    viewBranch.textContent = `${profile.branch} • ${profile.year}`;
    viewEmail.textContent = profile.email;
    viewBio.textContent = profile.bio || "No bio added yet.";
  }

  // Fill the form inputs with current profile data (for editing)
  function fillForm() {
    nameInput.value = profile.name === defaultProfile.name ? "" : profile.name;
    branchInput.value = profile.branch === defaultProfile.branch ? "" : profile.branch;
    yearInput.value = profile.year;
    emailInput.value = profile.email === defaultProfile.email ? "" : profile.email;
    bioInput.value = profile.bio === defaultProfile.bio ? "" : profile.bio;
  }

  // Switch to edit mode
  editBtn.addEventListener("click", () => {
    fillForm();
    profileView.hidden = true;
    profileForm.hidden = false;
  });

  // Cancel edit — discard changes, go back to view
  cancelBtn.addEventListener("click", () => {
    profileForm.hidden = true;
    profileView.hidden = false;
  });

  // Save changes
  saveBtn.addEventListener("click", () => {
    profile = {
      name: nameInput.value.trim() || defaultProfile.name,
      branch: branchInput.value.trim() || defaultProfile.branch,
      year: yearInput.value,
      email: emailInput.value.trim() || defaultProfile.email,
      bio: bioInput.value.trim() || defaultProfile.bio
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));

    renderView();
    profileForm.hidden = true;
    profileView.hidden = false;
  });

  renderView(); // initial render on load
});