'use client'

import { useEffect, useState } from 'react';
import { getPremios } from '@src/service/conexion';
import Gifts from '@recursos/RECURSOS/gift.svg';
import { Typography } from '@mui/material';
import ZanahoriaIcon from '@recursos/RECURSOS/zanahoria_icono.svg';
import Image from 'next/image';
import RedemptionModal from '@src/components/Modal';

interface ProcessedProduct {
  id: string | number;
  image: string;
  title: string;
  price: number;
}

export default function CatalogoPage() {
  const [premios, setPremios] = useState<ProcessedProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProcessedProduct | null>(null);

  useEffect(() => {
    const fetchPremios = async () => {
      const data = await getPremios();
      setPremios(data);
    };
    fetchPremios();
  }, []);

  return (
    <div className="w-full min-h-screen bg-red-50 pt-10">
      {showModal && (
        <RedemptionModal
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          productData={selectedProduct}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 p-10">
          <Gifts />
        </div>

        <div className="bg-white rounded-3xl p-8 mt-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Catálogo premios</h1>
            <p className="text-gray-600 text-sm">
              Recibirás tus premios entre los siguientes 20 días hábiles, después de tu redención.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premios.map((premio) => (
              <div key={premio.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={premio.image}
                    alt={premio.title}
                    width={128}
                    height={128}
                    className="object-contain mb-4"
                  />
                  <div className="flex items-center justify-center gap-2 mb-300">
                    <ZanahoriaIcon />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: 'red',
                        fontSize: '0.9rem'
                      }}
                    >
                      {Math.floor(premio.price)} zanahorias
                    </Typography>
                  </div>
                  <h3 className="text-sm font-medium mb-4 text-center">
                    {premio.title}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedProduct(premio);
                      setShowModal(true);
                    }}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-3xl hover:bg-red-700 transition-colors"
                  >
                    Redimir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}