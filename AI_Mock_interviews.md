# Software Idea: AI Mock Interview & Tutor Booking Marketplace

## 1. Project Overview

This software will be a complete **Tutor Marketplace + Interview Booking + AI Mock Interview Platform**. Tutors can create interview sessions or available slots, and students can book sessions based on date, time, category, and price.

The platform will work like a combination of:

* Tutor Marketplace
* Calendly-style Scheduling System
* Zoom/WebRTC Video Interview System
* AI Mock Interview Evaluation Platform
* Wallet & Commission-based Earning System

The main goal is to help students prepare for real interviews by booking live sessions with tutors, trainers, interviewers, or organizations.

---

## 2. Main User Roles

### Student

Students can register, browse available interview slots, book sessions, make payment, join video interviews, receive reminders, submit feedback, and view performance reports.

### Tutor

Tutors can register, apply for verification, create interview sessions, manage availability, conduct interviews, receive earnings, view bookings, and request withdrawal.

### Organization

Organizations can create hiring/interview programs, assign interviewers, manage candidates, and review reports.

### Admin

Admin can manage users, tutors, bookings, payments, reports, categories, notifications, platform commission, and disputes.

### Super Admin

Super Admin has full system control including role management, settings, payment gateway configuration, security logs, and platform analytics.

---

## 3. Core Software Flow

## Tutor Interview Booking Flow

### Step 1: Tutor Creates Interview Slot

Tutor will create an interview session with the following information:

* Interview Title
* Category
* Date
* Start Time
* Duration
* Price
* Description
* Meeting Type
* Meeting Link
* Status

Example categories:

* HR Interview
* Cyber Security
* DevOps
* Software Engineering
* IELTS Speaking
* Networking
* Career Counseling

### API Example

POST /api/tutor/interview-slots

### Database Table: interview_slots

| Field        | Description                             |
| ------------ | --------------------------------------- |
| id           | Unique slot ID                          |
| tutor_id     | Tutor ID                                |
| title        | Interview title                         |
| category_id  | Interview category                      |
| date         | Interview date                          |
| start_time   | Start time                              |
| duration     | Session duration                        |
| price        | Session price                           |
| status       | Available, Booked, Cancelled, Completed |
| meeting_link | Auto generated meeting URL              |
| created_at   | Created date                            |

---

### Step 2: Student Books Interview Slot

Student can browse all available interview slots and book a suitable session.

Student can filter by:

* Category
* Tutor
* Price
* Date
* Time
* Rating
* Language
* Experience level

### API Example

GET /api/interview-slots
POST /api/bookings

### Database Table: bookings

| Field          | Description                              |
| -------------- | ---------------------------------------- |
| id             | Booking ID                               |
| slot_id        | Interview slot ID                        |
| student_id     | Student ID                               |
| tutor_id       | Tutor ID                                 |
| booking_status | Pending, Confirmed, Cancelled, Completed |
| payment_status | Pending, Paid, Failed, Refunded          |
| created_at     | Booking date                             |

---

### Step 3: Payment Confirmation

After booking, the student will complete payment using available payment gateways.

Supported payment gateways:

* bKash
* Nagad
* SSLCommerz
* Stripe
* Bank Payment

Payment Flow:

Student Pays → Payment Verified → Booking Confirmed → Meeting Room Created → Tutor & Student Notified

---

### Step 4: Auto Meeting Room Creation

When booking is confirmed, the system will automatically create a video meeting room.

Example meeting URL:

https://app.domain.com/interview/room/ABC123

Video meeting features:

* WebRTC video call
* Audio call
* Screen sharing
* Live chat
* Recording
* Participant tracking
* Session timer
* Join/leave logs

---

### Step 5: Automatic Reminder System

The system will automatically send reminders before the interview starts.

Reminder schedule:

* 24 hours before
* 1 hour before
* 30 minutes before
* 5 minutes before

Notification channels:

* Email
* SMS
* WhatsApp
* Mobile push notification
* In-app notification

---

## 4. 30-Minute Reminder Example

### Student Notification

Your interview with Mr. Rahim will start in 30 minutes.

Date: 01-Jun-2026
Time: 08:00 PM

Join Now: https://app.domain.com/interview/room/ABC123

### Tutor Notification

You have an interview scheduled in 30 minutes.

Student: Boney Yamin
Time: 08:00 PM

Please prepare for the session.

---

## 5. Laravel Background Scheduler

The system will use Laravel Queue and Scheduler for automatic reminders.

Command:

php artisan schedule:run

The scheduler will run every minute and check upcoming interviews.

### Reminder Logic

If interview_start_time - current_time is equal to reminder time, then the system will send notification to student and tutor.

Example logic:

if interview starts in 30 minutes:
send notification to student
send notification to tutor

Recommended Laravel jobs:

* InterviewReminderJob
* BookingConfirmationJob
* PaymentVerificationJob
* MeetingRoomCreateJob
* InterviewCompleteJob
* TutorWalletCreditJob

---

## 6. Tutor Earnings & Wallet System

Tutor earnings will work like a marketplace commission model.

### Earning Flow

Student Pays → Platform Takes Commission → Tutor Wallet Updated → Tutor Requests Withdrawal → Admin Approves Payout

Example:

Session Price: 1000 BDT
Platform Commission: 15%
Tutor Earning: 850 BDT
Platform Earning: 150 BDT

### Main Tables

wallets
transactions
withdraw_requests
payouts
platform_commissions

### Wallet Features

* Tutor wallet balance
* Total earnings
* Pending balance
* Withdrawable balance
* Transaction history
* Withdrawal request
* Admin payout approval

---

## 7. AI Mock Interview Features

The platform can also include AI-powered interview support.

### AI Features

* AI question generation
* Resume-based interview questions
* Follow-up question generation
* Speech-to-text transcription
* Answer evaluation
* Communication score
* Confidence score
* Technical score
* Interview summary
* Improvement suggestions

### Example AI Flow

Student uploads resume → AI analyzes resume → AI generates questions → Tutor conducts interview → System records answers → AI evaluates performance → Student gets scorecard.

---

## 8. Student Dashboard Features

Student dashboard will include:

* Upcoming interviews
* Completed interviews
* Booking history
* Payment history
* Performance score
* AI feedback
* Certificates
* Resume upload
* Notifications
* Tutor reviews
* Interview calendar

---

## 9. Tutor Dashboard Features

Tutor dashboard will include:

* Today’s interviews
* Upcoming bookings
* Interview slot management
* Availability calendar
* Earnings overview
* Wallet balance
* Withdrawal requests
* Student feedback
* Reviews and ratings
* Session analytics

---

## 10. Admin Dashboard Features

Admin dashboard will include:

* Total users
* Total students
* Total tutors
* Pending tutor verification
* Total bookings
* Total revenue
* Platform commission
* Payment reports
* Withdrawal requests
* Refund requests
* User activity logs
* Audit logs
* Security alerts
* Reports and analytics

---

## 11. Main Software Modules

1. Authentication Module
2. User Management Module
3. Tutor Management Module
4. Tutor Availability Module
5. Interview Slot Module
6. Booking Module
7. Calendar Module
8. Category Module
9. Video Meeting Module
10. Payment Module
11. Wallet Module
12. Withdrawal Module
13. Notification Module
14. Reminder Scheduler Module
15. Review & Rating Module
16. AI Question Generator Module
17. Resume Analysis Module
18. AI Evaluation Module
19. Scorecard Module
20. Feedback Module
21. Reports & Analytics Module
22. Admin Module
23. Organization Module
24. Audit Log Module
25. Certificate Module

---

## 12. Suggested Technology Stack

### Backend

Laravel 12
MySQL
Redis Queue
Laravel Scheduler
Laravel Sanctum or Passport
WebSocket for real-time features

### Frontend

React.js / Next.js
Tailwind CSS
Admin dashboard UI
Student dashboard
Tutor dashboard

### Mobile App

Flutter 

### Video System

WebRTC
Jitsi Meet integration
Daily.co
Agora
Zoom API

### Notification System

Email SMTP
SMS Gateway
WhatsApp API
Firebase Push Notification
In-app notification

### Payment Gateway

SSLCommerz
bKash
Nagad
Stripe

---

## 13. MVP Version Features

For first version, build only the most important features:

### MVP Features

* Student registration/login
* Tutor registration/login
* Tutor profile
* Tutor interview slot creation
* Student slot browsing
* Booking system
* Payment confirmation
* Auto meeting link generation
* Email notification
* Basic reminder system
* Tutor wallet
* Admin dashboard
* Review and rating

After MVP completion, add AI interview evaluation, resume analysis, recording, certificates, and organization module.

---

## 14. Future Advanced Features

* AI interview bot
* Resume scoring
* Auto-generated interview report
* Live transcription
* Interview recording playback
* Organization hiring campaign
* Subscription plans
* Coupon system
* Referral system
* Tutor ranking algorithm
* Dispute management
* Refund system
* Certificate generation
* Mobile app
* Multi-language support
* Real-time analytics

---

## 15. Final Software Concept

This system will be a professional **AI Mock Interview & Tutor Marketplace Platform** where tutors can sell interview sessions, students can book based on schedule and category, and the system automatically manages payment, reminders, video meeting, feedback, scorecard, and tutor earnings.

It can be used by:

* Students
* Job seekers
* Freelancers
* Training centers
* Universities
* IT institutes
* HR teams
* Organizations

This platform can become a complete software business model for interview preparation, career development, and skill assessment.
