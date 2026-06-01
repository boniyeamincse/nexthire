# Payment Integration

## 1. Integration Strategy

Integrate with region-appropriate payment providers and support a provider abstraction layer so gateways can be added or replaced without rewriting business logic.

## 2. Supported Scenarios

- One-time booking payment
- Subscription charge
- Refund and partial refund
- Tutor payout transfer
- Manual reconciliation for failed or disputed transactions

## 3. Payment Flow

1. Create payment intent
2. Redirect or collect payment method details
3. Receive provider authorization
4. Verify webhook signature
5. Update payment record idempotently
6. Confirm booking or subscription activation

## 4. Webhook Requirements

- Idempotent processing
- Signature verification
- Replay protection
- Dead-letter queue for failed events

## 5. Risk Controls

- Reconcile provider events against internal ledger
- Avoid trusting client-side payment success callbacks
- Freeze suspicious transactions for review when fraud signals appear
