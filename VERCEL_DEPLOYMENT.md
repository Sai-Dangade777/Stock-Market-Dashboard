# Deploying Stock Market Dashboard to Vercel

This guide will walk you through the steps to deploy the Stock Market Dashboard application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- [Git](https://git-scm.com/) installed
- Your project pushed to GitHub

## Deployment Steps

### 1. Deploy the Backend

1. **Login to Vercel:**
   - Go to [Vercel](https://vercel.com) and sign in or create an account
   - Connect your GitHub account if not already connected

2. **Create a new project for the backend:**
   - Click "Add New..." → "Project"
   - Select your "Stock-Market-Dashboard" repository
   - Configure the project:
     - Project Name: `stock-market-dashboard-backend`
     - Framework Preset: `Other`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Output Directory: (leave blank)
     - Install Command: `npm install`
     - Development Command: `npm start`

3. **Set environment variables (if needed):**
   - Click on "Environment Variables"
   - Add any required environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `8080` (Vercel will override this, but include it anyway)

4. **Deploy:**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Note the deployment URL (e.g., `https://stock-market-dashboard-backend.vercel.app`)

### 2. Deploy the Frontend

1. **Create a new project for the frontend:**
   - Click "Add New..." → "Project"
   - Select your "Stock-Market-Dashboard" repository again
   - Configure the project:
     - Project Name: `stock-market-dashboard-frontend`
     - Framework Preset: `Create React App`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`
     - Development Command: `npm start`

2. **Set environment variables:**
   - Click on "Environment Variables"
   - Add the API URL environment variable:
     - Name: `REACT_APP_API_URL`
     - Value: `https://stock-market-dashboard-backend.vercel.app/api` (replace with your actual backend URL)

3. **Deploy:**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Note the deployment URL (e.g., `https://stock-market-dashboard-frontend.vercel.app`)

## Verifying the Deployment

1. Visit your frontend deployment URL
2. Check that the application loads correctly
3. Verify that you can see the list of companies and stock charts
4. If you encounter any issues, check the deployment logs in Vercel

## Troubleshooting

### CORS Issues

If you're experiencing CORS issues:

1. Go to your backend project in Vercel
2. Update the environment variables:
   - Add a variable `ALLOWED_ORIGINS` with the URL of your frontend

### API Connection Issues

If the frontend can't connect to the backend:

1. Check that the `REACT_APP_API_URL` is set correctly
2. Make sure the URL includes `/api` at the end
3. Verify that your backend is working by accessing a direct API endpoint (e.g., `https://stock-market-dashboard-backend.vercel.app/api/companies`)

## Automated Deployments

Vercel automatically deploys your application whenever you push changes to your GitHub repository. To deploy a new version:

1. Make your changes locally
2. Commit them to Git:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin master
   ```
3. Vercel will automatically deploy the new version
