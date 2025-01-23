import React, { useState } from 'react';
import Image from 'next/image';
import AvaibleCarrot from '@recursos/RECURSOS/zanahorias_disponibles.svg'

interface ProductData {
    id: number | string;
    title: string;
    price: number;
    image: string;
    rating?: number;
    reviews?: number;
    shipping?: string;
    position?: number;
}

interface ModalProps {
    onClose: () => void;
    productData: ProductData | null;
    userCarrots?: number;
}

const RedemptionModal = ({ onClose, productData, userCarrots = 3 }: ModalProps) => {
    const [quantity, setQuantity] = useState(1);
    if (!productData) return null;

    const totalCost = quantity * productData.price;
    const canAfford = userCarrots >= totalCost;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <AvaibleCarrot />
                        <span className="text-gray-700">Tus zanahorias disponibles</span>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <span className="text-xl">&times;</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                        {userCarrots} zanahorias
                    </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex gap-4">
                        <Image
                            src={productData.image}
                            alt={productData.title}
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                        <div>
                            <h3 className="font-semibold mb-2">{productData.title}</h3>
                            <div className="flex items-center gap-2">
                                <span>Cantidad</span>
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="px-3 py-1 border-r hover:bg-gray-100"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-3">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-1 border-l hover:bg-gray-100"
                                        disabled={!canAfford}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 text-sm">
                                <span className="font-medium">Total: </span>
                                <span className={canAfford ? 'text-green-600' : 'text-red-600'}>
                                    {totalCost} zanahorias
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-semibold mb-4">Detalles del producto</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        {productData.shipping && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                                <span>{productData.shipping}</span>
                            </div>
                        )}
                        {productData.reviews && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span>{productData.rating} ({productData.reviews} reviews)</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        className={`w-full py-3 rounded-full transition-colors ${canAfford
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!canAfford}
                    >
                        CONFIRMAR REDENCIÓN
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        AGREGAR MÁS PRODUCTOS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RedemptionModal;