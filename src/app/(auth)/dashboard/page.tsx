import React from 'react';
import { Metadata } from 'next';
import Banner from '@recursos/RECURSOS/BANNER.svg';
import Background from '@recursos/RECURSOS/back_desktop.svg';
import ProductGrid from '@src/components/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inicio | Juntos+',
};

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Background className="w-full h-full" />
      </div>

      <div className="relative z-10 flex justify-between mt-32">
        <div className="ml-32 mt-8">
          <h1 className="text-4xl text-red-600 font-extrabold">
            ¡Bienvenido!
          </h1>
          <p className="text-4xl max-w-md">
            <span className="font-extrabold text-[#471322]">Toby te felicita por comprar a través de nuestro canal de Whatsapp </span>
            <span className="text-red-600 font-semibold">Juntos+</span>
            <span className="font-extrabold text-[#471322]">. Es hora de reclamar fabulosos premios.</span>
          </p>
        </div>
        <Banner className="m-3 mb-20 p-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30" style={{ paddingTop: '5rem' }}>
        <div className="relative w-full mb-8">
          <h2 className="text-2xl font-poppins font-bold text-[#471322] text-center">
            Catálogo de premios
          </h2>

          <Link
            href="/dashboard/catalogo"
            className="absolute right-0 top-0 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >Ver todos</Link>
        </div>
        <div className="text-center mb-12">
          <p className="text-xl text-[#471322]">
            Toby tiene sorprendentes premios para ti,
            <br />
            <span className="font-semibold">elige el que más te gusta ¡Hazlo ahora!</span>
          </p>
        </div>

        <ProductGrid />
      </div>
    </div>
  );
}