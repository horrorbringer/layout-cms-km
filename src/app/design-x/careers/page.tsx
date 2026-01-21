'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Clock, Search, Filter, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Mock Jobs Data
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

// --- Custom Dropdown Component ---
const CustomDropdown = ({ options, value, onChange, icon: Icon }: { options: string[], value: string, onChange: (val: string) => void, icon?: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`flex items-center gap-3 bg-white border ${isOpen ? 'border-titan-red ring-2 ring-titan-red/10' : 'border-gray-200'} px-6 py-3 rounded-sm text-sm font-bold text-titan-navy min-w-[200px] justify-between transition-all hover:border-titan-red/50`}
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50 py-2"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-2 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
                            >
                                {opt}
                                {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-titan-red"></div>}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function CareersPage() {
    const [filterDept, setFilterDept] = useState('All Departments');
    const [filterLoc, setFilterLoc] = useState('All Locations');

    const filteredJobs = allJobs.filter(job => {
        if (filterDept !== 'All Departments' && job.dept !== filterDept) return false;
        if (filterLoc !== 'All Locations' && job.loc !== filterLoc) return false;
        return true;
    });

    const categories = ['All Departments', 'Engineering', 'Operations', 'Design', 'Supply Chain', 'Quality & Safety'];
    const locations = ['All Locations', 'Phnom Penh', 'Sihanoukville', 'Kampot', 'Siem Reap'];

    const [isApplyOpen, setIsApplyOpen] = useState(false);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO SECTION --- */}
            <section className="px-6 mb-24 max-w-[1400px] mx-auto pt-48 relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-5xl md:text-7xl font-black text-titan-navy tracking-tight mb-6">
                        CAREERS AT <span className="text-titan-red">KIM MEX</span>
                    </h1>
                    <p className="text-xl text-titan-navy-subtle max-w-2xl mx-auto leading-relaxed">
                        Join our world-class team and help us build the infrastructure of tomorrow.
                    </p>
                </motion.div>
            </section>

            {/* --- WHY JOIN US --- */}
            <section id="culture" className="px-6 mb-32 max-w-[1400px] mx-auto">
                <div className="bg-titan-bg-alt rounded-xl p-12 md:p-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-titan-navy mb-4">Why Join Us</h2>
                        <div className="w-20 h-1 bg-titan-red mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-titan-navy text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-red transition-colors">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy mb-4">Professional Growth</h3>
                            <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                Continuous learning opportunities, mentorship programs, and clear career progression paths.
                            </p>
                        </div>
                        <div className="text-center group p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-titan-navy text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-red transition-colors">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy mb-4">Impactful Projects</h3>
                            <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                Work on landmark national projects that define the skyline and infrastructure of Cambodia.
                            </p>
                        </div>
                        <div className="text-center group p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-titan-navy text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-red transition-colors">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy mb-4">Work-Life Balance</h3>
                            <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                We value your wellbeing with competitive benefits, health insurance, and flexible policies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- JOB LISTINGS & FILTERS --- */}
            <section id="openings" className="px-6 max-w-[1200px] mx-auto pb-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative z-30">
                    <h2 className="text-4xl font-black text-titan-navy">Current Openings</h2>

                    {/* Filters - NOW USING CUSTOM DROPDOWN */}
                    <div className="flex flex-wrap gap-4">
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

                {/* Job Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div key={job.id} className="bg-white border border-gray-100 rounded-lg p-8 hover:shadow-xl hover:border-titan-red/20 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-titan-navy mb-2 group-hover:text-titan-red transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap gap-6 text-sm font-medium text-titan-navy-subtle">
                                        <span className="flex items-center gap-2"><Briefcase size={14} className="text-titan-red" /> {job.dept}</span>
                                        <span className="flex items-center gap-2"><MapPin size={14} className="text-titan-red" /> {job.loc}</span>
                                        <span className="flex items-center gap-2"><Clock size={14} className="text-titan-red" /> {job.type}</span>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/design-x/careers/${job.id}`} className="inline-flex items-center gap-2 bg-titan-bg-alt text-titan-navy px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest group-hover:bg-titan-navy group-hover:text-white transition-all">
                                        View Details <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-titan-navy-subtle font-medium">No positions found matching your filters.</p>
                            <button onClick={() => { setFilterDept('All Departments'); setFilterLoc('All Locations') }} className="mt-4 text-titan-red font-bold text-sm hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>

                {/* General Application CTA */}
                <div className="mt-20 border-t border-gray-100 pt-16 text-center">
                    <h3 className="text-2xl font-bold text-titan-navy mb-4">Didn't find your position?</h3>
                    <p className="text-titan-navy-subtle mb-8 max-w-xl mx-auto">
                        We are always looking for exceptional talent. If you believe you can contribute to our mission, we want to hear from you.
                    </p>
                    <button
                        onClick={() => setIsApplyOpen(true)}
                        className="inline-block bg-titan-navy text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-titan-red transition-colors shadow-lg">
                        Send us your CV
                    </button>
                </div>
            </section>

            {/* --- APPLICATION MODAL --- */}
            <AnimatePresence>
                {isApplyOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsApplyOpen(false)}
                            className="absolute inset-0 bg-titan-navy/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-titan-red"></div>
                            <button
                                onClick={() => setIsApplyOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-titan-red transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="p-8 md:p-12">
                                <h3 className="text-3xl font-black text-titan-navy mb-2">General Application</h3>
                                <p className="text-titan-navy-subtle mb-8 text-sm">Tell us about yourself and how you can contribute.</p>

                                <form onSubmit={(e) => { e.preventDefault(); setIsApplyOpen(false); alert('Application Submitted (Mock)'); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">First Name *</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Last Name *</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Email Address *</label>
                                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="john@example.com" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Phone Number *</label>
                                            <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="+855 ..." required />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Area of Interest *</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="e.g. Project Management, Engineering..." required />
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Resume / CV *</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
                                            <p className="text-sm font-bold text-titan-navy">Upload Resume</p>
                                            <p className="text-[10px] text-gray-400 mt-1">PDF/DOCX</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-all shadow-lg">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
