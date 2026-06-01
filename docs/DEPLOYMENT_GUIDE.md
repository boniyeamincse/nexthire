# Deployment Guide

## 1. Environments

- Local development
- Shared development
- Staging
- Production

## 2. Laravel API Backend Installation

This project uses a Laravel API backend as the application server for authentication, booking, payments, wallet operations, notifications, and admin workflows.

### 2.1 Backend Stack

- Laravel 12
- PHP 8.2 or later
- PostgreSQL for primary data storage
- Redis for cache and queues
- Queue worker for async jobs
- Storage service for uploads and exports

### 2.2 Local Installation Steps

1. Install PHP, Composer, PostgreSQL, Redis, and Node.js.
2. Clone the repository and open the project root.
3. Copy the environment file:

	```bash
	cp .env.example .env
	```

4. Install PHP dependencies:

	```bash
	composer install
	```

5. Generate the application key:

	```bash
	php artisan key:generate
	```

6. Configure database, cache, queue, mail, and storage credentials in `.env`.
7. Run database migrations and seed initial data:

	```bash
	php artisan migrate --seed
	```

8. Install frontend dependencies if the backend serves an admin or API test UI:

	```bash
	npm install
	npm run build
	```

9. Start the Laravel API server:

	```bash
	php artisan serve
	```

10. Start the queue worker in a separate terminal:

	 ```bash
	 php artisan queue:work
	 ```

11. Start the scheduler in development or use a cron job in production:

	 ```bash
	 php artisan schedule:run
	 ```

### 2.3 Environment Variables

- `APP_NAME` should identify the product clearly as the interview marketplace backend
- `APP_ENV` should be `local`, `staging`, or `production`
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` must match the PostgreSQL setup
- `CACHE_STORE` and `QUEUE_CONNECTION` should point to Redis or the chosen queue driver
- `MAIL_*` settings should be configured for reminders and notifications
- `FILESYSTEM_DISK` should point to the storage backend used for resumes, recordings, and exports

### 2.4 First Validation Checks

- Confirm the API responds on the expected base URL
- Confirm login and MFA flows work
- Confirm migrations and seed data completed successfully
- Confirm queue jobs execute for reminders and booking confirmation
- Confirm scheduler-driven tasks are firing as expected

## 3. Prerequisites

- Container runtime and cluster access
- PostgreSQL, Redis, and object storage endpoints
- Queue broker access
- Payment gateway sandbox credentials

## 4. Release Process

1. Merge approved code to the release branch or mainline
2. Build and tag images
3. Run migrations in a controlled step
4. Deploy to staging and validate smoke tests
5. Promote to production with rollback readiness

## 5. Production Controls

- Health checks and readiness probes
- Feature flags for high-risk capabilities
- Emergency rollback procedures
- Secret rotation and config drift checks
