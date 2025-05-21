'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm'; 

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    setError(null);

    if (!username) {
        setError("username is required for registration");
        setIsLoading(false);
        return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
      }

      const response = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'registration failed, please try again');
        return;
      }

      // registration successful!
      alert('registration successful! please log in'); 
      router.push('/login'); // redirect to login page after registration

    } catch (error: any) {
      console.error('registration error: ', error);
      setError('an unexpected error occurred during registration, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
        isRegister={true} // explicitly specify this is the register form
      />
    </div>
  );
}