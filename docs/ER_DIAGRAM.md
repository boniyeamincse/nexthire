# ER Diagram

## 1. Text Description

The data model centers on users, roles, and organization workspaces. The platform uses a shared marketplace for students and tutors, while organizations run hiring and interview programs. A user may belong to one or more organization workspaces through memberships or invitations. Tutors own availability slots. Students create bookings against slots. Bookings generate payments, notifications, wallet movements, and audit events.

## 2. Mermaid Diagram

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : assigned
    ROLES ||--o{ USER_ROLES : grants
    ORGANIZATIONS ||--o{ ORGANIZATION_MEMBERSHIPS : includes
    USERS ||--o{ ORGANIZATION_MEMBERSHIPS : joins
    ORGANIZATIONS ||--o| ORGANIZATION_PROFILES : owns
    ORGANIZATIONS ||--o{ ORGANIZATION_CAMPAIGNS : runs
    ORGANIZATION_CAMPAIGNS ||--o{ INTERVIEW_INVITATIONS : sends
    USERS ||--o{ INTERVIEW_INVITATIONS : receives
    INTERVIEW_INVITATIONS ||--o| BOOKINGS : converts_to
    USERS ||--o| TUTOR_PROFILES : may_have
    USERS ||--o| STUDENT_PROFILES : may_have
    ORGANIZATIONS ||--o{ CATEGORIES : defines
    USERS ||--o{ AVAILABILITY_SLOTS : publishes
    CATEGORIES ||--o{ AVAILABILITY_SLOTS : classifies
    AVAILABILITY_SLOTS ||--o{ BOOKINGS : booked_for
    USERS ||--o{ BOOKINGS : creates
    BOOKINGS ||--o{ PAYMENTS : paid_by
    USERS ||--o{ WALLET_TRANSACTIONS : receives
    USERS ||--o{ NOTIFICATIONS : receives
    ORGANIZATIONS ||--o{ AUDIT_LOGS : records
    BOOKINGS ||--o{ AUDIT_LOGS : traced_by
```

## 3. Key Relationship Rules

- A booking belongs to exactly one slot
- A payment belongs to exactly one booking
- An organization membership grants a user access to an organization workspace
- An interview invitation may convert into one booking when accepted
- Wallet transactions must reference a source event
- Audit logs must reference the actor and the affected organization
