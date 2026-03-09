'use client';

import React, { useState } from 'react';
import {
    X, Save, Briefcase, MapPin, Clock,
    DollarSign, Award, AlignLeft, List,
    CheckCircle, Heart, Type
} from 'lucide-react';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';

interface Job {
    id: string;
    title: LocalizedString;
    loc: LocalizedString;
    type: LocalizedString;
    date: LocalizedString;
    dept: string;
    summary: LocalizedString;
    salary: LocalizedString;
    experience: LocalizedString;
    responsibilities: LocalizedString[];
    requirements: LocalizedString[];
    benefits: LocalizedString[];
}

interface JobEditorProps {
    job: Job;
    editLang: 'en' | 'kh';
    onClose: () => void;
    onSave: (updated: Job) => void;
}

export default function JobEditor({ job, editLang, onClose, onSave }: JobEditorProps) {
    const [formData, setFormData] = useState<Job>({ ...job });

    const handleLocalizedChange = (field: keyof Job, lang: 'en' | 'kh', value: string) => {
        const current = formData[field] as LocalizedString;
        setFormData(prev => ({
            ...prev,
            [field]: { ...current, [lang]: value }
        }));
    };

    const handleArrayChange = (field: 'responsibilities' | 'requirements' | 'benefits', value: string) => {
        const lines = value.split('\n');
        setFormData(prev => ({
            ...prev,
            [field]: lines.map((line, idx) => ({
                en: editLang === 'en' ? line : (prev[field][idx]?.en || line),
                kh: editLang === 'kh' ? line : (prev[field][idx]?.kh || line)
            }))
        }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                            Job Position Editor
                        </h2>
                        <p className="text-sm text-slate-500">Update position details, requirements, and responsibilities.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase text-slate-500 border border-slate-200">
                            Mode: {editLang.toUpperCase()}
                        </div>
                        <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            <Save size={16} /> Save Position
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <Type size={12} /> Position Title ({editLang.toUpperCase()})
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.title[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('title', editLang, e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <Briefcase size={12} /> Department
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all"
                                value={formData.dept || ''}
                                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <MapPin size={12} /> Location ({editLang.toUpperCase()})
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.loc[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('loc', editLang, e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <Clock size={12} /> Job Type ({editLang.toUpperCase()})
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.type[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('type', editLang, e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <DollarSign size={12} /> Salary Range ({editLang.toUpperCase()})
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.salary[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('salary', editLang, e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <Award size={12} /> Experience Required ({editLang.toUpperCase()})
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.experience[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('experience', editLang, e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <AlignLeft size={12} /> Posted Date
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                value={formData.date[editLang] || ''}
                                onChange={(e) => handleLocalizedChange('date', editLang, e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                            <AlignLeft size={12} /> Job Description ({editLang.toUpperCase()})
                        </label>
                        <textarea
                            rows={4}
                            className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:border-indigo-500 outline-none resize-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                            value={formData.summary[editLang] || ''}
                            onChange={(e) => handleLocalizedChange('summary', editLang, e.target.value)}
                        />
                    </div>

                    {/* Rich Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <CheckCircle size={12} className="text-emerald-500" /> Job Responsibility ({editLang.toUpperCase()})
                            </label>
                            <textarea
                                rows={8}
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600 focus:border-indigo-500 outline-none resize-none transition-all leading-relaxed ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                placeholder="One per line..."
                                value={formData.responsibilities?.map(r => r[editLang]).join('\n') || ''}
                                onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <List size={12} className="text-indigo-500" /> Job Requirement ({editLang.toUpperCase()})
                            </label>
                            <textarea
                                rows={8}
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600 focus:border-indigo-500 outline-none resize-none transition-all leading-relaxed ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                placeholder="One per line..."
                                value={formData.requirements?.map(r => r[editLang]).join('\n') || ''}
                                onChange={(e) => handleArrayChange('requirements', e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                                <Heart size={12} className="text-rose-500" /> Benefits ({editLang.toUpperCase()})
                            </label>
                            <textarea
                                rows={8}
                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600 focus:border-indigo-500 outline-none resize-none transition-all leading-relaxed ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                placeholder="One per line..."
                                value={formData.benefits?.map(b => b[editLang]).join('\n') || ''}
                                onChange={(e) => handleArrayChange('benefits', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
