// frontend/src/components/Common/Loader.jsx

import React from 'react';

/**
 * Loading Spinner Component
 */
export const Loader = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-sm text-slate-600">Loading data...</p>
    </div>
  );
};

export default Loader;
