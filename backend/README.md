# RemindMeLater - Backend API

This directory contains the Django backend for the RemindMeLater application. It provides a RESTful API for managing users and their reminders.

## Technology Stack

*   Python 3.x
*   Django & Django REST Framework
*   Django Filter
*   Django CORS Headers
*   SQLite (development)

## Prerequisites

*   Python 3.8+ and Pip
*   A virtual environment tool (like `venv`)

## Setup Instructions

1.  **Navigate to the backend directory:**
    ```bash
    cd path/to/Remind-Me-Later/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    # venv\Scripts\activate    # On Windows
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: If `requirements.txt` doesn't exist yet, you'll need to create it based on installed packages: `pip freeze > requirements.txt` after installing Django, DRF, etc., as done in the setup steps).*
    Key packages to install if starting fresh:
    ```bash
    pip install django djangorestframework django-filter djangorestframework-simplejwt django-cors-headers Pillow # Pillow for ImageField if needed in future
    ```


4.  **Apply database migrations:**
    This will create the necessary database tables, including those for users, authentication tokens, and reminders.
    ```bash
    python manage.py migrate
    ```

5.  **Create a superuser (optional, for Django Admin access):**
    ```bash
    python manage.py createsuperuser
    ```
    Follow the prompts to set a username, email (optional), and password.

6.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The API will typically be available at `http://127.0.0.1:8000/`.

## API Endpoints

The main API endpoints are available under the `/api/` prefix.

*   **Authentication:**
    *   `POST /api/api-token-auth/`: Obtain an authentication token.
        *   Request Body: `{ "username": "your_username", "password": "your_password" }`
        *   Response: `{ "token": "your_auth_token" }`
*   **Reminders (`/api/reminders/`):** (Requires Authentication Token in `Authorization: Token <your_token>` header)
    *   `GET /api/reminders/`: List all reminders for the authenticated user.
        *   Supports pagination (`?page=N`).
        *   Supports filtering (e.g., `?delivery_method=SMS`, `?is_sent=false`).
        *   Supports searching (`?search=keyword`).
        *   Supports ordering (`?ordering=created_at`).
    *   `POST /api/reminders/`: Create a new reminder.
        *   Request Body: `{ "message": "...", "reminder_date": "YYYY-MM-DD", "reminder_time": "HH:MM", "delivery_method": "EMAIL" (or "SMS") }`
    *   `GET /api/reminders/{id}/`: Retrieve a specific reminder.
    *   `PUT /api/reminders/{id}/`: Update a specific reminder (full update).
    *   `PATCH /api/reminders/{id}/`: Partially update a specific reminder.
    *   `DELETE /api/reminders/{id}/`: Delete a specific reminder.
    *   `POST /api/reminders/{id}/mark_as_sent/`: Custom action to mark a reminder as sent.
    *   `GET /api/reminders/upcoming/`: Custom action to list upcoming reminders.

*   **Django Admin:**
    *   `/admin/`: Access the Django admin interface (requires superuser login).

## Project Structure

*   `remind_me_later_project/`: Django project settings and main URL configuration.
*   `reminders/`: Django app for reminder-specific models, views, serializers, and URLs.
*   `manage.py`: Django's command-line utility.
*   `db.sqlite3`: Development database.
*   `requirements.txt`: Python dependencies.

## Environment Variables

(If you were using environment variables for settings like `SECRET_KEY` or database credentials, you'd list them here and explain how to set them up, e.g., using a `.env` file and `python-dotenv`).

## Running Tests

(If you have tests)
```bash
python manage.py test reminders
```

## Deployment Notes
For production, switch from SQLite to a robust database like PostgreSQL.
Configure ALLOWED_HOSTS, DEBUG=False, and other production settings in settings.py.
Use a production-ready web server like Gunicorn or uWSGI behind a reverse proxy like Nginx.
Serve static files correctly using Django's collectstatic and your web server configuration.
Ensure CORS_ALLOWED_ORIGINS is set to your frontend domain(s) in production.
