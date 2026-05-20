const API = "http://127.0.0.1:8000";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const result = document.getElementById("login-result");

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    result.textContent = data.accesso ? `Accesso effettuato come ${data.ruolo}` : "Accesso negato";
  } catch (error) {
    result.textContent = "Avvia prima il backend FastAPI.";
  }
}

async function loadData() {
  try {
    const [richieste, turni, mezzi] = await Promise.all([
      fetch(`${API}/richieste`).then(r => r.json()),
      fetch(`${API}/turni`).then(r => r.json()),
      fetch(`${API}/mezzi`).then(r => r.json())
    ]);

    document.getElementById("tot-richieste").textContent = richieste.length;
    document.getElementById("tot-turni").textContent = turni.length;
    document.getElementById("tot-mezzi").textContent = mezzi.length;

    document.getElementById("richieste-list").innerHTML = richieste.map(r => `
      <div class="item"><strong>${r.paziente}</strong><br>${r.destinazione}<br><span class="status">${r.stato}</span></div>
    `).join("");

    document.getElementById("turni-list").innerHTML = turni.map(t => `
      <div class="item"><strong>${t.volontario}</strong><br>${t.data} - ${t.fascia}<br><span class="status">${t.stato}</span></div>
    `).join("");

    document.getElementById("mezzi-list").innerHTML = mezzi.map(m => `
      <div class="item"><strong>${m.tipo}</strong><br>${m.targa}<br><span class="status">${m.stato}</span></div>
    `).join("");
  } catch (error) {
    alert("Avvia prima il backend: cd backend && uvicorn main:app --reload");
  }
}
