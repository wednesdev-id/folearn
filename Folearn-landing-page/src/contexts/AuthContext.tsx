import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:1337/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Types
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
  message: string;
  details?: {
    errors: Array<{
      path: string[];
      message: string;
      name: string;
    }>;
  };
}

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
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

  const clearAuthData = () => {
    localStorage.removeItem('folearn_jwt');
    localStorage.removeItem('folearn_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const saveAuthData = (response: AuthResponse) => {
    const { jwt, user: userData } = response;

    // Ensure role has default values if missing
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

    // Save to localStorage
    localStorage.setItem('folearn_jwt', jwt);
    localStorage.setItem('folearn_user', JSON.stringify(user));

    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    // Update state
    setUser(user);
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post<AuthResponse>('/auth/local/register', {
        username,
        email,
        password
      });

      saveAuthData(response.data);
      return { success: true, message: 'Registrasi berhasil!' };

    } catch (error) {
      const axiosError = error as AxiosError<AuthError>;

      if (axiosError.response?.status === 422) {
        const details = axiosError.response.data.details?.errors;
        if (details) {
          const errorMessages = details.map(err => err.message).join(', ');
          return { success: false, message: `Validasi gagal: ${errorMessages}` };
        }
      }

      const message = axiosError.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      return { success: false, message };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post<AuthResponse>('/auth/local', {
        identifier: email,
        password
      });

      saveAuthData(response.data);
      return { success: true, message: 'Login berhasil!' };

    } catch (error) {
      const axiosError = error as AxiosError<AuthError>;

      if (axiosError.response?.status === 400) {
        return { success: false, message: 'Email atau password salah' };
      }

      if (axiosError.response?.status === 401) {
        return { success: false, message: 'Email atau password salah' };
      }

      const message = axiosError.response?.data?.message || 'Login gagal. Silakan coba lagi.';
      return { success: false, message };
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
    register,
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