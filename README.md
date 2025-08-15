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
- PostgreSQL - Database for storing stock data
- RESTful API architecture

### Development Tools
- Git & GitHub - Version control
- npm - Package management

## Deployment Instructions

### Backend Deployment (Vercel)

1. Make sure you have a Vercel account and the Vercel CLI installed
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Deploy to Vercel:
   ```bash
   vercel
   ```
4. Follow the prompts to link your project
5. When deployment is complete, note the URL for your backend API

### Frontend Deployment (Vercel)

1. Set the backend API URL in the frontend environment:
   ```bash
   cd frontend
   ```
2. Create a `.env.production` file with your backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-api-url.vercel.app/api
   ```
3. Deploy to Vercel:
   ```bash
   vercel
   ```
4. Follow the prompts to link your project

### Alternative Frontend Deployment (GitHub Pages)

1. Make sure the `homepage` field in `package.json` is set correctly:
   ```json
   "homepage": "https://yourusername.github.io/repository-name/"
   ```
2. Deploy using the GitHub Pages script:
   ```bash
   npm run deploy
   ```

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- PostgreSQL (v12.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sai-Dangade777/JarNox-Stock-Dashboard.git
cd JarNox-Stock-Dashboard
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Set up the database
- Create a PostgreSQL database named 'stockmarket'
- Update the .env file with your database credentials

4. Run database migrations
```bash
# The database will be automatically initialized when you start the server
npm start
```

5. Install frontend dependencies
```bash
cd ../frontend
npm install
```

6. Start the development servers

For backend:
```bash
cd ../backend
npm run dev
```

For frontend (in a new terminal):
```bash
cd ../frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## Development Approach

I approached this project with a focus on creating a clean, responsive, and user-friendly dashboard for stock market data visualization. The development process involved:

1. **Planning & Architecture**: I started by designing the database schema and API endpoints, followed by sketching the UI layout.

2. **Backend Development**: Implemented a Node.js/Express server with PostgreSQL for data storage. Created RESTful API endpoints for retrieving company information and historical stock data.

3. **Frontend Development**: Built a React application with a responsive design that adapts to different screen sizes. Used Chart.js for visualizing stock price data and implemented features like period selection and company filtering.

4. **Styling & UX**: Focused on creating an intuitive and visually appealing interface with light/dark mode support and smooth transitions.

5. **Testing & Optimization**: Tested the application across different devices and optimized performance by implementing lazy loading and efficient data fetching.

## Challenges Encountered

During development, I faced several challenges:

1. **Data Visualization**: Creating responsive and interactive charts that accurately represent stock market data required careful configuration of Chart.js options.

2. **State Management**: Managing the application state with multiple components and data sources required thoughtful planning of component hierarchy and data flow.

3. **Database Design**: Designing a database schema that efficiently stores and retrieves historical stock data required optimizing query performance.

4. **Responsive Design**: Ensuring the dashboard looks good and functions well on various screen sizes required implementing a flexible layout system.

## Future Improvements

- Implement real-time data updates using WebSockets
- Add user authentication and personalized watchlists
- Incorporate technical indicators (Moving Averages, RSI, MACD)
- Implement AI-based price prediction feature
- Add portfolio tracking functionality
- Improve accessibility features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [Alpha Vantage](https://www.alphavantage.co/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Chart library: [Chart.js](https://www.chartjs.org/)
