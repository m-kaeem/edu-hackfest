import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const { setUserFromOAuth } = useAuth();
  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setTimeout(() => {
        setError('Google authentication failed. Please try again.');
      }, 0);
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Use the auth context to properly set user
        setUserFromOAuth(user, token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch {
        setTimeout(() => {
          setError('Authentication error. Please try again.');
        }, 0);
        setTimeout(() => navigate('/login'), 3000);
      }
    } else {
      setTimeout(() => {
        setError('Invalid authentication response.');
      }, 0);
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [searchParams, navigate, setUserFromOAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Authentication Error</h2>
            <p className="text-gray-500">{error}</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Signing you in...</h2>
            <p className="text-gray-500">Please wait while we complete your authentication.</p>
          </div>
        )}
      </div>
    </div>
  );
}
