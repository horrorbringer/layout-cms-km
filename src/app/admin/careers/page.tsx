'use client';

import React, { useState } from 'react';
import { allJobs as initialJobs, Job } from '@/app/design-z/data/careerData';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    X,
    Briefcase,
    MapPin,
    DollarSign,
    Award,
    Calendar,
    Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareersAdmin() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    // Form State
    const emptyLocalized = () => ({ en: '', kh: '' });

    const defaultFormData: Job = {
        id: 0,
        title: emptyLocalized(),
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: [],
        salary: '',
        experience: '',
        postedDate: { en: 'Just now', kh: 'ទើបតែឥឡូវនេះ' },
        summary: emptyLocalized(),
        responsibilities: [],
        requirements: [],
        benefits: []
    };

    const [formData, setFormData] = useState<Job>(defaultFormData);

    const filteredJobs = jobs.filter(j =>
        (j.title.en?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (j.title.kh?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        j.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (item?: Job) => {
        if (item) {
            setEditingJob(item);
            setFormData(item);
        } else {
            setEditingJob(null);
            setFormData({ ...defaultFormData, id: Date.now() });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        let newJobsList;
        if (editingJob) {
            newJobsList = jobs.map(j => j.id === editingJob.id ? formData : j);
        } else {
            newJobsList = [formData, ...jobs];
        }

        setJobs(newJobsList);
        setIsModalOpen(false);

        // Persistent save
        try {
            const res = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: newJobsList,
                    fileName: 'careerData.ts'
                })
            });
            if (!res.ok) throw new Error('Failed to save');
            alert('Careers updated successfully!');
        } catch (error) {
            console.error('Failed to persist career changes:', error);
            alert('Error saving changes.');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm(`Are you sure you want to delete this job opening?`)) {
            const newJobsList = jobs.filter(j => j.id !== id);
            setJobs(newJobsList);

            // Persistent save
            try {
                await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: newJobsList,
                        fileName: 'careerData.ts'
                    })
                });
            } catch (error) {
                console.error('Failed to persist career deletion:', error);
            }
        }
    };

    const updateLocalized = (field: 'title' | 'postedDate', lang: 'en' | 'kh', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...((prev[field] as Record<string, string>) || {}),
                [lang]: value
            }
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Career Opportunities</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage job openings, departments, and hiring statuses.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Post New Job
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search roles or departments..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <Briefcase size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{jobs.length} Active Roles</span>
                </div>
            </div>

            {/* Job List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredJobs.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={item.id}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-center gap-6"
                        >
                            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                <Briefcase size={24} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900 truncate">{item.title.en || 'Untitled Role'}</h3>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                                        {item.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-medium text-indigo-600">{item.dept}</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12} /> {item.loc}</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1"><DollarSign size={12} /> {item.salary}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Posted On</div>
                                    <div className="text-xs font-semibold text-slate-600">{item.postedDate.en}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <h2 className="text-xl font-bold text-slate-900">{editingJob ? 'Edit Job Posting' : 'New Job Posting'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                <form id="job-form" onSubmit={handleSave} className="space-y-8">

                                    {/* Primary Settings */}
                                    <div className="grid grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <div className="space-y-1.5 col-span-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
                                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white font-medium" value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })}>
                                                <option>Engineering</option>
                                                <option>Operations</option>
                                                <option>Design</option>
                                                <option>Supply Chain</option>
                                                <option>Quality & Safety</option>
                                                <option>HR & Admin</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Employment Type</label>
                                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white font-medium" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                                <option>Full-time</option>
                                                <option>Contract</option>
                                                <option>Part-time</option>
                                                <option>Internship</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                                            <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-medium" value={formData.loc} onChange={e => setFormData({ ...formData, loc: e.target.value })} />
                                        </div>
                                    </div>

                                    {/* Titles */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">EN</span>
                                                    English Title
                                                </h3>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-medium" value={formData.title.en} onChange={e => updateLocalized('title', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">KH</span>
                                                    Khmer Title
                                                </h3>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-siemreap" value={formData.title.kh} onChange={e => updateLocalized('title', 'kh', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Requirements & Compensation */}
                                    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Salary Range</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                                <input className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. $1,500 - $2,500" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Experience</label>
                                            <div className="relative">
                                                <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                                <input className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. 3-5 Years" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meta info */}
                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-900">Post Metadata</h3>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500">Relative Posted Date (EN)</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. 2 days ago" value={formData.postedDate.en} onChange={e => updateLocalized('postedDate', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500">Relative Posted Date (KH)</label>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-siemreap" placeholder="e.g. ២ ថ្ងៃមុន" value={formData.postedDate.kh} onChange={e => updateLocalized('postedDate', 'kh', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50 rounded-b-2xl">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" form="job-form" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">Post Job</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
