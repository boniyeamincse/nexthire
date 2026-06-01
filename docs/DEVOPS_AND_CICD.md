# DevOps and CI/CD

## 1. Platform Baseline

- Containerize services with Docker
- Deploy to Kubernetes
- Use Infrastructure as Code for environments and provisioning
- Separate dev, staging, and production environments

## 2. CI Pipeline

1. Lint and format checks
2. Unit tests
3. Static analysis and security scans
4. Build container images
5. Run integration tests
6. Publish versioned artifacts

## 3. CD Pipeline

- Deploy to staging on merge
- Require approvals for production
- Use blue-green or canary deployment strategies where possible
- Roll back automatically on failed health checks

## 4. Operational Practices

- Immutable builds
- Configuration through environment variables and secret stores
- Database migrations versioned and repeatable
- Infrastructure changes reviewed like code
