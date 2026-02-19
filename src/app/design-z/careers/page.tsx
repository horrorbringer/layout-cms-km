'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Clock, Search, Filter, ChevronDown, Users, Globe, Award, Upload, Send, Check, DollarSign, Zap, BookOpen, Coffee, Smile, ChevronRight, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock Jobs Data (Enhanced with Transparent Info)
const allJobs = [
    {
        id: 1,
        title: 'Senior Civil Engineer',
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Construction', 'Planning'],
        salary: '$2,500 - $3,500',
        experience: '5+ Years',
        postedDate: '2 days ago'
    },
    {
        id: 2,
        title: 'Site Manager',
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        tags: ['Management', 'On-site'],
        salary: '$1,800 - $2,500',
        experience: '3-5 Years',
        postedDate: '5 days ago'
    },
    {
        id: 3,
        title: 'Architectural Designer',
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Creativity', 'CAD'],
        salary: '$1,200 - $1,800',
        experience: '2+ Years',
        postedDate: '1 week ago'
    },
    {
        id: 4,
        title: 'Procurement Officer',
        dept: 'Supply Chain',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: ['Logistics', 'Finance'],
        salary: '$800 - $1,200',
        experience: '1-3 Years',
        postedDate: '1 week ago'
    },
    {
        id: 5,
        title: 'Safety Inspector (HSE)',
        dept: 'Quality & Safety',
        loc: 'Kampot',
        type: 'Full-time',
        tags: ['Safety', 'Inspection'],
        salary: '$1,000 - $1,500',
        experience: '3+ Years',
        postedDate: '2 weeks ago'
    },
    {
        id: 6,
        title: 'MEP Engineer',
        dept: 'Engineering',
        loc: 'Siem Reap',
        type: 'Full-time',
        tags: ['Electrical', 'Mechanical'],
        salary: '$1,500 - $2,200',
        experience: '4+ Years',
        postedDate: '2 weeks ago'
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
                className={`flex items-center gap-3 bg-white border ${isOpen ? 'border-titan-red ring-2 ring-titan-red/10' : 'border-gray-200'} px-6 py-3 rounded-lg text-sm font-bold text-titan-navy min-w-[220px] justify-between transition-all hover:border-titan-red/50 shadow-sm`}
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
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50 py-2 origin-top"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
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

export default function CareersPage() {
    const [filterDept, setFilterDept] = useState('All Departments');
    const [filterLoc, setFilterLoc] = useState('All Locations');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = allJobs.filter(job => {
        if (filterDept !== 'All Departments' && job.dept !== filterDept) return false;
        if (filterLoc !== 'All Locations' && job.loc !== filterLoc) return false;
        if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const categories = ['All Departments', 'Engineering', 'Operations', 'Design', 'Supply Chain', 'Quality & Safety'];
    const locations = ['All Locations', 'Phnom Penh', 'Sihanoukville', 'Kampot', 'Siem Reap'];

    const [isApplyOpen, setIsApplyOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy relative">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[80vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-5.jpg"
                        alt="Careers Hero"
                        fill
                        className="object-cover opacity-60 scale-105 animate-slow-pan"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/60 via-titan-navy/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy to-transparent opacity-40"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm mt-30">
                            <span className="w-2 h-2 rounded-full bg-titan-red animate-pulse"></span>
                            We are Hiring
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                            BUILD <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">YOUR LEGACY</span>
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10 border-l-4 border-titan-red pl-6">
                            Join a team of visionaries. At Kimmex, we don't just construct buildings; we shape the skyline and engineering future of Cambodia.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20"
                            >
                                View Openings
                            </button>
                            <button
                                onClick={() => setIsApplyOpen(true)}
                                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-navy transition-all backdrop-blur-sm"
                            >
                                Apply General
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Stats/Visuals - Hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hidden lg:grid grid-cols-2 gap-4"
                    >
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 translate-y-8">
                            <h3 className="text-4xl font-black text-white mb-2">500+</h3>
                            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Team Members</p>
                        </div>
                        <div className="bg-titan-red p-8 rounded-2xl shadow-2xl shadow-titan-red/20">
                            <h3 className="text-4xl font-black text-white mb-2">30+</h3>
                            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Active Projects</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl col-span-2 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-titan-navy mb-1">Top Employer</h3>
                                <p className="text-titan-navy-subtle text-xs font-bold uppercase tracking-widest">Awarded 2024 - 2025</p>
                            </div>
                            <Award size={48} className="text-titan-red" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- WHY JOIN US --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-titan-navy mb-4">Why Choose Kimmex?</h2>
                    <p className="text-titan-navy-subtle max-w-2xl mx-auto">More than just a job, we offer a pathway to professional excellence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-2xl shadow-xl border-b-4 border-titan-red text-center group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="w-16 h-16 bg-titan-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-red group-hover:text-white transition-colors">
                            <Award size={28} />
                        </div>
                        <h3 className="text-xl font-black text-titan-navy mb-4">Excellence Driven</h3>
                        <p className="text-titan-navy-subtle leading-relaxed">
                            Work on award-winning projects that challenge the status quo and push engineering boundaries.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 rounded-2xl shadow-xl border-b-4 border-titan-navy text-center group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="w-16 h-16 bg-titan-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-navy group-hover:text-white transition-colors">
                            <Target size={28} />
                        </div>
                        <h3 className="text-xl font-black text-titan-navy mb-4">Impactful Work</h3>
                        <p className="text-titan-navy-subtle leading-relaxed">
                            Contribute to projects that matter and leave a lasting legacy for the community.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-2 block">Our Culture</span>
                        <h2 className="text-4xl text-titan-navy font-black">Why Kimmex?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: 'Purpose-Driven Work', desc: 'Contribute to landmark projects that shape the nation\'s infrastructure.' },
                            { icon: Users, title: 'Mentorship Culture', desc: 'Learn directly from industry veterans and grow your expertise.' },
                            { icon: Zap, title: 'Fast-Track Growth', desc: 'Clear career pathways and performance-based promotion opportunities.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-titan-red/20 hover:shadow-xl transition-all group text-center"
                            >
                                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-titan-red mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black text-titan-navy mb-4">{item.title}</h3>
                                <p className="text-titan-navy/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TRANSPARENT BENEFITS --- */}
            <section className="py-24 px-6 bg-titan-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Total Rewards</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">More Than Just A Salary.</h2>
                            <p className="text-white/60 text-lg mb-12 leading-relaxed">
                                We believe in taking care of our people. Our comprehensive benefits package is designed to support your health, wealth, and professional growth.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Briefcase, label: "Performance Bonuses" },
                                    { icon: Globe, label: "Health Insurance" },
                                    { icon: Users, label: "Paid Time Off" },
                                    { icon: Check, label: "Training Budget" },
                                    { icon: Zap, label: "Career Development" },
                                    { icon: Target, label: "Team Retreats" },
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                        <benefit.icon size={20} className="text-titan-red" />
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">{benefit.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                                    alt="Team Collaboration"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-titan-navy/20"></div>
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-xl shadow-xl hidden md:block">
                                <span className="block text-4xl font-black text-titan-navy mb-1">98%</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Employee Retention</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HIRING PROCESS --- */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-2 block">What To Expect</span>
                        <h2 className="text-4xl text-titan-navy font-black">Our Hiring Process</h2>
                        <p className="text-titan-navy/50 mt-4 max-w-2xl mx-auto">Transparent, fair, and fast. We respect your time and effort.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[40px] left-0 right-0 h-[2px] bg-gray-200 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "01", title: "Application", desc: "Submit your CV & Portfolio via our portal." },
                                { step: "02", title: "Screening", desc: "Initial call with HR to discuss fit & basics." },
                                { step: "03", title: "Technical", desc: "Deep-dive interview with the department led." },
                                { step: "04", title: "Offer", desc: "Establish terms and welcome you aboard!" },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-titan-navy shadow-sm mb-6 group-hover:border-titan-red group-hover:text-titan-red transition-all relative z-10">
                                        {s.step}
                                    </div>
                                    <h3 className="text-lg font-black text-titan-navy mb-2">{s.title}</h3>
                                    <p className="text-sm text-titan-navy/60 px-4">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- JOB LISTINGS & FILTERS --- */}
            <section id="openings" className="px-6 max-w-[1400px] mx-auto pb-32 pt-10 border-t border-gray-200">
                <div className="flex flex-col xl:flex-row justify-between items-end mb-12 gap-8 relative z-30 pt-20">
                    <div>
                        <h2 className="text-4xl font-black text-titan-navy mb-3">Current Openings</h2>
                        <p className="text-titan-navy-subtle text-lg font-medium">Find the perfect role for your skills and passion.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                        {/* Search Input */}
                        <div className="relative flex-grow md:flex-grow-0 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search roles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-gray-50 text-sm font-bold text-titan-navy focus:outline-none focus:ring-2 focus:ring-titan-red/20 transition-all placeholder:text-gray-400"
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

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={job.id}
                                    className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:border-titan-red/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Briefcase size={80} className="text-titan-navy" />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-2 items-center mb-2">
                                                {job.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-titan-navy-subtle rounded-md border border-gray-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {/* Posted Date */}
                                                <span className="text-[10px] text-gray-400 font-medium ml-2">{job.postedDate}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 bg-gray-50 px-2 py-1 rounded">
                                                {job.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-titan-navy group-hover:text-titan-red transition-colors mb-2 pr-12 line-clamp-2">
                                            {job.title}
                                        </h3>

                                        {/* Transparent Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">Salary Range</span>
                                                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                                    <DollarSign size={14} /> {job.salary}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">Experience</span>
                                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                                    <Award size={14} className="text-titan-red" /> {job.experience}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">Location</span>
                                                <div className="flex items-center gap-2 text-titan-navy-subtle text-xs font-bold">
                                                    <MapPin size={12} /> {job.loc}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">Department</span>
                                                <div className="flex items-center gap-2 text-titan-navy-subtle text-xs font-bold">
                                                    <Briefcase size={12} /> {job.dept}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <Link href={`/design-z/careers/${job.id}`} className="w-full group/btn flex items-center justify-between bg-titan-navy text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-all shadow-md">
                                            View Full Description
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-xl font-black text-titan-navy mb-2">No positions found</h3>
                                <p className="text-titan-navy-subtle text-sm mb-8 font-medium">Try adjusting your search criteria or view all openings.</p>
                                <button onClick={() => { setFilterDept('All Departments'); setFilterLoc('All Locations'); setSearchQuery(''); }} className="bg-titan-navy text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-colors shadow-lg">
                                    Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* General Application CTA */}
                <div className="mt-20 bg-titan-navy rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4">Don't see your perfect role?</h3>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg font-light">
                            We are always looking for exceptional talent. Submit your CV to our general talent pool and we'll contact you when a matching opportunity arises.
                        </p>
                        <button
                            onClick={() => setIsApplyOpen(true)}
                            className="inline-flex items-center gap-2 bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-colors shadow-lg"
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
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-titan-navy to-titan-red"></div>
                            <button
                                onClick={() => setIsApplyOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-titan-red transition-colors bg-gray-50 rounded-full p-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="mb-8 text-center">
                                    <h3 className="text-3xl font-black text-titan-navy mb-2">General Application</h3>
                                    <p className="text-titan-navy-subtle text-sm">Join our talent network for future opportunities.</p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); setIsApplyOpen(false); alert('Application Submitted (Mock)'); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">First Name *</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="John" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Last Name *</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Email Address *</label>
                                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="john@example.com" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Phone Number *</label>
                                            <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="+855 ..." required />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Area of Interest *</label>
                                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all cursor-pointer">
                                            <option value="">Select Department...</option>
                                            {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Resume / CV *</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-titan-red/50 transition-colors cursor-pointer relative group">
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept=".pdf,.doc,.docx" />
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 group-hover:text-titan-red group-hover:bg-red-50 transition-colors">
                                                <Upload size={20} />
                                            </div>
                                            <p className="text-sm font-bold text-titan-navy group-hover:text-titan-red transition-colors">Click to Upload or Drag & Drop</p>
                                            <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2">
                                        Submit Application <Send size={16} />
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
