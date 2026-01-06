// frontend/src/components/Dashboard/DataTable.jsx

import React, { useState } from 'react';

/**
 * Data Table Component
 * Displays scraped items in a responsive table format
 */
const DataTable = ({ data }) => {
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  /**
   * Handle column sorting
   */
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  /**
   * Sort data based on current sort settings
   */
  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'title') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  /**
   * Extract domain from URL
   */
  const getDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'N/A';
    }
  };

  /**
   * Sort icon component
   */
  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return <span className="text-slate-400">↕</span>;
    }
    return sortOrder === 'asc' ? 
      <span className="text-blue-600">↑</span> : 
      <span className="text-blue-600">↓</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th
                onClick={() => handleSort('rank')}
                className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-2">
                  Rank <SortIcon column="rank" />
                </div>
              </th>
              <th
                onClick={() => handleSort('title')}
                className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-2">
                  Title <SortIcon column="title" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Domain
              </th>
              <th
                onClick={() => handleSort('points')}
                className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-2">
                  Points <SortIcon column="points" />
                </div>
              </th>
              <th
                onClick={() => handleSort('comments')}
                className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-2">
                  Comments <SortIcon column="comments" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedData.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                    {item.rank}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900 line-clamp-2">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">
                    {getDomain(item.link)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-slate-900">
                    <span className="text-yellow-500">⭐</span>
                    {item.points}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-slate-900">
                    <span>💬</span>
                    {item.comments}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    Visit
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-200">
        {sortedData.map((item) => (
          <div key={item._id} className="p-4 hover:bg-slate-50 transition">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-semibold flex-shrink-0">
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {getDomain(item.link)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="text-yellow-500">⭐</span>
                  {item.points}
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span>💬</span>
                  {item.comments}
                </span>
              </div>
              
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                Visit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          Showing {sortedData.length} {sortedData.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </div>
  );
};

export default DataTable;