// src/app/layout.tsx
import { Poppins } from 'next/font/google';
import '@src/styles/global.css'; // Asegúrate de que el path sea correcto

// Configuración de la fuente Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Ajusta según tus necesidades
  variable: '--font-poppins', // Define la variable CSS
});

export const metadata = {
  title: 'Mi Aplicación',
  description: 'Descripción de tu aplicación',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
