# MedSync AI — Client

React + Vite frontend for MedSync AI. Provides auth, dashboard, medication management, notifications, AI agents, report upload/chat, and Google Calendar connect.

## Quick start
```bash
cd client
npm install
npm run dev   # http://localhost:5173
```
Run the backend from `../server` first (`npm run dev`) so API calls and Socket.IO connect.

## Environment
Create `client/.env` and point to your backend/OAuth endpoints:
```
VITE_API_BASE_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080
VITE_GOOGLE_OAUTH_LOGIN=http://localhost:8080/api/oauth/login
```
If you change backend ports or hostnames, update these values.

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview the build
- `npm run lint` – eslint check

## SWOC contributor tips
- Keep backend running while testing pages that call the API (login, meds, reports, agents).
- If you add endpoints, surface the base URL via envs (avoid hardcoded `http://localhost:8080`).
- Attach screenshots/GIFs to PRs for UI tweaks; add brief testing notes.
