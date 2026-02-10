'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Shield,
    Lock,
    Mail,
    ArrowRight,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (formData.email === 'admin@kimmex.com' && formData.password === 'admin123') {
                setLoginStatus('success');
                localStorage.setItem('kimmex_admin_auth', 'true');
                localStorage.setItem('kimmex_admin_user', JSON.stringify({
                    name: 'Admin User',
                    role: 'Super Admin',
                    email: formData.email,
                    avatar: null
                }));
                setTimeout(() => router.push('/admin'), 1000);
            } else {
                setLoginStatus('error');
                setIsLoading(false);
                setTimeout(() => setLoginStatus('idle'), 3000);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
                            <Shield className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 text-center">Admin Portal</h1>
                        <p className="text-slate-500 font-medium text-center">Manage KIM MEX Construction CMS</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@kimmex.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between px-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                                <button type="button" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold text-slate-900 tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={isLoading || loginStatus === 'success'}
                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${loginStatus === 'success'
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                                    : loginStatus === 'error'
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-100'
                                        : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700'
                                    }`}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : loginStatus === 'success' ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Authenticated
                                    </>
                                ) : loginStatus === 'error' ? (
                                    <>
                                        <AlertCircle size={20} />
                                        Invalid Credentials
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Demo Credentials</p>
                        <p className="text-slate-500 text-[10px] font-medium mt-1">
                            admin@kimmex.com / admin123
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-8">
                    <Link href="/design-z" className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Return to Site</Link>
                    <span className="text-slate-200">|</span>
                    <a href="#" className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Privacy Policy</a>
                </div>
            </motion.div>
        </div>
    );
}
