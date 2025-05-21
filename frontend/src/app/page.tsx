import Link from 'next/link';
import React from 'react'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Welcome to Flour Power!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Discover, share, and save your favorite recipes. Join our community today!
      </p>

      <div className="flex space-x-4">
        <Link href="/login" passHref legacyBehavior>
          <a className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Login
          </a>
        </Link>
        <Link href="/register" passHref legacyBehavior>
          <a className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 hover:text-blue-700 transition duration-300">
            Register
          </a>
        </Link>
      </div>
    </div>
  );
}
