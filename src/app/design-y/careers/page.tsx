'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, MapPin, Briefcase, Clock, Search, Filter, ChevronDown,
    CheckCircle2, UserPlus, Zap, ShieldCheck, GraduationCap, X, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';

// Mock Jobs Data
const allJobs = [
    { id: 'REQ-01', title: 'Senior Civil Engineer', dept: 'Engineering', loc: 'Phnom Penh', type: 'Full-time', status: 'Open', posted: '2d ago' },
    { id: 'REQ-02', title: 'Site Operations Manager', dept: 'Operations', loc: 'Sihanoukville', type: 'Contract', status: 'Urgent', posted: '1d ago' },
    { id: 'REQ-03', title: 'Architectural Designer', dept: 'Design', loc: 'Phnom Penh', type: 'Full-time', status: 'Open', posted: '5d ago' },
    { id: 'REQ-04', title: 'Procurement Specialist', dept: 'Supply Chain', loc: 'Phnom Penh', type: 'Full-time', status: 'Filled', posted: '1w ago' },
    { id: 'REQ-05', title: 'HSE Safety Inspector', dept: 'Quality & Safety', loc: 'Kampot', type: 'Full-time', status: 'Open', posted: '3d ago' },
    { id: 'REQ-06', title: 'BIM Coordinator', dept: 'Design', loc: 'Phnom Penh', type: 'Full-time', status: 'Open', posted: '1d ago' },
    { id: 'REQ-07', title: 'Electrical Engineer', dept: 'Engineering', loc: 'Siem Reap', type: 'Contract', status: 'Open', posted: '4d ago' },
];

export default function CareersPage() {
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    // Filters State
    const [filterDept, setFilterDept] = useState('All');
    const [filterLoc, setFilterLoc] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Unique options
    const departments = ['All', ...Array.from(new Set(allJobs.map(j => j.dept)))];
    const locations = ['All', ...Array.from(new Set(allJobs.map(j => j.loc)))];
    const types = ['All', ...Array.from(new Set(allJobs.map(j => j.type)))];

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            const matchDept = filterDept === 'All' || job.dept === filterDept;
            const matchLoc = filterLoc === 'All' || job.loc === filterLoc;
            const matchType = filterType === 'All' || job.type === filterType;
            const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchDept && matchLoc && matchType && matchSearch;
        });
    }, [filterDept, filterLoc, filterType, searchQuery]);

    const activeCount = filteredJobs.filter(j => j.status !== 'Filled').length;

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HERO: CAREERS AT KIMMEX --- */}
            <header className="relative pt-48 pb-32 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-2 h-2 bg-titan-red animate-pulse"></span>
                            <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">Recruitment Protocol v2.5</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-titan-navy leading-[0.8] mb-10">
                            CAREERS <br /> <span className="text-transparent stroke-text-navy transition-all hover:text-titan-navy duration-700 cursor-default">AT KIMMEX</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-titan-navy font-light max-w-3xl leading-relaxed border-l-4 border-titan-red pl-8 text-pretty">
                            Constructing the future requires precision intellect. <br />
                            <span className="font-bold text-titan-navy">Join our elite vanguard.</span>
                        </p>
                    </div>

                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="bg-white p-10 border-l-4 border-titan-navy h-full flex flex-col justify-between shadow-2xl shadow-titan-navy/5">
                            <div className="space-y-8">
                                <div>
                                    <span className="block text-6xl font-black text-titan-navy tracking-tighter">{allJobs.filter(j => j.status === 'Open' || j.status === 'Urgent').length}</span>
                                    <span className="text-sm font-bold text-titan-navy/40 uppercase tracking-widest">Active Positions</span>
                                </div>
                                <div>
                                    <span className="block text-6xl font-black text-titan-navy tracking-tighter">VN</span>
                                    <span className="text-sm font-bold text-titan-navy/40 uppercase tracking-widest">Primary HQ</span>
                                </div>
                            </div>
                            <div className="pt-12 mt-12 border-t border-titan-navy/10">
                                <p className="font-mono text-xs text-titan-navy/60 leading-relaxed uppercase">
                                    Our workforce is our primary structural asset. Standards must be maintained at absolute maximum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- WHY JOIN US Section --- */}
            <section className="py-32 bg-white">
                <div className="max-w-[1600px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy uppercase tracking-tight leading-none">
                            Why Join <br /> The Vanguard
                        </h2>
                        <p className="max-w-xl text-lg text-titan-navy/60 leading-relaxed text-pretty">
                            We don't just build structures; we build careers. Experience a culture of excellence, safety, and continuous innovation where your potential is the only limit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-titan-navy/10 border border-titan-navy/10">
                        {[
                            { title: 'Growth Trajectory', desc: 'Structured mentorship and clear ascension paths.', icon: Zap },
                            { title: 'Elite Health', desc: 'Comprehensive medical coverage for you and family.', icon: ShieldCheck },
                            { title: 'Performance Dividends', desc: 'Quarterly bonuses based on project milestones.', icon: CheckCircle2 },
                            { title: 'Global Standards', desc: 'Training in international safety and design protocols.', icon: GraduationCap }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 hover:bg-titan-bg transition-colors group cursor-default">
                                <div className="w-14 h-14 bg-titan-bg rounded-none flex items-center justify-center mb-8 group-hover:bg-titan-navy transition-colors">
                                    <item.icon size={28} className="text-titan-navy group-hover:text-white transition-colors stroke-[1.5]" />
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-titan-navy/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FILTERS & LIST --- */}
            <section className="py-24 max-w-[1600px] mx-auto px-6 border-t border-titan-navy/10 bg-titan-bg/30">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left: Filters Sidebar */}
                    <div className="lg:w-1/4 shrink-0 space-y-12">
                        <div className="sticky top-40">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-3 h-3 bg-titan-red"></div>
                                <h3 className="font-bold text-xl text-titan-navy uppercase tracking-tight">Job Filters</h3>
                            </div>

                            {/* Search */}
                            <div className="mb-10 relative">
                                <input
                                    type="text"
                                    placeholder="Search Role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-titan-bg/50 border-b-2 border-titan-navy/10 p-4 pl-0 text-lg font-bold text-titan-navy placeholder:text-titan-navy/20 focus:border-titan-red focus:outline-none transition-colors"
                                />
                                <Search size={20} className="absolute right-0 top-4 text-titan-navy/30" />
                            </div>

                            {/* Filters Group */}
                            <div className="space-y-8">
                                {/* Department Filter */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-titan-navy/40">Department</label>
                                    <div className="space-y-1">
                                        {departments.map(dept => (
                                            <button
                                                key={dept}
                                                onClick={() => setFilterDept(dept)}
                                                className={`flex items-center justify-between w-full px-4 py-3 text-sm font-bold transition-all border-l-2 ${filterDept === dept ? 'border-titan-red text-titan-navy bg-white' : 'border-transparent text-titan-navy/50 hover:text-titan-navy hover:bg-white/50'}`}
                                            >
                                                <span>{dept}</span>
                                                {dept === 'All' && <span className="text-[10px] opacity-40">{allJobs.length}</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-titan-navy/40">Location</label>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map(loc => (
                                            <button
                                                key={loc}
                                                onClick={() => setFilterLoc(loc)}
                                                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-all ${filterLoc === loc ? 'bg-titan-navy text-white border-titan-navy' : 'bg-white text-titan-navy/60 border-titan-navy/10 hover:border-titan-navy'}`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-titan-navy/40">Availability</label>
                                    <div className="flex flex-wrap gap-2">
                                        {types.map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setFilterType(type)}
                                                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-all ${filterType === type ? 'bg-titan-navy text-white border-titan-navy' : 'bg-white text-titan-navy/60 border-titan-navy/10 hover:border-titan-navy'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {(filterDept !== 'All' || filterLoc !== 'All' || filterType !== 'All' || searchQuery) && (
                                <button
                                    onClick={() => { setFilterDept('All'); setFilterLoc('All'); setFilterType('All'); setSearchQuery(''); }}
                                    className="mt-8 text-xs font-bold uppercase tracking-widest text-titan-red flex items-center gap-2 hover:underline group"
                                >
                                    <X size={14} className="group-hover:rotate-90 transition-transform" /> Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: Job List */}
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-end mb-10 pb-4 border-b border-titan-navy/10">
                            <h3 className="font-bold text-2xl text-titan-navy uppercase tracking-tight">Open Positions</h3>
                            <p className="text-titan-navy/60 font-mono text-xs uppercase tracking-widest">{activeCount} Results Found</p>
                        </div>

                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <Link key={job.id} href={`/design-y/careers/${job.id}`} className="block group">
                                        <div className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-white border border-titan-navy/5 hover:border-titan-navy transition-all duration-300 items-center ${job.status === 'Filled' ? 'opacity-50 grayscale' : 'hover:shadow-xl hover:shadow-titan-navy/5 hover:-translate-y-1'}`}>

                                            <div className="md:col-span-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`w-2 h-2 rounded-full ${job.status === 'Urgent' ? 'bg-titan-red animate-pulse' : job.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                    <span className="font-mono text-[10px] text-titan-navy/40 uppercase tracking-widest">{job.id}</span>
                                                </div>
                                                <h4 className="text-2xl font-black text-titan-navy mb-2 group-hover:text-titan-red transition-colors">{job.title}</h4>
                                                <div className="flex items-center gap-4 text-xs font-bold text-titan-navy/50 uppercase tracking-wide">
                                                    <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-titan-red" /> {job.dept}</span>
                                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3">
                                                <div className="flex items-center gap-2 text-sm font-bold text-titan-navy opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <MapPin size={16} /> {job.loc}
                                                </div>
                                            </div>

                                            <div className="md:col-span-3 text-right flex flex-col items-end gap-2">
                                                <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${job.status === 'Urgent' ? 'border-titan-red text-titan-red bg-titan-red/5' : 'border-titan-navy/10 text-titan-navy/60 bg-titan-bg'}`}>
                                                    {job.status}
                                                </span>
                                                <span className="text-xs font-bold text-titan-navy group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-2">
                                                    View Details <ArrowRight size={14} className="text-titan-red" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-titan-navy/10 bg-titan-bg/30">
                                    <div className="inline-flex p-4 rounded-full bg-titan-bg mb-4">
                                        <Search size={24} className="text-titan-navy/40" />
                                    </div>
                                    <p className="text-titan-navy font-bold text-lg mb-2">No matching positions found.</p>
                                    <button
                                        onClick={() => { setFilterDept('All'); setFilterLoc('All'); setFilterType('All'); setSearchQuery(''); }}
                                        className="text-titan-red text-sm font-bold uppercase tracking-widest hover:underline"
                                    >
                                        Clear Filters & View All
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-20 bg-titan-navy p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden isolate">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-[0.03] pointer-events-none z-[-1]">
                                <UserPlus size={400} />
                            </div>

                            <div className="space-y-4 max-w-lg">
                                <h4 className="text-3xl font-black uppercase tracking-tight">Position Not Listed?</h4>
                                <p className="text-white/60 text-lg leading-relaxed font-light">
                                    Our needs evolve daily. Submit your credentials to our secure talent pool for future deployment consideration.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsApplyOpen(true)}
                                className="group shrink-0 bg-white text-titan-navy px-10 py-5 font-black uppercase tracking-widest hover:bg-titan-red hover:text-white transition-all shadow-xl whitespace-nowrap flex items-center gap-3"
                            >
                                Send us your CV <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
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
                            className="absolute inset-0 bg-titan-navy/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center bg-titan-bg border-b border-titan-navy/10 p-6">
                                <h3 className="font-mono text-xs uppercase tracking-widest text-titan-navy">Secure Transmission // General App</h3>
                                <button onClick={() => setIsApplyOpen(false)} className="text-titan-navy/50 hover:text-titan-red">Close [ESC]</button>
                            </div>

                            <div className="p-12">
                                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsApplyOpen(false); }}>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">First Name</label>
                                            <input className="w-full border-b border-titan-navy/20 py-2 font-bold text-titan-navy focus:border-titan-red focus:outline-none bg-transparent" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Last Name</label>
                                            <input className="w-full border-b border-titan-navy/20 py-2 font-bold text-titan-navy focus:border-titan-red focus:outline-none bg-transparent" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Expertise / Role</label>
                                        <input className="w-full border-b border-titan-navy/20 py-2 font-bold text-titan-navy focus:border-titan-red focus:outline-none bg-transparent" placeholder="Civil Engineering" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Credentials (CV)</label>
                                        <div className="border border-dashed border-titan-navy/20 p-8 text-center bg-titan-bg/50 hover:bg-titan-bg cursor-pointer transition-colors">
                                            <span className="text-sm font-bold text-titan-navy/60">Upload Secure Document</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-titan-navy text-white h-14 font-bold uppercase tracking-widest hover:bg-titan-red transition-all">
                                        Transmit Data
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <style jsx>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
            `}</style>
        </div>
    );
}
