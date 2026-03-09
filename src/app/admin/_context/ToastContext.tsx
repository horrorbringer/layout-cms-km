'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                min-w-[320px] max-w-md p-4 rounded-xl shadow-2xl border flex items-start gap-3
                                ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-100' : ''}
                                ${toast.type === 'error' ? 'bg-rose-50 border-rose-100' : ''}
                                ${toast.type === 'warning' ? 'bg-amber-50 border-amber-100' : ''}
                                ${toast.type === 'info' ? 'bg-blue-50 border-blue-100' : ''}
                            `}>
                                <div className={`mt-0.5 shrink-0
                                    ${toast.type === 'success' ? 'text-emerald-500' : ''}
                                    ${toast.type === 'error' ? 'text-rose-500' : ''}
                                    ${toast.type === 'warning' ? 'text-amber-500' : ''}
                                    ${toast.type === 'info' ? 'text-blue-500' : ''}
                                `}>
                                    {toast.type === 'success' && <CheckCircle size={20} />}
                                    {toast.type === 'error' && <AlertCircle size={20} />}
                                    {toast.type === 'warning' && <AlertTriangle size={20} />}
                                    {toast.type === 'info' && <Info size={20} />}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-semibold 
                                        ${toast.type === 'success' ? 'text-emerald-900si' : ''}
                                        ${toast.type === 'error' ? 'text-rose-900' : ''}
                                        ${toast.type === 'warning' ? 'text-amber-900' : ''}
                                        ${toast.type === 'info' ? 'text-blue-900' : ''}
                                    `}>
                                        {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
                                    </p>
                                    <p className={`text-sm leading-relaxed mt-0.5
                                        ${toast.type === 'success' ? 'text-emerald-700' : ''}
                                        ${toast.type === 'error' ? 'text-rose-700' : ''}
                                        ${toast.type === 'warning' ? 'text-amber-700' : ''}
                                        ${toast.type === 'info' ? 'text-blue-700' : ''}
                                    `}>
                                        {toast.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="shrink-0 p-1 rounded-md hover:bg-black/5 text-black/20 hover:text-black/40 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
