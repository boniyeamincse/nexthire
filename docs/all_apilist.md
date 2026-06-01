# AI Mock Interview & Tutor Marketplace Software

## Complete API List Module-wise

### API Design Rules

- All endpoints are versioned under `/api/v1`
- Resource names are plural where practical
- Read endpoints use `GET`, create endpoints use `POST`, updates use `PUT` or `PATCH`, and deletes use `DELETE`
- Administrative operations are scoped under `/api/v1/admin`
- Webhooks are isolated under `/api/v1/webhooks`

---

# 1. Authentication Module

### Purpose

User registration, login, logout, email verification, password reset, MFA, session management, and profile access.

### APIs

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

### Roles Supported

* Student
* Tutor
* Organization Admin
* Organization Member
* Admin
* Super Admin

---

# 2. User Management Module

### Purpose

Admin can manage users, roles, verification, status, and activity history.

### APIs

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
GET    /api/v1/admin/users/{id}/activity-logs
GET    /api/v1/admin/users/{id}/login-history
```

---

# 3. Tutor Management Module

### Purpose

Tutor application, profile, verification, earnings, reviews, and public tutor listing.

### APIs

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
```

---

# 4. Tutor Availability Module

### Purpose

Tutors set available days, time ranges, breaks, and unavailable dates.

### APIs

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

### Purpose

Manage interview categories like HR, Cyber Security, DevOps, IELTS, Networking, and related tracks.

### APIs

```http
POST   /api/v1/categories
GET    /api/v1/categories
GET    /api/v1/categories/{id}
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
PATCH  /api/v1/categories/{id}/status
```

### Example Categories

* HR Interview
* Software Engineering
* Cyber Security
* DevOps
* IELTS
* Networking
* Cloud Computing
* Data Science
* Career Counseling

---

# 6. Interview Slot Module

### Purpose

Tutors create interview slots that students can book.

### APIs

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

### Slot Fields

```text
id
tutor_id
organization_id
category_id
title
description
date
start_time
end_time
duration
price
currency
status
meeting_link
created_at
updated_at
```

---

# 7. Booking Module

### Purpose

Students can book, cancel, reschedule, and view interview bookings.

### APIs

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

### Booking Status

```text
pending
confirmed
cancelled
completed
rescheduled
refunded
```

---

# 8. Calendar Module

### Purpose

Students and tutors can view interview sessions in calendar format.

### APIs

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

### Purpose

Student payments, payment verification, payment history, refunds, and gateway integration.

### APIs

```http
POST   /api/v1/payments/intents
POST   /api/v1/payments/verify
GET    /api/v1/payments
GET    /api/v1/payments/{id}
POST   /api/v1/payments/{id}/refund
GET    /api/v1/payments/{id}/invoice
POST   /api/v1/webhooks/payments/bkash
POST   /api/v1/webhooks/payments/nagad
POST   /api/v1/webhooks/payments/sslcommerz
POST   /api/v1/webhooks/payments/stripe
```

### Payment Gateways

* bKash
* Nagad
* SSLCommerz
* Stripe

---

# 10. Video Meeting Module

### Purpose

Create and manage online interview rooms.

### APIs

```http
POST   /api/v1/meetings
POST   /api/v1/meetings/{id}/join
POST   /api/v1/meetings/{id}/end
GET    /api/v1/meetings/{id}/participants
GET    /api/v1/meetings/{id}
POST   /api/v1/meetings/{id}/token
PATCH  /api/v1/meetings/{id}/status
```

### Features

* WebRTC room
* Meeting token
* Screen share
* Live chat
* Recording
* Participant logs

---

# 11. Live Chat Module

### Purpose

Students and tutors can chat inside interview rooms.

### APIs

```http
POST   /api/v1/chats/messages
GET    /api/v1/chats/messages
GET    /api/v1/chats/bookings/{booking_id}/messages
DELETE /api/v1/chats/messages/{id}
PATCH  /api/v1/chats/messages/{id}/read
```

---

# 12. Audio Recording Module

### Purpose

Upload and manage interview audio recordings.

### APIs

```http
POST   /api/v1/audio-recordings
GET    /api/v1/audio-recordings/{id}
GET    /api/v1/audio-recordings/sessions/{session_id}
DELETE /api/v1/audio-recordings/{id}
```

---

# 13. Video Recording Module

### Purpose

Start, stop, list, view, and delete interview recordings.

### APIs

```http
POST   /api/v1/recordings
PATCH  /api/v1/recordings/{id}/stop
GET    /api/v1/recordings
GET    /api/v1/recordings/{id}
GET    /api/v1/recordings/sessions/{session_id}
DELETE /api/v1/recordings/{id}
```

---

# 14. Notification Module

### Purpose

Send email, SMS, WhatsApp, push, and in-app notifications.

### APIs

```http
POST   /api/v1/notifications
GET    /api/v1/notifications
GET    /api/v1/notifications/{id}
PATCH  /api/v1/notifications/{id}/read
PATCH  /api/v1/notifications/read-all
DELETE /api/v1/notifications/{id}
```

### Notification Types

* Email
* SMS
* WhatsApp
* Mobile Push
* In-App Notification

---

# 15. Reminder Scheduler Module

### Purpose

Automatic reminders before interview sessions start.

### APIs

```http
POST   /api/v1/reminders
GET    /api/v1/reminders
GET    /api/v1/reminders/{id}
DELETE /api/v1/reminders/{id}
POST   /api/v1/reminders/test-send
```

### Auto Reminder Times

```text
24 hours before
1 hour before
30 minutes before
5 minutes before
```

### Laravel Jobs

```text
InterviewReminderJob
BookingConfirmationJob
PaymentSuccessJob
MeetingRoomCreateJob
InterviewCompleteJob
TutorWalletCreditJob
```

---

# 16. Wallet Module

### Purpose

Tutor wallet balance and transaction history.

### APIs

```http
GET    /api/v1/wallets/me
GET    /api/v1/wallets/me/balance
GET    /api/v1/wallets/me/transactions
GET    /api/v1/wallets/me/transactions/{id}
GET    /api/v1/wallets/me/summary
```

---

# 17. Withdrawal Module

### Purpose

Tutors request withdrawals, and admins approve or reject payouts.

### APIs

```http
POST   /api/v1/withdrawals
GET    /api/v1/withdrawals
GET    /api/v1/withdrawals/{id}
PATCH  /api/v1/admin/withdrawals/{id}/approve
PATCH  /api/v1/admin/withdrawals/{id}/reject
PATCH  /api/v1/admin/withdrawals/{id}/mark-paid
```

---

# 18. Commission Module

### Purpose

Manage platform commission from tutor earnings.

### APIs

```http
GET    /api/v1/admin/commissions
POST   /api/v1/admin/commissions
GET    /api/v1/admin/commissions/{id}
PUT    /api/v1/admin/commissions/{id}
DELETE /api/v1/admin/commissions/{id}
GET    /api/v1/admin/commissions/report
```

### Example

```text
Session Price: 1000 BDT
Platform Commission: 15%
Tutor Earning: 850 BDT
Platform Earning: 150 BDT
```

---

# 19. Review & Rating Module

### Purpose

Students can review tutors after completed sessions.

### APIs

```http
POST   /api/v1/reviews
GET    /api/v1/reviews
GET    /api/v1/reviews/{id}
GET    /api/v1/tutors/{tutor_id}/reviews
PUT    /api/v1/reviews/{id}
DELETE /api/v1/reviews/{id}
```

---

# 20. Question Bank Module

### Purpose

Manage interview questions for different categories.

### APIs

```http
POST   /api/v1/questions
GET    /api/v1/questions
GET    /api/v1/questions/{id}
PUT    /api/v1/questions/{id}
DELETE /api/v1/questions/{id}
GET    /api/v1/questions/categories/{category_id}
GET    /api/v1/questions/difficulty/{level}
```

### Question Types

* MCQ
* Short Answer
* Technical
* Behavioral
* Scenario-based
* Coding
* HR

---

# 21. AI Question Generator Module

### Purpose

AI can generate interview questions based on category, resume, skill, or job role.

### APIs

```http
POST   /api/v1/ai/questions/generate
POST   /api/v1/ai/questions/follow-up
POST   /api/v1/ai/questions/custom
POST   /api/v1/ai/questions/from-resume
POST   /api/v1/ai/questions/from-job-role
```

---

# 22. Resume Module

### Purpose

Students can upload resumes and request AI analysis.

### APIs

```http
POST   /api/v1/resumes
GET    /api/v1/resumes
GET    /api/v1/resumes/{id}
DELETE /api/v1/resumes/{id}
POST   /api/v1/resumes/{id}/analyze
GET    /api/v1/resumes/{id}/analysis
```

---

# 23. Speech-To-Text Module

### Purpose

Convert interview audio into text transcripts.

### APIs

```http
POST   /api/v1/transcriptions
GET    /api/v1/transcriptions/{id}
GET    /api/v1/transcriptions/sessions/{session_id}
DELETE /api/v1/transcriptions/{id}
```

---

# 24. AI Evaluation Module

### Purpose

AI evaluates student answers, communication, confidence, and technical skill.

### APIs

```http
POST   /api/v1/ai/evaluations/answers
POST   /api/v1/ai/evaluations/interview-summary
POST   /api/v1/ai/evaluations/communication-score
POST   /api/v1/ai/evaluations/confidence-score
POST   /api/v1/ai/evaluations/technical-score
POST   /api/v1/ai/evaluations/improvement-suggestions
```

---

# 25. Scorecard Module

### Purpose

Generate student performance scorecards after interviews.

### APIs

```http
GET    /api/v1/scorecards
GET    /api/v1/scorecards/{session_id}
POST   /api/v1/scorecards/generate
GET    /api/v1/scorecards/students/{student_id}
GET    /api/v1/scorecards/{session_id}/download
```

### Score Sections

* Technical score
* Communication score
* Confidence score
* Problem-solving score
* Overall score
* Improvement notes

---

---

# 26. Feedback Module

### Purpose

Tutors and students can submit feedback after a completed interview.

### APIs

```http
POST   /api/v1/feedback
GET    /api/v1/feedback/{session_id}
GET    /api/v1/students/{student_id}/feedback
GET    /api/v1/tutors/{tutor_id}/feedback
PUT    /api/v1/feedback/{id}
DELETE /api/v1/feedback/{id}
```

---

# 27. Certificate Module

### Purpose

Generate certificates after completing interview packages or training sessions.

### APIs

```http
POST   /api/v1/certificates
GET    /api/v1/certificates
GET    /api/v1/certificates/{id}
GET    /api/v1/certificates/{id}/download
DELETE /api/v1/certificates/{id}
```

---

# 28. Subscription Module

### Purpose

Students, tutors, or organizations can subscribe to premium plans.

### APIs

```http
POST   /api/v1/subscriptions
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/{id}
PATCH  /api/v1/subscriptions/{id}/cancel
PATCH  /api/v1/subscriptions/{id}/renew
GET    /api/v1/subscription-plans
```

---

# 29. Organization Module

### Purpose

Organizations can create workspaces, manage members, and coordinate interview programs.

### APIs

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

# 30. Hiring Campaign Module

### Purpose

Organizations can create hiring campaigns and interview events.

### APIs

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

# 31. Student Dashboard Module

### Purpose

Student dashboard data.

### APIs

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

# 32. Tutor Dashboard Module

### Purpose

Tutor dashboard data.

### APIs

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

# 33. Organization Dashboard Module

### Purpose

Organization dashboard data.

### APIs

```http
GET    /api/v1/dashboards/organization
GET    /api/v1/organizations/me/candidates
GET    /api/v1/organizations/me/interviews
GET    /api/v1/organizations/me/reports
GET    /api/v1/organizations/me/hiring-campaigns
GET    /api/v1/organizations/me/performance
```

---

# 34. Admin Dashboard Module

### Purpose

Admin overview of the full platform.

### APIs

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

# 35. Reports & Analytics Module

### Purpose

Generate business, revenue, user, interview, and performance reports.

### APIs

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

# 36. File Manager Module

### Purpose

Upload and manage files such as resumes, profile images, certificates, reports, and recordings.

### APIs

```http
POST   /api/v1/files
GET    /api/v1/files
GET    /api/v1/files/{id}
DELETE /api/v1/files/{id}
POST   /api/v1/files/batch
```

---

# 37. Audit Log Module

### Purpose

Track important system activities for security and admin review.

### APIs

```http
GET    /api/v1/audit-logs
GET    /api/v1/audit-logs/{id}
GET    /api/v1/audit-logs/users/{user_id}
GET    /api/v1/audit-logs/modules/{module_name}
DELETE /api/v1/audit-logs/{id}
```

---

# 38. Security Module

### Purpose

Manage login history, suspicious activity, blocked IPs, and admin security alerts.

### APIs

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

# 39. Settings Module

### Purpose

Manage global platform settings.

### APIs

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

# 40. Support Ticket Module

### Purpose

Students, tutors, and organizations can create support tickets.

### APIs

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

# Final Module Summary

| No | Module Name |
| -: | ----------- |
|  1 | Authentication |
|  2 | User Management |
|  3 | Tutor Management       |
|  4 | Tutor Availability     |
|  5 | Interview Category     |
|  6 | Interview Slot         |
|  7 | Booking                |
|  8 | Calendar               |
|  9 | Payment                |
| 10 | Video Meeting          |
| 11 | Live Chat              |
| 12 | Audio Recording        |
| 13 | Video Recording        |
| 14 | Notification           |
| 15 | Reminder Scheduler     |
| 16 | Wallet                 |
| 17 | Withdrawal             |
| 18 | Commission             |
| 19 | Review & Rating        |
| 20 | Question Bank          |
| 21 | AI Question Generator  |
| 22 | Resume                 |
| 23 | Speech-To-Text         |
| 24 | AI Evaluation          |
| 25 | Scorecard              |
| 26 | Feedback               |
| 27 | Certificate            |
| 28 | Subscription           |
| 29 | Organization           |
| 30 | Hiring Campaign        |
| 31 | Student Dashboard      |
| 32 | Tutor Dashboard        |
| 33 | Organization Dashboard |
| 34 | Admin Dashboard        |
| 35 | Reports & Analytics    |
| 36 | File Manager           |
| 37 | Audit Log              |
| 38 | Security               |
| 39 | Settings               |
| 40 | Support Ticket         |

---

# Recommended MVP API Modules

For first version, build these modules first:

1. Authentication
2. User Management
3. Tutor Management
4. Interview Category
5. Interview Slot
6. Booking
7. Payment
8. Video Meeting
9. Notification
10. Reminder Scheduler
11. Wallet
12. Withdrawal
13. Review & Rating
14. Student Dashboard
15. Tutor Dashboard
16. Admin Dashboard

After MVP, add AI, resume analysis, recording, certificates, organization, subscription, and advanced reports.
