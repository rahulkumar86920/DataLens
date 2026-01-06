// frontend/src/App.jsx

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Loader from './components/Common/Loader';

/**
 * Protected Route Component
 * Only renders children if user is authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader />
      </div>
    );
  }

  return isAuthenticated() ? children : <LoginPage />;
};

/**
 * Main App Component
 */
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}

export default App;
