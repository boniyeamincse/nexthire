# File Storage Architecture

## 1. Storage Use Cases

- Profile images
- Tutor verification documents
- Session attachments
- Session recordings
- Invoices and exports

## 2. Recommended Design

- Use object storage such as Amazon S3 or compatible services
- Use signed upload and download URLs
- Store metadata in PostgreSQL, not file contents
- Use content-type validation and size limits

## 3. Security Controls

- Private buckets by default
- Antivirus or malware scanning for user uploads
- Organization-scoped path prefixes and lifecycle policies
- Short-lived signed URLs for access control

## 4. Retention Strategy

- Keep recordings only as long as policy requires
- Archive or delete documents per organization policy and compliance requirements
- Apply lifecycle transitions to reduce cost over time
