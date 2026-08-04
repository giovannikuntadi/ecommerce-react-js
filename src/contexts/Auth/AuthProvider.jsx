import { useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';

/**
 * @typedef {Object} AuthProviderProps
 * @property {React.ReactNode} children
 */

/**
 * @param {AuthProviderProps} props
 */
export function AuthProvider({ children }) {
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const [user, setUser] = useState(currentUserEmail ? { email: currentUserEmail } : null);

  /**
   * @param {string} email
   * @param {string} password
   */
  const signup = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(user => user.email === email)) {
      return { success: false, error: 'Email already exist' };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUserEmail', email);

    setUser({ email });

    return { succes: true };
  }, []);

  /**
   * @param {string} email
   * @param {string} password
   */
  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || []);

    if (users.find(user => user.email === email && user.password === password)) {
      localStorage.setItem('currentUserEmail', email);
      setUser({ email });
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUserEmail');
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ signup, login, logout, user }}>{children}</AuthContext.Provider>;
}
