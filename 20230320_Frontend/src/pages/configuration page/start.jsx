import React, { useState } from 'react';

function StartSystemButton() {
  const [status, setStatus] = useState('');

  const startSystem = async () => {
    try {
      const response = await fetch('http://localhost:8080/startsystem', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.message || 'System started successfully!');
      } else {
        setStatus('Failed to start system');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-orange-50 text-gray-800 dark:bg-gray-900 dark:text-gray-50 rounded-md shadow-md">
      <button
        onClick={startSystem}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      >
        Start System
      </button>
      {status && (
        <p className="mt-4 text-sm text-orange-700 dark:text-orange-400">
          {status}
        </p>
      )}
    </div>
  );
}

export default StartSystemButton;
