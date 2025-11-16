@echo off
echo Starting Disaster Relief Application...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k node server.js
cd..

timeout /t 2 /nobreak > nul

echo Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k python -m http.server 8080
cd..

echo.
echo Application is running!
echo Backend API: http://localhost:3000
echo Frontend UI: http://localhost:8080
echo.
echo Press any key to stop servers...
pause > nul

taskkill /FI "WindowTitle eq Backend Server*" /F
taskkill /FI "WindowTitle eq Frontend Server*" /F
