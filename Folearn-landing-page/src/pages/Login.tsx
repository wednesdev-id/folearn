import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import NeomorphCard from '@/components/NeomorphCard';
import { useAuth } from '@/contexts/AuthContext';
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, checkUserExistsInDb } = useAuth();

  // Scroll to top setiap kali masuk halaman login
  useScrollToTop(['login']);

  // Get the intended destination from location state
  const from = location.state?.from || '/';

  // Redirect jika sudah login (pindahkan dari render ke useEffect)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        // After successful login, verify the user record exists in backend
        const check = await checkUserExistsInDb({ id: (JSON.parse(localStorage.getItem('folearn_user') || '{}') as any)?.id });
        if (check.exists) {
          navigate(from, { replace: true });
        } else {
          setError('Login sukses tetapi data pengguna tidak ditemukan di database. Silakan hubungi admin.');
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          {/* Login Form */}
          <NeomorphCard className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Masuk ke Folearn</h1>
              <p className="text-gray-600">Masuk untuk melanjutkan belajar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Field (Email or Username) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email atau Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan email atau username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </NeomorphCard>
        </div>
      </main>
    </div>
  );
};

export default Login;