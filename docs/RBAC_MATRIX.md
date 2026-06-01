# RBAC Matrix

## 1. Roles

- Student
- Tutor
- Organization Admin
- Organization Member
- Admin
- Super Admin

## 2. Permission Matrix

| Permission | Student | Tutor | Org Admin | Org Member | Admin | Super Admin |
| --- | --- | --- | --- | --- | --- | --- |
| Browse tutors and slots | Yes | Yes | Yes | Yes | Yes | Yes |
| Create availability slots | No | Yes | No | No | Yes | Yes |
| Book sessions | Yes | No | Yes | Yes | Yes | Yes |
| Manage bookings | Own only | Own only | Organization scope | Organization scope | Yes | Yes |
| View wallet and earnings | Own payments | Yes | Organization scope | No | Yes | Yes |
| Process payouts | No | Request only | No | No | Yes | Yes |
| Manage users and roles | No | No | Organization scope limited | No | Yes | Yes |
| View audit logs | No | No | No | No | Limited | Yes |
| Configure platform settings | No | No | No | No | No | Yes |

## 3. Principles

- Default deny
- Least privilege
- Organization scoping by default
- Elevated actions require explicit policy checks and audit trails
