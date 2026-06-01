# Monitoring and Logging

## 1. Observability Goals

- Detect failures before users report them
- Understand booking, payment, and notification latency
- Trace organization-level incidents quickly

## 2. Monitoring Stack

- Prometheus for metrics collection
- Grafana for dashboards and alerts
- Central log aggregation for search and retention
- Distributed tracing for cross-service workflows

## 3. Core Metrics

- Login success rate
- Booking conversion rate
- Payment success rate
- Reminder delivery success rate
- API latency and error rate
- Queue depth and worker lag

## 4. Logging Standards

- Structured JSON logs
- Correlation IDs on every request
- Organization ID and user ID where allowed
- No secrets or raw payment credentials in logs

## 5. Alerting

- Payment webhook failures
- Notification backlog growth
- Elevated 5xx rates
- Database saturation or storage threshold breaches
