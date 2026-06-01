# Roadmap

## 1. Product Vision

Build a software platform that helps students prepare for interviews, helps tutors monetize coaching, and gives organizations a controlled workflow for hiring and interview programs.

## 2. Roadmap Principles

- Ship the booking and payment loop before advanced AI features
- Keep the tutor and student journey simple before expanding into organization workflows
- Introduce AI in steps, starting with scoring and reports before full interview automation
- Protect core conversion, reliability, and trust before moving into premium growth features
- Keep every phase deployable on its own without blocking the next phase

## 3. Phase 1: MVP Foundation

### Goal

Deliver the minimum complete product that supports registration, tutor discovery, booking, payment, reminders, wallet basics, and admin oversight.

### Scope

- User registration, login, and MFA
- Student profile and tutor profile setup
- Tutor slot creation and availability management
- Search, filter, and booking flow
- Payment confirmation and booking status updates
- Email and notification reminders
- Tutor wallet balance and commission basics
- Admin moderation, booking oversight, and basic reporting
- Core audit logging and operational monitoring

### Deliverables

- Responsive web application for students, tutors, and admins
- Stable booking and payment workflow
- Role-based access controls
- Database schema for core marketplace data
- Admin dashboard for moderation and support

### Exit Criteria

- Users can register, book, pay, and attend a session successfully
- Tutors can create slots and receive wallet updates
- Admins can review bookings, users, and system events
- Reminders are delivered reliably for upcoming sessions

## 4. Phase 2: V1 Growth

### Goal

Add AI-assisted learning, richer analytics, subscriptions, and organization workflows while improving monetization and operational control.

### Scope

- AI mock interview scoring
- Resume scoring and AI question generation
- Transcript-based session summaries
- Auto-generated interview reports and scorecards
- Advanced analytics dashboards
- Subscriptions and add-on billing
- Organization accounts and candidate management
- Interview invitation workflows
- Better payout automation and dispute handling

### Deliverables

- AI result views for students, tutors, and organizations
- Organization campaign and invitation workflows
- Subscription plans and invoice support
- Enhanced wallet, withdrawal, and payout flows
- Reporting dashboards for performance and usage

### Exit Criteria

- AI scoring and reports are available for completed sessions
- Organizations can manage campaigns and candidate invitations
- Subscription and add-on revenue flows operate correctly
- Dispute and payout workflows are stable and auditable

## 5. Phase 3: Enterprise Expansion

### Goal

Prepare the product for larger customers with stronger governance, identity controls, compliance, and service-level commitments.

### Scope

- SSO and SCIM support
- Advanced account and organization permissions
- Dedicated organization deployments
- Data residency and advanced retention controls
- SLA-backed support and audit exports
- Custom billing, finance integration, and compliance tooling
- Stronger governance for logs, reports, and access reviews

### Deliverables

- Enterprise onboarding flow
- Provisioning and access automation
- Audit and export tooling
- Compliance-ready documentation and support processes
- Configuration model for enterprise customers

### Exit Criteria

- Enterprise customers can be onboarded with controlled access
- Security and compliance expectations are documented and testable
- Audit exports and reporting are available on demand
- Support and billing workflows can handle enterprise scale

## 6. AI Feature Sequence

AI features should be released in this order:

1. Resume scoring
2. Question generation
3. Speech-to-text transcription
4. AI evaluation and scorecards
5. Auto-generated interview reports
6. AI interview bot
7. Interview recording playback with transcript sync
8. Tutor ranking algorithm
9. Recommendation engine
10. Multilingual AI support
11. AI analytics dashboard

## 7. Dependency Order

- Authentication and RBAC must be complete before any protected workflows
- Booking and payment must be stable before AI scoring and reporting
- Transcript and recording storage must exist before playback and summaries
- Wallet and payouts must be verified before subscriptions and enterprise billing
- Organization workflows must respect visibility, consent, and audit rules before candidate invitations

## 8. Release Gates

Each phase should pass these gates before promotion:

- Core journeys pass smoke and regression tests
- No critical security or payment defects remain open
- Audit logging is enabled for sensitive actions
- Performance is acceptable under expected load
- Support and rollback procedures are documented

## 9. Delivery Themes

- Improve booking conversion and payment success
- Increase repeat usage through reminders and AI feedback
- Expand from individual users to organizations and institutions
- Build a trustworthy, procurement-ready product with clear reporting and compliance

## 10. Suggested Build Order

1. Authentication, user profiles, and RBAC
2. Tutor availability and slot management
3. Search, booking, and payment flow
4. Notifications, reminders, and session access
5. Wallet, withdrawals, and moderation
6. AI scoring, resume analysis, and reporting
7. Organization campaigns and invitations
8. Subscriptions, analytics, and dispute workflows
9. Enterprise identity, compliance, and deployment controls
