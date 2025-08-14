# Stock Market Dashboard - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Stock Market Dashboard application on Vercel.

## Prerequisites

- GitHub account with your code repository
- Vercel account (linked to your GitHub)

## Backend Deployment

1. **Push your code to GitHub**
   - Make sure your updated backend code is pushed to GitHub

2. **Deploy Backend to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Import your repository
   - Configure project with these settings:
     - Project Name: `stock-market-dashboard-backend`
     - Framework Preset: Other
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Output Directory: (leave blank)
     - Install Command: `npm install`
   - Click "Deploy"

3. **Add Environment Variables (if needed)**
   - In Project Settings > Environment Variables, add any required variables

4. **Test Backend Deployment**
   - After deployment completes, test your backend with:
   - Visit: `https://[your-backend-url].vercel.app/health`
   - You should see: `{"status":"ok","message":"Server is running"}`

## Frontend Deployment

1. **Push your code to GitHub**
   - Make sure your updated frontend code is pushed to GitHub

2. **Deploy Frontend to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Import your repository
   - Configure project with these settings:
     - Project Name: `stock-market-dashboard-frontend`
     - Framework Preset: Create React App
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`
   - Click "Deploy"

3. **Add Environment Variables**
   - In Project Settings > Environment Variables, add:
     - Key: `REACT_APP_API_URL`
     - Value: `https://[your-backend-url].vercel.app/api`
     - (Make sure to include the `/api` path!)

4. **Test Frontend Deployment**
   - After deployment completes, visit your frontend URL
   - Ensure the app loads and can fetch data from the backend

## Troubleshooting

If you encounter issues with your deployment, check these common problems:

### Backend Issues
- Ensure `index.js` is properly exporting the Express app
- Check Vercel logs for any errors in Function execution
- Verify CORS settings allow your frontend domain

### Frontend Issues
- Ensure the `REACT_APP_API_URL` environment variable is set correctly
- Check console for any API connection errors
- Verify your API calls include the correct endpoint paths

## Additional Notes

- The app includes fallback to mock data if API calls fail
- Backend is configured as a serverless function on Vercel
- Frontend is configured as a static site with client-side routing
