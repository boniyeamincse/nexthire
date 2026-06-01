# Auth and Security

## 1. Authentication Model

- Email and password authentication with strong password policy
- Optional social login where product policy allows it
- Email verification and password recovery flows for new and returning users
- MFA for administrators, super admins, and high-risk actions
- MFA setup, verification, and disable flows for eligible accounts
- Short-lived access tokens with refresh token rotation
- User-managed active session listing and session revocation
- Logout should invalidate the current session or token pair

## 2. Account Recovery and Session Control

- Password reset requests should be rate limited and time bounded
- Verification and recovery links should expire after a short validity window
- Session tokens should be tied to device or session metadata where practical
- Active sessions should be visible to the user and removable from the account settings area

## 3. Authorization Model

- RBAC for coarse permission control
- Organization membership checks for every scoped operation
- Policy-based checks for sensitive workflows such as payouts, refunds, and user exports

## 4. Data Protection

- TLS for all external and internal service communication where feasible
- Encryption at rest for databases, backups, and object storage
- Secrets stored in a managed secret store, never in source control

## 5. Audit and Compliance

- Log authentication events, password resets, MFA changes, role changes, booking actions, payment actions, and privileged admin activity
- Preserve actor, organization, resource, timestamp, and outcome in audit records
- Restrict audit log mutation to platform operations only

## 6. Abuse Prevention

- Rate limit login, password reset, and booking endpoints
- Detect suspicious payment or booking behavior
- Use webhook signature verification for all third-party integrations

## 7. Security Operations

- Dependency scanning and vulnerability review in CI
- Periodic secret rotation
- Centralized incident response process and privileged access review
