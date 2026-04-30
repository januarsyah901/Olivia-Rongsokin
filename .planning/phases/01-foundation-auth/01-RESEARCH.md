# Phase 1: Foundation & Auth - Research

## Context
Rongsok.in uses a Next.js frontend and an Express.js backend with Prisma and PostgreSQL. Phase 1 focuses on setting up the database schema and JWT authentication for Customer and Collector roles.

## Tech Stack & Standards
- Backend: Express.js (TypeScript)
- Frontend: Next.js App Router
- ORM: Prisma
- Auth: JWT in HTTP-only cookies

## Data Models
```prisma
model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  passwordHash  String
  role          Role
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  collectorProfile CollectorProfile?
}

enum Role {
  CUSTOMER
  COLLECTOR
}

model CollectorProfile {
  id          String @id @default(uuid())
  userId      String @unique
  user        User   @relation(fields: [userId], references: [id])
  lapakName   String
  description String?
  radiusKm    Float
  isPremium   Boolean @default(false)
}
```

## Potential Gotchas
- Sharing JWT between Express backend (API on port 3001) and Next.js frontend (on port 3000) requires properly configured CORS (`origin: 'http://localhost:3000'`) and `credentials: true`.
- Next.js Server Components need a way to read cookies and pass them or just rely on Client Components for auth calls.

## Validation Architecture
- Verify Express.js backend accepts registration requests and stores users in PostgreSQL.
- Verify login sets an HTTP-only cookie containing a valid JWT.
- Verify Next.js frontend can interact with the backend API.
