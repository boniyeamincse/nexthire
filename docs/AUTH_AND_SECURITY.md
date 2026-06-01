# Auth and Security

## 1. Authentication Model

- Email and password authentication with strong password policy
- Optional social login where product policy allows it
- MFA for administrators, super admins, and high-risk actions
- Short-lived access tokens with refresh token rotation

## 2. Authorization Model

- RBAC for coarse permission control
- Organization membership checks for every scoped operation
- Policy-based checks for sensitive workflows such as payouts, refunds, and user exports

## 3. Data Protection

- TLS for all external and internal service communication where feasible
- Encryption at rest for databases, backups, and object storage
- Secrets stored in a managed secret store, never in source control

## 4. Audit and Compliance

- Log authentication events, role changes, booking actions, payment actions, and privileged admin activity
- Preserve actor, organization, resource, timestamp, and outcome in audit records
- Restrict audit log mutation to platform operations only

## 5. Abuse Prevention

- Rate limit login, password reset, and booking endpoints
- Detect suspicious payment or booking behavior
- Use webhook signature verification for all third-party integrations

## 6. Security Operations

- Dependency scanning and vulnerability review in CI
- Periodic secret rotation
- Centralized incident response process and privileged access review
