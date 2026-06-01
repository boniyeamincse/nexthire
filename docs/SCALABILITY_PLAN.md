# Scalability Plan

## 1. Scaling Objectives

- Support more accounts and organizations without redesign
- Increase booking throughput during peak demand
- Keep latency stable for read-heavy marketplace views
- Handle spikes in reminders, webhooks, and AI requests

## 2. Technical Levers

- Horizontal scaling of stateless services
- Redis caching for availability, profiles, and config
- Queue-based background processing for slow tasks
- Database indexing, partitioning, and read replicas where needed

## 3. Growth Path

| Stage | Focus |
| --- | --- |
| MVP | Single-region, modular monolith, simple autoscaling |
| Growth | Service extraction, stronger caching, queue hardening |
| Enterprise | Dedicated account options, SSO, data residency, and SLAs |

## 4. Bottleneck Watchlist

- Booking transaction contention
- Notification throughput
- Webhook and payout latency
- Large report generation jobs
- AI inference cost and queue wait times
