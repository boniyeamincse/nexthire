# Backend Installation

## 1. Purpose

This guide explains how to install and run the Laravel API backend for the AI Mock Interview & Tutor Booking Marketplace.

## 2. Backend Stack

- Laravel 12
- PHP 8.2 or later
- PostgreSQL
- Redis
- Queue worker for background jobs
- Scheduler for reminders and automation
- Object storage for resumes, recordings, and exports

## 3. Prerequisites

Before installation, make sure the following tools and services are available:

- PHP
- Composer
- Node.js and npm
- PostgreSQL
- Redis
- A mail provider or SMTP account
- Storage credentials for local or cloud file storage

## 4. Project Setup

1. Clone the repository and open the project root.
2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Install PHP dependencies:

   ```bash
   composer install
   ```

4. Install frontend dependencies if the backend includes asset compilation:

   ```bash
   npm install
   ```

5. Generate the application key:

   ```bash
   php artisan key:generate
   ```

6. Configure database, cache, queue, mail, and storage values in `.env`.

## 5. Environment Configuration

Set these values correctly for local development:

- `APP_NAME`
- `APP_ENV=local`
- `APP_DEBUG=true`
- `APP_URL`
- `DB_CONNECTION=pgsql`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `CACHE_STORE=redis`
- `QUEUE_CONNECTION=redis`
- `REDIS_HOST`
- `REDIS_PASSWORD`
- `REDIS_PORT`
- `MAIL_MAILER`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `FILESYSTEM_DISK`

## 6. Database Setup

Run migrations and seed any base data:

```bash
php artisan migrate --seed
```

If the project uses additional seeders for categories, roles, or plans, run them here as well.

## 7. Running the Backend

Start the API server:

```bash
php artisan serve
```

Start the queue worker in a second terminal:

```bash
php artisan queue:work
```

Run the scheduler locally when testing reminder jobs:

```bash
php artisan schedule:run
```

## 8. Optional Frontend Build

If the backend serves any admin assets or compiled frontend resources, build them with:

```bash
npm run build
```

For local development, you may also use:

```bash
npm run dev
```

## 9. Validation Checklist

- The API responds on the expected base URL
- Authentication endpoints return valid responses
- Database migrations complete successfully
- Queue jobs process without errors
- Reminder and notification jobs can be triggered
- File uploads and storage paths work correctly

## 10. Recommended Local Workflow

1. Run the API server.
2. Run the queue worker.
3. Keep the scheduler active while testing reminders.
4. Verify logs after booking, payment, and notification flows.
5. Confirm admin, tutor, and student routes work as expected.
