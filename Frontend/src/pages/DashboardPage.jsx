import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Dashboard/Sidebar';
import DataCard from '../components/Dashboard/DataCard';
import DataTable from '../components/Dashboard/DataTable';
import RefreshButton from '../components/Dashboard/RefreshButton';
import Loader from '../components/Common/Loader';
import { Toast } from '../components/Common/Toast';
import { fetchData, triggerScrape, getStats } from '../services/api';

/**
 * Main Dashboard Page Component
 * Displays scraped data with real-time refresh capabilities
 */
const DashboardPage = () => {
  const { user } = useAuth();
  
  // State management
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch scraped data from backend
   */
  const loadData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const response = await fetchData();

      if (response.success) {
        setData(response.data);
        setLastUpdated(response.lastScrapedAt);
        
        if (!showLoader) {
          showToast('Data refreshed successfully!', 'success');
        }
      } else {
        showToast('Failed to load data', 'error');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Error loading data. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch dashboard statistics
   */
  const loadStats = async () => {
    try {
      const response = await getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  /**
   * Trigger manual web scraping
   */
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      showToast('Scraping in progress...', 'info');

      const response = await triggerScrape();

      if (response.success) {
        showToast(
          `Scraping completed! ${response.itemsScraped} items updated.`,
          'success'
        );
        
        // Reload data after scraping
        await loadData(false);
        await loadStats();
      } else {
        showToast('Scraping failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error triggering scrape:', error);
      showToast('Failed to trigger scrape. Check your connection.', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 4000);
  };

  /**
   * Format last updated time
   */
  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const updated = new Date(date);
    const diff = now - updated;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 24) return updated.toLocaleDateString();
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Real-time Hacker News data scraping
                </p>
              </div>
              
              <RefreshButton 
                onClick={handleRefresh} 
                loading={refreshing}
              />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DataCard
              title="Total Stories"
              value={stats?.totalItems || 0}
              icon="📊"
              color="blue"
            />
            <DataCard
              title="Average Points"
              value={Math.round(stats?.averagePoints || 0)}
              icon="⭐"
              color="yellow"
            />
            <DataCard
              title="Last Updated"
              value={formatLastUpdated(lastUpdated)}
              icon="🕐"
              color="green"
            />
          </div>

          {/* Data Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader />
            </div>
          ) : data.length > 0 ? (
            <DataTable data={data} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Data Available
              </h3>
              <p className="text-slate-600 mb-6">
                Click the refresh button to start scraping data
              </p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {refreshing ? 'Scraping...' : 'Start Scraping'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default DashboardPage;