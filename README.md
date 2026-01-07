# 🚀 DataLens - Smart Scraping Dashboard

<div align="center">

![DataLens Logo](https://img.shields.io/badge/DataLens-Smart_Scraping-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM1ODJGNiIgcng9IjE1Ii8+PHRleHQgeD0iNTAiIHk9IjYwIiBmb250LXNpemU9IjUwIiBmaWxsPSJ3aGl0ZSIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkQ8L3RleHQ+PC9zdmc+)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/cloud/atlas)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)

**A production-ready, full-stack web scraping dashboard with Google OAuth authentication, real-time data scraping, and beautiful React UI.**

[🌐 Live Demo](https://data-lens-tau.vercel.app/) | [📖 Documentation](#table-of-contents) | [🐛 Report Bug](https://github.com/yourusername/datalens/issues) | [✨ Request Feature](https://github.com/yourusername/datalens/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Method : Manual Setup](#method-manual-setup)
- [Configuration](#-configuration)
  - [MongoDB Atlas Setup](#1-mongodb-atlas-setup)
  - [Google OAuth Setup](#2-google-oauth-20-setup)
  - [Environment Variables](#3-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**DataLens** is an enterprise-grade web application that demonstrates modern full-stack development practices. It scrapes real-time data from Hacker News, stores it securely in MongoDB, and presents it through a beautiful, responsive React dashboard.

### Why DataLens?

- ✅ **Production-Ready**: Built with security, scalability, and performance in mind
- ✅ **Modern Stack**: Uses latest versions of React, Node.js, Express, and MongoDB
- ✅ **Best Practices**: Follows industry standards for code organization and architecture
- ✅ **Complete Documentation**: Extensive guides for setup, deployment, and maintenance
- ✅ **Portfolio-Worthy**: Perfect for internship applications and job interviews

### What You'll Learn

Building DataLens teaches you:
- Full-stack application architecture
- RESTful API design and implementation
- User authentication with OAuth 2.0
- Web scraping ethics and implementation
- Database design and optimization
- Modern frontend development with React and Tailwind CSS
- Production deployment strategies

---

## ✨ Features

### 🔐 Authentication & Security
- **Google OAuth 2.0** integration for secure login
- **JWT tokens** for session management
- **Protected routes** with middleware authentication
- **CORS** configuration for secure cross-origin requests
- **Input validation** and sanitization
- **Error handling** with detailed logging

### 🕷️ Web Scraping
- **Ethical scraping** with robots.txt compliance
- **Rate limiting** to respect server resources
- **Real-time data** from Hacker News front page
- **Automatic data refresh** every 5 minutes (configurable)
- **Manual trigger** option from dashboard
- **Error recovery** and retry mechanisms

### 📊 Dashboard Features
- **Real-time statistics**: Total stories, average points, last update
- **Interactive data table**: Sortable columns, pagination support
- **Responsive design**: Works perfectly on mobile, tablet, and desktop
- **Beautiful UI**: Modern design with Tailwind CSS
- **Loading states**: Spinners and skeleton screens
- **Toast notifications**: Success and error messages
- **Data visualization**: Clean cards and tables

### 🗄️ Database Management
- **MongoDB Atlas** for cloud storage
- **Indexed collections** for fast queries
- **Data validation** with Mongoose schemas
- **Automatic cleanup** of old data
- **Backup-ready** configuration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI framework |
| Tailwind CSS | 3.3+ | Styling |
| Context API | Built-in | State management |
| Fetch API | Native | HTTP requests |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express | 4.18+ | Web framework |
| MongoDB | 5+ | Database |
| Mongoose | 8+ | ODM |
| JWT | 9+ | Authentication |
| Google OAuth Library | 9+ | OAuth client |
| Winston | 3+ | Logging |
| Helmet | 7+ | Security headers |

### Scraper
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Scraping language |
| BeautifulSoup | 4.12+ | HTML parsing |
| Requests | 2.31+ | HTTP library |
| Schedule | 1.2+ | Task scheduling |

### DevOps & Tools
- **Git** - Version control
- **VS Code** - Development environment
- **Postman/Thunder Client** - API testing
- **MongoDB Compass** - Database GUI
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                        │
│                     (http://localhost:3000)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
        ┌────────────────▼────────────────┐
        │     React Frontend (Vercel)     │
        │   - Login Page                  │
        │   - Dashboard                   │
        │   - OAuth Integration           │
        └────────────────┬────────────────┘
                         │
                         │ REST API (JWT Auth)
                         │
        ┌────────────────▼────────────────┐
        │   Express Backend (Render)      │
        │   - Authentication              │
        │   - API Routes                  │
        │   - Business Logic              │
        └────────┬───────────────┬────────┘
                 │               │
    ┌────────────▼──────┐   ┌───▼──────────────┐
    │  MongoDB Atlas    │   │ Google OAuth API │
    │  - User data      │   │ - User identity  │
    │  - Scraped data   │   └──────────────────┘
    └────────▲──────────┘
             │
             │ HTTP POST
             │
    ┌────────┴──────────┐
    │  Python Scraper   │
    │  - Web scraping   │
    │  - Data cleaning  │
    │  - API posting    │
    └───────────────────┘
```

### Data Flow

1. **User Authentication**:
   - User clicks "Sign in with Google"
   - Redirected to Google OAuth consent screen
   - Google returns ID token to frontend
   - Frontend sends token to backend
   - Backend verifies with Google and creates JWT
   - JWT stored in localStorage for future requests

2. **Data Scraping**:
   - Python scraper runs (manual or scheduled)
   - Scrapes Hacker News front page
   - Validates and cleans data
   - Sends POST request to backend API
   - Backend saves to MongoDB

3. **Dashboard Display**:
   - User logs in and sees dashboard
   - Frontend requests data from backend
   - Backend queries MongoDB with pagination
   - Data displayed in interactive table
   - User can sort, filter, and refresh

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Python** (v3.8 or higher)
   - Download: https://www.python.org/downloads/
   - ⚠️ **Important**: Check "Add Python to PATH" during installation
   - Verify: `python --version` or `python3 --version`

3. **Git**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

4. **VS Code** (Recommended)
   - Download: https://code.visualstudio.com/

### Required Accounts

1. **MongoDB Atlas** (Free tier available)
   - Sign up: https://www.mongodb.com/cloud/atlas

2. **Google Cloud Console** (Free)
   - Access: https://console.cloud.google.com/

3. **GitHub** (For version control)
   - Sign up: https://github.com/

### Optional Tools

- **MongoDB Compass** - Database GUI
- **Postman** or **Thunder Client** - API testing
- **Render Account** - Backend deployment (free tier)
- **Vercel Account** - Frontend deployment (free tier)

---

## 📦 Installation



### Manual Setup

#### Step 1: Clone Repository

```bash
git clone https://github.com/rahulkumar86920/DataLens.git
cd datalens
```

#### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials (see Configuration section)
```

#### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
```

#### Step 4: Setup Scraper

```bash
cd ../scraper

# Create virtual environment
python -m venv venv
# or
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env with backend URL
```

---

## ⚙️ Configuration

### 1. MongoDB Atlas Setup

#### Step 1: Create Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create account
3. Create a new cluster:
   - Choose **FREE** tier (M0 Sandbox)
   - Select **AWS** or your preferred provider
   - Choose region closest to you
   - Cluster Name: `DataLens`
   - Click **"Create Cluster"**

#### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Configure:
   ```
   Authentication Method: Password
   Username: datalens
   Password: [Click "Autogenerate Secure Password" and save it]
   Database User Privileges: "Read and write to any database"
   ```
4. Click **"Add User"**

#### Step 3: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use specific IP addresses
4. Click **"Confirm"**

#### Step 4: Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://datalens:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `datalens`
   ```
   mongodb+srv://datalens:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/datalens?retryWrites=true&w=majority
   ```

---

### 2. Google OAuth 2.0 Setup

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click dropdown at top → **"New Project"**
3. Project Name: `DataLens`
4. Click **"Create"**

#### Step 2: Enable Google+ API

1. Navigate to **APIs & Services** → **Library**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

#### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** → Click **"Create"**
3. Fill in required fields:
   ```
   App name: DataLens
   User support email: your-email@gmail.com
   Developer contact information: your-email@gmail.com
   ```
4. Click **"Save and Continue"**
5. **Scopes**: Click **"Add or Remove Scopes"**
   - Select: `email`, `profile`, `openid`
   - Click **"Update"** → **"Save and Continue"**
6. **Test users**: Click **"Add Users"**
   - Add your email address
   - Click **"Save and Continue"**

#### Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Configure:
   ```
   Application type: Web application
   Name: DataLens Web Client
   
   Authorized JavaScript origins:
   - http://localhost:3000
   - https://your-domain.vercel.app (for production)
   
   Authorized redirect URIs:
   - http://localhost:3000
   - https://your-domain.vercel.app (for production)
   ```
4. Click **"Create"**
5. **Copy Your Credentials:**
   ```
   Client ID: 123456789-abcdefghijk.apps.googleusercontent.com
   Client Secret: GOCSPX-abcdefghijklmnopqrst
   ```
   ⚠️ **Save these securely!**

---

### 3. Environment Variables

#### Backend Configuration (`backend/.env`)

Create `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
# Replace with your actual connection string
MONGODB_URI=mongodb+srv://datalens:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/datalens?retryWrites=true&w=majority

# JWT Secret (Generate new one - see below)
JWT_SECRET=your-super-secret-jwt-key-64-characters-minimum

# Google OAuth Configuration
# Replace with your actual credentials
GOOGLE_CLIENT_ID=123456789-abcdefghijk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrst

# Logging
LOG_LEVEL=info
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output to `JWT_SECRET`.

#### Frontend Configuration (`frontend/.env`)

Create `frontend/.env` file:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000

# Google OAuth Client ID (same as backend)
REACT_APP_GOOGLE_CLIENT_ID=123456789-abcdefghijk.apps.googleusercontent.com
```

#### Scraper Configuration (`scraper/.env`)

Create `scraper/.env` file:

```env
# Backend API URL
BACKEND_API_URL=http://localhost:5000

# Optional: Custom User Agent
USER_AGENT=DataLens-Scraper/1.0 (Educational Project)
```

---

## 🚀 Running the Application

### Development Mode

You need **4 terminal windows** in VS Code:

#### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

✅ **Expected Output:**
```
[2026-01-06 10:30:00] INFO: 🚀 Server running on port 5000
[2026-01-06 10:30:00] INFO: ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
[2026-01-06 10:30:00] INFO: 📍 Environment: development
```

#### Terminal 2: Frontend Development Server

```bash
cd frontend
npm start
```

✅ **Expected Output:**
```
Compiled successfully!

You can now view datalens-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

Browser will automatically open to `http://localhost:3000`

#### Terminal 3: Python Scraper

**Option A: One-time Scrape**
```bash
cd scraper
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

python src/main.py
```

**Option B: Continuous Scraping (Every 5 minutes)**

First, create `scraper/watch.py`:

```python
#!/usr/bin/env python3
import time
import schedule
from src.scrapers.hn_scraper import HackerNewsScraper

def job():
    print("\n" + "="*50)
    print("Running scheduled scrape...")
    print("="*50)
    scraper = HackerNewsScraper()
    scraper.run()
    print("\nNext scrape in 5 minutes...\n")

if __name__ == "__main__":
    print("🕷️  DataLens Scraper - Continuous Mode")
    print("Press Ctrl+C to stop\n")
    
    # Run immediately on start
    job()
    
    # Schedule every 5 minutes
    schedule.every(5).minutes.do(job)
    
    while True:
        schedule.run_pending()
        time.sleep(1)
```

Then run:
```bash
cd scraper
source venv/bin/activate
python watch.py
```

✅ **Expected Output:**
```
🕷️  DataLens Scraper - Continuous Mode
Press Ctrl+C to stop

==================================================
Running scheduled scrape...
==================================================
[INFO] Starting Hacker News scrape...
[INFO] Scraped #1: Example Story Title...
[INFO] Successfully scraped 30 items
[INFO] Sending 30 items to backend...
[INFO] Backend response: Successfully saved 30 items

Next scrape in 5 minutes...
```

#### Terminal 4: Free for Commands

Use this terminal for:
- Git commands
- Database queries
- API testing
- Other tasks

---

### Using the Application

#### 1. Login

1. Browser opens to `http://localhost:3000`
2. Click **"Sign in with Google"**
3. Choose your Google account (must be added as test user)
4. Grant permissions
5. Redirected to dashboard

#### 2. View Dashboard

After login, you'll see:
- **Statistics Cards**: Total stories, average points, last update time
- **Data Table**: Sortable table with all scraped stories
- **Refresh Button**: Trigger manual data refresh

#### 3. Refresh Data

- Click **"Refresh Data"** button
- Scraper runs automatically (if using automated trigger)
- Or ensure scraper is running in Terminal 3
- Data updates in real-time

#### 4. Explore Features

- **Sort**: Click column headers to sort
- **View Details**: Click story links to open in new tab
- **Mobile**: Resize browser to see responsive design
- **Logout**: Click logout icon in sidebar

---

## 📁 Project Structure

```
datalens/
│
├── backend/                          # Express.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── dataController.js    # Data operations
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   └── ScrapedItem.js       # Scraped data schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── dataRoutes.js        # Data endpoints
│   │   ├── utils/
│   │   │   └── logger.js            # Winston logger
│   │   └── server.js                # Express app entry
│   ├── logs/                        # Log files
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   └── package.json                 # Dependencies
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   └── GoogleLoginButton.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   │   │   ├── DataCard.jsx     # Stat cards
│   │   │   │   ├── DataTable.jsx    # Data display
│   │   │   │   └── RefreshButton.jsx
│   │   │   └── Common/
│   │   │       ├── Loader.jsx       # Loading spinner
│   │   │       └── Toast.jsx        # Notifications
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx        # Login UI
│   │   │   └── DashboardPage.jsx    # Main dashboard
│   │   ├── services/
│   │   │   └── api.js               # API integration
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state
│   │   ├── App.jsx                  # Main component
│   │   ├── index.jsx                # React entry
│   │   └── index.css                # Tailwind styles
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── tailwind.config.js           # Tailwind config
│
├── scraper/                          # Python Scraper
│   ├── src/
│   │   ├── scrapers/
│   │   │   └── hn_scraper.py        # Hacker News scraper
│   │   └── main.py                  # Entry point
│   ├── venv/                        # Virtual environment
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── requirements.txt             # Python dependencies
│   └── watch.py                     # Continuous scraping
│
├── docs/                             # Documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   ├── SECURITY.md                  # Security practices
│   └── API.md                       # API reference
│
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
└── setup.sh                          # Setup script
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000
Production: https://your-backend.onrender.com
```

### Authentication

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### Endpoints

#### **POST** `/api/auth/google`
**Login with Google OAuth**

**Request:**
```json
{
  "idToken": "google-id-token-here"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "picture": "https://..."
  }
}
```

---

#### **GET** `/api/auth/verify`
**Verify JWT Token** 🔒

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
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

---

#### **GET** `/api/data`
**Get All Scraped Data** 🔒

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 30)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6",
      "rank": 1,
      "title": "Story Title",
      "link": "https://example.com",
      "domain": "example.com",
      "points": 250,
      "comments": 42,
      "scrapedAt": "2026-01-06T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 50,
    "itemsPerPage": 30
  },
  "lastScrapedAt": "2026-01-06T10:30:00.000Z"
}
```

---

#### **POST** `/api/scrape/trigger`
**Trigger Manual Scraping** 🔒

**Response (200):**
```json
{
  "success": true,
  "message": "Scraping completed successfully",
  "itemsScraped": 30
}
```

---

#### **GET** `/api/data/stats`
**Get Dashboard Statistics** 🔒

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalItems": 30,
    "lastScrapedAt": "2026-01-06T10:30:00.000Z",
    "averagePoints": 156,
    "totalPoints": 4680
  }
}
```

---

#### **POST** `/api/scrape`
**Receive Scraped Data** (Called by scraper)

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
      "scraped_at": "2026-01-06 10:30:00"
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Successfully saved 30 items",
  "count": 30
}
```

---

#### **GET** `/health`
**Health Check**

**Response (200):**
```json
{
  "success": true,
  "message": "DataLens API is running",
  "timestamp": "2026-01-06T10:30:00.000Z"
}
```

---

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "No token provided. Access denied."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🚢 Deployment

### Backend Deployment (Render)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render Account:** https://render.com

3. **Create New Web Service:**
   - Connect GitHub repository
   - Name: `datalens-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables:**
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

5. **Deploy** and copy the URL

---

### Frontend Deployment (Vercel)

1. **Create Vercel Account:** https://vercel.com

2. **Import Project:**
   - Connect GitHub repository
   - Framework: Create React App
   - Root Directory: `frontend`

3. **Add Environment Variables:**
```
REACT_APP_API
# Backend API URL
REACT_APP_API_URL=http://localhost:5000