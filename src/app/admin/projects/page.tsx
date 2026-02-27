'use client';

import React, { useState } from 'react';
import { projects as initialProjects } from '@/app/design-z/data/projectData';
import { projectDetails } from '@/app/design-z/data/projectDetailData';
import Link from 'next/link';
import {
    Search,
    Filter,
    Plus,
    Edit2,
    Trash2,
    ExternalLink,
    MoreVertical,
    MapPin,
    Tag,
    Clock,
    Briefcase,
    Eye
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage, getLocalizedText } from '@/app/design-z/context/LanguageContext';

export default function ProjectsAdmin() {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(projects.map(p => getLocalizedText(p.type, 'en')))];

    const filteredProjects = projects.filter(p => {
        const searchLower = searchTerm.toLowerCase();
        const titleEn = getLocalizedText(p.title, 'en')?.toLowerCase() || '';
        const titleKh = getLocalizedText(p.title, 'kh')?.toLowerCase() || '';
        const locEn = getLocalizedText(p.location, 'en')?.toLowerCase() || '';
        const locKh = getLocalizedText(p.location, 'kh')?.toLowerCase() || '';

        const matchesSearch = titleEn.includes(searchLower) ||
            titleKh.includes(searchLower) ||
            locEn.includes(searchLower) ||
            locKh.includes(searchLower);

        const typeEn = getLocalizedText(p.type, 'en');
        const matchesCategory = selectedCategory === 'All' || typeEn === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`${t('Are you sure you want to delete')} ${title}?`)) {
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);

            const updatedDetails = { ...projectDetails };
            delete updatedDetails[id];

            try {
                const res1 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'projectData.ts', data: updatedProjects }),
                });

                if (!res1.ok) throw new Error('Failed to save projectData deletion');

                const res2 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'projectDetailData.ts', data: updatedDetails }),
                });

                if (!res2.ok) throw new Error('Failed to save projectDetailData deletion');
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to save deletion. Reverting changes.');
                setProjects(projects); // Revert UI
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('Project Portfolio')}</h1>
                    <p className="text-sm text-slate-500 mt-1">{t('Manage architectural assets and infrastructure projects.')}</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    {t('Add Project')}
                </Link>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder={t('Search projects...')}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat || 'Other')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                        >
                            {cat === 'All' ? t('All') : t(cat || 'Other')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project List/Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            key={project.id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:border-slate-300 hover:shadow-md transition-all duration-300"
                        >
                            <div className="aspect-video relative overflow-hidden bg-slate-100">
                                <Image
                                    src={project.image}
                                    alt={getLocalizedText(project.title, language) || ''}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20 backdrop-blur-md ${(getLocalizedText(project.status, 'en') === 'Completed' || getLocalizedText(project.status, 'kh') === 'បានបញ្ចប់') ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                                        }`}>
                                        {getLocalizedText(project.status, language)}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="w-8 h-8 bg-white border border-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 flex items-center justify-center shadow-lg transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{t(getLocalizedText(project.type, 'en') || 'Other')}</p>
                                        <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                            {getLocalizedText(project.title, language)}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-slate-400 mt-2">
                                            <MapPin size={12} />
                                            <span className="text-[11px] font-semibold truncate">{getLocalizedText(project.location, language)}</span>
                                        </div>
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-600 p-1">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50">
                                    <button className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
                                        <ExternalLink size={14} />
                                        {t('View Live')}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id, getLocalizedText(project.title, language) || '')}
                                        className="text-[11px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                        {t('Remove')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div className="bg-white rounded-xl border border-dashed border-slate-200 p-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                        <Search size={32} />
                    </div>
                    <p className="text-lg font-bold text-slate-900">{t('No projects found.')}</p>
                    <p className="text-sm text-slate-500 mt-1">{t('Adjust your filters or search terms.')}</p>
                </div>
            )}
        </div>
    );
}
