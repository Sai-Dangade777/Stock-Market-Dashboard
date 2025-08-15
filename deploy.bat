@echo off
echo Deploying backend to Vercel...
cd backend
call vercel
cd ..
echo.
echo Backend deployment complete!
echo.
echo Copy your backend URL from above.
echo You'll need it for the next step.
echo.
pause
echo.
echo Deploying frontend to Vercel...
cd frontend
call vercel
cd ..
echo.
echo Deployment complete!
echo.
pause
