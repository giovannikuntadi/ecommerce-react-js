import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
