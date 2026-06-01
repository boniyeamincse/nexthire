# Functional Requirements

## 1. Identity and Access

- FR-001 The system shall allow users to register using email, phone, or social login where enabled.
- FR-002 The system shall support MFA for privileged and configurable user classes.
- FR-003 The system shall enforce role-based authorization for every protected action.

## 2. Marketplace and Scheduling

- FR-010 The system shall allow tutors to create, update, publish, and retire interview slots.
- FR-011 The system shall prevent double booking for a single slot.
- FR-012 The system shall allow students to search and filter available slots.
- FR-013 The system shall allow booking cancellation according to policy rules.

## 3. Payment and Billing

- FR-020 The system shall accept payments through configured gateways.
- FR-021 The system shall confirm bookings only after payment success or allowed credit flow.
- FR-022 The system shall issue refunds according to policy and gateway support.
- FR-023 The system shall calculate platform commission and tutor earnings.

## 4. Live Session Delivery

- FR-030 The system shall generate a secure meeting room for each confirmed session.
- FR-031 The system shall support session join links and participant tracking.
- FR-032 The system shall capture attendance, start time, end time, and session status.

## 5. Notification and Workflow Automation

- FR-040 The system shall send event-driven notifications for booking, reminders, and cancellations.
- FR-041 The system shall retry failed notifications according to policy.
- FR-042 The system shall support scheduled reminders before a session begins.

## 6. Administration and Reporting

- FR-050 The system shall provide admin dashboards for bookings, revenue, disputes, and usage.
- FR-051 The system shall provide audit logs for critical actions.
- FR-052 The system shall allow organizations to manage candidate programs and reports.

## 7. Organization Hiring and Invitations

- FR-060 The system shall allow organization accounts to create hiring campaigns or interview programs.
- FR-061 The system shall allow organization accounts to search the student pool where visibility and consent rules permit.
- FR-062 The system shall allow organization accounts to send interview session invitations to selected students.
- FR-063 The system shall allow students to accept, decline, or reschedule organization invitations according to policy.
- FR-064 The system shall keep organization hiring data isolated from other organization workspaces.

## 8. AI, Feedback, and Assessment

- FR-070 The system shall allow students to upload resumes for AI-assisted analysis.
- FR-071 The system shall generate interview questions using resume, role, category, or skill inputs.
- FR-072 The system shall transcribe interview sessions where transcription is enabled.
- FR-073 The system shall generate answer evaluations, scorecards, and improvement suggestions after completed sessions.
- FR-074 The system shall allow students and tutors to submit and review feedback after a session.

## 9. Wallet, Withdrawal, and Billing

- FR-080 The system shall maintain tutor wallet balances and transaction history.
- FR-081 The system shall calculate platform commission and tutor earnings for completed sessions.
- FR-082 The system shall allow tutors to request withdrawals from available wallet balances.
- FR-083 The system shall allow admins to approve, reject, or mark withdrawals as paid.
- FR-084 The system shall support subscription plans, invoices, and entitlement-based access where enabled.

## 10. Dashboards, Certificates, and Support

- FR-090 The system shall provide role-specific dashboards for students, tutors, organizations, and admins.
- FR-091 The system shall provide interview reports, performance summaries, and usage analytics.
- FR-092 The system shall generate certificates where a completed program or policy grants them.
- FR-093 The system shall provide support ticket creation, reply, and closure workflows.
