# UI/UX Specification

## 1. Purpose

This document defines the user interface and user experience standards for the AI Mock Interview & Tutor Booking Marketplace. The design must support a clear, trustworthy, and efficient experience for students, tutors, organizations, admins, and super admins.

## 2. Experience Goals

- Make booking an interview session fast and intuitive
- Make tutor availability and pricing easy to compare
- Make organization hiring workflows clear and controlled
- Make AI feedback feel useful, actionable, and trustworthy
- Make payment, reminders, and session access feel predictable

## 3. Product Principles

- Clarity first: every screen should answer what, why, and next
- Low friction: minimize clicks for search, booking, and checkout
- Trust by design: surface status, proof, and confirmation states
- Mobile-ready: the experience must work well on smaller screens
- Role-aware: each account type should see only relevant tools
- Accessible by default: support readable contrast, keyboard navigation, and semantic structure

## 4. Visual Direction

| Element | Guideline |
| --- | --- |
| Tone | Professional, modern, and calm |
| Primary focus | Action-oriented interface with strong task completion cues |
| Color use | Distinct colors for success, warning, error, and informational states |
| Typography | Clean, readable type with strong hierarchy |
| Layout | Card-based content with clear spacing and grouped actions |
| Motion | Subtle transitions for loading, confirmation, and modal states |

## 5. Core Information Architecture

### Student Experience

- Home / discovery
- Search and filters
- Tutor profile
- Slot details
- Booking checkout
- Upcoming sessions
- Session room
- Feedback and scorecards
- Payment history

### Tutor Experience

- Dashboard
- Profile setup
- Availability management
- Slot creation
- Booking calendar
- Earnings and wallet
- Reviews and feedback
- Analytics

### Organization Experience

- Organization dashboard
- Candidate pool
- Hiring campaigns
- Interview invitations
- Reports and evaluation summaries
- Members and permissions

### Admin Experience

- Operations dashboard
- User and tutor moderation
- Booking and payment oversight
- Disputes and refunds
- Audit logs
- Reports and system settings

## 6. Key Screens

| Screen | Primary Purpose |
| --- | --- |
| Landing page | Explain value proposition and drive sign-up |
| Tutor search page | Discover and filter interview experts |
| Tutor profile page | Show expertise, reviews, pricing, and availability |
| Slot booking page | Select session time and complete booking |
| Checkout page | Complete payment and confirm reservation |
| Session room | Conduct live interview with video, chat, and notes |
| Feedback page | Capture ratings, comments, and improvement notes |
| Student dashboard | Track upcoming interviews, reports, and history |
| Tutor dashboard | Manage schedule, earnings, and performance |
| Organization dashboard | Manage campaigns, candidates, and invitations |
| Admin dashboard | Monitor operations, disputes, and system health |

## 7. Navigation Model

- Global navigation should be role-aware and context-aware
- Students should see search, bookings, reports, and profile actions
- Tutors should see slots, calendar, wallet, and reviews
- Organizations should see campaigns, candidates, invitations, and reports
- Admins should see moderation, finance, logs, and configuration

## 8. Interaction Patterns

- Use persistent search and filter controls for marketplace discovery
- Use step-based forms for booking and payment
- Use inline validation instead of late-form error dumps
- Use confirmation dialogs for destructive actions
- Use status badges for booking, payment, invitation, and recording states
- Use empty states that explain what to do next

## 9. Booking Journey UX

1. User searches tutors by category, price, language, rating, or schedule.
2. User opens a tutor profile and reviews availability.
3. User selects a slot and sees a clear summary of date, time, price, and policy.
4. User completes payment.
5. User receives a confirmation screen with the session link and reminder schedule.
6. User accesses the session room from dashboard, notification, or calendar entry.

## 10. Tutor Workflow UX

1. Tutor completes profile and verification.
2. Tutor adds availability and publishes interview slots.
3. Tutor receives booking notifications and calendar updates.
4. Tutor joins the session room with video, chat, and notes.
5. Tutor reviews earnings, feedback, and performance analytics after the session.

## 11. Organization Workflow UX

1. Organization creates a campaign or interview program.
2. Organization browses or imports candidates.
3. Organization invites selected students to interview sessions.
4. Organization tracks invitation status, attendance, and outcomes.
5. Organization reviews aggregated reports and campaign performance.

## 12. Admin Workflow UX

1. Admin reviews system dashboards and queue alerts.
2. Admin moderates users, tutors, bookings, disputes, and refunds.
3. Admin checks audit logs and security events.
4. Admin updates categories, commissions, notifications, and system settings.

## 13. Component Standards

| Component | Usage |
| --- | --- |
| Cards | Display tutor profiles, bookings, metrics, and reports |
| Tables | Show bookings, invitations, transactions, and logs |
| Tabs | Organize profile, reviews, availability, and analytics sections |
| Filters | Search by category, rating, price, date, and language |
| Badges | Indicate booking, payment, invitation, and session states |
| Modals | Handle confirmation, refund, and destructive actions |
| Toasts | Show lightweight success or failure feedback |
| Timeline | Show reminders, payment steps, and session history |

## 14. Form Design Rules

- Group related fields logically
- Mark required inputs clearly
- Validate inline as users type or on blur where appropriate
- Preserve entered values after validation failure
- Use short helper text for complex fields such as availability, payout, or campaign setup

## 15. Empty, Loading, and Error States

- Empty states should explain the current state and the next action
- Loading states should preserve layout and avoid abrupt shifts
- Error states should describe the issue in plain language and offer recovery steps
- Partial failure should not block unrelated actions when avoidable

## 16. Accessibility Requirements

- Support keyboard navigation for all primary flows
- Maintain readable color contrast for text and interactive states
- Use semantic headings and labels for assistive technologies
- Avoid relying on color alone to communicate meaning
- Ensure focus states are visible and consistent

## 17. Responsive Behavior

- Mobile should prioritize search, booking, session access, and notifications
- Tablet should preserve dashboard clarity with compact side navigation
- Desktop should support dense operational views for tutors, organizations, and admins
- Tables should collapse gracefully into stacked card layouts on small screens

## 18. Design Tokens

| Token | Intent |
| --- | --- |
| Primary action | Booking, confirmation, publish, save |
| Secondary action | Edit, preview, filter, manage |
| Success state | Confirmation, completed session, paid status |
| Warning state | Pending action, upcoming deadline |
| Error state | Payment failure, booking conflict, validation error |
| Neutral surfaces | Cards, forms, dashboards, tables |

## 19. Content Guidelines

- Use direct, instructional copy
- Avoid jargon where a simpler term works
- Show policy details near booking, payment, and refund actions
- Keep confirmation messages specific to the action that just completed
- Use consistent terminology across the product and documentation

## 20. Trust Signals

- Display tutor verification status
- Show reviews, ratings, and completed session counts
- Show payment confirmation and booking receipts clearly
- Show reminder schedules and join links prominently
- Show audit and status indicators for administrative actions

## 21. Future Enhancements

- AI-generated session summaries inside dashboards
- Smarter personalization for recommended tutors and questions
- Advanced analytics views for organizations and admins
- Improved accessibility modes such as larger text and high-contrast themes
- Multilingual UI support for broader adoption