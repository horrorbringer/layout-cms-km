'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Building, CheckCircle, Clock, Droplets, Mountain, Filter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { projects } from '../data/projectData';

// FILTER OPTIONS
const locations = ['All', 'Phnom Penh', 'Siem Reap', 'Kandal', 'Sihanoukville'];
const types = [
    'All',
    'Government Office Building',
    'Public Service Building',
    'Private Building',
    'Water Treatment Plant',
    'Slope Construction'
];

interface ProjectListingPageProps {
    title: React.ReactNode;
    subtitle: string;
    heroTag: string;
    heroIcon: React.ReactNode;
    heroImage: string; // New prop for the background image
    filterStatus: 'Completed' | 'Under Construction';
    badgeConfig: {
        className: string;
        icon: React.ReactNode;
        label: string;
    };
    emptyState: {
        title: string;
        message: string;
    };
}

export default function ProjectListingPage({
    title,
    subtitle,
    heroTag,
    heroIcon,
    heroImage,
    filterStatus,
    badgeConfig,
    emptyState
}: ProjectListingPageProps) {
    const searchParams = useSearchParams();
    const initialType = searchParams.get('type');
    // Ensure initialType is valid, otherwise default to 'All'
    const validInitialType = initialType && types.includes(initialType) ? initialType : 'All';

    const [filterLoc, setFilterLoc] = useState('All');
    const [filterType, setFilterType] = useState(validInitialType);

    const filteredProjects = projects.filter(p => {
        return (filterLoc === 'All' || p.location === filterLoc) &&
            (filterType === 'All' || p.type === filterType) &&
            p.status === filterStatus;
    });

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative overflow-hidden">
            
            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src={heroImage} 
                        alt="Projects Hero" 
                        className="w-full h-full object-cover opacity-30 scale-105 animate-slow-pan"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/90"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
                    >
                        {heroIcon}
                        {heroTag}
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 text-white"
                    >
                        {title}
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </section>

            {/* --- FILTERS --- */}
            <section className="px-6 mb-16 border-b border-gray-100 py-6 sticky top-20 bg-white/95 backdrop-blur-md z-40 transition-all shadow-sm -mt-10 mx-6 rounded-xl relative">
                <div className="max-w-[1400px] mx-auto flex flex-col items-center gap-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* Location */}
                        <div className="relative group">
                            <select
                                value={filterLoc}
                                onChange={(e) => setFilterLoc(e.target.value)}
                                className="appearance-none bg-titan-bg pl-10 pr-12 py-3 rounded-lg text-sm font-bold text-titan-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-titan-red/20 border border-transparent hover:border-gray-200 transition-all shadow-sm min-w-[180px]"
                            >
                                {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
                            </select>
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-titan-red pointer-events-none" />
                        </div>

                        {/* Type */}
                        <div className="relative group">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="appearance-none bg-titan-bg pl-10 pr-12 py-3 rounded-lg text-sm font-bold text-titan-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-titan-red/20 border border-transparent hover:border-gray-200 transition-all shadow-sm min-w-[220px]"
                            >
                                {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                            </select>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-titan-red pointer-events-none">
                                {filterType === 'Water Treatment Plant' ? <Droplets size={16} /> :
                                    filterType === 'Slope Construction' ? <Mountain size={16} /> :
                                        <Building size={16} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GRID --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                key={project.id}
                            >
                                <Link href={`/design-x/projects/${project.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-titan-navy/0 transition-colors z-10"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Status Badge */}
                                        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-sm ${badgeConfig.className}`}>
                                            {badgeConfig.icon}
                                            {badgeConfig.label}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-titan-navy-subtle mb-2">
                                                <span className="text-titan-red">{project.location}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span className="truncate">{project.type}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-titan-navy leading-tight group-hover:text-titan-red transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-titan-navy-subtle text-sm leading-relaxed mb-8 line-clamp-3">
                                            {project.summary}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">
                                            View Case Study
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-titan-bg rounded-2xl border border-dashed border-gray-300"
                    >
                        <Building size={48} className="text-titan-navy/20 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-titan-navy">{emptyState.title}</h3>
                        <p className="text-titan-navy-subtle">{emptyState.message}</p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
