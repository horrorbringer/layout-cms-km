'use client';

import React, { useState } from 'react';
import {
    Save,
    User,
    Globe,
    UserCircle,
    Settings as SettingsIcon,
    AlertCircle,
    Type,
    Check
} from 'lucide-react';
import { configData as initialConfig, KhmerFontName } from '@/app/design-z/data/configData';

export default function SettingsAdmin() {
    const [khmerFont, setKhmerFont] = useState<KhmerFontName>(initialConfig.khmerFont);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            const response = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { khmerFont },
                    fileName: 'configData.ts'
                })
            });

            if (response.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const fonts: { name: KhmerFontName; label: string; desc: string }[] = [
        { name: 'Siemreap', label: 'Siemreap', desc: 'Classic, clean Khmer font ideal for body text.' },
        { name: 'Koulen', label: 'Koulen', desc: 'Bold, modern display font perfect for headings.' },
        { name: 'Battambang', label: 'Battambang', desc: 'Clear and legible, great for both subheadings and body.' },
        { name: 'System', label: 'System Default', desc: 'Uses the default operating system font for Khmer.' }
    ];

    return (
        <div className="space-y-8 max-w-4xl pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your account preferences and site-wide configuration.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${saveStatus === 'success' ? 'bg-green-500 text-white' :
                        saveStatus === 'error' ? 'bg-red-500 text-white' :
                            'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50'
                        }`}
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saveStatus === 'success' ? (
                        <Check size={16} />
                    ) : (
                        <Save size={16} />
                    )}
                    {saveStatus === 'success' ? 'Settings Saved' : isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Localization & Typography Section */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <Type size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Localization & Typography</h3>
                    </div>
                    <div className="p-8">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-2">Khmer Font Family</h4>
                                <p className="text-xs text-slate-500 mb-6">Choose the primary font for Khmer (KH) language content across the website.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {fonts.map((font) => (
                                        <div
                                            key={font.name}
                                            onClick={() => setKhmerFont(font.name)}
                                            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${khmerFont === font.name
                                                ? 'border-indigo-600 bg-indigo-50/30'
                                                : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                                                }`}
                                        >
                                            {khmerFont === font.name && (
                                                <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                                    <Check size={12} className="text-white" />
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <span className={`block text-lg ${khmerFont === font.name ? 'text-indigo-900' : 'text-slate-900'} font-bold`}>
                                                    {font.label}
                                                </span>
                                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                                    {font.desc}
                                                </p>
                                                <div className="pt-2">
                                                    <span className="text-2xl font-medium text-slate-400 block mt-2" style={{ fontFamily: 'serif' }}>
                                                        {font.name === 'Siemreap' ? 'សួស្តីកម្ពុជា' : font.name === 'Koulen' ? 'សួស្តីកម្ពុជា' : 'សួស្តីកម្ពុជា'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden opacity-60">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <UserCircle size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Profile</h3>
                    </div>
                    <div className="p-8 pointer-events-none">
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                <User size={32} />
                            </div>
                            <div className="space-y-2">
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">Change Photo</button>
                                <p className="text-[10px] text-slate-400 uppercase font-black">JPG or PNG, max 2MB</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Admin User"
                                    disabled
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@kimmex.com.kh"
                                    disabled
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CMS Config Section */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden opacity-60">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <SettingsIcon size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">CMS Configuration</h3>
                    </div>
                    <div className="p-8 space-y-8 divide-y divide-slate-100 pointer-events-none">
                        <div className="flex items-center justify-between gap-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Auto-save Content</h4>
                                <p className="text-xs text-slate-500 mt-1">Automatically save changes while editing projects and site content.</p>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-8 pt-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Maintenance Mode</h4>
                                <p className="text-xs text-slate-500 mt-1">Redirect all public traffic to a holding page during major updates.</p>
                            </div>
                            <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="p-6 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between gap-6 opacity-60">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-900">Critical Actions</h4>
                            <p className="text-xs text-red-700/70 mt-1 leading-relaxed">Resetting the database will permanently clear all project data.</p>
                        </div>
                    </div>
                    <button disabled className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold opacity-50 cursor-not-allowed shadow-sm whitespace-nowrap">
                        Reset System
                    </button>
                </section>
            </div>
        </div>
    );
}
