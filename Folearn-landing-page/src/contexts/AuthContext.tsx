import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { registerUser, updateUserNama, loginUser } from '@/services/strapi';
import axios from 'axios';

// API Configuration - membaca dari environment variables (konsisten dengan strapi.ts)
const RAW_BASE = import.meta.env.VITE_STRAPI_URL || import.meta.env.VITE_API_URL || '';
const BASE_URL = String(RAW_BASE).replace(/\/$/, '');
// Jika BASE_URL kosong, gunakan default untuk development
const API_BASE_URL = BASE_URL 
  ? (BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`)
  : 'http://localhost:1337/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Types
interface User {
  id: string | number;
  name?: string;
  username?: string;
  email?: string;
  jwt?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: {
    id: number;
    name: string;
    description?: string;
  };
}

interface StudentUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface AuthResponse {
  jwt: string;
  user: StudentUser;
}

interface AuthError {
  status: number;
  name: string;
  username?: string;
  email: string;
  avatar?: string;
  jwt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  checkUserExistsInDb: (identifier: { email?: string; id?: number }) => Promise<{ exists: boolean; data?: any }>; 
  isAuthenticated: boolean;
  isLoading: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to clear auth data
  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem('folearn_user');
    localStorage.removeItem('folearn_jwt');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('folearn_jwt');
      const savedUser = localStorage.getItem('folearn_user');

      if (token && savedUser) {
        try {
          // Validate token by fetching current user
          const response = await axios.get('/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Normalize response: handle both { id, ... } and { data: { id, ... } }
          const userData = response.data?.data || response.data;
          
          if (userData?.id) {
            const user: User = {
              id: userData.id,
              username: userData.username || '',
              email: userData.email || '',
              confirmed: !!userData.confirmed,
              blocked: !!userData.blocked,
              role: userData.role || { id: 0, name: 'Authenticated', description: '' }
            };

            setUser(user);
            // Set axios default header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            // Token invalid, clear storage
            clearAuthData();
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          clearAuthData();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    const identifier = emailOrUsername.trim();
    if (!identifier || !password) return false;
    try {
      const response = await loginUser({ identifier, password });
      const { user: strapiUser, jwt } = response;
      const userData: User = {
        id: (strapiUser?.id ?? Date.now()).toString(),
        name: strapiUser?.nama ?? strapiUser?.username ?? identifier,
        username: strapiUser?.username,
        email: strapiUser?.email,
        jwt,
      };
      setUser(userData);
      localStorage.setItem('folearn_user', JSON.stringify(userData));
      if (jwt) localStorage.setItem('folearn_jwt', jwt);
      return true;
    } catch (err) {
      console.error('Login gagal:', err);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string, name?: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || password.length < 6 || !username.trim()) {
      return false;
    }
    try {
      // Register hanya kirim field valid: username, email, password
      const response = await registerUser({ username, email, password });
      let { user: strapiUser, jwt } = response;

      // Jika nama diisi, lakukan update nama pada user yang baru dibuat
      if (name && jwt && strapiUser?.id) {
        try {
          const updatedUser = await updateUserNama(strapiUser.id, jwt, name);
          // Strapi v4 mengembalikan objek user yang sudah di-update
          strapiUser = updatedUser;
        } catch (e) {
          console.warn('Gagal mengupdate nama user di Strapi:', e);
        }
      }
      const userData: User = {
        id: (strapiUser?.id ?? Date.now()).toString(),
        name: strapiUser?.nama ?? name ?? strapiUser?.username ?? username,
        username: strapiUser?.username ?? username,
        email: strapiUser?.email ?? email,
        jwt,
      };
      setUser(userData);
      localStorage.setItem('folearn_user', JSON.stringify(userData));
      if (jwt) localStorage.setItem('folearn_jwt', jwt);
      return true;
    } catch (err) {
      console.error('Signup gagal:', err);
      return false;
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('folearn_jwt');
      if (!token) return false;

      const response = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Normalize response: handle both { id, ... } and { data: { id, ... } }
      const userData = response.data?.data || response.data;

      if (userData?.id) {
        const role = userData?.role || { id: 0, name: 'Authenticated', description: '' };
        
        const user: User = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
          confirmed: !!userData.confirmed,
          blocked: !!userData.blocked,
          role: {
            id: role.id || 0,
            name: role.name || 'Authenticated',
            description: role.description || ''
          }
        };

        setUser(user);
        return true;
      }

      clearAuthData();
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthData();
      return false;
    }
  };

  // Check if user record exists in Strapi /users endpoint
  const checkUserExistsInDb = async (identifier: { email?: string; id?: number }): Promise<{ exists: boolean; data?: any }> => {
    try {
      // Use user ID if available (best approach since ID is guaranteed unique)
      if (identifier.id) {
        try {
          const res = await axios.get(`/users/${identifier.id}`);
          if (res?.data?.id) return { exists: true, data: res.data };
        } catch (err) {
          console.error('User not found by ID:', identifier.id);
          return { exists: false };
        }
      }

      // Fallback: filter by email if ID not available
      if (identifier.email) {
        try {
          const q = `/users?filters[email][$eq]=${encodeURIComponent(identifier.email)}&pagination[limit]=1`;
          const res = await axios.get(q);
          // Strapi /users endpoint returns array directly or wrapped in data
          const users = res?.data?.data || res?.data;
          if (Array.isArray(users) && users.length > 0) {
            return { exists: true, data: users[0] };
          }
        } catch (err) {
          console.error('User not found by email:', identifier.email);
        }
      }

      return { exists: false };
    } catch (error) {
      console.error('checkUserExistsInDb error:', error);
      return { exists: false };
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    refreshToken,
    checkUserExistsInDb,
    isAuthenticated: !!user,
    isLoading,
    // Consider user as "student" if authenticated with valid role (not an admin/super-admin)
    isStudent: !!user?.role?.name
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};