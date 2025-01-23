"use client";

import React from 'react';
import { useMyAlert } from './MyAlertContextProvider';

interface MyAlertProps {
    alertText: string;
    type: 'success' | 'warning' | 'error' | 'load';
}

export default function MyAlert({ alertText, type }: MyAlertProps) {
    const { closeMyAlert } = useMyAlert();

    const colorsBgGdType = {
        success: 'from-[#e7f9ecaa] to-[#a0d6a5aa]',
        warning: 'from-[#fcf7eaaa] to-[#fbcb92aa]',
        error: 'from-[#fdeaea] to-[#f8b0b0aa]',
        load: 'from-[#e0f7faaa] to-[#a5e0d6aa]',
    };
    const colorsBgType = {
        success: 'bg-green-400',
        warning: 'bg-yellow-400',
        error: 'bg-red-400',
        load: 'bg-blue-400',
    };

    const iconTypes = {
        success: '✓',
        warning: '⚠️',
        error: '✖',
        load: '⏳',
    };

    return (
        <div className={`fixed inset-0 w-full h-full bg-gradient-to-b ${colorsBgGdType[type]} flex justify-center items-center backdrop-blur-sm z-50`}>
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg w-full max-w-xs transform transition-all duration-300 ease-in-out">
                <div className={`flex items-center justify-center py-6 ${colorsBgType[type]} rounded-t-xl`}>
                    <span style={{ color: 'white', fontSize: '2.5rem' }}>
                        {iconTypes[type]}
                    </span>
                </div>
                <div className="py-4 px-6 text-center">
                    <h3 className="font-semibold text-gray-700 text-lg mb-2">
                        {type === "error" ? "Ha ocurrido un error" :
                        type === "success" ? "Operación completada con éxito" : 
                        type === "warning" ? "Advertencia" : "Cargando"}
                    </h3>
                    <p className="text-gray-600 text-base">{alertText}</p>
                </div>
                <div className="flex justify-center mt-4 mb-4">
                    <button 
                        onClick={() => closeMyAlert()} 
                        className={`px-6 py-3 text-white font-semibold rounded-full ${colorsBgType[type]} hover:bg-opacity-90 transition-opacity`}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
