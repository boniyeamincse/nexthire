# AI Mock Interview & Tutor Marketplace Software

## Full Project API List Module-wise

---

## API Design Rules

* All endpoints are versioned under `/api/v1`
* Resource names are plural where practical
* Read endpoints use `GET`
* Create endpoints use `POST`
* Full updates use `PUT`
* Partial updates use `PATCH`
* Delete operations use `DELETE`
* Admin APIs are scoped under `/api/v1/admin`
* Webhooks are isolated under `/api/v1/webhooks`
* Protected APIs require Bearer Token authentication
* Role-based APIs require permission middleware

---

# 1. Authentication Module

## Purpose

User registration, login, logout, email verification, password reset, MFA, session management, and profile access.

```http
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/resend-verification
POST   /api/v1/auth/change-password
POST   /api/v1/auth/social-login
POST   /api/v1/auth/mfa/setup
POST   /api/v1/auth/mfa/verify
POST   /api/v1/auth/mfa/disable
GET    /api/v1/auth/sessions
DELETE /api/v1/auth/sessions/{id}
GET    /api/v1/users/me
PATCH  /api/v1/users/me
```

## Roles Supported

* Student
* Tutor
* Organization Admin
* Organization Member
* Admin
* Super Admin

---

# 2. User Management Module

## Purpose

Admin can manage users, roles, verification, status, and activity history.

```http
GET    /api/v1/admin/users
GET    /api/v1/admin/users/{id}
POST   /api/v1/admin/users
PATCH  /api/v1/admin/users/{id}
DELETE /api/v1/admin/users/{id}
GET    /api/v1/admin/roles
PATCH  /api/v1/admin/users/{id}/status
POST   /api/v1/admin/users/{id}/suspend
POST   /api/v1/admin/users/{id}/ban
POST   /api/v1/admin/users/{id}/restore
GET    /api/v1/admin/users/{id}/activity-logs
GET    /api/v1/admin/users/{id}/login-history
```

---

# 3. Tutor Management Module

## Purpose

Tutor application, profile, verification, earnings, reviews, and public tutor listing.

```http
POST   /api/v1/tutor-applications
GET    /api/v1/tutors
GET    /api/v1/tutors/{id}
PATCH  /api/v1/tutors/me/profile
POST   /api/v1/tutors/me/verification-documents
GET    /api/v1/tutors/me/earnings
GET    /api/v1/tutors/me/reviews
GET    /api/v1/tutors/{id}/slots
GET    /api/v1/tutors/{id}/reviews
POST   /api/v1/admin/tutors/{id}/approve
POST   /api/v1/admin/tutors/{id}/reject
POST   /api/v1/admin/tutors/{id}/suspend
POST   /api/v1/admin/tutors/{id}/verify
```

---

# 4. Tutor Availability Module

## Purpose

Tutors set available days, time ranges, breaks, and unavailable dates.

```http
POST   /api/v1/tutors/me/availability-rules
GET    /api/v1/tutors/me/availability-rules
GET    /api/v1/tutors/me/availability-rules/{id}
PUT    /api/v1/tutors/me/availability-rules/{id}
DELETE /api/v1/tutors/me/availability-rules/{id}
POST   /api/v1/tutors/me/unavailable-dates
GET    /api/v1/tutors/me/unavailable-dates
DELETE /api/v1/tutors/me/unavailable-dates/{id}
```

---

# 5. Interview Category Module

## Purpose

Manage interview categories like HR, Cyber Security, DevOps, IELTS, Networking, and related tracks.

```http
POST   /api/v1/categories
GET    /api/v1/categories
GET    /api/v1/categories/{id}
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
PATCH  /api/v1/categories/{id}/status
```

---

# 6. Interview Slot Module

## Purpose

Tutors create interview slots that students can book.

```http
POST   /api/v1/slots
GET    /api/v1/slots
GET    /api/v1/slots/{id}
PUT    /api/v1/slots/{id}
DELETE /api/v1/slots/{id}
GET    /api/v1/slots/available
GET    /api/v1/slots/search
PATCH  /api/v1/slots/{id}/publish
PATCH  /api/v1/slots/{id}/cancel
```

---

# 7. Booking Module

## Purpose

Students can book, cancel, reschedule, and view interview bookings.

```http
POST   /api/v1/bookings
GET    /api/v1/bookings
GET    /api/v1/bookings/{id}
PATCH  /api/v1/bookings/{id}/cancel
PATCH  /api/v1/bookings/{id}/reschedule
PATCH  /api/v1/bookings/{id}/confirm
PATCH  /api/v1/bookings/{id}/complete
GET    /api/v1/bookings/upcoming
GET    /api/v1/bookings/completed
GET    /api/v1/bookings/cancelled
```

---

# 8. Calendar Module

## Purpose

Students and tutors can view interview sessions in calendar format.

```http
GET    /api/v1/calendar/events
POST   /api/v1/calendar/events
GET    /api/v1/calendar/events/{id}
PUT    /api/v1/calendar/events/{id}
DELETE /api/v1/calendar/events/{id}
GET    /api/v1/calendar/views/monthly
GET    /api/v1/calendar/views/weekly
GET    /api/v1/calendar/views/daily
```

---

# 9. Payment Module

## Purpose

Student payments, payment verification, payment history, refunds, and gateway integration.

```http
POST   /api/v1/payments/intents
POST   /api/v1/payments/verify
GET    /api/v1/payments
GET    /api/v1/payments/{id}
POST   /api/v1/payments/{id}/refund
GET    /api/v1/payments/{id}/invoice
```

---

# 10. Payment Webhook Module

## Purpose

Receive secure payment gateway callbacks.

```http
POST   /api/v1/webhooks/payments/bkash
POST   /api/v1/webhooks/payments/nagad
POST   /api/v1/webhooks/payments/sslcommerz
POST   /api/v1/webhooks/payments/stripe
```

---

# 11. Video Meeting Module

## Purpose

Create and manage online interview rooms.

```http
POST   /api/v1/meetings
POST   /api/v1/meetings/{id}/join
POST   /api/v1/meetings/{id}/end
GET    /api/v1/meetings/{id}/participants
GET    /api/v1/meetings/{id}
POST   /api/v1/meetings/{id}/token
PATCH  /api/v1/meetings/{id}/status
```

---

# 12. Live Chat Module

## Purpose

Students and tutors can chat inside interview rooms.

```http
POST   /api/v1/chats/messages
GET    /api/v1/chats/messages
GET    /api/v1/chats/bookings/{booking_id}/messages
DELETE /api/v1/chats/messages/{id}
PATCH  /api/v1/chats/messages/{id}/read
```

---

# 13. Audio Recording Module

```http
POST   /api/v1/audio-recordings
GET    /api/v1/audio-recordings/{id}
GET    /api/v1/audio-recordings/sessions/{session_id}
DELETE /api/v1/audio-recordings/{id}
```

---

# 14. Video Recording Module

```http
POST   /api/v1/recordings
PATCH  /api/v1/recordings/{id}/stop
GET    /api/v1/recordings
GET    /api/v1/recordings/{id}
GET    /api/v1/recordings/sessions/{session_id}
DELETE /api/v1/recordings/{id}
```

---

# 15. Notification Module

```http
POST   /api/v1/notifications
GET    /api/v1/notifications
GET    /api/v1/notifications/{id}
PATCH  /api/v1/notifications/{id}/read
PATCH  /api/v1/notifications/read-all
DELETE /api/v1/notifications/{id}
```

---

# 16. Reminder Scheduler Module

```http
POST   /api/v1/reminders
GET    /api/v1/reminders
GET    /api/v1/reminders/{id}
DELETE /api/v1/reminders/{id}
POST   /api/v1/reminders/test-send
```

## Reminder Times

* 24 hours before
* 1 hour before
* 30 minutes before
* 5 minutes before

---

# 17. Wallet Module

```http
GET    /api/v1/wallets/me
GET    /api/v1/wallets/me/balance
GET    /api/v1/wallets/me/transactions
GET    /api/v1/wallets/me/transactions/{id}
GET    /api/v1/wallets/me/summary
```

---

# 18. Withdrawal Module

```http
POST   /api/v1/withdrawals
GET    /api/v1/withdrawals
GET    /api/v1/withdrawals/{id}
PATCH  /api/v1/withdrawals/{id}/cancel
PATCH  /api/v1/admin/withdrawals/{id}/approve
PATCH  /api/v1/admin/withdrawals/{id}/reject
PATCH  /api/v1/admin/withdrawals/{id}/mark-paid
```

---

# 19. Commission Module

```http
GET    /api/v1/admin/commissions
POST   /api/v1/admin/commissions
GET    /api/v1/admin/commissions/{id}
PUT    /api/v1/admin/commissions/{id}
DELETE /api/v1/admin/commissions/{id}
GET    /api/v1/admin/commissions/report
```

---

# 20. Review & Rating Module

```http
POST   /api/v1/reviews
GET    /api/v1/reviews
GET    /api/v1/reviews/{id}
GET    /api/v1/tutors/{tutor_id}/reviews
PUT    /api/v1/reviews/{id}
DELETE /api/v1/reviews/{id}
```

---

# 21. Question Bank Module

```http
POST   /api/v1/questions
GET    /api/v1/questions
GET    /api/v1/questions/{id}
PUT    /api/v1/questions/{id}
DELETE /api/v1/questions/{id}
GET    /api/v1/questions/categories/{category_id}
GET    /api/v1/questions/difficulty/{level}
```

---

# 22. AI Question Generator Module

```http
POST   /api/v1/ai/questions/generate
POST   /api/v1/ai/questions/follow-up
POST   /api/v1/ai/questions/custom
POST   /api/v1/ai/questions/from-resume
POST   /api/v1/ai/questions/from-job-role
```

---

# 23. Resume Module

```http
POST   /api/v1/resumes
GET    /api/v1/resumes
GET    /api/v1/resumes/{id}
DELETE /api/v1/resumes/{id}
POST   /api/v1/resumes/{id}/analyze
GET    /api/v1/resumes/{id}/analysis
```

---

# 24. Speech-To-Text Module

```http
POST   /api/v1/transcriptions
GET    /api/v1/transcriptions/{id}
GET    /api/v1/transcriptions/sessions/{session_id}
DELETE /api/v1/transcriptions/{id}
```

---

# 25. AI Evaluation Module

```http
POST   /api/v1/ai/evaluations/answers
POST   /api/v1/ai/evaluations/interview-summary
POST   /api/v1/ai/evaluations/communication-score
POST   /api/v1/ai/evaluations/confidence-score
POST   /api/v1/ai/evaluations/technical-score
POST   /api/v1/ai/evaluations/improvement-suggestions
```

---

# 26. Scorecard Module

```http
GET    /api/v1/scorecards
GET    /api/v1/scorecards/{session_id}
POST   /api/v1/scorecards/generate
GET    /api/v1/scorecards/students/{student_id}
GET    /api/v1/scorecards/{session_id}/download
```

---

# 27. Feedback Module

```http
POST   /api/v1/feedback
GET    /api/v1/feedback/{session_id}
GET    /api/v1/students/{student_id}/feedback
GET    /api/v1/tutors/{tutor_id}/feedback
PUT    /api/v1/feedback/{id}
DELETE /api/v1/feedback/{id}
```

---

# 28. Certificate Module

```http
POST   /api/v1/certificates
GET    /api/v1/certificates
GET    /api/v1/certificates/{id}
GET    /api/v1/certificates/{id}/download
DELETE /api/v1/certificates/{id}
```

---

# 29. Subscription Module

```http
POST   /api/v1/subscriptions
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/{id}
PATCH  /api/v1/subscriptions/{id}/cancel
PATCH  /api/v1/subscriptions/{id}/renew
GET    /api/v1/subscription-plans
```

---

# 30. Organization Module

```http
POST   /api/v1/organizations
GET    /api/v1/organizations
GET    /api/v1/organizations/{id}
PUT    /api/v1/organizations/{id}
DELETE /api/v1/organizations/{id}
POST   /api/v1/organizations/{id}/members
GET    /api/v1/organizations/{id}/members
DELETE /api/v1/organizations/{id}/members/{member_id}
```

---

# 31. Hiring Campaign Module

```http
POST   /api/v1/hiring-campaigns
GET    /api/v1/hiring-campaigns
GET    /api/v1/hiring-campaigns/{id}
PUT    /api/v1/hiring-campaigns/{id}
DELETE /api/v1/hiring-campaigns/{id}
POST   /api/v1/hiring-campaigns/{id}/candidates
GET    /api/v1/hiring-campaigns/{id}/candidates
```

---

# 32. Student Dashboard Module

```http
GET    /api/v1/dashboards/student
GET    /api/v1/students/me/bookings
GET    /api/v1/students/me/bookings/upcoming
GET    /api/v1/students/me/bookings/completed
GET    /api/v1/students/me/performance
GET    /api/v1/students/me/payments
GET    /api/v1/students/me/certificates
```

---

# 33. Tutor Dashboard Module

```http
GET    /api/v1/dashboards/tutor
GET    /api/v1/tutors/me/bookings
GET    /api/v1/tutors/me/bookings/upcoming
GET    /api/v1/tutors/me/bookings/completed
GET    /api/v1/tutors/me/analytics
GET    /api/v1/tutors/me/revenue
GET    /api/v1/tutors/me/wallet-summary
```

---

# 34. Organization Dashboard Module

```http
GET    /api/v1/dashboards/organization
GET    /api/v1/organizations/me/candidates
GET    /api/v1/organizations/me/interviews
GET    /api/v1/organizations/me/reports
GET    /api/v1/organizations/me/hiring-campaigns
GET    /api/v1/organizations/me/performance
```

---

# 35. Admin Dashboard Module

```http
GET    /api/v1/dashboards/admin
GET    /api/v1/admin/users
GET    /api/v1/admin/tutors
GET    /api/v1/admin/students
GET    /api/v1/admin/organizations
GET    /api/v1/admin/bookings
GET    /api/v1/admin/payments
GET    /api/v1/admin/withdrawals
GET    /api/v1/admin/reports
GET    /api/v1/admin/revenue-overview
```

---

# 36. Reports & Analytics Module

```http
GET    /api/v1/reports/revenue
GET    /api/v1/reports/interviews
GET    /api/v1/reports/students
GET    /api/v1/reports/tutors
GET    /api/v1/reports/performance
GET    /api/v1/reports/payments
GET    /api/v1/reports/withdrawals
GET    /api/v1/reports/platform-commission
GET    /api/v1/reports/export
```

---

# 37. File Manager Module

```http
POST   /api/v1/files
GET    /api/v1/files
GET    /api/v1/files/{id}
DELETE /api/v1/files/{id}
POST   /api/v1/files/batch
```

---

# 38. Audit Log Module

```http
GET    /api/v1/audit-logs
GET    /api/v1/audit-logs/{id}
GET    /api/v1/audit-logs/users/{user_id}
GET    /api/v1/audit-logs/modules/{module_name}
DELETE /api/v1/audit-logs/{id}
```

---

# 39. Security Module

```http
GET    /api/v1/security/login-history
GET    /api/v1/security/failed-logins
GET    /api/v1/security/suspicious-activities
POST   /api/v1/security/blocked-ips
GET    /api/v1/security/blocked-ips
DELETE /api/v1/security/blocked-ips/{id}
GET    /api/v1/security/alerts
```

---

# 40. Settings Module

```http
GET    /api/v1/settings
PUT    /api/v1/settings
GET    /api/v1/settings/payment
PUT    /api/v1/settings/payment
GET    /api/v1/settings/notification
PUT    /api/v1/settings/notification
GET    /api/v1/settings/commission
PUT    /api/v1/settings/commission
```

---

# 41. Support Ticket Module

```http
POST   /api/v1/support/tickets
GET    /api/v1/support/tickets
GET    /api/v1/support/tickets/{id}
PUT    /api/v1/support/tickets/{id}
DELETE /api/v1/support/tickets/{id}
POST   /api/v1/support/tickets/{id}/replies
PATCH  /api/v1/support/tickets/{id}/close
```

---

# 42. Package Module

## Purpose

Tutors can create interview packages such as 3-session, 5-session, or 10-session packages.

```http
POST   /api/v1/tutors/me/packages
GET    /api/v1/tutors/me/packages
GET    /api/v1/tutors/me/packages/{id}
PUT    /api/v1/tutors/me/packages/{id}
DELETE /api/v1/tutors/me/packages/{id}
PATCH  /api/v1/tutors/me/packages/{id}/publish
PATCH  /api/v1/tutors/me/packages/{id}/unpublish

GET    /api/v1/packages
GET    /api/v1/packages/{id}
POST   /api/v1/packages/{id}/purchase
GET    /api/v1/students/me/packages
GET    /api/v1/students/me/packages/{id}
```

---

# 43. Package Booking Module

```http
POST   /api/v1/package-bookings
GET    /api/v1/package-bookings
GET    /api/v1/package-bookings/{id}
PATCH  /api/v1/package-bookings/{id}/schedule-session
PATCH  /api/v1/package-bookings/{id}/cancel
GET    /api/v1/package-bookings/{id}/sessions
POST   /api/v1/package-bookings/{id}/sessions
PATCH  /api/v1/package-bookings/{id}/sessions/{session_id}/reschedule
```

---

# 44. Coupon & Promotion Module

```http
POST   /api/v1/admin/coupons
GET    /api/v1/admin/coupons
GET    /api/v1/admin/coupons/{id}
PUT    /api/v1/admin/coupons/{id}
DELETE /api/v1/admin/coupons/{id}
PATCH  /api/v1/admin/coupons/{id}/activate
PATCH  /api/v1/admin/coupons/{id}/deactivate

POST   /api/v1/coupons/validate
POST   /api/v1/coupons/apply
DELETE /api/v1/coupons/remove
```

---

# 45. Refund & Dispute Module

```http
POST   /api/v1/refunds
GET    /api/v1/refunds
GET    /api/v1/refunds/{id}
PATCH  /api/v1/refunds/{id}/cancel

GET    /api/v1/admin/refunds
GET    /api/v1/admin/refunds/{id}
PATCH  /api/v1/admin/refunds/{id}/approve
PATCH  /api/v1/admin/refunds/{id}/reject
PATCH  /api/v1/admin/refunds/{id}/process

POST   /api/v1/disputes
GET    /api/v1/disputes
GET    /api/v1/disputes/{id}
POST   /api/v1/disputes/{id}/messages
PATCH  /api/v1/disputes/{id}/close

GET    /api/v1/admin/disputes
GET    /api/v1/admin/disputes/{id}
PATCH  /api/v1/admin/disputes/{id}/assign
PATCH  /api/v1/admin/disputes/{id}/resolve
PATCH  /api/v1/admin/disputes/{id}/reject
```

---

# 46. Notification Preference Module

```http
GET    /api/v1/notification-preferences
PUT    /api/v1/notification-preferences
PATCH  /api/v1/notification-preferences/email
PATCH  /api/v1/notification-preferences/sms
PATCH  /api/v1/notification-preferences/whatsapp
PATCH  /api/v1/notification-preferences/push
PATCH  /api/v1/notification-preferences/in-app
```

---

# 47. Admin Permission Module

```http
GET    /api/v1/admin/permissions
POST   /api/v1/admin/permissions
GET    /api/v1/admin/permissions/{id}
PUT    /api/v1/admin/permissions/{id}
DELETE /api/v1/admin/permissions/{id}

GET    /api/v1/admin/admin-roles
POST   /api/v1/admin/admin-roles
GET    /api/v1/admin/admin-roles/{id}
PUT    /api/v1/admin/admin-roles/{id}
DELETE /api/v1/admin/admin-roles/{id}

POST   /api/v1/admin/admin-roles/{id}/permissions
DELETE /api/v1/admin/admin-roles/{id}/permissions/{permission_id}
POST   /api/v1/admin/users/{id}/admin-roles
DELETE /api/v1/admin/users/{id}/admin-roles/{role_id}
```

---

# 48. System Health Module

```http
GET    /api/v1/admin/system/health
GET    /api/v1/admin/system/queues
GET    /api/v1/admin/system/scheduler
GET    /api/v1/admin/system/storage
GET    /api/v1/admin/system/cache
GET    /api/v1/admin/system/database
GET    /api/v1/admin/system/services
GET    /api/v1/admin/system/logs
GET    /api/v1/admin/system/errors
```

---

# 49. Public Content Module

```http
GET    /api/v1/pages
GET    /api/v1/pages/{slug}
GET    /api/v1/faqs
GET    /api/v1/faqs/{id}
GET    /api/v1/help-articles
GET    /api/v1/help-articles/{slug}

POST   /api/v1/admin/pages
GET    /api/v1/admin/pages
GET    /api/v1/admin/pages/{id}
PUT    /api/v1/admin/pages/{id}
DELETE /api/v1/admin/pages/{id}
PATCH  /api/v1/admin/pages/{id}/publish

POST   /api/v1/admin/faqs
GET    /api/v1/admin/faqs
PUT    /api/v1/admin/faqs/{id}
DELETE /api/v1/admin/faqs/{id}
```

---

# 50. Contact & Lead Module

```http
POST   /api/v1/contact-messages
POST   /api/v1/demo-requests
POST   /api/v1/partnership-requests

GET    /api/v1/admin/contact-messages
GET    /api/v1/admin/contact-messages/{id}
PATCH  /api/v1/admin/contact-messages/{id}/read
PATCH  /api/v1/admin/contact-messages/{id}/reply
DELETE /api/v1/admin/contact-messages/{id}

GET    /api/v1/admin/demo-requests
GET    /api/v1/admin/demo-requests/{id}
PATCH  /api/v1/admin/demo-requests/{id}/status
```

---

# 51. Search Module

```http
GET    /api/v1/search
GET    /api/v1/search/tutors
GET    /api/v1/search/slots
GET    /api/v1/search/packages
GET    /api/v1/search/categories
GET    /api/v1/search/questions
GET    /api/v1/search/help-articles
```

---

# 52. Language & Localization Module

```http
GET    /api/v1/languages
GET    /api/v1/translations/{language_code}
PATCH  /api/v1/users/me/language

POST   /api/v1/admin/languages
GET    /api/v1/admin/languages
PUT    /api/v1/admin/languages/{id}
DELETE /api/v1/admin/languages/{id}

POST   /api/v1/admin/translations
GET    /api/v1/admin/translations
PUT    /api/v1/admin/translations/{id}
DELETE /api/v1/admin/translations/{id}
```

---

# 53. Timezone Module

```http
GET    /api/v1/timezones
GET    /api/v1/users/me/timezone
PATCH  /api/v1/users/me/timezone
GET    /api/v1/slots/{id}/timezone-preview
GET    /api/v1/bookings/{id}/timezone-preview
```

---

# 54. Tutor Verification Document Module

```http
POST   /api/v1/tutors/me/verification-documents
GET    /api/v1/tutors/me/verification-documents
GET    /api/v1/tutors/me/verification-documents/{id}
DELETE /api/v1/tutors/me/verification-documents/{id}

GET    /api/v1/admin/tutor-verification-documents
GET    /api/v1/admin/tutor-verification-documents/{id}
PATCH  /api/v1/admin/tutor-verification-documents/{id}/approve
PATCH  /api/v1/admin/tutor-verification-documents/{id}/reject
```

---

# 55. Tutor Skill Module

```http
POST   /api/v1/tutors/me/skills
GET    /api/v1/tutors/me/skills
PUT    /api/v1/tutors/me/skills/{id}
DELETE /api/v1/tutors/me/skills/{id}

GET    /api/v1/skills
POST   /api/v1/admin/skills
PUT    /api/v1/admin/skills/{id}
DELETE /api/v1/admin/skills/{id}
```

---

# 56. Favorite & Wishlist Module

```http
POST   /api/v1/favorites
GET    /api/v1/favorites
DELETE /api/v1/favorites/{id}

POST   /api/v1/wishlist
GET    /api/v1/wishlist
DELETE /api/v1/wishlist/{id}
```

---

# 57. Cart & Checkout Module

```http
POST   /api/v1/cart/items
GET    /api/v1/cart
PUT    /api/v1/cart/items/{id}
DELETE /api/v1/cart/items/{id}
DELETE /api/v1/cart/clear

POST   /api/v1/checkout
POST   /api/v1/checkout/confirm
GET    /api/v1/checkout/{checkout_id}
```

---

# 58. Invoice Module

```http
GET    /api/v1/invoices
GET    /api/v1/invoices/{id}
GET    /api/v1/invoices/{id}/download
GET    /api/v1/admin/invoices
GET    /api/v1/admin/invoices/{id}
POST   /api/v1/admin/invoices/{id}/send-email
```

---

# 59. Tax & VAT Module

```http
GET    /api/v1/taxes/calculate
GET    /api/v1/admin/tax-rules
POST   /api/v1/admin/tax-rules
GET    /api/v1/admin/tax-rules/{id}
PUT    /api/v1/admin/tax-rules/{id}
DELETE /api/v1/admin/tax-rules/{id}
PATCH  /api/v1/admin/tax-rules/{id}/activate
```

---

# 60. Payout Method Module

```http
POST   /api/v1/payout-methods
GET    /api/v1/payout-methods
GET    /api/v1/payout-methods/{id}
PUT    /api/v1/payout-methods/{id}
DELETE /api/v1/payout-methods/{id}
PATCH  /api/v1/payout-methods/{id}/set-default

GET    /api/v1/admin/payout-methods
GET    /api/v1/admin/payout-methods/{id}
PATCH  /api/v1/admin/payout-methods/{id}/verify
PATCH  /api/v1/admin/payout-methods/{id}/reject
```

---

# 61. Payout Processing Module

```http
POST   /api/v1/admin/payouts
GET    /api/v1/admin/payouts
GET    /api/v1/admin/payouts/{id}
PATCH  /api/v1/admin/payouts/{id}/process
PATCH  /api/v1/admin/payouts/{id}/mark-paid
PATCH  /api/v1/admin/payouts/{id}/fail
GET    /api/v1/tutors/me/payouts
GET    /api/v1/tutors/me/payouts/{id}
```

---

# 62. Webhook Log Module

```http
GET    /api/v1/admin/webhook-logs
GET    /api/v1/admin/webhook-logs/{id}
POST   /api/v1/admin/webhook-logs/{id}/retry
DELETE /api/v1/admin/webhook-logs/{id}
```

---

# 63. Integration Module

```http
GET    /api/v1/admin/integrations
GET    /api/v1/admin/integrations/{id}
PATCH  /api/v1/admin/integrations/{id}
PATCH  /api/v1/admin/integrations/{id}/enable
PATCH  /api/v1/admin/integrations/{id}/disable
POST   /api/v1/admin/integrations/{id}/test
```

---

# 64. Device & Push Token Module

```http
POST   /api/v1/devices
GET    /api/v1/devices
GET    /api/v1/devices/{id}
DELETE /api/v1/devices/{id}
POST   /api/v1/devices/{id}/push-token
DELETE /api/v1/devices/{id}/push-token
```

---

# 65. Activity Timeline Module

```http
GET    /api/v1/activity-timeline
GET    /api/v1/bookings/{id}/timeline
GET    /api/v1/payments/{id}/timeline
GET    /api/v1/disputes/{id}/timeline
GET    /api/v1/admin/activity-timeline
```

---

# 66. Referral & Affiliate Module

```http
POST   /api/v1/referrals
GET    /api/v1/referrals
GET    /api/v1/referrals/{id}
GET    /api/v1/referrals/me/stats

GET    /api/v1/admin/referrals
GET    /api/v1/admin/referrals/{id}
PATCH  /api/v1/admin/referrals/{id}/approve
PATCH  /api/v1/admin/referrals/{id}/reject
```

---

# 67. Reward & Badge Module

```http
GET    /api/v1/badges
GET    /api/v1/users/me/badges
GET    /api/v1/users/me/points

POST   /api/v1/admin/badges
GET    /api/v1/admin/badges
PUT    /api/v1/admin/badges/{id}
DELETE /api/v1/admin/badges/{id}

POST   /api/v1/admin/users/{id}/points
GET    /api/v1/admin/users/{id}/points
```

---

# 68. Learning Resource Module

```http
POST   /api/v1/learning-resources
GET    /api/v1/learning-resources
GET    /api/v1/learning-resources/{id}
PUT    /api/v1/learning-resources/{id}
DELETE /api/v1/learning-resources/{id}
GET    /api/v1/categories/{category_id}/learning-resources
```

---

# 69. Assessment & Quiz Module

```http
POST   /api/v1/admin/assessments
GET    /api/v1/assessments
GET    /api/v1/assessments/{id}
POST   /api/v1/assessments/{id}/start
POST   /api/v1/assessments/{id}/submit
GET    /api/v1/assessments/{id}/result
GET    /api/v1/students/me/assessment-results
```

---

# 70. AI Prompt Template Module

```http
POST   /api/v1/admin/ai-prompt-templates
GET    /api/v1/admin/ai-prompt-templates
GET    /api/v1/admin/ai-prompt-templates/{id}
PUT    /api/v1/admin/ai-prompt-templates/{id}
DELETE /api/v1/admin/ai-prompt-templates/{id}
PATCH  /api/v1/admin/ai-prompt-templates/{id}/activate
```

---

# 71. AI Usage & Billing Module

```http
GET    /api/v1/admin/ai-usage
GET    /api/v1/admin/ai-usage/users/{user_id}
GET    /api/v1/admin/ai-usage/modules/{module_name}
GET    /api/v1/admin/ai-usage/cost-report
GET    /api/v1/users/me/ai-usage
```

---

# 72. Session Attendance Module

## Purpose

Track student and tutor attendance, join time, leave time, late entry, and no-show status.

```http
POST   /api/v1/sessions/{session_id}/attendance/join
POST   /api/v1/sessions/{session_id}/attendance/leave
GET    /api/v1/sessions/{session_id}/attendance
PATCH  /api/v1/admin/sessions/{session_id}/attendance
GET    /api/v1/admin/attendance/reports
```

---

# 73. Session Notes Module

## Purpose

Tutor can write private or shared notes after interview sessions.

```http
POST   /api/v1/sessions/{session_id}/notes
GET    /api/v1/sessions/{session_id}/notes
GET    /api/v1/session-notes/{id}
PUT    /api/v1/session-notes/{id}
DELETE /api/v1/session-notes/{id}
PATCH  /api/v1/session-notes/{id}/share
```

---

# 74. Tutor Analytics Module

## Purpose

Advanced tutor analytics for conversion, ratings, earnings, and session performance.

```http
GET    /api/v1/tutors/me/analytics/overview
GET    /api/v1/tutors/me/analytics/bookings
GET    /api/v1/tutors/me/analytics/revenue
GET    /api/v1/tutors/me/analytics/ratings
GET    /api/v1/tutors/me/analytics/conversion
GET    /api/v1/tutors/me/analytics/cancellations
```

---

# 75. Student Performance Analytics Module

## Purpose

Track student progress, improvement, strengths, weaknesses, and interview history.

```http
GET    /api/v1/students/me/performance/overview
GET    /api/v1/students/me/performance/history
GET    /api/v1/students/me/performance/skills
GET    /api/v1/students/me/performance/weaknesses
GET    /api/v1/students/me/performance/improvement-plan
GET    /api/v1/students/me/performance/score-trends
```

---

# 76. Admin Moderation Module

## Purpose

Admin can moderate reviews, chats, profiles, files, questions, and public content.

```http
GET    /api/v1/admin/moderation/reviews
GET    /api/v1/admin/moderation/chats
GET    /api/v1/admin/moderation/files
GET    /api/v1/admin/moderation/profiles
GET    /api/v1/admin/moderation/questions
PATCH  /api/v1/admin/moderation/{type}/{id}/approve
PATCH  /api/v1/admin/moderation/{type}/{id}/reject
PATCH  /api/v1/admin/moderation/{type}/{id}/hide
```

---

# 77. Cancellation Policy Module

## Purpose

Manage cancellation windows, refund rules, tutor penalties, and student penalties.

```http
GET    /api/v1/cancellation-policies
GET    /api/v1/cancellation-policies/{id}

POST   /api/v1/admin/cancellation-policies
PUT    /api/v1/admin/cancellation-policies/{id}
DELETE /api/v1/admin/cancellation-policies/{id}
PATCH  /api/v1/admin/cancellation-policies/{id}/activate
```

---

# 78. Tutor Ranking Module

## Purpose

Calculate tutor ranking based on rating, completion rate, response time, and booking conversion.

```http
GET    /api/v1/tutors/rankings
GET    /api/v1/tutors/top-rated
GET    /api/v1/tutors/featured
GET    /api/v1/admin/tutor-rankings
POST   /api/v1/admin/tutor-rankings/recalculate
PATCH  /api/v1/admin/tutors/{id}/feature
PATCH  /api/v1/admin/tutors/{id}/unfeature
```

---

# 79. Email Template Module

## Purpose

Admin can manage email templates for verification, booking, payment, reminder, payout, and support.

```http
POST   /api/v1/admin/email-templates
GET    /api/v1/admin/email-templates
GET    /api/v1/admin/email-templates/{id}
PUT    /api/v1/admin/email-templates/{id}
DELETE /api/v1/admin/email-templates/{id}
POST   /api/v1/admin/email-templates/{id}/preview
POST   /api/v1/admin/email-templates/{id}/test-send
```

---

# 80. SMS & WhatsApp Template Module

## Purpose

Admin can manage SMS and WhatsApp templates.

```http
POST   /api/v1/admin/message-templates
GET    /api/v1/admin/message-templates
GET    /api/v1/admin/message-templates/{id}
PUT    /api/v1/admin/message-templates/{id}
DELETE /api/v1/admin/message-templates/{id}
POST   /api/v1/admin/message-templates/{id}/test-send
```

---

# Final Full Module Summary

| No. | Module Name                   |
| --: | ----------------------------- |
|   1 | Authentication                |
|   2 | User Management               |
|   3 | Tutor Management              |
|   4 | Tutor Availability            |
|   5 | Interview Category            |
|   6 | Interview Slot                |
|   7 | Booking                       |
|   8 | Calendar                      |
|   9 | Payment                       |
|  10 | Payment Webhook               |
|  11 | Video Meeting                 |
|  12 | Live Chat                     |
|  13 | Audio Recording               |
|  14 | Video Recording               |
|  15 | Notification                  |
|  16 | Reminder Scheduler            |
|  17 | Wallet                        |
|  18 | Withdrawal                    |
|  19 | Commission                    |
|  20 | Review & Rating               |
|  21 | Question Bank                 |
|  22 | AI Question Generator         |
|  23 | Resume                        |
|  24 | Speech-To-Text                |
|  25 | AI Evaluation                 |
|  26 | Scorecard                     |
|  27 | Feedback                      |
|  28 | Certificate                   |
|  29 | Subscription                  |
|  30 | Organization                  |
|  31 | Hiring Campaign               |
|  32 | Student Dashboard             |
|  33 | Tutor Dashboard               |
|  34 | Organization Dashboard        |
|  35 | Admin Dashboard               |
|  36 | Reports & Analytics           |
|  37 | File Manager                  |
|  38 | Audit Log                     |
|  39 | Security                      |
|  40 | Settings                      |
|  41 | Support Ticket                |
|  42 | Package                       |
|  43 | Package Booking               |
|  44 | Coupon & Promotion            |
|  45 | Refund & Dispute              |
|  46 | Notification Preference       |
|  47 | Admin Permission              |
|  48 | System Health                 |
|  49 | Public Content                |
|  50 | Contact & Lead                |
|  51 | Search                        |
|  52 | Language & Localization       |
|  53 | Timezone                      |
|  54 | Tutor Verification Document   |
|  55 | Tutor Skill                   |
|  56 | Favorite & Wishlist           |
|  57 | Cart & Checkout               |
|  58 | Invoice                       |
|  59 | Tax & VAT                     |
|  60 | Payout Method                 |
|  61 | Payout Processing             |
|  62 | Webhook Log                   |
|  63 | Integration                   |
|  64 | Device & Push Token           |
|  65 | Activity Timeline             |
|  66 | Referral & Affiliate          |
|  67 | Reward & Badge                |
|  68 | Learning Resource             |
|  69 | Assessment & Quiz             |
|  70 | AI Prompt Template            |
|  71 | AI Usage & Billing            |
|  72 | Session Attendance            |
|  73 | Session Notes                 |
|  74 | Tutor Analytics               |
|  75 | Student Performance Analytics |
|  76 | Admin Moderation              |
|  77 | Cancellation Policy           |
|  78 | Tutor Ranking                 |
|  79 | Email Template                |
|  80 | SMS & WhatsApp Template       |

---

# Recommended MVP API Modules

For first development version, build these modules first:

1. Authentication
2. User Management
3. Tutor Management
4. Tutor Availability
5. Interview Category
6. Interview Slot
7. Booking
8. Payment
9. Payment Webhook
10. Video Meeting
11. Notification
12. Reminder Scheduler
13. Wallet
14. Withdrawal
15. Commission
16. Review & Rating
17. Student Dashboard
18. Tutor Dashboard
19. Admin Dashboard
20. Settings

After MVP, add:

* AI question generation
* Resume analysis
* AI evaluation
* Recording
* Certificates
* Organization module
* Hiring campaign
* Package system
* Refund and dispute
* Advanced reports
* Mobile push notification
* Referral and badge system
