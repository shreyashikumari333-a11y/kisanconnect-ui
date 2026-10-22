---
name: testing-kisanconnect
description: Run local KisanSetu frontend and standalone FastAPI backend browser checks.
---

# Local runtime testing

## Devin Secrets Needed
None for guest/demo frontend routes and public local health/documentation endpoints.

## Services
- Use Bun and a Vite-supported Node runtime (Node 22.12+ or 20.19+); `bun run dev` invokes Vite through Node, so selecting Node on PATH matters.
- From repository root run `bun install`, then `bun run dev`. Read the emitted origin; the shared Lovable configuration currently selects port 8080, rather than Vite's usual 5173.
- Backend setup is documented in `backend/README.md`. Reuse `backend/venv` when available; ensure `backend/.env` exists without overwriting existing configuration.
- From `backend/`, start `./venv/bin/uvicorn app.main:app --port 8000`. Without `--reload`, restart this process after Python changes.
- Run frontend production build with `bun run build`; it generates `.output/` using Nitro.

## Browser coverage
- `/`, `/marketplace`, `/equipment`, `/workers`, `/orders`, `/assistant`, `/admin`, and `/dashboard` use prototype data and permit guest viewing. Do not request real credentials or mistake these for backend-integrated flows.
- Check API JSON at `http://localhost:8000/api/health`; execute the health operation using Swagger's Try it out and Execute controls at `/docs`.
- Check `/redoc` visually. If documentation stays blank, inspect the served script URL and its CDN HTTP response rather than assuming network restrictions.
- To prove CORS, run a real fetch to the backend from the actual frontend origin in Chrome, checking HTTP status and readable JSON. A custom-header request with `credentials: 'include'` additionally exercises preflight.
- Frontend demo state persists in localStorage under `kisansetu-demo-state`; use a clean browser context if a scenario needs initial guest/demo state.
