# Gestionale OdV Sanitaria

Prototipo web app per la digitalizzazione dei processi operativi di una organizzazione di volontariato sanitario.

## Funzionalità

- Dashboard con statistiche operative
- Gestione richieste di trasporto sanitario
- Pianificazione turni volontari
- Gestione mezzi
- Simulazione API REST
- Sezione documentazione

## Pubblicazione con GitHub Pages

Il file `index.html` è nella root del repository, quindi GitHub Pages può pubblicarlo direttamente.

Impostazioni consigliate:

- Source: Deploy from a branch
- Branch: main
- Folder: /root

## Endpoint demo

- `POST /login`
- `GET /richieste`
- `GET /turni`
- `GET /mezzi`

## Nota

Questa versione è una web app frontend dimostrativa: i dati vengono salvati nel browser tramite `localStorage`.
