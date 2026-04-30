# Rongsok.in

## What This Is
Rongsok.in is a circular recycling ecosystem platform connecting waste generators (households, students) directly with traditional waste collectors. It integrates geolocation, order management, and a two-way rating system to make waste selling transparent, efficient, and reliable.

## Core Value
Building trust between waste generators and collectors through a transparent, location-based transaction system with mutual ratings.

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] User authentication with role selection (Customer or Collector)
- [ ] Collector profile setup and catalog pricing
- [ ] Geolocation-based collector search using PostGIS
- [ ] Order management system (Pickup request, photo upload, weight estimation)
- [ ] Real-time order notifications and status updates via Socket.IO
- [ ] Digital receipt generation after transaction completion
- [ ] Two-way mutual rating system (Customer <-> Collector)

### Out of Scope
- [E-Wallet / Payment Gateway Integration] — Effort significant, skip for MVP.
- [Big Data Dashboard & Analytics] — Requires volume, skip for MVP.
- [Premium Subscription Logic] — Complex billing, skip for MVP.
- [In-app Chat] — Communication via WhatsApp, skip for MVP.
- [Live GPS Tracking] — Not a priority for MVP.
- [Multi-city Expansion] — Focus only on Yogyakarta for MVP.
- [Complex Dispute System] — Too complex for early stage.

## Context
- The project targets the Yogyakarta city area, specifically university students and kos-kosan residents.
- Built for the OLIVIA competition.
- Tech Stack: Next.js frontend, Express.js backend, PostgreSQL with PostGIS, Prisma ORM, Socket.IO for real-time features.

## Constraints
- **Tech Stack**: Must use Next.js, Express.js, Prisma, PostgreSQL + PostGIS — Defined in PRD for the MVP.
- **Timeline**: Built as an MVP version for a competition submission.
- **Design**: "Sky Blue" color scheme (Tokopedia-like) — To align with PRD design system.

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Express.js Full JS Stack | Developer experience and performance | — Pending |
| PostgreSQL + PostGIS | Necessary for spatial queries (ST_DWithin, ST_Distance) | — Pending |
| Socket.IO | Required for real-time order notifications | — Pending |

## Evolution
This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-30 after initialization*
