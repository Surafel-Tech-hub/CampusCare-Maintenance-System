const admin = requireRole("admin");
function safe(value) { return String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function statusClass(value) { return value.toLowerCase().replaceAll(" ","-"); }
document.addEventListener("DOMContentLoaded", () => {
 if(!admin) return;
 const all=()=>getRequests().sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
 const total=all();
 [["admin-total",total.length],["admin-pending",total.filter(r=>r.status==="Pending").length],["admin-progress",total.filter(r=>r.status==="In Progress").length],["admin-completed",total.filter(r=>r.status==="Completed").length]].forEach(([id,n])=>{const e=document.getElementById(id);if(e)e.textContent=n;});
 const recent=document.getElementById("admin-recent"); if(recent) recent.innerHTML=tableHTML(total.slice(0,6),false);
 const list=document.getElementById("manage-requests-list"), search=document.getElementById("request-search"), filter=document.getElementById("admin-status-filter");
 function tableHTML(rows, editable) {
  if(!rows.length) return '<p class="empty-state">No maintenance requests have been submitted yet.</p>';
  return `<table><thead><tr><th>Request</th><th>Student</th><th>Location</th><th>Submitted</th><th>Status</th>${editable?'<th>Update</th>':''}</tr></thead><tbody>${rows.map(r=>`<tr><td><strong>${safe(r.title)}</strong><small>${safe(r.category)} · ${safe(r.priority)} priority</small><small>${safe(r.description)}</small></td><td>${safe(r.studentName)}</td><td>${safe(r.location)}</td><td>${new Date(r.createdAt).toLocaleDateString()}</td><td><span class="status ${statusClass(r.status)}">${safe(r.status)}</span></td>${editable?`<td><select class="row-status" data-id="${safe(r.id)}" aria-label="Update status for ${safe(r.title)}"><option ${r.status==="Pending"?"selected":""}>Pending</option><option ${r.status==="In Progress"?"selected":""}>In Progress</option><option ${r.status==="Completed"?"selected":""}>Completed</option></select><button class="text-danger delete-request" data-id="${safe(r.id)}">Delete</button></td>`:""}</tr>`).join("")}</tbody></table>`;
 }
 function draw(){ if(!list)return; const q=(search?.value||"").toLowerCase(), s=filter?.value||"All"; const rows=all().filter(r=>(s==="All"||r.status===s)&&[r.title,r.location,r.studentName,r.category].some(v=>v.toLowerCase().includes(q))); list.innerHTML=tableHTML(rows,true); }
 if(list){draw();search?.addEventListener("input",draw);filter?.addEventListener("change",draw);list.addEventListener("change",event=>{if(event.target.matches(".row-status")){const rows=getRequests(), item=rows.find(r=>r.id===event.target.dataset.id);if(item){item.status=event.target.value;saveRequests(rows);draw();}}});list.addEventListener("click",event=>{const button=event.target.closest(".delete-request");if(button&&confirm("Delete this maintenance request?")){saveRequests(getRequests().filter(r=>r.id!==button.dataset.id));draw();}});}
});
