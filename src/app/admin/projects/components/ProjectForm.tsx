'use client';

import React, { useState } from 'react';
import {
    Save,
    X,
    Image as ImageIcon,
    Plus,
    Trash2,
    Info,
    Building2,
    Layout,
    History,
    ChevronLeft,
    CheckCircle2,
    MapPin,
    ExternalLink,
    AlertTriangle,
    Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as currentProjects } from '@/app/design-z/data/projectData';
import { projectDetails as currentProjectDetails } from '@/app/design-z/data/projectDetailData';
import RichTextEditor from '@/app/admin/_components/RichTextEditor';
import ImageUpload from '@/app/admin/_components/ImageUpload';
import { useToast } from '@/app/admin/_context/ToastContext';

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [editLang, setEditLang] = useState<'en' | 'kh'>('en');
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();

    const [formData, setFormData] = useState(() => {
        const data = initialData || {};

        const getLoc = (val: any, defaultStr = '') => {
            if (!val) return { en: defaultStr, kh: defaultStr };
            if (typeof val === 'string') return { en: val, kh: val };
            return { en: val.en || defaultStr, kh: val.kh || val.en || defaultStr };
        };

        return {
            id: data.id || '',
            title: getLoc(data.title, ''),
            location: getLoc(data.location, ''),
            type: getLoc(data.type || data.sector, 'Government Office Building'),
            status: getLoc(data.status, 'Completed'),
            image: data.image || '/images/projects/Thumbnail-1.jpg',
            summary: getLoc(data.summary, ''),
            client: getLoc(data.client, ''),
            area: data.area || '',
            year: data.year || '',
            description: {
                background: getLoc(data.description?.background, ''),
                objectives: getLoc(data.description?.objectives, ''),
                concept: getLoc(data.description?.concept, '')
            },
            services: (data.services || []).map((s: any) => getLoc(s, '')) as { en: string; kh: string }[],
            challenges: (data.challenges || []).map((c: any) => getLoc(c, '')) as { en: string; kh: string }[],
            gallery: data.gallery || [] as string[]
        };
    });

    const [newService, setNewService] = useState('');
    const [newChallenge, setNewChallenge] = useState('');
    const [newImage, setNewImage] = useState('');

    const types = [
        'Government Office Building',
        'Water Treatment Plant',
        'Slope Construction',
        'Systems'
    ];

    const statuses = ['Completed', 'Under Construction'];

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const finalId = formData.id || formData.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

            const updatedProjectSummary = {
                id: finalId,
                title: formData.title,
                location: formData.location,
                type: formData.type,
                status: formData.status,
                image: formData.image,
                summary: formData.summary
            };

            let updatedProjects = isEditing
                ? currentProjects.map(p => p.id === initialData?.id ? updatedProjectSummary : p)
                : [updatedProjectSummary, ...currentProjects];

            const updatedProjectDetail = {
                title: formData.title,
                subtitle: formData.type,
                location: formData.location,
                client: formData.client,
                sector: formData.type,
                area: formData.area,
                year: formData.year,
                status: formData.status,
                image: formData.image,
                description: formData.description,
                services: formData.services,
                challenges: formData.challenges,
                gallery: formData.gallery
            };

            const updatedDetailsMap = { ...currentProjectDetails };
            if (isEditing && initialData?.id && initialData.id !== finalId) {
                delete updatedDetailsMap[initialData.id];
            }
            updatedDetailsMap[finalId] = updatedProjectDetail;

            // Save JSON files
            await Promise.all([
                fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'projectData.ts', data: updatedProjects })
                }),
                fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'projectDetailData.ts', data: updatedDetailsMap })
                }),
                fetch('/api/cms/projects/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: finalId,
                        title: formData.title.en,
                        titleKm: formData.title.kh,
                        location: formData.location.en,
                        locationKm: formData.location.kh,
                        type: formData.type.en,
                        status: formData.status.en,
                        image: formData.image,
                        summary: formData.summary.en,
                        description: formData.description.background.en
                    })
                })
            ]);

            showToast('Project saved successfully!', 'success');
            window.location.href = '/admin/projects';
        } catch (error) {
            console.error('Save error:', error);
            showToast('Failed to save project!', 'error');
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General Info', icon: Info },
        { id: 'content', label: 'Detailed Narrative', icon: Layout },
        { id: 'details', label: 'Technical Specs', icon: Building2 },
        { id: 'media', label: 'Media Gallery', icon: ImageIcon }
    ];

    const getVal = (field: any) => field[editLang] || '';
    const updateVal = (fieldKey: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [fieldKey]: { ...prev[fieldKey], [editLang]: value }
        }));
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header Sticky Container */}
            <div className="sticky top-16 z-40 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-8 px-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-sm">
                        <ChevronLeft size={18} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-slate-900 leading-none">
                                {isEditing ? 'Modify Project Asset' : 'Register New Project'}
                            </h1>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider truncate max-w-[300px]">
                            {formData.title[editLang] || 'Untitled Draft'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setEditLang('en')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${editLang === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setEditLang('kh')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${editLang === 'kh' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Khmer
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-70">
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                        {isSaving ? 'Synchronizing...' : 'Commit Changes'}
                    </button>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white border-b border-slate-200 -mx-8 px-8 mb-8 sticky top-[138px] z-30">
                <div className="flex items-center gap-8 max-w-7xl mx-auto overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-bold uppercase tracking-wider transition-all relative flex items-center gap-2 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <tab.icon size={16} /> {tab.label}
                            {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                <div className="lg:col-span-8 space-y-8">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'general' && (
                            <motion.div key="general" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Title ({editLang})</label>
                                    <input
                                        type="text"
                                        value={getVal(formData.title)}
                                        onChange={(e) => updateVal('title', e.target.value)}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-900"
                                        placeholder="Enter project title"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location ({editLang})</label>
                                        <input
                                            type="text"
                                            value={getVal(formData.location)}
                                            onChange={(e) => updateVal('location', e.target.value)}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                            placeholder="City, Province"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category ({editLang})</label>
                                        {editLang === 'en' ? (
                                            <select
                                                value={formData.type.en}
                                                onChange={(e) => setFormData({ ...formData, type: { en: e.target.value, kh: formData.type.kh } })}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold appearance-none"
                                            >
                                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={formData.type.kh}
                                                onChange={(e) => updateVal('type', e.target.value)}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status ({editLang})</label>
                                        {editLang === 'en' ? (
                                            <select
                                                value={formData.status.en}
                                                onChange={(e) => setFormData({ ...formData, status: { en: e.target.value, kh: formData.status.kh } })}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold appearance-none"
                                            >
                                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={formData.status.kh}
                                                onChange={(e) => updateVal('status', e.target.value)}
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Executive Summary ({editLang})</label>
                                    <textarea
                                        rows={4}
                                        value={getVal(formData.summary)}
                                        onChange={(e) => updateVal('summary', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-600 resize-none leading-relaxed"
                                        placeholder="A brief overview..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hero Image</label>
                                    <ImageUpload
                                        value={formData.image}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
                                        description="This image will be used as the thumbnail in lists and hero image in detail view."
                                    />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'content' && (
                            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-10">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                            <span>Project Background ({editLang})</span>
                                        </label>
                                        <RichTextEditor
                                            value={getVal(formData.description.background)}
                                            onChange={(val) => setFormData({
                                                ...formData,
                                                description: {
                                                    ...formData.description,
                                                    background: { ...formData.description.background, [editLang]: val }
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                            <span>Core Objectives ({editLang})</span>
                                        </label>
                                        <RichTextEditor
                                            value={getVal(formData.description.objectives)}
                                            onChange={(val) => setFormData({
                                                ...formData,
                                                description: {
                                                    ...formData.description,
                                                    objectives: { ...formData.description.objectives, [editLang]: val }
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                            <span>Concept & Approach ({editLang})</span>
                                        </label>
                                        <RichTextEditor
                                            value={getVal(formData.description.concept)}
                                            onChange={(val) => setFormData({
                                                ...formData,
                                                description: {
                                                    ...formData.description,
                                                    concept: { ...formData.description.concept, [editLang]: val }
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'details' && (
                            <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Entity ({editLang})</label>
                                        <input
                                            type="text"
                                            value={getVal(formData.client)}
                                            onChange={(e) => updateVal('client', e.target.value)}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Area / Scope</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 10,000 sqm"
                                            value={formData.area}
                                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 2024"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-indigo-600" />
                                        Services & Deliverables ({editLang})
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newService}
                                                onChange={(e) => setNewService(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && newService.trim()) {
                                                        const newItem = { en: newService.trim(), kh: newService.trim() };
                                                        setFormData({ ...formData, services: [...formData.services, newItem] });
                                                        setNewService('');
                                                    }
                                                }}
                                                placeholder={`Add new deliverable...`}
                                                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (newService.trim()) {
                                                        const newItem = { en: newService.trim(), kh: newService.trim() };
                                                        setFormData({ ...formData, services: [...formData.services, newItem] });
                                                        setNewService('');
                                                    }
                                                }}
                                                className="px-5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {formData.services.map((s: any, i: number) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={s[editLang] || ''}
                                                        onChange={(e) => {
                                                            const newArray = [...formData.services];
                                                            newArray[i] = { ...newArray[i], [editLang]: e.target.value };
                                                            setFormData({ ...formData, services: newArray });
                                                        }}
                                                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm font-semibold"
                                                    />
                                                    <button
                                                        onClick={() => setFormData({ ...formData, services: formData.services.filter((_: any, idx: number) => idx !== i) })}
                                                        className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:bg-red-50 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'media' && (
                            <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Asset Gallery</h3>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Gallery Image</label>
                                    <ImageUpload
                                        value=""
                                        onChange={(url) => {
                                            if (url) {
                                                setFormData({ ...formData, gallery: [...formData.gallery, url] });
                                            }
                                        }}
                                        description="Upload images to add to the project's visual gallery."
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                                    {formData.gallery.map((img: string, i: number) => (
                                        <div key={i} className="aspect-[4/3] relative rounded-lg overflow-hidden border border-slate-100 group shadow-sm bg-slate-50">
                                            <Image src={img} alt="" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => setFormData({ ...formData, gallery: formData.gallery.filter((_: any, idx: number) => idx !== i) })}
                                                    className="p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.gallery.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-400 text-sm font-bold uppercase tracking-wider border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                                            No images in gallery
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side Info Rail */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-[210px]">
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-6 border border-slate-100 bg-slate-50">
                            {formData.image && <Image src={formData.image} alt="Thumbnail preview" fill className="object-cover" />}
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${formData.status.en === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{formData.status[editLang] || formData.status.en || 'No Status'}</span>
                            </div>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{formData.title[editLang] || formData.title.en || 'Draft Label'}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <MapPin size={12} /> {formData.location[editLang] || formData.location.en || 'Location Pending'}
                        </div>

                        {formData.id && (
                            <Link
                                href={`/design-z/projects/${formData.id}`}
                                target="_blank"
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm"
                            >
                                <ExternalLink size={14} /> View Live URL
                            </Link>
                        )}
                    </div>

                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-4">
                            <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 whitespace-nowrap">Global Publication</h4>
                                <p className="text-xs text-amber-800/70 leading-relaxed mt-1">
                                    Saved changes will be immediately propagated to the production environment and design variants. Both English and Khmer variants are saved simultaneously!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
