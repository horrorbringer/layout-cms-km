'use client';

import React, { useState } from 'react';
import { footerData as initialData, FooterData } from '@/app/design-z/data/footerData';
import { Save, Languages, MapPin, Phone, Mail, Facebook, Linkedin, Youtube, Instagram, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/app/admin/_context/ToastContext';

export default function FooterSettings() {
    const [data, setData] = useState<FooterData>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [editLang, setEditLang] = useState<'en' | 'kh'>('en');
    const { showToast } = useToast();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: data,
                    fileName: 'footerData.ts'
                })
            });

            if (response.ok) {
                showToast('Footer settings saved successfully!', 'success');
            } else {
                showToast('Failed to save settings.', 'error');
            }
        } catch (error) {
            console.error('Save failed:', error);
            showToast('An error occurred while saving.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Footer Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage global footer content, social links, and contact information.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-1 border border-slate-200 flex">
                        <button
                            onClick={() => setEditLang('en')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${editLang === 'en' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setEditLang('kh')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${editLang === 'kh' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            Khmer
                        </button>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm disabled:opacity-50"
                    >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Languages size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Brand Description</h3>
                                <p className="text-xs text-slate-500">The short paragraph below the logo.</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 pl-1">COMPANY DESCRIPTION ({editLang.toUpperCase()})</label>
                            <textarea
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all h-32"
                                value={data.description[editLang] || ''}
                                onChange={(e) => setData({ ...data, description: { ...data.description, [editLang]: e.target.value } })}
                                placeholder="Enter short description..."
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Contact Information</h3>
                                <p className="text-xs text-slate-500">Address, phone, and email shown in the 4th column.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1">ADDRESS LINE 1 ({editLang.toUpperCase()})</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.contact.addressLine1[editLang] || ''}
                                    onChange={(e) => setData({ ...data, contact: { ...data.contact, addressLine1: { ...data.contact.addressLine1, [editLang]: e.target.value } } })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1">ADDRESS LOCATION ({editLang.toUpperCase()})</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.contact.addressLocation[editLang] || ''}
                                    onChange={(e) => setData({ ...data, contact: { ...data.contact, addressLocation: { ...data.contact.addressLocation, [editLang]: e.target.value } } })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1">GOOGLE MAPS LINK</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.contact.mapLink}
                                    onChange={(e) => setData({ ...data, contact: { ...data.contact, mapLink: e.target.value } })}
                                    dir="ltr"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 pl-1">PHONE</label>
                                    <div className="relative mt-1">
                                        <input
                                            className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                            value={data.contact.phone}
                                            onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                                            dir="ltr"
                                        />
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 pl-1">EMAIL</label>
                                    <div className="relative mt-1">
                                        <input
                                            className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                            value={data.contact.email}
                                            onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                                            dir="ltr"
                                        />
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Facebook size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Social Media Links</h3>
                                <p className="text-xs text-slate-500">URLs for social media icons.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1 flex items-center gap-2"><Facebook size={12} /> FACEBOOK</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.social.facebook}
                                    onChange={(e) => setData({ ...data, social: { ...data.social, facebook: e.target.value } })}
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1 flex items-center gap-2"><Linkedin size={12} /> LINKEDIN</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.social.linkedin}
                                    onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value } })}
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1 flex items-center gap-2"><Youtube size={12} /> YOUTUBE</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.social.youtube}
                                    onChange={(e) => setData({ ...data, social: { ...data.social, youtube: e.target.value } })}
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 pl-1 flex items-center gap-2"><Instagram size={12} /> INSTAGRAM</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                    value={data.social.instagram}
                                    onChange={(e) => setData({ ...data, social: { ...data.social, instagram: e.target.value } })}
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex items-start gap-4">
                        <AlertCircle className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-indigo-900 mb-1">Global Changes</h4>
                            <p className="text-xs text-indigo-700/70 leading-relaxed">Changes saved here will apply immediately to the website footer on all pages across the public views. Ensure URLs are full HTTP links.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
