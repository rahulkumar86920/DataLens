// frontend/src/services/api.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Get authentication token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Create headers with authorization token
 */
const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Generic API request handler with error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Fetch all scraped data
 */
export const fetchData = async (page = 1, limit = 30) => {
  return apiRequest(`/api/data?page=${page}&limit=${limit}`);
};

/**
 * Trigger manual scraping
 */
export const triggerScrape = async () => {
  return apiRequest('/api/scrape/trigger', {
    method: 'POST',
  });
};

/**
 * Get dashboard statistics
 */
export const getStats = async () => {
  return apiRequest('/api/data/stats');
};

/**
 * Verify JWT token
 */
export const verifyToken = async () => {
  return apiRequest('/api/auth/verify');
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
  });
};

export default {
  fetchData,
  triggerScrape,
  getStats,
  verifyToken,
  logoutUser,
};