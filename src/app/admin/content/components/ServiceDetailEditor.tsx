'use client';

import React, { useState } from 'react';
import {
    X, Save, Plus, Trash2, Layout, Type,
    Image as ImageIcon, List, CheckCircle2,
    Users, Settings, Briefcase, LucideIcon
} from 'lucide-react';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';

interface ServiceDetail {
    id: string;
    title: LocalizedString;
    subtitle: LocalizedString;
    heroImage: string;
    description: LocalizedString;
    targetAudience: LocalizedString;
    scopeOfWork: LocalizedString[];
    process: { step: string; title: LocalizedString; desc: LocalizedString }[];
    benefits: { title: LocalizedString; desc: LocalizedString }[];
    relatedProjects: { id: string; title: LocalizedString; location: LocalizedString; category: LocalizedString; image: string }[];
}

interface ServiceDetailEditorProps {
    detail: ServiceDetail;
    onClose: () => void;
    onSave: (updated: ServiceDetail) => void;
}

export default function ServiceDetailEditor({ detail, onClose, onSave }: ServiceDetailEditorProps) {
    const [formData, setFormData] = useState<ServiceDetail>({ ...detail });

    const handleFieldChange = (field: keyof ServiceDetail, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLocalizedChange = (field: keyof ServiceDetail, lang: 'en' | 'kh', value: string) => {
        const current = (formData[field] as LocalizedString) || { en: '', kh: '' };
        setFormData(prev => ({
            ...prev,
            [field]: { ...current, [lang]: value }
        }));
    };

    const addScopeItem = () => {
        setFormData(prev => ({
            ...prev,
            scopeOfWork: [...prev.scopeOfWork, { en: 'New Scope Item', kh: 'របស់ថ្មី' }]
        }));
    };

    const updateScopeItem = (index: number, lang: 'en' | 'kh', value: string) => {
        const newScope = [...formData.scopeOfWork];
        newScope[index] = { ...newScope[index], [lang]: value };
        setFormData(prev => ({ ...prev, scopeOfWork: newScope }));
    };

    const deleteScopeItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            scopeOfWork: prev.scopeOfWork.filter((_, i) => i !== index)
        }));
    };

    const updateProcessStep = (index: number, field: 'title' | 'desc', lang: 'en' | 'kh', value: string) => {
        const newProcess = [...formData.process];
        const step = newProcess[index];
        const updatedField = { ...(step[field] as LocalizedString), [lang]: value };
        newProcess[index] = { ...step, [field]: updatedField };
        setFormData(prev => ({ ...prev, process: newProcess }));
    };

    const updateBenefit = (index: number, field: 'title' | 'desc', lang: 'en' | 'kh', value: string) => {
        const newBenefits = [...formData.benefits];
        const benefit = newBenefits[index];
        const updatedField = { ...(benefit[field] as LocalizedString), [lang]: value };
        newBenefits[index] = { ...benefit, [field]: updatedField };
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-indigo-600" />
                            Detail Page Editor: <span className="text-indigo-600">{(formData.title as LocalizedString).en}</span>
                        </h2>
                        <p className="text-sm text-slate-500">Customize the content for this specific service detail page.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                        >
                            <Save size={16} /> Save Details
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Modal Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-slate-50/50">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Layout size={14} /> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Subtitle (EN)</label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={(formData.subtitle as LocalizedString).en}
                                        onChange={(e) => handleLocalizedChange('subtitle', 'en', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Description (EN)</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none"
                                        value={(formData.description as LocalizedString).en}
                                        onChange={(e) => handleLocalizedChange('description', 'en', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <ImageIcon size={14} /> Hero Image Path
                                    </label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-indigo-600"
                                        value={formData.heroImage}
                                        onChange={(e) => handleFieldChange('heroImage', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Users size={14} /> Target Audience (EN)
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none"
                                        value={(formData.targetAudience as LocalizedString).en}
                                        onChange={(e) => handleLocalizedChange('targetAudience', 'en', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Scope of Work */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <List size={14} /> Scope of Work
                            </h3>
                            <button onClick={addScopeItem} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <Plus size={14} /> Add Scope Item
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.scopeOfWork.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 group relative">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                    <input
                                        className="flex-1 bg-transparent text-sm font-medium outline-none focus:border-b focus:border-indigo-500"
                                        value={(item as LocalizedString).en}
                                        onChange={(e) => updateScopeItem(i, 'en', e.target.value)}
                                    />
                                    <button
                                        onClick={() => deleteScopeItem(i)}
                                        className="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Process */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Settings size={14} /> Strategic Process
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {formData.process.map((p, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">{p.step}</div>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <input
                                                className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none border-b border-transparent focus:border-indigo-500"
                                                value={(p.title as LocalizedString).en}
                                                onChange={(e) => updateProcessStep(i, 'title', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <textarea
                                                rows={3}
                                                className="w-full text-xs text-slate-500 bg-transparent outline-none border border-transparent focus:border-indigo-500/20 rounded resize-none"
                                                value={(p.desc as LocalizedString).en}
                                                onChange={(e) => updateProcessStep(i, 'desc', 'en', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Benefits */}
                    <section className="space-y-4 pb-12">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={14} /> Value & Benefits
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {formData.benefits.map((b, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <input
                                                className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none border-b border-transparent focus:border-indigo-500"
                                                value={(b.title as LocalizedString).en}
                                                onChange={(e) => updateBenefit(i, 'title', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <textarea
                                                rows={3}
                                                className="w-full text-xs text-slate-500 bg-transparent outline-none border border-transparent focus:border-indigo-500/20 rounded resize-none"
                                                value={(b.desc as LocalizedString).en}
                                                onChange={(e) => updateBenefit(i, 'desc', 'en', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
