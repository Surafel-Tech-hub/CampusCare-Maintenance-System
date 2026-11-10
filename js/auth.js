document.addEventListener("DOMContentLoaded", () => {
 const registerForm = document.querySelector("#register-form"), loginForm = document.querySelector("#login-form");
 if (registerForm) registerForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#full-name").value.trim(), email = document.querySelector("#reg-email").value.trim().toLowerCase(), password = document.querySelector("#reg-password").value, message = document.querySelector("#register-message");
  if (!name || !email || password.length < 6) { message.textContent = "Enter your name, a valid email and a password of at least 6 characters."; return; }
  const users = getUsers();
  if (users.some(user => user.email === email)) { message.textContent = "An account with this email already exists."; return; }
  users.push({ id: crypto.randomUUID(), name, email, password, role: "student" }); saveUsers(users);
  message.style.color = "#16803c"; message.textContent = "Account created. You can now sign in."; registerForm.reset();
 });
 if (loginForm) loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim().toLowerCase(), password = document.querySelector("#password").value, message = document.querySelector("#login-message");
  const user = getUsers().find(item => item.email === email && item.password === password);
  if (!user) { message.textContent = "Email or password is incorrect."; return; }
  setCurrentUser({ id: user.id, name: user.name, email: user.email, role: user.role });
  location.href = user.role === "admin" ? "admin/dashboard.html" : "student/dashboard.html";
 });
});
