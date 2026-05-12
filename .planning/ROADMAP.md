# Roadmap: Rongsok.in

## Overview
Building the MVP for Rongsok.in, focusing on robust authentication, geolocation-based searching for waste collectors, an end-to-end order management system with real-time features, and a mutual rating/receipt system.

## Phases

- [x] **Phase 1: Foundation & Auth** - DB setup, user registration, role selection, and authentication.
- [ ] **Phase 2: Collector Setup & Search** - PostGIS integration, collector catalogs, and proximity-based search.
- [ ] **Phase 3: Order Management System (OMS)** - Socket.IO real-time orders, state machine execution, and photo uploads.
- [ ] **Phase 4: Validation & Ratings** - Digital receipts, mutual ratings, and transaction history.

## Phase Details

### Phase 1: Foundation & Auth
**Goal**: Establish the backend infrastructure and secure authentication system with role selection.
**Depends on**: Nothing
**Requirements**: [AUTH-01, AUTH-02, AUTH-03, AUTH-04]
**Success Criteria**:
  1. Users can register as Customer or Collector.
  2. Secure JWT login and session handling works.
  3. Collectors can access and fill their profile setup.
**Plans**: TBD

Plans:
- [x] 01-01: Backend setup (Express, Prisma schema, PostgreSQL init)
- [x] 01-02: User Authentication API (JWT, Bcrypt)
- [x] 01-03: Frontend Auth UI and Profile Setup Forms

### Phase 2: Collector Setup & Search
**Goal**: Enable collectors to manage their catalogs and customers to find nearby collectors.
**Depends on**: Phase 1
**Requirements**: [SRCH-01, SRCH-02, SRCH-03, SRCH-04]
**Success Criteria**:
  1. Collectors can configure pricing for waste categories.
  2. Customers can view collectors sorted by distance using PostGIS.
  3. Mock premium badges render correctly.
**Plans**: TBD

Plans:
- [ ] 02-01: PostGIS setup and Geo-query API endpoints
- [ ] 02-02: Waste Category and Catalog Management API
- [ ] 02-03: Frontend Map Integration (Leaflet.js) and Search UI

### Phase 3: Order Management System (OMS)
**Goal**: Implement the core real-time transactional loop from request to weight confirmation.
**Depends on**: Phase 2
**Requirements**: [OMS-01, OMS-02, OMS-03, OMS-04, OMS-05, OMS-06]
**Success Criteria**:
  1. Customers can successfully create an order with photo upload.
  2. Collectors receive real-time notifications for incoming orders.
  3. Collectors can update order status and submit actual weight/price.
**Plans**: TBD

Plans:
- [ ] 03-01: OMS API and State Machine Logic
- [ ] 03-02: Socket.IO Server Setup and Real-time Notifications
- [ ] 03-03: Image Upload Integration (S3/Cloudinary)
- [ ] 03-04: Frontend Order Creation and Management UI

### Phase 4: Validation & Ratings
**Goal**: Finalize transactions with digital receipts and mutual feedback.
**Depends on**: Phase 3
**Requirements**: [RAT-01, RAT-02, RAT-03]
**Success Criteria**:
  1. Digital receipt is generated upon order completion.
  2. Users can rate and review each other post-transaction.
  3. Transaction history page displays accurately.
**Plans**: TBD

Plans:
- [ ] 04-01: Digital Receipt Generation API
- [ ] 04-02: Mutual Rating System and Validation API
- [ ] 04-03: Frontend Rating Pop-ups and History UI

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Auth | 3/3 | Completed | Yes |
| 2. Collector Setup & Search | 1/3 | In progress | - |
| 3. Order Management System | 0/4 | Not started | - |
| 4. Validation & Ratings | 0/3 | Not started | - |
