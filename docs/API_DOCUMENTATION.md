# API Documentation

## 1. API Principles

- RESTful resource design
- Versioned endpoints under `/api/v1`
- JSON request and response payloads
- Consistent error format and pagination
- Organization-aware authorization on every endpoint

## 2. Authentication

Bearer token authentication is recommended for client requests. Privileged actions should require MFA-backed sessions where applicable. Access tokens should be short-lived, refresh tokens should rotate, and authenticated users should be able to manage active sessions.

## 3. Endpoint Catalog

The exhaustive module-wise catalog is maintained in [all_apilist.md](all_apilist.md). This document provides the canonical naming conventions and the main resource families used across the platform.

| Resource Family | Representative Endpoints |
| --- | --- |
| Auth | `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh-token`, `POST /api/v1/auth/mfa/setup`, `POST /api/v1/auth/mfa/verify` |
| Users | `GET /api/v1/users/me`, `PATCH /api/v1/users/me` |
| Admin Users | `GET /api/v1/admin/users`, `GET /api/v1/admin/users/{id}` |
| Tutors | `GET /api/v1/tutors`, `GET /api/v1/tutors/{id}`, `PATCH /api/v1/tutors/me/profile` |
| Availability | `POST /api/v1/tutors/me/availability-rules`, `GET /api/v1/tutors/me/unavailable-dates` |
| Categories | `GET /api/v1/categories`, `POST /api/v1/categories` |
| Slots | `GET /api/v1/slots`, `POST /api/v1/slots`, `PATCH /api/v1/slots/{id}/publish` |
| Bookings | `POST /api/v1/bookings`, `GET /api/v1/bookings/{id}`, `PATCH /api/v1/bookings/{id}/reschedule` |
| Calendar | `GET /api/v1/calendar/events`, `GET /api/v1/calendar/views/monthly` |
| Payments | `POST /api/v1/payments/intents`, `POST /api/v1/payments/{id}/refund` |
| Webhooks | `POST /api/v1/webhooks/payments/bkash`, `POST /api/v1/webhooks/payments/stripe` |
| Meetings | `POST /api/v1/meetings`, `POST /api/v1/meetings/{id}/join` |
| Chats | `POST /api/v1/chats/messages`, `PATCH /api/v1/chats/messages/{id}/read` |
| Recordings | `POST /api/v1/recordings`, `POST /api/v1/audio-recordings` |
| Notifications | `POST /api/v1/notifications`, `PATCH /api/v1/notifications/{id}/read` |
| Reminders | `POST /api/v1/reminders`, `POST /api/v1/reminders/test-send` |
| Wallets | `GET /api/v1/wallets/me`, `GET /api/v1/wallets/me/transactions` |
| Withdrawals | `POST /api/v1/withdrawals`, `PATCH /api/v1/admin/withdrawals/{id}/approve` |
| Commissions | `GET /api/v1/admin/commissions`, `GET /api/v1/admin/commissions/report` |
| Reviews | `POST /api/v1/reviews`, `GET /api/v1/tutors/{tutor_id}/reviews` |
| Questions | `GET /api/v1/questions`, `POST /api/v1/ai/questions/generate` |
| Resumes | `POST /api/v1/resumes`, `POST /api/v1/resumes/{id}/analyze` |
| Transcriptions | `POST /api/v1/transcriptions`, `GET /api/v1/transcriptions/sessions/{session_id}` |
| AI Evaluations | `POST /api/v1/ai/evaluations/answers`, `POST /api/v1/ai/evaluations/interview-summary` |
| Scorecards | `GET /api/v1/scorecards/{session_id}`, `POST /api/v1/scorecards/generate` |
| Feedback | `POST /api/v1/feedback`, `GET /api/v1/students/{student_id}/feedback` |
| Certificates | `POST /api/v1/certificates`, `GET /api/v1/certificates/{id}/download` |
| Subscriptions | `POST /api/v1/subscriptions`, `GET /api/v1/subscription-plans` |
| Organizations | `POST /api/v1/organizations`, `GET /api/v1/organizations/{id}/members` |
| Hiring Campaigns | `POST /api/v1/hiring-campaigns`, `GET /api/v1/hiring-campaigns/{id}/candidates` |
| Dashboards | `GET /api/v1/dashboards/student`, `GET /api/v1/dashboards/admin` |
| Reports | `GET /api/v1/reports/revenue`, `GET /api/v1/reports/export` |
| Files | `POST /api/v1/files`, `POST /api/v1/files/batch` |
| Audit Logs | `GET /api/v1/audit-logs`, `GET /api/v1/audit-logs/users/{user_id}` |
| Security | `GET /api/v1/security/login-history`, `GET /api/v1/security/blocked-ips` |
| Settings | `GET /api/v1/settings`, `PUT /api/v1/settings/payment` |
| Support | `POST /api/v1/support/tickets`, `PATCH /api/v1/support/tickets/{id}/close` |

## 4. Standard Response Shape

```json
{
  "data": {},
  "meta": {
    "requestId": "..."
  },
  "errors": []
}
```

## 5. Error Handling

- 400 for validation errors
- 401 for unauthenticated requests
- 403 for authorization failures
- 404 for missing resources
- 409 for booking conflicts
- 422 for business rule violations
- 500 for unexpected server failures
