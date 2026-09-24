@echo off
title Launching Jeseena J Portfolio
echo ========================================================
echo       STARTING JESEENA J FULL STACK PORTFOLIO
echo ========================================================
echo 1. Starting Django Backend on http://127.0.0.1:8000 ...
start "Portfolio Django Backend (Port 8000)" cmd /k "cd /d %~dp0backend && python manage.py runserver 127.0.0.1:8000"

timeout /t 2 /nobreak >nul

echo 2. Starting Frontend Web Server on http://localhost:3000 ...
start "Portfolio Frontend Web (Port 3000)" cmd /k "cd /d %~dp0frontend && python -m http.server 3000"

timeout /t 2 /nobreak >nul

echo 3. Opening Portfolio in default browser...
start http://localhost:3000/

echo ========================================================
echo  All services started!
echo  - Portfolio: http://localhost:3000/
echo  - Admin:     http://127.0.0.1:8000/admin/
echo ========================================================
exit
