'use client';

import React from 'react';

interface AuthFormProps {
    isRegister?: boolean; // whether or not the user is registering or logging in
    onSubmit: (usernameOrEmail: string, password: string, username?: string) => void;
    isLoading: boolean;
    error: string | null;
}

export default function AuthForm({ isRegister, onSubmit, isLoading, error }: AuthFormProps) {
    const [username, setUsername] = React.useState('');
    const [usernameOrEmail, setUsernameOrEmail] = React.useState(''); // for login
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister) {
          onSubmit(usernameOrEmail, password, username); // pass username for registration
        } else {
          onSubmit(usernameOrEmail, password); // only usernameOrEmail and password for login
        }
    };
    
      return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegister ? 'Register' : 'Login'}
          </h2>
    
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isRegister} // required only for registration
              />
            </div>
          )}
    
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-gray-700 text-sm font-bold mb-2">
              {isRegister ? 'Email' : 'Username or Email'}
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
    
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
    
          {error && (
            <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
          )}
    
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
            </button>
          </div>
        </form>
      );
}