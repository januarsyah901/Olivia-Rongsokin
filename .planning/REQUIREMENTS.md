# Requirements: Rongsok.in

**Defined:** 2026-04-30
**Core Value:** Building trust between waste generators and collectors through a transparent, location-based transaction system with mutual ratings.

## v1 Requirements

### Authentication & Role Selection
- [ ] **AUTH-01**: User can select role (Customer or Collector) during registration
- [ ] **AUTH-02**: User can sign up with name, email, and password
- [ ] **AUTH-03**: Collector directed to profile setup after registration
- [ ] **AUTH-04**: User can login and logout securely (JWT)

### Discovery & Search
- [ ] **SRCH-01**: Customer can search collectors by waste category
- [ ] **SRCH-02**: Customer can view collectors sorted by distance (PostGIS) and rating
- [ ] **SRCH-03**: Customer can view collector profile, pricing, and radius
- [ ] **SRCH-04**: System displays mock "Verified/Priority" badge on premium collectors

### Order Management System (OMS)
- [ ] **OMS-01**: Customer can request pickup or drop-off
- [ ] **OMS-02**: Customer can upload waste photos and estimate weight
- [ ] **OMS-03**: Collector receives real-time order notifications (Socket.IO)
- [ ] **OMS-04**: Collector can accept or reject incoming orders
- [ ] **OMS-05**: Collector inputs actual weight and total price
- [ ] **OMS-06**: Customer receives confirmation notification for final price

### Rating & Digital Receipt
- [ ] **RAT-01**: Customer can rate and review Collector after transaction
- [ ] **RAT-02**: Collector can rate Customer after transaction
- [ ] **RAT-03**: User can view transaction history and digital receipt

## v2 Requirements

### Subscriptions & Payments
- **SUB-01**: Premium listing subscription logic for Collectors
- **PAY-01**: E-Wallet / Payment gateway integration

### Analytics
- **ANA-01**: Big data dashboard for Smart City Analytics

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-Wallet / Payment Gateway | High complexity, skip for MVP |
| Big Data Dashboard | Needs high volume, skip for MVP |
| In-app Chat | Communication handled via WhatsApp |
| Live GPS Tracking | Not priority for MVP |
| Role changes | Role selected at registration is permanent in MVP |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| SRCH-01 | Phase 2 | Pending |
| SRCH-02 | Phase 2 | Pending |
| SRCH-03 | Phase 2 | Pending |
| SRCH-04 | Phase 2 | Pending |
| OMS-01 | Phase 3 | Pending |
| OMS-02 | Phase 3 | Pending |
| OMS-03 | Phase 3 | Pending |
| OMS-04 | Phase 3 | Pending |
| OMS-05 | Phase 3 | Pending |
| OMS-06 | Phase 3 | Pending |
| RAT-01 | Phase 4 | Pending |
| RAT-02 | Phase 4 | Pending |
| RAT-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-30*
*Last updated: 2026-04-30 after initial definition*
