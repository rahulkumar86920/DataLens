# DataLens – Smart Scraping Dashboard

![DataLens Banner](https://img.shields.io/badge/DataLens-Smart_Scraping-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> **Enterprise-grade web scraping dashboard with Google OAuth, real-time data fetching, and modern React UI**

## 🎯 Project Overview

DataLens is a full-stack web application that scrapes real-time data from Hacker News, stores it in MongoDB, and displays it in a beautiful React dashboard. Built with production-level architecture, security best practices, and complete documentation.

### ✨ Features

- 🔐 **Google OAuth 2.0** - Secure authentication
- 🕷️ **Python Web Scraper** - Respects robots.txt with rate limiting
- 📊 **React Dashboard** - Modern, responsive UI with Tailwind CSS
- 🗄️ **MongoDB Storage** - Scalable NoSQL database
- 🔄 **Real-time Refresh** - Manual scraping trigger
- 📱 **Mobile Responsive** - Works on all devices
- 🚀 **Production Ready** - Deployment guides included

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Tailwind CSS, Context API |
| **Backend** | Node.js, Express, JWT |
| **Scraper** | Python, BeautifulSoup, Requests |
| **Database** | MongoDB Atlas |
| **Auth** | Google OAuth 2.0 |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
datalens/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API integration
│   │   ├── context/         # Global state
│   │   └── utils/           # Helper functions
│   ├── public/
│   └── package.json
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities
│   │   └── server.js        # Entry point
│   └── package.json
│
├── scraper/                  # Python scraper
│   ├── src/
│   │   ├── scrapers/        # Scraping logic
│   │   ├── utils/           # Helper functions
│   │   └── main.py          # Entry point
│   └── requirements.txt
│
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and npm
- **Python** 3.8+
- **MongoDB Atlas** account (free tier)
- **Google Cloud Console** account

---

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/datalens.git
cd datalens
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

**backend/.env**
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/datalens

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Logging
LOG_LEVEL=info
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
```

**frontend/.env**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 4️⃣ Scraper Setup

```bash
cd ../scraper
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

**scraper/.env**
```env
BACKEND_API_URL=http://localhost:5000
```

---

## 🔑 Google OAuth Setup

### Step-by-Step Guide

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Name: `DataLens`
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: External
   - Fill in:
     - App name: `DataLens`
     - User support email: `your-email@gmail.com`
     - Developer contact: `your-email@gmail.com`
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email)
   - Click "Save and Continue"

5. **Create OAuth 2.0 Credentials**
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `DataLens Web Client`
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://yourdomain.vercel.app
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000
     https://yourdomain.vercel.app
     ```
   - Click "Create"

6. **Copy Credentials**
   - Copy **Client ID** → Paste in `.env` files
   - Copy **Client Secret** → Paste in backend `.env`

---

## 🗄️ MongoDB Atlas Setup

1. **Create Account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Cluster name: `DataLens`

3. **Configure Database Access**
   - Go to "Database Access"
   - Add New Database User
   - Username: `datalens`
   - Password: Generate secure password
   - Role: `Read and write to any database`

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP Address
   - For development: `0.0.0.0/0` (Allow from anywhere)
   - For production: Add your server IPs

5. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Paste in backend `.env` as `MONGODB_URI`

---

## ▶️ Running the Application

### Development Mode

**Terminal 1: Backend**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2: Frontend**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

**Terminal 3: Scraper (Manual)**
```bash
cd scraper
source venv/bin/activate  # Windows: venv\Scripts\activate
python src/main.py
```

### Production Mode

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm run build
serve -s build
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/google`
Login with Google OAuth

**Request:**
```json
{
  "idToken": "google-id-token-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "picture": "profile-url"
  }
}
```

#### GET `/api/auth/verify`
Verify JWT token (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "user-id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Data Endpoints

#### GET `/api/data`
Get all scraped data (requires authentication)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 30)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "item-id",
      "rank": 1,
      "title": "Story Title",
      "link": "https://example.com",
      "points": 250,
      "comments": 42,
      "scrapedAt": "2026-01-02T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 50,
    "itemsPerPage": 30
  },
  "lastScrapedAt": "2026-01-02T10:30:00.000Z"
}
```

#### POST `/api/scrape/trigger`
Trigger manual scraping (requires authentication)

**Response:**
```json
{
  "success": true,
  "message": "Scraping completed successfully",
  "itemsScraped": 30
}
```

#### GET `/api/data/stats`
Get dashboard statistics (requires authentication)

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalItems": 30,
    "lastScrapedAt": "2026-01-02T10:30:00.000Z",
    "averagePoints": 156,
    "totalPoints": 4680
  }
}
```

#### POST `/api/scrape`
Receive scraped data (called by Python scraper)

**Request:**
```json
{
  "items": [
    {
      "rank": 1,
      "title": "Story Title",
      "link": "https://example.com",
      "points": 250,
      "comments": 42,
      "scraped_at": "2026-01-02 10:30:00"
    }
  ]
}
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set root directory: `frontend`
   - Add environment variables:
     ```
     REACT_APP_API_URL=https://your-backend.onrender.com
     REACT_APP_GOOGLE_CLIENT_ID=your-client-id
     ```
   - Click "Deploy"

3. **Update Google OAuth**
   - Add Vercel URL to authorized origins in Google Console

### Backend Deployment (Render)

1. **Create New Web Service** on [Render](https://render.com)
   - Connect GitHub repository
   - Name: `datalens-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Add Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-production-jwt-secret
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. **Deploy**
   - Click "Create Web Service"
   - Copy the Render URL

### Scraper Deployment

**Option 1: Scheduled Cron Job (Recommended)**
- Use Render Cron Jobs or GitHub Actions
- Schedule: Every hour

**Option 2: Manual Trigger**
- Deploy scraper as separate service
- Trigger via API endpoint from dashboard

---

## 🔒 Security Best Practices

✅ **Implemented:**
- JWT authentication with secure tokens
- Google OAuth for trusted identity
- Helmet.js for security headers
- CORS configured properly
- Input validation and sanitization
- Rate limiting on scraper
- Environment variables for secrets
- MongoDB connection encryption

⚠️ **Additional Recommendations:**
- Enable 2FA on all accounts
- Use strong JWT secrets (32+ characters)
- Implement rate limiting on API endpoints
- Set up SSL certificates (HTTPS)
- Regular dependency updates
- Monitor logs for suspicious activity

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Google OAuth login works
- [ ] Dashboard loads after login
- [ ] Data displays correctly
- [ ] Refresh button triggers scraping
- [ ] Toast notifications appear
- [ ] Mobile responsive design
- [ ] Logout functionality
- [ ] API error handling

### API Testing with Postman

Import the following collection:

```json
{
  "info": { "name": "DataLens API" },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Get Data",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/data",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ]
      }
    }
  ]
}
```

---

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing key | `super-secret-key` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID | `123-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | OAuth Secret | `GOCSPX-abc123` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `REACT_APP_GOOGLE_CLIENT_ID` | OAuth Client ID | `123-abc.apps.googleusercontent.com` |

### Scraper (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `BACKEND_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Google OAuth not working**
- ✅ Check Client ID matches in both frontend and Google Console
- ✅ Verify redirect URIs are correctly configured
- ✅ Ensure Google+ API is enabled

**Issue: MongoDB connection failed**
- ✅ Check connection string format
- ✅ Verify network access allows your IP
- ✅ Confirm database user credentials

**Issue: Scraper fails**
- ✅ Verify backend API is running
- ✅ Check Python dependencies installed
- ✅ Ensure robots.txt is accessible

**Issue: CORS errors**
- ✅ Verify FRONTEND_URL in backend .env
- ✅ Check CORS configuration in server.js

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Hacker News for providing public data
- Anthropic Claude for development assistance
- Open source community for amazing tools

---

## 🎯 Roadmap

- [ ] Scheduled automatic scraping
- [ ] Multiple data sources
- [ ] Data export (CSV, JSON)
- [ ] Advanced analytics dashboard
- [ ] User preferences and saved searches
- [ ] Real-time WebSocket updates
- [ ] Dockerization
- [ ] CI/CD pipeline

---

**⭐ If this project helped you, please consider giving it a star!**