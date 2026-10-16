# AI Medical Report Analyzer

## Project Structure

```
ai-medical-report-analyzer/
├── backend/    → Spring Boot REST API (port 8080)
├── frontend/   → React + Vite SPA (port 5173)
└── AGENTS.md   → This file
```

## Backend (Spring Boot)

- **Framework:** Spring Boot 3.2+
- **Security:** Spring Security + Stateless JWT (jjwt 0.12.5)
- **Database:** PostgreSQL (`reportdb` on port 5432)
- **Entities:**
  - `User` (id, name, email, password, role, createdAt)
  - `Report` (id, title, description, status, createdAt, updatedAt)
- **API Base:** `http://localhost:8080/api`

### Running the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### API Endpoints

#### Authentication (Public)

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | /api/auth/signup       | Register a new user + JWT    |
| POST   | /api/auth/login        | Authenticate + return JWT    |

#### Reports (Protected — Requires `Authorization: Bearer <token>`)

| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| GET    | /api/reports           | List all reports    |
| GET    | /api/reports/{id}      | Get report by ID    |
| POST   | /api/reports           | Create a report     |
| PUT    | /api/reports/{id}      | Update a report     |
| DELETE | /api/reports/{id}      | Delete a report     |

## Frontend (React + Vite)

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Port:** 5173
- **Features:**
  - JWT Authentication (Signup, Login, Token storage, Auto-logout on 401/403)
  - Protected Dashboard with User Profile & Sign Out
  - Full CRUD UI for Medical Reports
  - Real-time statistics cards (Total, Pending, In Progress, Completed)

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Growth

- Add AI-powered report analysis (integrate with Gemini API)
- Add file upload for medical documents (PDF / lab scans)
- Add dashboard with charts and historical trend analytics
