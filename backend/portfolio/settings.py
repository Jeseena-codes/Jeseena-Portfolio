import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env if present
for env_candidate in [BASE_DIR / '.env', BASE_DIR.parent / '.env']:
    if env_candidate.exists():
        try:
            with open(env_candidate, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        k, v = line.split('=', 1)
                        k = k.strip()
                        v = v.strip().strip("'\"")
                        if k and k not in os.environ:
                            os.environ[k] = v
        except Exception:
            pass
        break

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-jeseena-portfolio-fullstack-dev-key-change-in-prod')

DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party apps
    'corsheaders',
    'rest_framework',

    # Local apps
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS must be at the very top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'

# Database Configuration: Production MySQL on Render vs Local MySQL (port 3307)
PROD_DB_HOST = os.environ.get('DB_HOST', 'mysql-31a6ddd-jeseena2005-f923.l.aivencloud.com')
PROD_DB_PORT = os.environ.get('DB_PORT', '20003')
PROD_DB_NAME = os.environ.get('DB_NAME', 'defaultdb')
PROD_DB_USER = os.environ.get('DB_USER', 'avnadmin')
PROD_DB_PASSWORD = os.environ.get('DB_PASSWORD', '')

LOCAL_DB_HOST = os.environ.get('PORTFOLIO_DB_HOST', '127.0.0.1')
LOCAL_DB_PORT = os.environ.get('PORTFOLIO_DB_PORT', '3307')
LOCAL_DB_NAME = os.environ.get('PORTFOLIO_DB_NAME', 'portfolio_db')
LOCAL_DB_USER = os.environ.get('PORTFOLIO_DB_USER', 'root')
LOCAL_DB_PASSWORD = os.environ.get('PORTFOLIO_DB_PASSWORD', '')

# Determine intended database:
# - 'cloud' / 'production': Connect to Aiven Cloud MySQL (used in Render deployment, or when explicitly requested via DJANGO_DB_TARGET=cloud or USE_CLOUD_DB=1)
# - 'local': Connect to Local MySQL on port 3307 (with SQLite fallback)
DB_TARGET = os.environ.get('DJANGO_DB_TARGET', '').lower()
IS_RENDER = os.environ.get('RENDER', '').lower() in ('true', '1', 'yes')
USE_CLOUD = (DB_TARGET in ('cloud', 'production')) or os.environ.get('USE_CLOUD_DB', '').lower() in ('true', '1', 'yes') or (IS_RENDER and bool(PROD_DB_PASSWORD))

if USE_CLOUD and PROD_DB_PASSWORD:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': PROD_DB_NAME,
            'USER': PROD_DB_USER,
            'PASSWORD': PROD_DB_PASSWORD,
            'HOST': PROD_DB_HOST,
            'PORT': PROD_DB_PORT,
            'OPTIONS': {
                'charset': 'utf8mb4',
                'ssl': {
                    'ssl-mode': 'REQUIRED',
                },
            },
        }
    }
    print(f"[Django Database] Target: CLOUD (Aiven MySQL: {PROD_DB_NAME} on {PROD_DB_HOST}:{PROD_DB_PORT})")
else:
    # Local Development environment (Local MySQL on port 3307 with SQLite fallback)
    try:
        import MySQLdb
        test_conn = MySQLdb.connect(
            host=LOCAL_DB_HOST,
            port=int(LOCAL_DB_PORT),
            user=LOCAL_DB_USER,
            passwd=LOCAL_DB_PASSWORD,
            db=LOCAL_DB_NAME,
            connect_timeout=2
        )
        test_conn.close()
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': LOCAL_DB_NAME,
                'USER': LOCAL_DB_USER,
                'PASSWORD': LOCAL_DB_PASSWORD,
                'HOST': LOCAL_DB_HOST,
                'PORT': LOCAL_DB_PORT,
                'OPTIONS': {
                    'charset': 'utf8mb4',
                    'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
                },
            }
        }
        print(f"[Django Database] Target: LOCAL (MySQL: {LOCAL_DB_NAME} on {LOCAL_DB_HOST}:{LOCAL_DB_PORT})")
    except Exception:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            }
        }
        print(f"[Django Database] Target: LOCAL (SQLite fallback: db.sqlite3)")


# Email Configuration (SMTP configured entirely via Environment Variables)
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', '')
try:
    EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587') or 587)
except ValueError:
    EMAIL_PORT = 587
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')

# Handle TLS / SSL safely to prevent mutually exclusive ValueError
raw_ssl = os.environ.get('EMAIL_USE_SSL', '').strip().lower()
raw_tls = os.environ.get('EMAIL_USE_TLS', '').strip().lower()

if raw_ssl in ('true', '1', 't', 'yes') or (EMAIL_PORT == 465 and raw_tls not in ('true', '1', 't', 'yes')):
    EMAIL_USE_SSL = True
    EMAIL_USE_TLS = False
else:
    EMAIL_USE_SSL = False
    EMAIL_USE_TLS = raw_tls not in ('false', '0', 'f', 'no')  # defaults to True for port 587

DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', '') or EMAIL_HOST_USER
CONTACT_NOTIFICATION_EMAIL = os.environ.get('CONTACT_NOTIFICATION_EMAIL', '') or EMAIL_HOST_USER
try:
    EMAIL_TIMEOUT = int(os.environ.get('EMAIL_TIMEOUT', '10') or 10)
except ValueError:
    EMAIL_TIMEOUT = 10

# Logging Configuration: ensures server logs appear in Render log streams
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[%(asctime)s] %(levelname)s [%(name)s]: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'api': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'portfolio': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files for uploaded project screenshots
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': None,
}

# CORS Configuration
# Allow all origins for seamless local development and file:/// preview
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True

