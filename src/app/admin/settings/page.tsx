'use client';

import React from 'react';
import {
    Save,
    User,
    Lock,
    Globe,
    Bell,
    Shield,
    Database,
    Zap,
    UserCircle,
    Mail,
    Settings as SettingsIcon,
    AlertCircle
} from 'lucide-react';

export default function SettingsAdmin() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your account preferences and CMS configuration.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                    <Save size={16} />
                    Save All
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Profile Section */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <UserCircle size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Profile</h3>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                <User size={32} />
                            </div>
                            <div className="space-y-2">
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Change Photo</button>
                                <p className="text-[10px] text-slate-400 uppercase font-black">JPG or PNG, max 2MB</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Admin User"
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@kimmex.com.kh"
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CMS Config Section */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <SettingsIcon size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">CMS Configuration</h3>
                    </div>
                    <div className="p-8 space-y-8 divide-y divide-slate-100">
                        <div className="flex items-center justify-between gap-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Auto-save Content</h4>
                                <p className="text-xs text-slate-500 mt-1">Automatically save changes while editing projects and site content.</p>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-8 pt-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Maintenance Mode</h4>
                                <p className="text-xs text-slate-500 mt-1">Redirect all public traffic to a holding page during major updates.</p>
                            </div>
                            <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-8 pt-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Live Preview Proxy</h4>
                                <p className="text-xs text-slate-500 mt-1">Real-time rendering of content changes on draft environments.</p>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="p-6 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-900">Critical Actions</h4>
                            <p className="text-xs text-red-700/70 mt-1 leading-relaxed">Resetting the database will permanently clear all project data and site content modifications.</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap">
                        Reset System
                    </button>
                </section>
            </div>
        </div>
    );
}
