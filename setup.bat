@echo off
echo Starting Stock Market Dashboard Setup...

echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing backend dependencies
    exit /b %ERRORLEVEL%
)

echo Installing frontend dependencies...
cd ../frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing frontend dependencies
    exit /b %ERRORLEVEL%
)

echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start the backend: cd backend
echo   Then run: npm run dev
echo 2. Start the frontend: cd frontend
echo   Then run: npm start
echo.
echo Alternatively, if you have Docker installed:
echo Run: docker-compose up
echo.

cd ..
pause
