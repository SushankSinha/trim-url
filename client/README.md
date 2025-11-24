# Trim URL — README

A minimal URL shortener project (React + Vite frontend, Express + Postgres backend).

This README explains functionality, setup, folder layout, available scripts, and environment variables. A `.env.example` file is included at project root — copy it to `.env` and fill values.

---

## Functionality (what this repo does)
- Create short 5-character alphanumeric codes that map to long URLs.
- Optional custom 5-character code on creation (validated).
- Redirect endpoint that forwards to the original URL and tracks clicks + last clicked timestamp.
- Simple admin UI to create links, list links, view stats and delete links.
- Health check endpoint for server status.
- Rate limiting applied to API (health checks are excluded).

Frontend notes:
- UI components mimic Ant Design styles but use only vanilla CSS (no Tailwind / no external UI libs).
- Responsive layout and custom components: inputs, buttons, table, badges, toasts.

---

## Quick start (development)

1. Copy environment template
   - At repo root: copy `.env.example` -> `.env` and fill in values.

2. Start Postgres (local or remote) and set `DATABASE_URL` in `.env`.

3. Install dependencies and run server:
   - Open terminal in `server` folder (Windows example)
     - npm install
     - npm run dev   # or `node index.js` (or use nodemon)

4. Install dependencies and run client:
   - Open terminal in `client` folder
     - npm install
     - npm run dev   # starts Vite dev server

By default the server mounts API under `/api`. The frontend expects a base env variable (see `.env.example` / Vite usage).

---

## Environment variables (.env.example)
Contents of `.env.example` (project root) — copy to `.env`:

- SERVER_PORT=4000
- CLIENT_URL=http://localhost:5173
- DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
- SESSION_SECRET=your_session_secret
- NODE_ENV=development

---

## Folder layout
- `client/` - React + Vite frontend
- `server/` - Express + Postgres backend

---

## Available scripts
- `dev` - Start both client and server in development mode.
- `build` - Build client and server for production.
- `start` - Start server in production mode.
- `lint` - Run ESLint on the codebase.

---

## Troubleshooting
Common issues and their solutions:

- **Postgres connection errors**: Ensure Postgres is running and `DATABASE_URL` is correct.
- **Port already in use**: Change `SERVER_PORT` in `.env` and update your client `VITE_API_BASE` accordingly.
- **CORS issues**: Ensure `CLIENT_URL` is set correctly in `.env`.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- Inspired by other URL shortener services.
- Uses [Vite](https://vitejs.dev/) for fast development.
- [React Query](https://react-query.tanstack.com/) for data fetching and state management.
- [Express](https://expressjs.com/) for the backend framework.
- [PostgreSQL](https://www.postgresql.org/) as the database.
