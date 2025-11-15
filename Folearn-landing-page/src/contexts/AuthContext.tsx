import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { registerUser, updateUserNama, loginUser } from '@/services/strapi';

interface User {
  id: string;
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
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
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
    const savedUser = localStorage.getItem('folearn_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('folearn_user');
      }
    }
    setIsLoading(false);
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
    setUser(null);
    localStorage.removeItem('folearn_user');
    localStorage.removeItem('folearn_jwt');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('folearn_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};