# Phase 1: Validation Strategy

## Dimensions

### 1. Functional
- [ ] User can register with name, email, password, and role.
- [ ] User can login and receive HTTP-only cookie.
- [ ] Collector is prompted to complete profile after registration.

### 2. Integration
- [ ] Next.js can send requests to Express API on port 3001.
- [ ] Express API successfully connects to PostgreSQL via Prisma.

### 8. Nyquist (System Level)
- [ ] JWT authentication allows stateless sessions across server restarts.
- [ ] Passwords are never returned in API responses.
