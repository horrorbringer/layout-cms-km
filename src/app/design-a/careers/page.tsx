'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, MapPin, Briefcase, Clock, Search, Filter, 
    ChevronDown, Users, Globe, Award, Upload, Send, Check, 
    Menu, X, Facebook, Linkedin, Youtube
} from 'lucide-react';
import Link from 'next/link';

// --- SHARED COMPONENTS ---

const MenuOverlay = ({ isOpen, onClose, navItems }: { isOpen: boolean, onClose: () => void, navItems: any[] }) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-[#1a1a2e] text-white flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-8 md:p-12 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-titan-red rounded-full flex items-center justify-center font-bold text-white">K</div>
                            <span className="font-bold text-xl tracking-tight">KIMMEX</span>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-4 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                        >
                            Close <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Left: Main Navigation List */}
                        <div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 overflow-y-auto border-r border-white/10 flex flex-col justify-center">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item, i) => (
                                    <div key={i}>
                                        <motion.div 
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group"
                                            onMouseEnter={() => {
                                                if (item.children) {
                                                    setActiveCategory(i);
                                                    setActiveSubCategory(null);
                                                } else {
                                                    setActiveCategory(null);
                                                }
                                            }}
                                        >
                                            {item.children ? (
                                                <button 
                                                    onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                                                    className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left flex items-center justify-between py-2 ${activeCategory === i ? 'text-titan-red translate-x-4' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    {item.label}
                                                    {item.children && (
                                                        <div className="md:hidden">...</div>
                                                    )}
                                                    <ArrowRight size={32} className={`hidden md:block transition-all duration-300 ${activeCategory === i ? 'opacity-100 translate-x-0 text-titan-red' : 'opacity-0 -translate-x-4'}`} />
                                                </button>
                                            ) : (
                                                <Link 
                                                    href={item.href}
                                                    className="text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left block py-2 text-white/40 hover:text-white hover:translate-x-4"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </motion.div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Sub-navigation & Details (Desktop Only) */}
                        <div className="hidden md:flex w-1/2 lg:w-7/12 p-12 flex-col bg-white/5 relative overflow-hidden">
                            <motion.div 
                                animate={{ 
                                    background: activeCategory !== null ? `radial-gradient(circle at ${activeCategory * 10}% 50%, rgba(255, 107, 0, 0.15), transparent 60%)` : 'none'
                                }}
                                className="absolute inset-0 pointer-events-none transition-all duration-700"
                            ></motion.div>

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {activeCategory !== null && navItems[activeCategory].children ? (
                                        <motion.div
                                            key={activeCategory}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full flex flex-col justify-center"
                                        >
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-12 border-b border-white/10 pb-4">
                                                Explore {navItems[activeCategory].label}
                                            </h3>
                                            
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                                {navItems[activeCategory].children.map((child: any, idx: number) => (
                                                    <div 
                                                        key={idx} 
                                                        className="group/item relative"
                                                        onMouseEnter={() => child.children && setActiveSubCategory(idx)}
                                                        onMouseLeave={() => child.children && setActiveSubCategory(null)}
                                                    >
                                                        <Link href={child.href} className="block relative">
                                                            <div className="absolute -left-4 top-1 w-0.5 h-0 bg-titan-red transition-all duration-300 group-hover/item:h-full"></div>
                                                            <h4 className="text-2xl font-bold mb-2 text-white group-hover/item:text-titan-red transition-colors flex items-center gap-3">
                                                                {child.label} 
                                                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-titan-red" />
                                                            </h4>
                                                            <p className="text-white/40 text-sm leading-relaxed max-w-xs group-hover/item:text-white/60 transition-colors">
                                                                {child.desc || "Learn more about our capabilities."}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex flex-col justify-center items-center text-white/20">
                                            <div className="text-6xl mb-4 font-thin opacity-20">{activeCategory !== null ? '0' + (activeCategory + 1) : '00'}</div>
                                            <div className="text-xl font-medium">Direct Link</div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-10 border-t border-white/10 pt-8 mt-auto grid grid-cols-3 gap-8 text-white/60">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Call</div>
                                    <div>+855 23 999 999</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Email</div>
                                    <div>info@kimmex.com.kh</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Visit</div>
                                    <div>Kim Mex Tower, PP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:px-12 md:py-6 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest shrink-0 bg-[#151525]">
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Facebook size={16}/> <span className="hidden md:inline">Facebook</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> <span className="hidden md:inline">LinkedIn</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Youtube size={16}/> <span className="hidden md:inline">Youtube</span></a>
                        </div>
                        <div>© 2026 Kimmex</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- DATA & HELPER COMPONENTS ---

const allJobs = [
    {
        id: 1,
        title: 'Senior Civil Engineer',
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Construction', 'Planning']
    },
    {
        id: 2,
        title: 'Site Manager',
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        tags: ['Management', 'On-site']
    },
    {
        id: 3,
        title: 'Architectural Designer',
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Creativity', 'CAD']
    },
    {
        id: 4,
        title: 'Procurement Officer',
        dept: 'Supply Chain',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Logistics', 'Finance']
    },
    {
        id: 5,
        title: 'Safety Inspector (HSE)',
        dept: 'Quality & Safety',
        loc: 'Kampot',
        type: 'Full-time',
        tags: ['Safety', 'Inspection']
    },
    {
        id: 6,
        title: 'MEP Engineer',
        dept: 'Engineering',
        loc: 'Siem Reap',
        type: 'Full-time',
        tags: ['Electrical', 'Mechanical']
    }
];

const CustomDropdown = ({ options, value, onChange, icon: Icon }: { options: string[], value: string, onChange: (val: string) => void, icon?: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`flex items-center gap-3 bg-[#F5F5F7] hover:bg-white border ${isOpen ? 'border-titan-red ring-2 ring-titan-red/10' : 'border-transparent'} px-6 py-4 rounded-xl text-sm font-bold text-titan-navy min-w-[220px] justify-between transition-all shadow-sm`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={16} className="text-titan-red" />}
                    <span>{value}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 py-2 origin-top"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
                            >
                                {opt}
                                {value === opt && <Check size={14} className="text-titan-red" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function CareersPageDesignA() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [filterDept, setFilterDept] = useState('All Departments');
    const [filterLoc, setFilterLoc] = useState('All Locations');
    const [searchQuery, setSearchQuery] = useState('');
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredJobs = allJobs.filter(job => {
        if (filterDept !== 'All Departments' && job.dept !== filterDept) return false;
        if (filterLoc !== 'All Locations' && job.loc !== filterLoc) return false;
        if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const categories = ['All Departments', 'Engineering', 'Operations', 'Design', 'Supply Chain', 'Quality & Safety'];
    const locations = ['All Locations', 'Phnom Penh', 'Sihanoukville', 'Kampot', 'Siem Reap'];

    const navItems = [
        {
            label: 'About Us', href: '/design-a/about',
            children: [
                { label: 'Company Profile', href: '/design-a/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/design-a/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/design-a/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/design-a/services',
            children: [
                { label: 'Design & Build', href: '/design-a/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/design-a/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/design-a/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/design-a/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/design-a/projects/completed',
            children: [
                { 
                    label: 'Done Projects', 
                    href: '/design-a/projects/completed', 
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/design-a/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/design-a/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/design-a/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/design-a/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/design-a/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                { 
                    label: 'Implement Projects', 
                    href: '/design-a/projects/implementation', 
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/design-a/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/design-a/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/design-a/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/design-a/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/design-a/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/design-a/news',
            children: [
                { label: 'News & Updates', href: '/design-a/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/design-a/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/design-a/careers' },
        { label: 'Contact', href: '/design-a/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            
            {/* --- MAIN CONTAINER --- */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">
                
                {/* --- NAVIGATION --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        {/* Logo */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger */}
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
                <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy rounded-b-[4rem]">
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
                            alt="Careers Hero" 
                            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-pan"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/90 via-titan-navy/50 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy to-transparent opacity-80"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-titan-red animate-pulse"></span>
                                We are Hiring
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                                Build <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Your Legacy.</span>
                            </h1>
                            <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10 border-l-4 border-titan-red pl-6">
                                Join a team of visionaries. At Kimmex, we don't just construct buildings; we shape the skyline and engineering future of Cambodia.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-titan-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20"
                                >
                                    View Openings
                                </button>
                                <button 
                                    onClick={() => setIsApplyOpen(true)}
                                    className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-titan-navy transition-all backdrop-blur-sm"
                                >
                                    Apply General
                                </button>
                            </div>
                        </motion.div>

                        {/* Hero Stats/Visuals */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="hidden lg:grid grid-cols-2 gap-4"
                        >
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 translate-y-8">
                                <h3 className="text-4xl font-black text-white mb-2">500+</h3>
                                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Team Members</p>
                            </div>
                            <div className="bg-titan-red p-8 rounded-[2rem] shadow-2xl shadow-titan-red/20">
                                <h3 className="text-4xl font-black text-white mb-2">30+</h3>
                                <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Active Projects</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-xl col-span-2 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-titan-navy mb-1">Top Employer</h3>
                                    <p className="text-titan-navy/50 text-xs font-bold uppercase tracking-widest">Awarded 2024 - 2025</p>
                                </div>
                                <Award size={48} className="text-titan-red" />
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* --- WHY JOIN US --- */}
                <section className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
                    <div className="text-center mb-16">
                         <h2 className="text-4xl font-black text-titan-navy mb-4">Why Choose Kimmex?</h2>
                         <p className="text-titan-navy/50 max-w-2xl mx-auto text-lg">More than just a job, we offer a pathway to professional excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#F5F5F7] p-10 rounded-[2.5rem] text-center group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-titan-red group-hover:text-white transition-colors">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-black text-titan-navy mb-4">Excellence Driven</h3>
                            <p className="text-titan-navy/60 leading-relaxed">
                                Work on award-winning projects that challenge the status quo and push engineering boundaries.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#F5F5F7] p-10 rounded-[2.5rem] text-center group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-titan-navy group-hover:text-white transition-colors">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-xl font-black text-titan-navy mb-4">National Impact</h3>
                            <p className="text-titan-navy/60 leading-relaxed">
                                Contribute to infrastructure that drives national development and improves lives across the country.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#F5F5F7] p-10 rounded-[2.5rem] text-center group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-titan-red group-hover:text-white transition-colors">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-black text-titan-navy mb-4">Growth Culture</h3>
                            <p className="text-titan-navy/60 leading-relaxed">
                                Thrive in a collaborative environment with mentorship, training, and clear career progression.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* --- JOB LISTINGS --- */}
                <section id="openings" className="px-6 max-w-[1400px] mx-auto pb-32">
                    <div className="flex flex-col xl:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Careers</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy">Current Openings</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                            <div className="relative flex-grow md:flex-grow-0 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search roles..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-4 rounded-xl border-none bg-[#F5F5F7] text-sm font-bold text-titan-navy focus:outline-none focus:ring-2 focus:ring-titan-red/20 hover:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <CustomDropdown
                                options={categories}
                                value={filterDept}
                                onChange={setFilterDept}
                                icon={Filter}
                            />
                            <CustomDropdown
                                options={locations}
                                value={filterLoc}
                                onChange={setFilterLoc}
                                icon={MapPin}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <AnimatePresence>
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={job.id}
                                        className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 hover:shadow-xl hover:border-titan-red/20 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h3 className="text-2xl font-bold text-titan-navy group-hover:text-titan-red transition-colors">{job.title}</h3>
                                                {index < 2 && (
                                                    <span className="bg-titan-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">New</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-6 text-sm font-bold text-titan-navy/50 uppercase tracking-widest">
                                                <span className="flex items-center gap-2"><Briefcase size={14} className="text-titan-red" /> {job.dept}</span>
                                                <span className="flex items-center gap-2"><MapPin size={14} className="text-titan-red" /> {job.loc}</span>
                                                <span className="flex items-center gap-2"><Clock size={14} className="text-titan-red" /> {job.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <Link href={`/design-a/careers/${job.id}`} className="ml-auto md:ml-0 inline-flex items-center gap-2 bg-titan-navy text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-all shadow-lg group-hover:shadow-titan-red/30">
                                                Apply Now <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-[#F5F5F7] rounded-[2rem] border-2 border-dashed border-gray-200"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Search className="text-gray-300" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-titan-navy mb-2">No positions found</h3>
                                    <p className="text-titan-navy/50 text-sm mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                                    <button onClick={() => { setFilterDept('All Departments'); setFilterLoc('All Locations'); setSearchQuery(''); }} className="text-titan-red font-bold text-sm uppercase tracking-wide hover:underline">
                                        Clear All Filters
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* General Application CTA */}
                    <div className="mt-20 bg-titan-navy rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black mb-6">Don&apos;t see your perfect role?</h3>
                            <p className="text-white/60 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                                We are always looking for exceptional talent. Submit your CV to our general talent pool and we&apos;ll contact you when a matching opportunity arises.
                            </p>
                            <button
                                onClick={() => setIsApplyOpen(true)}
                                className="inline-flex items-center gap-2 bg-titan-red text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-colors shadow-lg"
                            >
                                Send General Application <Send size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- APPLICATION MODAL --- */}
                <AnimatePresence>
                    {isApplyOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsApplyOpen(false)}
                                className="absolute inset-0 bg-[#1a1a2e]/90 backdrop-blur-md"
                            />

                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            >
                                <button
                                    onClick={() => setIsApplyOpen(false)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-titan-red transition-colors bg-[#F5F5F7] rounded-full p-2 z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="p-8 md:p-12">
                                    <div className="mb-10 text-center">
                                        <h3 className="text-3xl font-black text-titan-navy mb-2">General Application</h3>
                                        <p className="text-titan-navy/50 text-sm font-bold uppercase tracking-widest">Join our talent network</p>
                                    </div>

                                    <form onSubmit={(e) => { e.preventDefault(); setIsApplyOpen(false); alert('Application Submitted (Mock)'); }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">First Name *</label>
                                                <input type="text" className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="John" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Last Name *</label>
                                                <input type="text" className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Email Address *</label>
                                                <input type="email" className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="john@example.com" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Phone Number *</label>
                                                <input type="tel" className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="+855 ..." required />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Area of Interest *</label>
                                            <select className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium cursor-pointer">
                                                <option value="">Select Department...</option>
                                                {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>

                                        <div className="mb-8">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Resume / CV *</label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-[#F5F5F7] hover:border-titan-red/30 transition-all cursor-pointer relative group">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept=".pdf,.doc,.docx" />
                                                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:text-titan-red group-hover:scale-110 transition-all">
                                                    <Upload size={24} />
                                                </div>
                                                <p className="text-sm font-bold text-titan-navy group-hover:text-titan-red transition-colors">Click to Upload or Drag & Drop</p>
                                                <p className="text-xs text-gray-400 mt-2 font-medium">PDF, DOCX up to 5MB</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-titan-red transition-all shadow-xl flex items-center justify-center gap-2">
                                            Submit Application <Send size={16} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* --- FOOTER --- */}
                <footer className="pt-20 pb-12 px-6 md:px-12 bg-white rounded-t-[3rem] mt-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                                KIMMEX
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/design-a/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20 text-center">
                                    Start Project
                                </Link>
                                <Link href="/design-a/projects" className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-center">
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
