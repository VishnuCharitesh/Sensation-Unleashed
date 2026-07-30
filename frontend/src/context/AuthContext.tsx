import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role } from '../types';

interface RegisteredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  isSubscriber: boolean;
  adminCount: number;
  canRegisterAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string, role?: Role) => boolean;
  logout: () => void;
  activateSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  const role: Role = user ? user.role : 'GUEST';
  const isSubscriber: boolean = user ? (user.isSubscriber || user.role === 'ROLE_SUBSCRIBER') : false;
  const adminCount = registeredUsers.filter((registered) => registered.role === 'ROLE_ADMIN').length;
  const canRegisterAdmin = adminCount < 3;

  useEffect(() => {
    localStorage.removeItem('sensation_user');
    localStorage.removeItem('sensation_registered_users');
    setUser(null);
    setRegisteredUsers([]);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sensation_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sensation_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sensation_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (email: string, password: string) => {
    const existingUser = registeredUsers.find(
      (registered) => registered.email.toLowerCase() === email.toLowerCase()
    );

    if (!existingUser || existingUser.password !== password) {
      return false;
    }

    setUser({
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      phone: existingUser.phone,
      role: existingUser.role,
      isSubscriber: existingUser.isSubscriber
    });

    return true;
  };

  const register = (fullName: string, email: string, phone: string, password: string, role: Role = 'ROLE_CUSTOMER') => {
    const alreadyRegistered = registeredUsers.some(
      (registered) => registered.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyRegistered) {
      return false;
    }

    if (role === 'ROLE_ADMIN' && !canRegisterAdmin) {
      return false;
    }

    const newRegisteredUser: RegisteredUser = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      phone,
      role,
      isSubscriber: false,
      password
    };

    setRegisteredUsers((prev) => [...prev, newRegisteredUser]);
    setUser({
      id: newRegisteredUser.id,
      fullName: newRegisteredUser.fullName,
      email: newRegisteredUser.email,
      phone: newRegisteredUser.phone,
      role: newRegisteredUser.role,
      isSubscriber: newRegisteredUser.isSubscriber
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const activateSubscription = () => {
    if (user) {
      setUser({ ...user, role: 'ROLE_SUBSCRIBER', isSubscriber: true });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isSubscriber,
      adminCount,
      canRegisterAdmin,
      login,
      register,
      logout,
      activateSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
