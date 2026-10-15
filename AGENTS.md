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
- **Database:** H2 (in-memory, dev profile) — swap to PostgreSQL/MySQL later
- **Entity:** `Report` (id, title, description, status, createdAt, updatedAt)
- **API Base:** `http://localhost:8080/api/reports`

### Running the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### API Endpoints

| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| GET    | /api/reports           | List all reports    |
| GET    | /api/reports/{id}      | Get report by ID    |
| POST   | /api/reports           | Create a report     |
| PUT    | /api/reports/{id}      | Update a report     |
| DELETE | /api/reports/{id}      | Delete a report     |

## Frontend (React + Vite)

- **Framework:** React 18 + Vite
- **Port:** 5173 (proxied to backend at 8080)
- **Features:** Full CRUD UI for Report entity

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Growth

This starter is designed to evolve into the full AI Medical Analyzer:
- Add AI-powered report analysis (integrate with Gemini/OpenAI)
- Add user authentication (Spring Security + JWT)
- Add file upload for medical documents
- Add dashboard with analytics
