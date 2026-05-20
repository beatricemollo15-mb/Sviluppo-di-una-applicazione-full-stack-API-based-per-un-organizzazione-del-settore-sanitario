const seed = {
  richieste: [
    {id: crypto.randomUUID(), nome:"Trasporto programmato Bianchi", destinazione:"Ospedale di Varese", data:"2026-05-21T09:30", priorita:"Normale", stato:"Attiva"},
    {id: crypto.randomUUID(), nome:"Dimissione assistita", destinazione:"Clinica Santa Maria", data:"2026-05-21T12:00", priorita:"Alta", stato:"Attiva"},
    {id: crypto.randomUUID(), nome:"Visita specialistica Verdi", destinazione:"ASST Sette Laghi", data:"2026-05-20T15:30", priorita:"Normale", stato:"Completata"}
  ],
  turni: [
    {id: crypto.randomUUID(), volontario:"Marco R.", ruolo:"Autista", data:"2026-05-20", fascia:"08:00 - 14:00"},
    {id: crypto.randomUUID(), volontario:"Giulia M.", ruolo:"Soccorritore", data:"2026-05-20", fascia:"14:00 - 20:00"},
    {id: crypto.randomUUID(), volontario:"Luca S.", ruolo:"Coordinatore", data:"2026-05-21", fascia:"08:00 - 16:00"}
  ],
  mezzi: [
    {id: crypto.randomUUID(), codice:"AMB-01", tipo:"Ambulanza", stato:"Disponibile"},
    {id: crypto.randomUUID(), codice:"AMB-02", tipo:"Ambulanza", stato:"In servizio"},
    {id: crypto.randomUUID(), codice:"TD-01", tipo:"Trasporto disabili", stato:"Disponibile"}
  ]
};

const storeKey = "odv-webapp-data-v2";
let data = JSON.parse(localStorage.getItem(storeKey) || "null") || seed;

function save(){ localStorage.setItem(storeKey, JSON.stringify(data)); render(); }
function reset(){ localStorage.removeItem(storeKey); data = JSON.parse(JSON.stringify(seed)); save(); }

function fmtDate(value){
  if(!value) return "";
  return new Intl.DateTimeFormat("it-IT", {dateStyle:"short", timeStyle:value.includes("T")?"short":undefined}).format(new Date(value));
}

function setView(name){
  document.querySelectorAll(".view").forEach(v => v.classList.remove("visible"));
  document.getElementById(name).classList.add("visible");
  document.querySelectorAll(".nav").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  document.getElementById("pageTitle").textContent = document.querySelector(`[data-view="${name}"]`)?.textContent || "Dashboard";
}

function itemTemplate(main, sub, badge, onDelete){
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<div><strong>${main}</strong><small>${sub}</small></div><div><span class="badge">${badge}</span><button class="danger" title="Elimina">×</button></div>`;
  div.querySelector("button").addEventListener("click", onDelete);
  return div;
}

function render(){
  document.getElementById("statRichieste").textContent = data.richieste.filter(r => r.stato !== "Completata").length;
  document.getElementById("statTurni").textContent = data.turni.length;
  document.getElementById("statMezzi").textContent = data.mezzi.filter(m => m.stato === "Disponibile").length;
  document.getElementById("statCompletate").textContent = data.richieste.filter(r => r.stato === "Completata").length;

  const requestsList = document.getElementById("requestsList");
  requestsList.innerHTML = "";
  data.richieste.forEach(r => requestsList.appendChild(itemTemplate(
    r.nome,
    `${r.destinazione}<br>${fmtDate(r.data)} · ${r.priorita}`,
    r.stato,
    () => { data.richieste = data.richieste.filter(x => x.id !== r.id); save(); }
  )));

  const shiftsList = document.getElementById("shiftsList");
  shiftsList.innerHTML = "";
  data.turni.forEach(t => shiftsList.appendChild(itemTemplate(
    t.volontario,
    `${t.ruolo}<br>${new Intl.DateTimeFormat("it-IT").format(new Date(t.data))} · ${t.fascia}`,
    "Turno",
    () => { data.turni = data.turni.filter(x => x.id !== t.id); save(); }
  )));

  const vehiclesList = document.getElementById("vehiclesList");
  vehiclesList.innerHTML = "";
  data.mezzi.forEach(m => vehiclesList.appendChild(itemTemplate(
    m.codice,
    `${m.tipo}<br>Stato: ${m.stato}`,
    m.stato,
    () => { data.mezzi = data.mezzi.filter(x => x.id !== m.id); save(); }
  )));

  const latest = document.getElementById("latestRequests");
  latest.innerHTML = "";
  data.richieste.slice(0,3).forEach(r => latest.appendChild(itemTemplate(
    r.nome, `${r.destinazione}<br>${fmtDate(r.data)}`, r.priorita, () => {}
  )));
  latest.querySelectorAll(".danger").forEach(b => b.style.display = "none");

  const today = new Date().toISOString().slice(0,10);
  const todayShifts = document.getElementById("todayShifts");
  todayShifts.innerHTML = "";
  const list = data.turni.filter(t => t.data === today);
  (list.length ? list : data.turni.slice(0,2)).forEach(t => todayShifts.appendChild(itemTemplate(
    t.volontario, `${t.ruolo}<br>${t.fascia}`, t.data === today ? "Oggi" : "Prossimo", () => {}
  )));
  todayShifts.querySelectorAll(".danger").forEach(b => b.style.display = "none");
}

document.querySelectorAll(".nav").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => setView(b.dataset.open)));
document.getElementById("resetData").addEventListener("click", reset);

document.getElementById("requestForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  data.richieste.unshift({id:crypto.randomUUID(), nome:f.get("nome"), destinazione:f.get("destinazione"), data:f.get("data"), priorita:f.get("priorita"), stato:"Attiva"});
  e.target.reset(); save();
});

document.getElementById("shiftForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  data.turni.unshift({id:crypto.randomUUID(), volontario:f.get("volontario"), ruolo:f.get("ruolo"), data:f.get("data"), fascia:f.get("fascia")});
  e.target.reset(); save();
});

document.getElementById("vehicleForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  data.mezzi.unshift({id:crypto.randomUUID(), codice:f.get("codice"), tipo:f.get("tipo"), stato:f.get("stato")});
  e.target.reset(); save();
});

document.querySelectorAll(".endpoint").forEach(btn => btn.addEventListener("click", () => {
  const type = btn.dataset.api;
  const response = {
    login: {status:200, token:"demo-jwt-token", ruolo:"coordinatore"},
    richieste: data.richieste,
    turni: data.turni,
    mezzi: data.mezzi
  }[type];
  document.getElementById("apiOutput").textContent = JSON.stringify(response, null, 2);
}));

render();
