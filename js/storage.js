/* LocalStorage data helpers. This is a learning prototype, not secure production authentication. */
const STORAGE_KEYS = { users: "campusCareUsers", requests: "campusCareRequests", currentUser: "campusCareCurrentUser" };
function readData(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (error) { console.error("Storage read failed:", error); return fallback; } }
function writeData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getUsers() { return readData(STORAGE_KEYS.users, []); }
function saveUsers(value) { writeData(STORAGE_KEYS.users, value); }
function getRequests() { return readData(STORAGE_KEYS.requests, []); }
function saveRequests(value) { writeData(STORAGE_KEYS.requests, value); }
function getCurrentUser() { return readData(STORAGE_KEYS.currentUser, null); }
function setCurrentUser(value) { writeData(STORAGE_KEYS.currentUser, value); }
function clearCurrentUser() { localStorage.removeItem(STORAGE_KEYS.currentUser); }
/* Seed a clearly labelled demo administrator once. Change these demo credentials before presentation. */
(function seedDemoAdmin() {
  const users = getUsers();
  if (!users.some(user => user.email === "admin@campus.edu")) {
    users.push({ id: "demo-admin", name: "Campus Administrator", email: "admin@campus.edu", password: "Admin123", role: "admin" });
    saveUsers(users);
  }
})();
function requireRole(role) {
  const user = getCurrentUser();
  if (!user || user.role !== role) {
    const prefix = location.pathname.includes("/student/") || location.pathname.includes("/admin/") ? "../" : "";
    location.href = prefix + "login.html";
    return null;
  }
  return user;
}
function signOut() {
  clearCurrentUser();
  const prefix = location.pathname.includes("/student/") || location.pathname.includes("/admin/") ? "../" : "";
  location.href = prefix + "index.html";
}
document.addEventListener("click", event => { if (event.target.closest("[data-logout]")) signOut(); });
