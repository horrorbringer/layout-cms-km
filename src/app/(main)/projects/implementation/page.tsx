'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HardHat, ArrowRight, Menu, X, Facebook, Linkedin, Youtube,
    MapPin, Building, Droplets, Mountain, Filter, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { projects } from '../../../design-x/data/projectData';
import MenuOverlay from '@/components/design-a/MenuOverlay';

const locations = ['All', 'Phnom Penh', 'Siem Reap', 'Kandal', 'Sihanoukville'];
const types = [
    'All',
    'Government Office Building',
    'Public Service Building',
    'Private Building',
    'Water Treatment Plant',
    'Slope Construction'
];

interface ProjectListingProps {
    title: React.ReactNode;
    subtitle: string;
    heroTag: string;
    heroIcon: React.ReactNode;
    heroImage: string;
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

function ProjectListingContent({
    title, subtitle, heroTag, heroIcon, heroImage, filterStatus, badgeConfig, emptyState
}: ProjectListingProps) {
    const searchParams = useSearchParams();
    const initialType = searchParams.get('type');
    const validInitialType = initialType && types.includes(initialType) ? initialType : 'All';

    const [filterLoc, setFilterLoc] = useState('All');
    const [filterType, setFilterType] = useState(validInitialType);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProjects = projects.filter((p: any) => {
        return (filterLoc === 'All' || p.location === filterLoc) &&
            (filterType === 'All' || p.type === filterType) &&
            p.status === filterStatus;
    });

    const navItems = [
        {
            label: 'About Us', href: '/about',
            children: [
                { label: 'Company Profile', href: '/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/services',
            children: [
                { label: 'Design & Build', href: '/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/projects',
            children: [
                {
                    label: 'Done Projects',
                    href: '/projects/completed',
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                {
                    label: 'Implement Projects',
                    href: '/projects/implementation',
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/news',
            children: [
                { label: 'News & Updates', href: '/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">

                {/* --- NAVIGATION --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        <Link href="/" className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="bg-titan-navy text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-titan-red transition-all shadow-lg flex items-center gap-3 pointer-events-auto group"
                        >
                            <span className="hidden md:inline group-hover:-translate-x-1 transition-transform">Menu</span>
                            <div className="flex flex-col gap-1.5 items-end">
                                <span className="w-6 h-0.5 bg-white group-hover:w-4 transition-all"></span>
                                <span className="w-4 h-0.5 bg-white group-hover:w-6 transition-all"></span>
                            </div>
                        </button>
                    </div>
                </div>

                <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

                {/* --- HERO --- */}
                <header className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-titan-navy rounded-b-[4rem]">
                    <div className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt="Projects Hero"
                            className="w-full h-full object-cover opacity-40 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/90 via-titan-navy/40 to-titan-navy"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center max-w-4xl px-6 pt-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest text-white mb-8 border border-white/20">
                            {heroIcon} {heroTag}
                        </div>

                        <div className="text-white">
                            {title}
                        </div>

                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mt-6">
                            {subtitle}
                        </p>
                    </motion.div>
                </header>

                {/* --- FILTERS & CONTENT --- */}
                <section className="px-6 md:px-12 py-12 md:py-20">
                    {/* Filter Bar */}
                    <div className="sticky top-24 z-30 mb-16 max-w-[1400px] mx-auto">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-wrap gap-4 justify-center md:justify-between items-center">
                            <div className="flex items-center gap-2 text-sm font-bold text-titan-navy px-2">
                                <Filter size={18} className="text-titan-red" />
                                Filter Projects
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                {/* Location */}
                                <div className="relative group">
                                    <select
                                        value={filterLoc}
                                        onChange={(e) => setFilterLoc(e.target.value)}
                                        className="appearance-none bg-[#F5F5F7] hover:bg-white pl-10 pr-12 py-3 rounded-xl text-sm font-bold text-titan-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-titan-red/20 border border-transparent hover:border-gray-200 transition-all min-w-[180px]"
                                    >
                                        {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
                                    </select>
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-titan-navy/50 pointer-events-none" />
                                </div>

                                {/* Type */}
                                <div className="relative group">
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="appearance-none bg-[#F5F5F7] hover:bg-white pl-10 pr-12 py-3 rounded-xl text-sm font-bold text-titan-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-titan-red/20 border border-transparent hover:border-gray-200 transition-all min-w-[220px]"
                                    >
                                        {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                                    </select>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-titan-navy/50 pointer-events-none">
                                        {filterType === 'Water Treatment Plant' ? <Droplets size={16} /> :
                                            filterType === 'Slope Construction' ? <Mountain size={16} /> :
                                                <Building size={16} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="max-w-[1400px] mx-auto">
                        <AnimatePresence mode='wait'>
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                                >
                                    {filteredProjects.map((project: any, index: number) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                            key={project.id}
                                        >
                                            <Link href={`/projects/${project.id}`} className="group block bg-[#F5F5F7] rounded-[2rem] overflow-hidden hover:bg-titan-navy hover:text-white transition-all duration-500 h-full flex flex-col">
                                                {/* Image */}
                                                <div className="aspect-[4/3] relative overflow-hidden m-2 rounded-[1.5rem]">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 backdrop-blur-md shadow-sm ${badgeConfig.className}`}>
                                                        {badgeConfig.icon}
                                                        {badgeConfig.label}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-8 flex-1 flex flex-col">
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-titan-navy/50 group-hover:text-white/50 mb-3 transition-colors">
                                                            <span className="text-titan-red">{project.location}</span>
                                                            <span className="w-1 h-1 bg-current rounded-full"></span>
                                                            <span className="truncate">{project.type}</span>
                                                        </div>
                                                        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-titan-navy/60 group-hover:text-white/60 text-sm leading-relaxed mb-8 line-clamp-3 transition-colors">
                                                        {project.summary}
                                                    </p>

                                                    <div className="mt-auto pt-6 border-t border-titan-navy/5 group-hover:border-white/10 flex justify-between items-center text-xs font-bold uppercase tracking-widest transition-colors">
                                                        View Case Study
                                                        <div className="w-8 h-8 rounded-full bg-white text-titan-navy flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                            <ArrowRight size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 bg-[#F5F5F7] rounded-[3rem] border-2 border-dashed border-gray-200"
                                >
                                    <Building size={64} className="text-titan-navy/20 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-titan-navy mb-2">{emptyState.title}</h3>
                                    <p className="text-titan-navy/50">{emptyState.message}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="pt-20 pb-12 px-6 md:px-12 bg-white rounded-t-[3rem] mt-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                                KIMMEX
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20 text-center">
                                    Start Project
                                </Link>
                                <Link href="/projects" className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-center">
                                    View Projects
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-sm text-gray-500">
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Office</h4>
                                <p>Kim Mex Tower, L5</p>
                                <p>St. 590, Phnom Penh</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Connect</h4>
                                <p>+855 23 999 999</p>
                                <p>info@kimmex.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <p>© 2026 Kimmex Construction</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-titan-navy">Privacy</a>
                            <a href="#" className="hover:text-titan-navy">Terms</a>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default function ImplementationProjectsDesignAPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <ProjectListingContent
                title={<h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                    On <span className="text-titan-red">Progress.</span>
                </h1>}
                subtitle="Witness the future being built today. Explore our ongoing developments across the nation."
                heroTag="Current Works"
                heroIcon={<HardHat size={14} className="text-titan-red" />}
                heroImage="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2800"
                filterStatus="Under Construction"
                badgeConfig={{
                    className: "bg-white/90 text-orange-600",
                    icon: <HardHat size={12} />,
                    label: "In Progress"
                }}
                emptyState={{
                    title: "No active projects found",
                    message: "Try adjusting your filters to see more results."
                }}
            />
        </Suspense>
    );
}
