# NextHire — AI Mock Interview & Tutor Booking Marketplace

Welcome to the **NextHire** repository! NextHire is an enterprise-grade platform connecting professionals with expert tutors for mock interviews, alongside an intelligent AI-driven performance tracking system.

---

## 🛠️ Tech Stack

*   **Backend:** Laravel 12 (PHP), MySQL, Sanctum (Auth), Predis (Queues/Cache).
*   **Frontend:** React 19, Vite, React Router, Custom CSS (Glassmorphism, Dark Theme).
*   **Documentation:** Fully detailed in the `/docs` directory.

---

## 🚀 Developer Guidelines (For the Team)

Since multiple developers are working on this project, please follow this strict Git workflow to avoid merge conflicts and ensure code stability.

### 1. Initial Setup (First Time Only)

Clone the repository and set up your local environment:

```bash
# Clone the repository
git clone https://github.com/boniyeamincse/nexthire.git
cd nexthire

# Setup Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
# Make sure your XAMPP/MySQL is running and database 'mock_interview' exists.

# Setup Frontend
cd ../frontend
npm install
```

### 2. Daily Workflow (Pulling Code)

**ALWAYS** pull the latest code from the `main` branch before you start working or creating a new feature branch.

```bash
# Ensure you are on the main branch
git checkout main

# Fetch and pull the latest changes from the remote repository
git pull origin main

# (Optional) If dependencies were updated by another developer:
cd backend && composer install && php artisan migrate
cd ../frontend && npm install
```

### 3. Feature Development (Working on your assigned task)

**NEVER** work directly on the `main` branch. Always create a feature branch for your specific task.

```bash
# Create a new branch based on your task (e.g., feature/login-page, fix/header-bug)
git checkout -b feature/your-feature-name

# ... Make your code changes ...

# Stage your changes
git add .

# Commit with a descriptive, conventional commit message
git commit -m "feat: added new login UI components"

# Push your branch to GitHub
git push -u origin feature/your-feature-name
```

### 4. Merging Your Work

1.  Push your feature branch to GitHub.
2.  Open a **Pull Request (PR)** on GitHub from your feature branch to `main`.
3.  Ask a senior developer/team lead to review your code.
4.  Once approved, the PR will be merged into `main`.
5.  After the merge, delete your local feature branch and pull the updated `main` branch again (go back to Step 2).

---

## 🏃 Running the Application Locally

You need to run both the backend and frontend servers simultaneously in separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
php artisan serve
# Runs on http://localhost:8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 📚 Project Documentation

All system architecture, PRDs, API lists, UI/UX specs, and deployment guides are available in the [`/docs`](./docs/README.md) directory. Please read them carefully to understand the enterprise structure of NextHire.
