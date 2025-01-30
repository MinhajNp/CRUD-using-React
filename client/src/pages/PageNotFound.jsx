import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-center text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
                <h1 className="text-6xl font-bold text-white">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-white">Oops! Page Not Found</h2>
                <p className="mt-2 text-gray-400">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="mt-6 inline-block text-black bg-white hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
