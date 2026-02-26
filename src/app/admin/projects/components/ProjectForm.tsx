'use client';

import React, { useState } from 'react';
import {
    Save,
    X,
    Upload,
    MapPin,
    Tag,
    Info,
    CheckCircle2,
    Clock,
    Eye,
    ChevronLeft,
    Image as ImageIcon,
    Plus,
    Trash2,
    Calendar,
    Building2,
    Maximize2,
    Search,
    FileText,
    History,
    Layout,
    AlertTriangle,
    Check,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as currentProjects } from '@/app/design-z/data/projectData';

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState(() => {
        const data = initialData || {};
        return {
            id: data.id || '',
            title: data.title?.en || data.title || '',
            location: data.location?.en || data.location || '',
            type: data.type?.en || data.type || data.sector || 'Government Office Building',
            status: data.status?.en || data.status || 'Completed',
            image: data.image || '/images/projects/Thumbnail-1.jpg',
            summary: data.summary?.en || data.summary || '',
            client: data.client || '',
            area: data.area || '',
            year: data.year || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            description: {
                background: data.description?.background || '',
                objectives: data.description?.objectives || '',
                concept: data.description?.concept || ''
            },
            services: data.services || [] as string[],
            challenges: data.challenges || [] as string[],
            gallery: data.gallery || [] as string[]
        };
    });

    const [newService, setNewService] = useState('');
    const [newChallenge, setNewChallenge] = useState('');

    const types = [
        'Government Office Building',
        'Public Service Building',
        'Water Treatment Plant',
        'Slope Construction',
        'Private Building',
        'Infrastructure'
    ];

    const statuses = ['Completed', 'Under Construction'];

    const addItem = (field: 'services' | 'challenges', value: string, setter: (v: string) => void) => {
        if (value.trim()) {
            setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
            setter('');
        }
    };

    const removeItem = (field: 'services' | 'challenges', index: number) => {
        const updated = formData[field].filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, [field]: updated });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const finalId = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const updatedProject = {
                id: finalId,
                title: { en: formData.title, kh: initialData?.title?.kh || formData.title },
                location: { en: formData.location, kh: initialData?.location?.kh || formData.location },
                type: { en: formData.type, kh: initialData?.type?.kh || formData.type },
                status: { en: formData.status, kh: initialData?.status?.kh || formData.status },
                image: formData.image,
                summary: { en: formData.summary, kh: initialData?.summary?.kh || formData.summary },
                client: formData.client,
                area: formData.area,
                year: formData.year,
                startDate: formData.startDate,
                endDate: formData.endDate,
                description: formData.description,
                services: formData.services,
                challenges: formData.challenges,
                gallery: formData.gallery
            };

            let updatedProjects;
            if (isEditing) {
                updatedProjects = currentProjects.map(p => p.id === initialData?.id ? updatedProject : p);
            } else {
                updatedProjects = [updatedProject, ...currentProjects];
            }

            const response = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: 'projectData.ts', data: updatedProjects })
            });

            if (!response.ok) throw new Error('Failed to save project');

            window.location.href = '/admin/projects';
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save project!');
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General Info', icon: Info },
        { id: 'content', label: 'Detailed Narrative', icon: Layout },
        { id: 'details', label: 'Technical Specs', icon: Building2 },
        { id: 'media', label: 'Media Gallery', icon: ImageIcon }
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Header Sticky Container */}
            <div className="sticky top-16 z-40 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-8 px-8">
                <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/projects"
                            className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-slate-900 leading-none">
                                    {isEditing ? 'Modify Project Asset' : 'Register New Project'}
                                </h1>
                                {isEditing && (
                                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">
                                        ID: {formData.id}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider truncate max-w-[300px]">
                                {formData.title || 'Untitled Draft'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all">
                            <History size={16} />
                            Log
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-70"
                        >
                            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                            {isSaving ? 'Synchronizing...' : 'Commit Changes'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white border-b border-slate-200 -mx-8 px-8 mb-8 sticky top-[138px] z-30">
                <div className="flex items-center gap-8 max-w-7xl mx-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab.id
                                ? 'text-indigo-600'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <tab.icon size={16} />
                                {tab.label}
                            </div>
                            {activeTab === tab.id && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                <div className="lg:col-span-8 space-y-8">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'general' && (
                            <motion.div key="general" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Formal Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-900"
                                            placeholder="e.g., Phum Prek Water Treatment Plant"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Location</label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-900"
                                                placeholder="City, Province"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operational Category</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-900 appearance-none"
                                            >
                                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Executive Summary</label>
                                        <textarea
                                            rows={4}
                                            value={formData.summary}
                                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-600 resize-none leading-relaxed"
                                            placeholder="A brief overview for listing cards..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'content' && (
                            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-10">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Background</label>
                                        <textarea
                                            rows={6}
                                            value={formData.description.background}
                                            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, background: e.target.value } })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-600 resize-none leading-relaxed"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Objectives</label>
                                        <textarea
                                            rows={6}
                                            value={formData.description.objectives}
                                            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, objectives: e.target.value } })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-600 resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'details' && (
                            <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Entity</label>
                                        <input
                                            type="text"
                                            value={formData.client}
                                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GFA (Built Area)</label>
                                        <input
                                            type="text"
                                            placeholder="sq.m"
                                            value={formData.area}
                                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-indigo-600" />
                                        Services & Deliverables
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newService}
                                                onChange={(e) => setNewService(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && addItem('services', newService, setNewService)}
                                                placeholder="Enter deliverable name..."
                                                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                                            />
                                            <button onClick={() => addItem('services', newService, setNewService)} className="px-5 bg-slate-900 text-white rounded-lg">
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.services.map((s: string, i: number) => (
                                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                                                    {s}
                                                    <button onClick={() => removeItem('services', i)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={14} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'media' && (
                            <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-8 uppercase tracking-wider">Asset Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {formData.gallery.map((img: string, i: number) => (
                                        <div key={i} className="aspect-[4/3] relative rounded-lg overflow-hidden border border-slate-100 group shadow-sm">
                                            <Image src={img} alt="" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button onClick={() => setFormData({ ...formData, gallery: formData.gallery.filter((_: any, idx: number) => idx !== i) })} className="p-2 bg-red-600 text-white rounded-lg">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="aspect-[4/3] rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                        <Upload size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Upload Asset</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side Info Rail */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-[210px]">
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-6 border border-slate-100">
                            <Image src={formData.image} alt="Thumbnail" fill className="object-cover" />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${formData.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{formData.status}</span>
                            </div>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{formData.title || 'Draft Label'}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <MapPin size={12} /> {formData.location || 'Location Pending'}
                        </div>
                        <Link
                            href={`/design-z/projects/${formData.id}`}
                            target="_blank"
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm"
                        >
                            <ExternalLink size={14} /> View Live URL
                        </Link>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-4">
                            <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 whitespace-nowrap">Global Publication</h4>
                                <p className="text-xs text-amber-800/70 leading-relaxed mt-1">
                                    Saved changes will be immediately propagated to the production environment and design variants.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
