# Sistema Gestionale OdV Sanitaria

Applicazione full-stack API-based per la digitalizzazione dei processi operativi di una OdV sanitaria.

Il progetto gestisce tre aree principali:
- richieste di trasporto sanitario;
- turni dei volontari;
- mezzi dell'associazione.

## Obiettivo

Centralizzare le informazioni operative, migliorare il coordinamento interno e ridurre errori, duplicazioni e comunicazioni frammentate.

## Architettura

Il sistema segue un'architettura a tre livelli:

1. **Frontend**: interfaccia web per utenti, coordinatori e amministratori.
2. **Backend**: API REST sviluppate in Python con FastAPI.
3. **Database / storage demo**: dati dimostrativi gestiti lato backend.

## Funzionalità principali

- Dashboard riepilogativa
- Login dimostrativo
- Gestione richieste di trasporto
- Gestione turni volontari
- Gestione mezzi disponibili
- API REST in formato JSON

## Endpoint API

- `GET /`
- `POST /login`
- `GET /richieste`
- `POST /richieste`
- `GET /turni`
- `GET /mezzi`

## Tecnologie

- HTML5
- CSS3
- JavaScript
- Python
- FastAPI
- REST API

## Avvio backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Il backend sarà disponibile su:

```text
http://127.0.0.1:8000
```

## Avvio frontend

Aprire il file:

```text
frontend/index.html
```

oppure usare l'estensione Live Server di VS Code.

## Documentazione

Il project work completo è disponibile nella cartella:

```text
docs/ProjectWork_OdV_Sanitaria.pdf
```

## Autrice

Beatrice Mollo
