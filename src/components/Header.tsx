'use client'
import Link from 'next/link'
import Gift from '@recursos/RECURSOS/gift1.svg'
import Inicio from '@recursos/RECURSOS/home.svg'
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
  const handleLogout = () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return (
    <header className="bg-red-600 text-white shadow-md relative z-10">
      <div className="container mx-auto">
        <div className="flex justify-end py-2 mr-4">
          <nav className="flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 hover:bg-red-700 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <Inicio />
              <span className="hover:tracking-wide transition-all duration-300">Inicio</span>
            </Link>
            <Link
              href="/dashboard/catalogo"
              className="flex items-center space-x-2 hover:bg-red-700 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <Gift />
              <span className="hover:tracking-wide transition-all duration-300">Catálogo premios</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:bg-red-700 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <LogoutIcon className="w-5 h-5" />
              <span className="hover:tracking-wide transition-all duration-300">Cerrar sesión</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;