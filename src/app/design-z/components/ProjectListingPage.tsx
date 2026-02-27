'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Building, CheckCircle, Clock, Droplets, Mountain, Filter, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLanguage, getLocalizedText } from '../context/LanguageContext';
import { projects } from '../data/projectData';

// FILTER OPTIONS
const locations = ['All', 'Phnom Penh', 'Siem Reap', 'Kandal', 'Sihanoukville'];
const types = [
    'All',
    'Government Office Building',
    'Water Treatment Plant',
    'Slope Construction',
    'Systems'
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
    categories?: string[];
}

export default function ProjectListingPage({
    title,
    subtitle,
    heroTag,
    heroIcon,
    heroImage,
    filterStatus,
    badgeConfig,
    emptyState,
    categories = types
}: ProjectListingPageProps) {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const initialType = searchParams.get('type');
    // Ensure initialType is valid, otherwise default to 'All'
    const validInitialType = initialType && categories.includes(initialType) ? initialType : 'All';

    const [filterLoc, setFilterLoc] = useState('All');
    const [filterType, setFilterType] = useState(validInitialType);

    // Sync state with URL query params
    useEffect(() => {
        const type = searchParams.get('type');
        if (type && categories.includes(type)) {
            setFilterType(type);
        } else if (!type) {
            setFilterType('All');
        }
    }, [searchParams, categories]);

    const filteredProjects = projects.filter(p => {
        return (filterLoc === 'All' || p.location.en === filterLoc) &&
            (filterType === 'All' || p.type.en === filterType) &&
            p.status.en === filterStatus;
    });

    return (
        <div className="bg-white min-h-screen text-titan-navy relative overflow-hidden ">

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-center justify-center overflow-hidden ">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt="Projects Hero"
                        fill
                        className="object-cover opacity-60 scale-105 animate-slow-pan"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20 mt-25">
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
                        className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-5"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </section>

            {/* --- FILTERS --- */}
            <section className="px-6 mb-24 sticky top-20 z-40 transform-gpu">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] flex flex-col xl:flex-row items-center justify-between gap-4 ring-1 ring-black/[0.03]">

                        {/* Type Filter - Left Side */}
                        <div className="flex-1 w-full overflow-hidden">
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 snap-x">
                                {categories.map((type) => {
                                    const isActive = filterType === type;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={`group relative px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-500 whitespace-nowrap snap-start ${isActive
                                                ? 'text-white'
                                                : 'text-titan-navy/50 hover:text-titan-navy bg-white/50'
                                                }`}
                                        >
                                            <div className="relative z-10 flex items-center gap-2.5">
                                                {type === 'All' && <Filter size={12} strokeWidth={isActive ? 3 : 2} />}
                                                {type === 'Water Treatment Plant' && <Droplets size={12} strokeWidth={isActive ? 3 : 2} />}
                                                {type === 'Slope Construction' && <Mountain size={12} strokeWidth={isActive ? 3 : 2} />}
                                                {type === 'Systems' && <Settings size={12} strokeWidth={isActive ? 3 : 2} />}
                                                {type.includes('Building') && <Building size={12} strokeWidth={isActive ? 3 : 2} />}
                                                <span>{type === 'All' ? t('All Portfolio') : t(type)}</span>
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="premiumActiveBg"
                                                    className="absolute inset-0 bg-titan-navy shadow-[0_8_15px_-5px_rgba(0,43,91,0.4)]"
                                                    initial={false}
                                                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Location Filter - Right Side */}
                        <div className="min-w-[260px] p-1">
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none z-10">
                                    <MapPin size={16} className="text-titan-red animate-pulse" />
                                    <div className="w-[1px] h-4 bg-gray-200" />
                                </div>
                                <select
                                    value={filterLoc}
                                    onChange={(e) => setFilterLoc(e.target.value)}
                                    className="w-full appearance-none bg-white/60 pl-16 pr-12 py-3.5 rounded-full text-[13px] font-semibold text-titan-navy cursor-pointer focus:outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-titan-navy/10 border-none transition-all hover:bg-white hover:shadow-md"
                                >
                                    {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? t('All Locations') : t(loc)}</option>)}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-titan-navy/20 group-hover:text-titan-red transition-colors z-10">
                                    <Filter size={14} />
                                </div>
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
                                <Link href={`/design-z/projects/${project.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-titan-navy/0 transition-colors z-10"></div>
                                        <Image
                                            src={project.image}
                                            alt={getLocalizedText(project.title, language)}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Status Badge */}
                                        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-sm ${badgeConfig.className}`}>
                                            {badgeConfig.icon}
                                            {t(badgeConfig.label)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-titan-navy-subtle mb-2">
                                                <span className="text-titan-red">{getLocalizedText(project.location, language)}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span className="truncate">{getLocalizedText(project.type, language)}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-titan-navy leading-tight group-hover:text-titan-red transition-colors">
                                                {getLocalizedText(project.title, language)}
                                            </h3>
                                        </div>
                                        <p className="text-titan-navy-subtle text-sm leading-relaxed mb-8 line-clamp-3">
                                            {getLocalizedText(project.summary, language)}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">
                                            {t('View Case Study')}
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
