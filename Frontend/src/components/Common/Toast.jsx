// frontend/src/components/Common/Toast.jsx

import React, { useEffect } from 'react';

/**
 * Toast Notification Component
 * Displays temporary messages
 */
export const Toast = ({ message, type = 'info', onClose }) => {
  const types = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: '✓',
      iconBg: 'bg-green-500',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: '✕',
      iconBg: 'bg-red-500',
      text: 'text-red-800',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'ℹ',
      iconBg: 'bg-blue-500',
      text: 'text-blue-800',
    },
  };

  const style = types[type] || types.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`${style.bg} border rounded-lg shadow-lg p-4 pr-12 max-w-md flex items-start gap-3`}
      >
        <div
          className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
        >
          {style.icon}
        </div>
        <p className={`${style.text} text-sm font-medium flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`${style.text} hover:opacity-70 absolute top-2 right-2 transition`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};