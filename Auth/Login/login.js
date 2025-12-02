const loginForm = document.querySelector("form");
const togglePassword = document.getElementById("togglePassword");

// Toggle password visibility
togglePassword?.addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this.querySelector("i");

  if (passwordInput.type === "text") {
    passwordInput.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.type = "text";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("❌ Please enter all fields.");
    return;
  }

  // Get registered user
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!registeredUser) {
    alert("❌ No user registered.");
    return;
  }

  // Compare Name + Password
  if (
    username === registeredUser.name &&
    password === registeredUser.password
  ) {
    alert(`✔️ Welcome, ${registeredUser.name}!`);

    // Save current user
    localStorage.setItem("currentUser", JSON.stringify(registeredUser));

    // Redirect by role
    if (registeredUser.role === "admin") {
      window.location.href = "../../Admin/admin.html";
    } else {
      window.location.href = "../../index.html";
    }
  } else {
    alert("❌ Invalid username or password.");
  }
});
