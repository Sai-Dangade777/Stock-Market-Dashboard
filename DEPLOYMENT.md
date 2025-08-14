# Stock Market Dashboard

A full-stack web application that displays stock market data with an interactive dashboard.

![Stock Market Dashboard Screenshot](screenshots/dashboard.png)

## Features

- Interactive stock market dashboard with real-time data visualization
- Responsive UI with a clean, modern design
- Left panel with scrollable list of companies
- Main panel with interactive chart for stock price visualization
- Historical stock data visualization with multiple time periods (1W, 1M, 3M, 6M, 1Y, 5Y)
- Key statistics display including 52-week high/low, average volume, etc.
- Light/Dark mode toggle for better viewing experience
- Detailed company information and performance metrics

## Tech Stack

### Frontend
- React.js - UI library
- Chart.js & React-Chartjs-2 - For interactive data visualization
- React Router - For navigation between pages
- Styled Components - For component-specific styling
- Axios - For API requests

### Backend
- Node.js & Express - Server framework
- Yahoo Finance API - For real-time stock data
- RESTful API architecture

### Development Tools
- Git & GitHub - Version control
- npm - Package management

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sai-Dangade777/Stock-Market-Dashboard.git
cd Stock-Market-Dashboard
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
PORT=5001
NODE_ENV=development
```

5. Start the backend server
```bash
cd ../backend
npm start
```

6. Start the frontend development server
```bash
cd ../frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## Deployment on Render.com

This project is configured for easy deployment on Render.com using the provided `render.yaml` file.

### Deploying the Backend and Frontend

1. Create a Render.com account at https://render.com/

2. Connect your GitHub repository to Render:
   - Go to the Render dashboard
   - Click "New" and select "Blueprint"
   - Connect your GitHub account if not already connected
   - Select the Stock-Market-Dashboard repository

3. Configure environment variables:
   - In the Render dashboard, navigate to your service
   - Go to "Environment" section
   - Add the following environment variables:
     - For backend: `NODE_ENV=production`, `PORT=10000`
     - For frontend: `REACT_APP_API_URL=https://[your-backend-service-name].onrender.com/api`

4. Deploy:
   - Render will automatically deploy both the frontend and backend based on the render.yaml configuration
   - The deployment process will take a few minutes

5. Access your deployed application:
   - Backend API: https://[your-backend-service-name].onrender.com
   - Frontend: https://[your-frontend-service-name].onrender.com

### Manual Deployment (Alternative)

If you prefer to deploy manually without using render.yaml:

#### Backend Deployment

1. Create a new Web Service in Render
2. Connect to your GitHub repository
3. Configure the service:
   - Name: stock-market-api
   - Root Directory: backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables: `NODE_ENV=production`, `PORT=10000`

#### Frontend Deployment

1. Create a new Static Site in Render
2. Connect to your GitHub repository
3. Configure the site:
   - Name: stock-market-frontend
   - Root Directory: frontend
   - Build Command: `npm install && npm run build`
   - Publish Directory: build
   - Add environment variable: `REACT_APP_API_URL=https://[your-backend-service-name].onrender.com/api`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Yahoo Finance API](https://www.yahoofinanceapi.com/) for stock data
- [Chart.js](https://www.chartjs.org/) for interactive charts
- [React Icons](https://react-icons.github.io/react-icons/) for icons
