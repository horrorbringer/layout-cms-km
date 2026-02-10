'use client';

import React, { useState } from 'react';
import { projects as initialProjects } from '@/app/design-z/data/projectData';
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

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(projects.map(p => p.type))];

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete ${title}?`)) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Project Portfolio</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage architectural assets and infrastructure projects.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Project
                </Link>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search projects..."
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
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                        >
                            {cat}
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
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20 backdrop-blur-md ${project.status === 'Completed' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                                        }`}>
                                        {project.status}
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
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{project.type}</p>
                                        <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-slate-400 mt-2">
                                            <MapPin size={12} />
                                            <span className="text-[11px] font-semibold truncate">{project.location}</span>
                                        </div>
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-600 p-1">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50">
                                    <button className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
                                        <ExternalLink size={14} />
                                        View Live
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id, project.title)}
                                        className="text-[11px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                        Remove
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
                    <p className="text-lg font-bold text-slate-900">No projects found.</p>
                    <p className="text-sm text-slate-500 mt-1">Adjust your filters or search terms.</p>
                </div>
            )}
        </div>
    );
}
