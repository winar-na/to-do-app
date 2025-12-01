const API = "http://localhost:3001";

function showSignup() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function togglePassword(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.type = el.type === "password" ? "text" : "password";
}

async function signupUser() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Please fill both fields.");
    return;
  }

    const res = await fetch(`${API}/users?username=${encodeURIComponent(username)}`);
  const existing = await res.json();
  if (existing.length > 0) {
    alert("Username already taken.");
    return;
  }

  await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  alert("Signup successful — please login.");
  showLogin();
}

async function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    alert("Please enter both fields.");
    return;
  }

  const res = await fetch(`${API}/users?username=${encodeURIComponent(username)}`);
  const users = await res.json();

  if (!users || users.length === 0) {
    alert("User does not exist.");
    return;
  }

  const user = users[0];
  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  localStorage.setItem("loggedUser", user.id);
  localStorage.setItem("loggedUsername", user.username);

  window.location.href = "todo.html";
}
