'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) throw new Error('useConfirm must be used within a ConfirmProvider');
    return context;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfirmOptions | null>(null);
    const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);

    const confirm = useCallback((options: ConfirmOptions) => {
        setConfig(options);
        return new Promise<boolean>((resolve) => {
            setResolveRef(() => resolve);
        });
    }, []);

    const handleClose = (value: boolean) => {
        if (resolveRef) resolveRef(value);
        setConfig(null);
        setResolveRef(null);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <AnimatePresence>
                {config && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => handleClose(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`
                                        p-3 rounded-full shrink-0
                                        ${config.type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}
                                    `}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900">{config.title}</h3>
                                        <p className="mt-2 text-slate-600 leading-relaxed">{config.message}</p>
                                    </div>
                                    <button
                                        onClick={() => handleClose(false)}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => handleClose(false)}
                                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
                                >
                                    {config.cancelText || 'Cancel'}
                                </button>
                                <button
                                    onClick={() => handleClose(true)}
                                    className={`
                                        px-6 py-2 text-sm font-bold text-white rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5
                                        ${config.type === 'danger' ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'}
                                    `}
                                >
                                    {config.confirmText || 'Confirm'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConfirmContext.Provider>
    );
};
