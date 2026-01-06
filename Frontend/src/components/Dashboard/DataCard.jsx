// frontend/src/components/Dashboard/DataCard.jsx

import React from 'react';

/**
 * Data Card Component
 * Displays key metrics in card format
 */
const DataCard = ({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div
          className={`w-14 h-14 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-3xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DataCard;