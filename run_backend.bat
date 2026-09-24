@echo off
title Jeseena J Portfolio - Django Backend API
echo ===================================================
echo  Starting Django REST Framework Backend Server
echo  Base URL: http://127.0.0.1:8000/
echo  Admin:    http://127.0.0.1:8000/admin/
echo  API:      http://127.0.0.1:8000/api/
echo ===================================================
cd /d "%~dp0backend"
python manage.py runserver 127.0.0.1:8000
pause
