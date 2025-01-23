'use client'

import React, { useState } from 'react';
import LoginBackground from '@recursos/RECURSOS/login_desk.svg';
import Logo from '@recursos/RECURSOS/logo.svg';
import Bar from '@recursos/RECURSOS/bar-desktop.svg';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { generateToken } from '@src/utils/tokenUtils';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 
const SignInPage = () => {
  const [clientCode, setClientCode] = useState('SHZ8879');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = await generateToken(clientCode);
      Cookies.set('authToken', token, { secure: true, sameSite: 'strict' });
      router.push('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[#FFE5DE]">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoginBackground />
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full overflow-visible">
        <div className="absolute right-0 top-0 h-full" style={{ width: '80px', overflow: 'hidden' }}>
          <Bar style={{ height: '100vh', width: 'auto' }} />
        </div>

        <div className="relative h-full flex flex-col pt-32 pr-80 z-10">
          <div className="flex items-center justify-center">
            <Logo className="w-80 h-80" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center">
              <h2 className="text-[#691C32] font-bold text-xl mb-2">¿Ya hiciste tu pedido?</h2>
              <p className="text-gray-600">Ingresa con tu código de cliente</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-bold text-red-500 text-sm mb-2">
                  Código cliente
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientCode}
                    onChange={(e) => setClientCode(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#691C32] rounded-lg bg-transparent text-black focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <StorefrontIcon className='text-red-500 w-10 h-10' />
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;