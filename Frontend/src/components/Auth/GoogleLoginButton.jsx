// frontend/src/components/Auth/GoogleLoginButton.jsx

import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Google OAuth Login Button Component
 * Handles Google Sign-In flow and token exchange
 */
const GoogleLoginButton = () => {
  const { login } = useAuth();

  useEffect(() => {
    // Load Google Identity Services library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'filled_blue',
          size: 'large',
          width: 300,
          text: 'signin_with',
          shape: 'rectangular',
        }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /**
   * Handle Google OAuth callback
   * @param {Object} response - Google credential response
   */
  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response;
      
      // Send ID token to backend for verification
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: credential }),
      });

      const data = await result.json();

      if (data.success) {
        // Store JWT token and user info
        login(data.token, data.user);
      } else {
        console.error('Authentication failed:', data.message);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="googleSignInButton"></div>
      <p className="text-sm text-gray-500">
        Sign in securely with your Google account
      </p>
    </div>
  );
};

export default GoogleLoginButton;