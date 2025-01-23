// components/MyAlertContextProvider.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import MyAlert from './MyAlert';

interface AlertContextType {
    showMyAlert: (text: string, alertType?: 'success' | 'warning' | 'error' | 'load') => void;
    closeMyAlert: () => void;
}

const MyAlertContext = createContext<AlertContextType | undefined>(undefined);

export const MyAlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [type, setType] = useState<'success' | 'warning' | 'error' | 'load'>('success');

    const showMyAlert = (text: string, alertType: 'success' | 'warning' | 'error' | 'load' = 'success') => {
        setAlertText(text);
        setType(alertType);
        setShowAlert(true);
    };

    const closeMyAlert = () => {
        setShowAlert(false);
    };

    return (
        <MyAlertContext.Provider value={{ showMyAlert, closeMyAlert }}>
            {children}
            {showAlert && <MyAlert alertText={alertText} type={type} />}
        </MyAlertContext.Provider>
    );
};

export const useMyAlert = () => {
    const context = useContext(MyAlertContext);
    if (!context) {
        throw new Error('useMyAlert debe ser utilizado dentro de un MyAlertProvider');
    }
    return context;
};
