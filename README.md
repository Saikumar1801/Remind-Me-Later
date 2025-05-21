# RemindMeLater Full Stack Application

RemindMeLater is a web application that allows users to set up reminders with messages, which can be delivered via various methods (initially SMS and Email). This repository contains both the backend API built with Django and a frontend client built with React.

![screencapture-localhost-5173-2025-05-22-00_18_12](https://github.com/user-attachments/assets/80b3bb9f-b1b1-4593-a4b8-f388b345904b)

## Project Overview

The application consists of two main parts:

*   **Backend (`/backend`):** A RESTful API built with Django and Django REST Framework. It handles user authentication, reminder creation, storage, and provides endpoints for the frontend to interact with.
*   **Frontend (`/frontend`):** A single-page application (SPA) built with React (using Vite). It provides the user interface for logging in, setting reminders, and viewing existing reminders.

## Demo:
[screen-capture (5).webm](https://github.com/user-attachments/assets/f4f87e62-2085-433e-94d6-1ecb9794e189)

## Features (Implemented & Planned)

*   **User Authentication:** Secure user login with token-based authentication.
*   **Reminder Management:**
    *   Create, view, update, and delete reminders.
    *   Set reminder message, date, time, and delivery method (SMS/Email).
*   **User-Specific Data:** Users can only access and manage their own reminders.
*   **API Features:**
    *   Filtering reminders (e.g., by delivery method, sent status).
    *   Searching reminders by message content.
    *   Pagination for reminder lists.
    *   Custom API actions (e.g., mark as sent, list upcoming).
*   **Responsive UI (Frontend):** (Basic implementation, can be enhanced)
*   **(Planned) Actual Notification Delivery:** Integration with SMS/Email services (e.g., Twilio, SendGrid) via a background task processor (e.g., Celery).

## Technology Stack

**Backend:**
*   Python 3.x
*   Django
*   Django REST Framework
*   Django Filter
*   SQLite (for development, PostgreSQL recommended for production)
*   Token Authentication (DRF `authtoken`)

**Frontend:**
*   Node.js & npm/yarn
*   React (with Vite)
*   React Router for navigation
*   Axios for API calls
*   React Context API for state management (Authentication)
*   CSS (basic styling, can be replaced/enhanced with SCSS, Tailwind, UI libraries)

**Development Tools:**
*   Git & GitHub
*   Visual Studio Code (or your preferred IDE)
*   Postman / Insomnia (for API testing)
*   Vite (for frontend development server and build)

## Prerequisites

*   Python 3.8+ and Pip
*   Node.js 16+ and npm/yarn
*   Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Saikumar1801/Remind-Me-Later.git
cd Remind-Me-Later
```

### 2. Setup Backend
Navigate to the backend directory and follow the instructions in backend/README.md.
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser (optional, for admin access)
python manage.py runserver
```

### 3. Setup Frontend
Navigate to the frontend directory in a new terminal and follow the instructions in frontend/README.md.
```bash
cd frontend
npm install
npm run dev
```

### 4. Accessing the Application
Backend API: Typically runs on http://127.0.0.1:8000/api/
Frontend Application: Typically runs on http://localhost:5173/ (Vite default) or http://localhost:3000/ (Create React App default).
#### Project Structure
```bash
RemindMeLaterFullStack/
├── backend/      # Django API
├── frontend/     # React SPA
└── README.md     # This file
```
