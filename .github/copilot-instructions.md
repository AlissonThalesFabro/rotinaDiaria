# AI Coding Agent Guidelines for `rotinaDiaria`

## Project Overview
`rotinaDiaria` is a web application designed to help children organize their daily routines in a fun and educational way. The project includes:
- A static frontend (`index.html`, `styles.css`, `script.js`) for the main functionality.
- An optional React-based frontend (`frontend/`) built with Vite.
- An optional NestJS backend (`backend/`) for future expansion.
- SQLite for local data persistence, with a fallback to LocalStorage.

## Key Components
### Static Frontend
- **Location**: Root directory (`index.html`, `styles.css`, `script.js`)
- **Purpose**: Core functionality for managing routines.
- **Technologies**: Vanilla JavaScript, HTML, CSS.

### React Frontend
- **Location**: `frontend/`
- **Purpose**: Experimental React-based frontend.
- **Build Tool**: Vite.
- **Commands**:
  - Install dependencies: `npm install`
  - Start development server: `npm run dev`

### Backend
- **Location**: `backend/`
- **Purpose**: Optional NestJS backend for API and database interactions.
- **Commands**:
  - Install dependencies: `npm install`
  - Start development server: `npm run start:dev`
  - Run tests: `npm run test`

### Database
- **Primary**: SQLite (`data/app.db`)
- **Schema**: Defined in `schema.sql`.
- **Setup**:
  ```bash
  sqlite3 data/app.db < schema.sql
  ```

## Developer Workflows
### Static Frontend
- Modify `script.js` for logic updates.
- Use `styles.css` for styling changes.

### React Frontend
- Follow Vite conventions for component-based development.
- Place assets in `frontend/src/assets/`.

### Backend
- Follow NestJS module structure.
- Key modules:
  - `src/users/`: User-related logic.
  - `src/prisma/`: Database service.
  - `src/swagger/`: API documentation.

### Testing
- **Frontend**: No specific tests defined.
- **Backend**: Use Jest for unit and e2e tests.
  ```bash
  npm run test
  npm run test:e2e
  ```

## Project-Specific Conventions
- **Icons**: Use Font Awesome for activity icons.
- **Time Intervals**: Activities are scheduled in 30-minute blocks (06:00-21:30).
- **Coins System**: Tasks completion rewards users with "coins".

## Integration Points
- **Frontend-Backend Communication**: Not implemented yet; planned via REST API.
- **Database**: SQLite for local persistence; fallback to LocalStorage for the static frontend.

## Notes for AI Agents
- Focus on the static frontend for immediate contributions.
- Ensure compatibility with SQLite when modifying database logic.
- Follow existing patterns in `src/` for backend modules.
- Document any new commands or workflows in the relevant `README.md` files.

---
Feel free to iterate on this document as the project evolves.