# Billing and Subscription

## 1. Billing Model

The platform should support marketplace commissions, subscription plans, and add-on consumption charges.

## 2. Plan Structure

| Plan Type | Target Customer | Example Entitlements |
| --- | --- | --- |
| Free | New users | Limited usage, basic booking access |
| Student Pro | Active learners | AI credits, analytics, premium practice |
| Tutor Pro | Tutors | Featured listing, wallet tools, advanced scheduling |
| Organization | Companies and institutions | Candidate programs, reporting, admin controls |
| Enterprise | Large customers | SSO, dedicated support, SLAs, data residency options |

## 3. Subscription Lifecycle

- Trial or free tier activation
- Plan selection and payment method capture
- Renewal, proration, upgrade, and downgrade handling
- Dunning for failed renewals
- Cancellation with defined entitlement grace period

## 4. Invoicing Rules

- Produce invoices for subscription charges and enterprise billing
- Preserve invoice history for finance and audit purposes
- Separate taxes, fees, and discounts where applicable

## 5. Entitlement Enforcement

- Enforce feature access from subscription metadata
- Meter AI usage and premium exports where relevant
- Block overuse or require upgrade when plan limits are reached
