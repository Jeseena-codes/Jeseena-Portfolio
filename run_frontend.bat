@echo off
title Jeseena J Portfolio - React Frontend
echo ===================================================
echo  Starting React Developer Portfolio Frontend
echo  URL: http://localhost:3000/
echo ===================================================
cd /d "%~dp0frontend"

where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Node.js/npm detected. Launching Vite development server...
    npm run dev
) else (
    echo Node.js not detected in PATH. Launching high-performance web preview server...
    python -m http.server 3000
)
pause
