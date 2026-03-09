'use client';

import React, { useState } from 'react';
import {
    X, Save, Plus, Trash2, Layout, Type,
    Image as ImageIcon, List, CheckCircle2,
    Users, Settings, Briefcase, LucideIcon,
    Upload, Loader2
} from 'lucide-react';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';
import RichTextEditor from '@/app/admin/_components/RichTextEditor';
import { useToast } from '@/app/admin/_context/ToastContext';

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
    editLang: 'en' | 'kh';
    onClose: () => void;
    onSave: (updated: ServiceDetail) => void;
}

export default function ServiceDetailEditor({ detail, editLang, onClose, onSave }: ServiceDetailEditorProps) {
    const [formData, setFormData] = useState<ServiceDetail>({ ...detail });
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const { showToast } = useToast();

    const handleFieldChange = (field: keyof ServiceDetail, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLocalizedChange = (field: 'title' | 'subtitle' | 'description' | 'targetAudience', lang: 'en' | 'kh', value: string) => {
        const current = formData[field] || { en: '', kh: '' };
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

    const addProcessStep = () => {
        setFormData(prev => ({
            ...prev,
            process: [
                ...prev.process,
                {
                    step: (prev.process.length + 1).toString().padStart(2, '0'),
                    title: { en: 'New Step', kh: 'ជំហានថ្មី' },
                    desc: { en: 'Description of the step.', kh: 'ការពិពណ៌នាអំពីជំហាន។' }
                }
            ]
        }));
    };

    const deleteProcessStep = (index: number) => {
        setFormData(prev => ({
            ...prev,
            process: prev.process.filter((_, i) => i !== index).map((p, idx) => ({
                ...p,
                step: (idx + 1).toString().padStart(2, '0')
            }))
        }));
    };

    const updateBenefit = (index: number, field: 'title' | 'desc', lang: 'en' | 'kh', value: string) => {
        const newBenefits = [...formData.benefits];
        const benefit = newBenefits[index];
        const updatedField = { ...(benefit[field] as LocalizedString), [lang]: value };
        newBenefits[index] = { ...benefit, [field]: updatedField };
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData(prev => ({
            ...prev,
            benefits: [
                ...prev.benefits,
                {
                    title: { en: 'New Benefit', kh: 'អត្ថប្រយោជន៍ថ្មី' },
                    desc: { en: 'Benefit description.', kh: 'ការពិពណ៌នាអំពីអត្ថប្រយោជន៍។' }
                }
            ]
        }));
    };

    const deleteBenefit = (index: number) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
    };

    const updateRelatedProject = (index: number, field: 'title' | 'location' | 'category', lang: 'en' | 'kh', value: string) => {
        const newProjects = [...formData.relatedProjects];
        const proj = newProjects[index];
        newProjects[index] = { ...proj, [field]: { ...proj[field], [lang]: value } };
        setFormData(prev => ({ ...prev, relatedProjects: newProjects }));
    };

    const addRelatedProject = () => {
        setFormData(prev => ({
            ...prev,
            relatedProjects: [
                ...prev.relatedProjects,
                {
                    id: Date.now().toString(),
                    title: { en: 'New Project', kh: 'គម្រោងថ្មី' },
                    location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
                    category: { en: 'Commercial', kh: 'ពាណិជ្ជកម្ម' },
                    image: '/images/projects/Thumbnail-1.jpg'
                }
            ]
        }));
    };

    const deleteRelatedProject = (index: number) => {
        setFormData(prev => ({
            ...prev,
            relatedProjects: prev.relatedProjects.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, onUpload: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingId(id);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/cms/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            if (data.url) {
                onUpload(data.url);
                showToast('Image uploaded successfully!', 'success');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload image.', 'error');
        } finally {
            setUploadingId(null);
        }
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
                            Detail Page Editor: <span className={`text-indigo-600 ${editLang === 'kh' ? 'font-siemreap' : ''}`}>{(formData.title as LocalizedString)[editLang]}</span>
                        </h2>
                        <p className="text-sm text-slate-500">Customize the content for this specific service detail page.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 mr-4">
                            <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">Editing: {editLang.toUpperCase()}</div>
                        </div>
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
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Subtitle ({editLang.toUpperCase()})</label>
                                    <input
                                        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                        value={(formData.subtitle as LocalizedString)[editLang]}
                                        onChange={(e) => handleLocalizedChange('subtitle', editLang, e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Description ({editLang.toUpperCase()})</label>
                                    <RichTextEditor
                                        value={(formData.description as LocalizedString)[editLang] || ''}
                                        onChange={(val) => handleLocalizedChange('description', editLang, val)}
                                        placeholder="Service Description"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <ImageIcon size={14} /> Hero Image
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1 group/img">
                                            <input
                                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-indigo-600 pr-10"
                                                value={formData.heroImage}
                                                onChange={(e) => handleFieldChange('heroImage', e.target.value)}
                                            />
                                            {formData.heroImage && (
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-slate-200 overflow-hidden shadow-sm">
                                                    <img src={formData.heroImage} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            )}
                                        </div>
                                        <label className="shrink-0">
                                            <div className={`flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm ${uploadingId === 'hero' ? 'opacity-50 pointer-events-none' : ''}`}>
                                                {uploadingId === 'hero' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                                {uploadingId === 'hero' ? '...' : 'Upload'}
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero', (url) => handleFieldChange('heroImage', url))} />
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Users size={14} /> Target Audience ({editLang.toUpperCase()})
                                    </label>
                                    <RichTextEditor
                                        value={(formData.targetAudience as LocalizedString)[editLang] || ''}
                                        onChange={(val) => handleLocalizedChange('targetAudience', editLang, val)}
                                        placeholder="Target Audience"
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
                                        className={`flex-1 bg-transparent text-sm font-medium outline-none focus:border-b focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                        value={(item as LocalizedString)[editLang]}
                                        onChange={(e) => updateScopeItem(i, editLang, e.target.value)}
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
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Settings size={14} /> Strategic Process
                            </h3>
                            <button onClick={addProcessStep} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <Plus size={14} /> Add Step
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {formData.process.map((p, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4 relative group">
                                    <button
                                        onClick={() => deleteProcessStep(i)}
                                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">{p.step}</div>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <input
                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none border-b border-transparent focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                value={(p.title as LocalizedString)[editLang] || ''}
                                                onChange={(e) => updateProcessStep(i, 'title', editLang, e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <textarea
                                                rows={3}
                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none border border-transparent focus:border-indigo-500/20 rounded resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                value={(p.desc as LocalizedString)[editLang] || ''}
                                                onChange={(e) => updateProcessStep(i, 'desc', editLang, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Benefits */}
                    <section className="space-y-4 pb-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={14} /> Value & Benefits
                            </h3>
                            <button onClick={addBenefit} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <Plus size={14} /> Add Benefit
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {formData.benefits.map((b, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm space-y-4 relative group">
                                    <button
                                        onClick={() => deleteBenefit(i)}
                                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <input
                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none border-b border-transparent focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                value={(b.title as LocalizedString)[editLang] || ''}
                                                onChange={(e) => updateBenefit(i, 'title', editLang, e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <textarea
                                                rows={3}
                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none border border-transparent focus:border-indigo-500/20 rounded resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                value={(b.desc as LocalizedString)[editLang] || ''}
                                                onChange={(e) => updateBenefit(i, 'desc', editLang, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Projects */}
                    <section className="space-y-4 pb-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={14} /> Related Projects
                            </h3>
                            <button onClick={addRelatedProject} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                <Plus size={14} /> Add Project
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.relatedProjects.map((proj, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 relative group">
                                    <button
                                        onClick={() => deleteRelatedProject(i)}
                                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                                                <input
                                                    className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none border-b border-slate-100 focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={proj.title[editLang]}
                                                    onChange={(e) => updateRelatedProject(i, 'title', editLang, e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                                                <input
                                                    className={`w-full text-xs text-indigo-600 bg-transparent outline-none border-b border-slate-100 focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={proj.category[editLang]}
                                                    onChange={(e) => updateRelatedProject(i, 'category', editLang, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                                                <input
                                                    className={`w-full text-xs text-slate-500 bg-transparent outline-none border-b border-slate-100 focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={proj.location[editLang]}
                                                    onChange={(e) => updateRelatedProject(i, 'location', editLang, e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Image</label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1 group/img">
                                                        <input
                                                            className="w-full text-[10px] text-slate-400 font-mono bg-transparent outline-none border-b border-slate-100 focus:border-indigo-500 pr-6"
                                                            value={proj.image}
                                                            onChange={(e) => {
                                                                const newProjects = [...formData.relatedProjects];
                                                                newProjects[i].image = e.target.value;
                                                                setFormData(prev => ({ ...prev, relatedProjects: newProjects }));
                                                            }}
                                                        />
                                                        {proj.image && (
                                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-slate-200 overflow-hidden">
                                                                <img src={proj.image} className="w-full h-full object-cover" alt="" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <label className="shrink-0">
                                                        <div className={`p-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 cursor-pointer ${uploadingId === `rel-${proj.id}` ? 'animate-pulse' : ''}`}>
                                                            {uploadingId === `rel-${proj.id}` ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileUpload(e, `rel-${proj.id}`, (url) => {
                                                                const newProjects = [...formData.relatedProjects];
                                                                newProjects[i].image = url;
                                                                setFormData(prev => ({ ...prev, relatedProjects: newProjects }));
                                                            })}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
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
