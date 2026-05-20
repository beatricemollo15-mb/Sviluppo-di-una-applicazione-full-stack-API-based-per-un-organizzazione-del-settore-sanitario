from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="Sistema Gestionale OdV Sanitaria",
    description="API demo per richieste di trasporto, turni e mezzi di una OdV sanitaria.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

class Richiesta(BaseModel):
    id: int
    paziente: str
    destinazione: str
    data: str
    stato: str
    mezzo: str | None = None

richieste: List[Richiesta] = [
    Richiesta(id=1, paziente="Mario R.", destinazione="Ospedale di Varese", data="2026-05-22", stato="Programmato", mezzo="Ambulanza 01"),
    Richiesta(id=2, paziente="Anna B.", destinazione="Centro visite", data="2026-05-23", stato="Da assegnare", mezzo=None),
]

turni = [
    {"id": 1, "volontario": "Luca Verdi", "data": "2026-05-22", "fascia": "08:00-14:00", "stato": "Confermato"},
    {"id": 2, "volontario": "Sara Neri", "data": "2026-05-22", "fascia": "14:00-20:00", "stato": "Disponibile"},
    {"id": 3, "volontario": "Marco Galli", "data": "2026-05-23", "fascia": "08:00-14:00", "stato": "Da confermare"},
]

mezzi = [
    {"id": 1, "targa": "ODV-001", "tipo": "Ambulanza", "stato": "Disponibile"},
    {"id": 2, "targa": "ODV-002", "tipo": "Auto sanitaria", "stato": "In servizio"},
    {"id": 3, "targa": "ODV-003", "tipo": "Pulmino", "stato": "Manutenzione"},
]

@app.get("/")
def root():
    return {"message": "API OdV sanitaria attiva", "status": "ok"}

@app.post("/login")
def login(data: LoginRequest):
    if data.email and data.password:
        return {"accesso": True, "ruolo": "coordinatore", "utente": data.email}
    raise HTTPException(status_code=401, detail="Credenziali non valide")

@app.get("/richieste")
def get_richieste():
    return richieste

@app.post("/richieste")
def crea_richiesta(richiesta: Richiesta):
    richieste.append(richiesta)
    return {"message": "Richiesta inserita", "richiesta": richiesta}

@app.get("/turni")
def get_turni():
    return turni

@app.get("/mezzi")
def get_mezzi():
    return mezzi
