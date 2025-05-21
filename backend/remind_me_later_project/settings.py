import os
from pathlib import Path
import dj_database_url # Add this if using Render's PostgreSQL

BASE_DIR = Path(__file__).resolve().parent.parent

# Get from environment variables for production
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-default-dev-secret-key-MAKE-SURE-TO-CHANGE-IN-RENDER')
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true' # Default to False

ALLOWED_HOSTS_STRING = os.environ.get('ALLOWED_HOSTS', '')
ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_STRING.split(',') if host.strip()]
# Example: In Render, set ALLOWED_HOSTS to "your-backend-name.onrender.com,your-frontend-name.vercel.app"

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic', # Add this if using WhiteNoise, before staticfiles
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'reminders.apps.RemindersConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Add WhiteNoise middleware
    'corsheaders.middleware.CorsMiddleware',    # Ensure this is before CommonMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database configuration
if 'DATABASE_URL' in os.environ:
    DATABASES = {
        'default': dj_database_url.config(
            conn_max_age=600,
            ssl_require=os.environ.get('DB_SSL_REQUIRE', 'False').lower() == 'true'
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build', 'static') # For collectstatic output
# For WhiteNoise, ensure your static files are findable.
# If you have app-specific static dirs, ensure STATICFILES_DIRS is set, e.g.:
# STATICFILES_DIRS = [os.path.join(BASE_DIR, "your_app_static_dir_if_any")]
# WhiteNoise Storage for compression and unique naming (optional but good)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# CORS Configuration - will be set by environment variables
CORS_ALLOWED_ORIGINS_STRING = os.environ.get('CORS_ALLOWED_ORIGINS', '')
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in CORS_ALLOWED_ORIGINS_STRING.split(',') if origin.strip()]
# Example: In Render, set CORS_ALLOWED_ORIGINS to "https://your-frontend-name.vercel.app"

# CSRF Trusted Origins (important if your frontend makes non-GET requests that might involve cookies/sessions, less so for pure token API)
CSRF_TRUSTED_ORIGINS_STRING = os.environ.get('CSRF_TRUSTED_ORIGINS', '')
CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in CSRF_TRUSTED_ORIGINS_STRING.split(',') if origin.strip()]
# Example: In Render, set CSRF_TRUSTED_ORIGINS to "https://your-frontend-name.vercel.app"


# REST Framework settings (already should be there)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication', # Can remove if API is purely token based
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}