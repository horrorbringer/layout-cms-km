'use client';

import React, { useState } from 'react';
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
    Grid,
    List,
    CheckSquare
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '@/app/design-z/context/LanguageContext';
import { projects as staticProjects } from '@/app/design-z/data/projectData';
import { projectDetails as staticProjectDetails } from '@/app/design-z/data/projectDetailData';
import { useToast } from '@/app/admin/_context/ToastContext';
import { useConfirm } from '@/app/admin/_context/ConfirmContext';

export default function ProjectListView({
    initialProjects
}: {
    initialProjects: any[]
}) {
    const { t } = useLanguage();
    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    // Dynamically derive categories from the DB fetch payload
    const categories = ['All', ...new Set(projects.map(p => p.type.en))];

    const filteredProjects = projects.filter(p => {
        const searchLower = searchTerm.toLowerCase();
        const titleEn = p.title.en?.toLowerCase() || '';
        const titleKh = p.title.kh?.toLowerCase() || '';
        const locEn = p.location.en?.toLowerCase() || '';
        const locKh = p.location.kh?.toLowerCase() || '';

        const matchesSearch = titleEn.includes(searchLower) ||
            titleKh.includes(searchLower) ||
            locEn.includes(searchLower) ||
            locKh.includes(searchLower);

        const typeEn = p.type.en;
        const matchesCategory = selectedCategory === 'All' || typeEn === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = async (id: string, title: string) => {
        const isConfirmed = await confirm({
            title: t('Delete Project'),
            message: `${t('Are you sure you want to delete')} ${title}? ${t('This entry will be removed from both database and static data.')}`,
            confirmText: t('Delete'),
            type: 'danger'
        });

        if (isConfirmed) {
            // Optimistic UI update
            const oldProjects = projects;
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);

            try {
                // Delete from DB strictly first
                const res = await fetch('/api/cms/projects/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                if (!res.ok) throw new Error('Failed to delete project from Postgres via Prisma');

                // Check static files and delete if it's there
                if (staticProjects.some(p => p.id === id)) {
                    const newStaticProjects = staticProjects.filter(p => p.id !== id);
                    await fetch('/api/cms/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fileName: 'projectData.ts', data: newStaticProjects })
                    });
                }

                if (staticProjectDetails[id]) {
                    const newDetailsMap = { ...staticProjectDetails };
                    delete newDetailsMap[id];
                    await fetch('/api/cms/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fileName: 'projectDetailData.ts', data: newDetailsMap })
                    });
                }

                showToast(t('Project deleted successfully'), 'success');

            } catch (error) {
                console.error('Error deleting project:', error);
                showToast(t('Failed to save deletion. Reverting changes.'), 'error');
                setProjects(oldProjects); // Revert UI
            }
        }
    };

    // Helper safely resolving nested i18n
    const getLanguageString = (obj: any, language: 'en' | 'kh') => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj.en || '';
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedProjects(filteredProjects.map(p => p.id));
        } else {
            setSelectedProjects([]);
        }
    };

    const handleSelectProject = (id: string) => {
        setSelectedProjects(prev =>
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        const isConfirmed = await confirm({
            title: t('Delete Multiple Projects'),
            message: `${t('Are you sure you want to delete')} ${selectedProjects.length} ${t('projects')}?`,
            confirmText: t('Delete All'),
            type: 'danger'
        });

        if (isConfirmed) {
            const oldProjects = projects;
            const updatedProjects = projects.filter(p => !selectedProjects.includes(p.id));
            setProjects(updatedProjects);

            try {
                // In a real scenario, you'd send an array of IDs to a bulk delete endpoint.
                // For simplicity here, calling delete repeatedly or using a loop.
                for (const id of selectedProjects) {
                    await fetch('/api/cms/projects/delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id }),
                    });
                }

                // Static file batch removal
                let staticNeedsUpdate = false;
                let newStaticProjects = [...staticProjects];
                const newDetailsMap = { ...staticProjectDetails };

                for (const id of selectedProjects) {
                    if (newStaticProjects.some(p => p.id === id)) {
                        newStaticProjects = newStaticProjects.filter(p => p.id !== id);
                        staticNeedsUpdate = true;
                    }
                    if (newDetailsMap[id]) {
                        delete newDetailsMap[id];
                        staticNeedsUpdate = true;
                    }
                }

                if (staticNeedsUpdate) {
                    await fetch('/api/cms/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fileName: 'projectData.ts', data: newStaticProjects })
                    });
                    await fetch('/api/cms/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fileName: 'projectDetailData.ts', data: newDetailsMap })
                    });
                }

                setSelectedProjects([]);
                showToast(t('Multiple projects deleted successfully'), 'success');
            } catch (error) {
                console.error('Error bulk deleting projects:', error);
                showToast(t('Failed to delete some projects. Reverting changes.'), 'error');
                setProjects(oldProjects); // Revert UI
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
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
                <div className="flex flex-col md:flex-row flex-1 md:items-center gap-4 w-full">
                    <div className="relative flex-1 max-w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder={t('Search projects...')}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
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
                                {cat === 'All' ? t('All') : t(cat as string || 'Other')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 xl:border-l xl:border-slate-200 xl:pl-4 pt-2 xl:pt-0 border-t border-slate-100 xl:border-t-0 justify-end mt-2 xl:mt-0">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {selectedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2 text-indigo-700 text-sm font-semibold">
                            <CheckSquare size={16} />
                            {selectedProjects.length} {t('projects selected')}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white text-red-600 border border-red-200 rounded-md text-xs font-bold hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={14} />
                                {t('Delete Selected')}
                            </button>
                            <button
                                onClick={() => setSelectedProjects([])}
                                className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2"
                            >
                                {t('Cancel')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project List/Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                key={project.id}
                                className={`bg-white rounded-xl border ${selectedProjects.includes(project.id) ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'} shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 relative`}
                            >
                                <div className="absolute top-3 left-3 z-10 flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedProjects.includes(project.id)}
                                        onChange={() => handleSelectProject(project.id)}
                                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm"
                                    />
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20 backdrop-blur-md ${(getLanguageString(project.status, 'en') === 'COMPLETED') ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                                        }`}>
                                        {getLanguageString(project.status, 'en')}
                                    </span>
                                </div>
                                <div className="aspect-video relative overflow-hidden bg-slate-100">
                                    <Image
                                        src={project.image}
                                        alt={getLanguageString(project.title, 'en')}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
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
                                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{t(getLanguageString(project.type, 'en') || 'Other')}</p>
                                            <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                                {getLanguageString(project.title, 'en')}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-slate-400 mt-2">
                                                <MapPin size={12} />
                                                <span className="text-[11px] font-semibold truncate">{getLanguageString(project.location, 'en')}</span>
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
                                            onClick={() => handleDelete(project.id, getLanguageString(project.title, 'en') || '')}
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
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[800px]">
                            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                                <tr>
                                    <th className="px-6 py-4 w-12">
                                        <input
                                            type="checkbox"
                                            checked={filteredProjects.length > 0 && selectedProjects.length === filteredProjects.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        />
                                    </th>
                                    <th className="px-6 py-4">{t('Project')}</th>
                                    <th className="px-6 py-4">{t('Category')}</th>
                                    <th className="px-6 py-4">{t('Location')}</th>
                                    <th className="px-6 py-4">{t('Status')}</th>
                                    <th className="px-6 py-4 text-right">{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredProjects.map(project => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={project.id}
                                            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${selectedProjects.includes(project.id) ? 'bg-indigo-50/50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProjects.includes(project.id)}
                                                    onChange={() => handleSelectProject(project.id)}
                                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-10 relative rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                                                        <Image src={project.image} alt="" fill sizes="48px" className="object-cover" />
                                                    </div>
                                                    <div className="font-bold text-slate-900">{getLanguageString(project.title, 'en')}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {t(getLanguageString(project.type, 'en') || 'Other')}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {getLanguageString(project.location, 'en')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${(getLanguageString(project.status, 'en') === 'COMPLETED') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {getLanguageString(project.status, 'en')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-3 text-slate-400">
                                                    <Link href={`/admin/projects/${project.id}`} className="hover:text-indigo-600 transition-colors">
                                                        <Edit2 size={16} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(project.id, getLanguageString(project.title, 'en') || '')} className="hover:text-red-500 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

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
