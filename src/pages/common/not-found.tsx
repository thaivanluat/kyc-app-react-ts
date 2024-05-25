import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    Oops! Page not found.
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
