# Database Schema

## 1. Database Standard

PostgreSQL is recommended as the primary transactional database. Use UUID primary keys, organization_id on scoped entities, soft delete where needed, and indexed timestamp columns for auditability.

## 2. Core Tables

| Table | Purpose |
| --- | --- |
| users | Authentication identity and profile anchor |
| roles | RBAC roles |
| permissions | Atomic permissions |
| user_roles | Role assignments |
| organizations | Organization records |
| organization_memberships | User access to organization workspaces |
| student_profiles | Student-specific metadata |
| tutor_profiles | Tutor-specific metadata |
| organization_profiles | Organization metadata |
| organization_campaigns | Hiring and interview programs |
| interview_invitations | Interview invitations sent to students |
| categories | Interview or coaching categories |
| availability_slots | Published tutor availability |
| bookings | Session bookings and states |
| payments | Payment transactions and references |
| wallets | Tutor balance ledger summary |
| wallet_transactions | Wallet debits and credits |
| subscriptions | Organization or user subscriptions |
| invoices | Billing records |
| notifications | Notification queue and history |
| audit_logs | Security and business audit trail |

## 3. Schema Design Notes

- Use foreign keys for referential integrity
- Use unique constraints for booking and organization identity rules
- Index organization_id, user_id, booking_status, and created_at on high-use tables
- Store monetary amounts in integer minor units
- Preserve immutable payment and audit records
- Model organization access through organization memberships rather than direct user duplication
- Keep interview invitations separate from bookings so invited candidates can accept, decline, or reschedule with audit history

## 4. Recommended Indexes

- bookings(organization_id, status, start_time)
- availability_slots(tutor_id, organization_id, start_time)
- payments(organization_id, provider_reference)
- notifications(organization_id, status, scheduled_at)
- audit_logs(organization_id, created_at)

## 5. Retention and Archiving

- Keep operational tables lean by archiving historical records where policy permits
- Retain financial and audit data per compliance requirements
- Use partitioning for large append-only tables such as audit logs and event history
