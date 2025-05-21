'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false); // will use for displaying loading symbol
  const [error, setError] = useState<string | null>(null); // whether ot not to display error symbol
  const router = useRouter(); // initialize router

  const handleLogin = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
      }

      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'login failed, please check your credentials!');
        return;
      }

      // store the JWT token if login successful
      localStorage.setItem('token', data.token);

      // redirect the user to their homepage of recipes
      router.push('/my-recipes'); // need to finish this endpoint (not working dynamically so far)

    } catch (error: any) {
      console.error('login error:', error);
      setError('an unexpected error occurred, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
        isRegister={false} 
      />
    </div>
  );
}