const student = requireRole("student");
function statusClass(status) { return status.toLowerCase().replaceAll(" ", "-"); }
function renderStudentRows(target, requests) {
 if (!requests.length) { target.innerHTML = '<p class="empty-state">No requests found yet. Submit your first maintenance request.</p>'; return; }
 target.innerHTML = `<table><thead><tr><th>Request</th><th>Location</th><th>Date</th><th>Status</th></tr></thead><tbody>${requests.map(r => `<tr><td><strong>${escapeHTML(r.title)}</strong><small>${escapeHTML(r.category)}</small></td><td>${escapeHTML(r.location)}</td><td>${new Date(r.createdAt).toLocaleDateString()}</td><td><span class="status ${statusClass(r.status)}">${escapeHTML(r.status)}</span></td></tr>`).join("")}</tbody></table>`;
}
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char])); }
document.addEventListener("DOMContentLoaded", () => {
 if (!student) return;
 const welcome = document.querySelector("#welcome-title"); if (welcome) welcome.textContent = `Welcome, ${student.name}`;
 const mine = () => getRequests().filter(r => r.userId === student.id).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
 const requests = mine();
 const counts = { total: requests.length, pending: requests.filter(r=>r.status==="Pending").length, progress: requests.filter(r=>r.status==="In Progress").length, completed: requests.filter(r=>r.status==="Completed").length };
 [["stat-total",counts.total],["stat-pending",counts.pending],["stat-progress",counts.progress],["stat-completed",counts.completed]].forEach(([id,value]) => { const el=document.getElementById(id); if(el) el.textContent=value; });
 const recent = document.querySelector("#recent-requests"); if(recent) renderStudentRows(recent, requests.slice(0,5));
 const list = document.querySelector("#my-requests-list"), filter = document.querySelector("#status-filter");
 if(list) { const draw=()=>renderStudentRows(list, mine().filter(r=>!filter || filter.value==="All" || r.status===filter.value)); draw(); if(filter) filter.addEventListener("change",draw); }
 const form = document.querySelector("#request-form");
 if(form) form.addEventListener("submit", event => {
  event.preventDefault(); const data = new FormData(form), title=data.get("title").trim(), category=data.get("category"), locationName=data.get("location").trim(), description=data.get("description").trim(), message=document.querySelector("#request-message");
  if(title.length<3 || !category || !locationName || description.length<10) { message.textContent="Complete all required fields. Description must be at least 10 characters."; return; }
  const all=getRequests(); all.push({ id: crypto.randomUUID(), userId:student.id, studentName:student.name, title, category, location:locationName, description, priority:data.get("priority"), status:"Pending", createdAt:new Date().toISOString() }); saveRequests(all);
  message.style.color="#16803c"; message.textContent="Request submitted successfully."; form.reset();
  setTimeout(()=>location.href="my-requests.html",700);
 });
});
