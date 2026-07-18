document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector(".hero h2");
  const hour = new Date().getHours();

  let greeting = "Welcome Back";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  if (heading) heading.textContent = greeting;
});