import React from 'react';
import { Wrench } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <Wrench className="w-16 h-16 text-yellow-500 mb-6 animate-spin" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Under Maintenance</h1>
      <p className="text-lg text-gray-600 max-w-md">
        We're currently working on this page to improve your experience. Please check back later.
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default MaintenancePage;
