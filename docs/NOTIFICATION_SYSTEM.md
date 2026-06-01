# Notification System

## 1. Channels

- Email
- SMS
- WhatsApp where supported
- Push notification
- In-app notification

## 2. Event Sources

- Booking created
- Payment confirmed or failed
- Session reminder due
- Session starting soon
- Session completed
- Payout requested or approved

## 3. Processing Model

The system should publish domain events to a queue and let notification workers render templates, deduplicate messages, and retry failures.

## 4. Template Management

- Organization-aware template configuration
- Localization support
- Merge tags for user name, booking time, and join link

## 5. Delivery Rules

- Use escalation schedules for reminders
- Respect opt-in and channel preferences
- Record delivery attempts and final status for auditability
