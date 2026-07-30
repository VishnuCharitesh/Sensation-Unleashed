import React, { useState } from 'react';
import { Crown, Lock, User, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const { login, register, canRegisterAdmin, registeredUsers } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, password);
      if (!success) {
        setError('Login failed. Please register first or check your credentials.');
        return;
      }

      const existingUser = registeredUsers.find(
        (registered) => registered.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser?.role === 'ROLE_ADMIN') {
        navigate('/admin');
        return;
      }

      navigate('/');
      return;
    }

    const role = isAdminRegister ? 'ROLE_ADMIN' : 'ROLE_CUSTOMER';
    const success = register(fullName, email, phone, password, role);
    if (!success) {
      setError(isAdminRegister
        ? 'Admin registration is closed or email already registered.'
        : 'Registration failed. Email already registered.');
      return;
    }

    if (role === 'ROLE_ADMIN') {
      navigate('/admin');
      return;
    }

    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-mono-900 text-white flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-mono-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-sm text-mono-500">
          {isLogin ? 'Sign in to access your account and orders.' : 'Join Sensation Unleashed for exclusive member prices.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-xs font-bold text-mono-500 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-mono-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 text-mono-900 rounded-xl pl-9 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900 text-sm"
                placeholder="Enter your full name"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-mono-500 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-mono-400 absolute left-3 top-2.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 text-mono-900 rounded-xl pl-9 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900 text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-xs font-bold text-mono-500 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-mono-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 text-mono-900 rounded-xl pl-9 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900 text-sm"
                placeholder="+91 98480 12345"
              />
            </div>
          </div>
        )}

        {!isLogin && canRegisterAdmin && (
          <div className="bg-mono-50 border border-mono-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-mono-900">Admin Registration Portal</p>
                <p className="text-[11px] text-mono-500">Open until 3 admin accounts are created.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminRegister((prev) => !prev)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${isAdminRegister ? 'bg-mono-900 text-white' : 'bg-white text-mono-900 border border-gray-200'}`}
              >
                {isAdminRegister ? 'Admin Mode' : 'Register as Admin'}
              </button>
            </div>
            {isAdminRegister && (
              <p className="text-[11px] text-mono-500">
                Admin accounts are limited to the first 3 registrations. After that, this option will no longer be available.
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-mono-500 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-mono-400 absolute left-3 top-2.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 text-mono-900 rounded-xl pl-9 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900 text-sm"
              placeholder={isLogin ? 'Enter your password' : 'Choose a password'}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          <Crown className="w-4 h-4 fill-white" />
          <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
        </button>

        {error && (
          <p className="text-xs text-red-600 font-semibold mt-3 text-center">{error}</p>
        )}
      </form>

      <div className="text-center space-y-3">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setIsAdminRegister(false);
          }}
          className="text-xs text-mono-500 hover:text-mono-900 font-semibold"
        >
          {isLogin ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>

        {isLogin && canRegisterAdmin && (
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setIsAdminRegister(true);
            }}
            className="text-xs text-mono-900 font-semibold hover:underline"
          >
            Register as Admin (open to first 3 admins)
          </button>
        )}
      </div>
    </div>
  );
};
