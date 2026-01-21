'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Briefcase, Clock, CheckCircle, Upload, Send, Share2, Printer, Building, UserCheck, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Detailed Mock Data
const jobDetails = [
    {
        id: 1,
        title: 'Senior Civil Engineer',
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        summary: 'We are seeking a highly experienced Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing design integrity, ensuring compliance with international standards, and mentoring junior engineers.',
        responsibilities: [
            'Lead structural analysis and design for high-rise commercial and residential projects.',
            'Collaborate with architects and MEP engineers to ensure fully integrated designs.',
            'Review and approve technical drawings, specifications, and calculations.',
            'Conduct site inspections to verify construction quality and adherence to design.',
            'Mentor junior engineering staff and provide technical guidance.'
        ],
        requirements: [
            'Master’s Degree in Civil or Structural Engineering.',
            'Minimum 8 years of experience in structural design and construction supervision.',
            'Proficiency in ETABS, SAP2000, and AutoCAD.',
            'Strong knowledge of ACI, Eurocodes, and local building regulations.',
            'Excellent problem-solving and communication skills.'
        ],
        benefits: [
            'Competitive salary and performance-based bonuses.',
            'Health insurance coverage for employee and family.',
            'Professional development allowance.',
            '18 days annual leave + public holidays.'
        ]
    },
    {
        id: 2,
        title: 'Site Manager',
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        summary: 'The Site Manager will oversee day-to-day operations on our new industrial park project. You will ensure safety, quality, and schedule targets are met.',
        responsibilities: [
            'Manage daily site activities and coordinate subcontractors.',
            'Ensure strict adherence to HSE policies.',
            'Monitor project schedule and report progress to headquarters.'
        ],
        requirements: [
            'Bachelor’s Degree in Construction Management or Civil Engineering.',
            '5+ years on-site management experience.',
            'Strong leadership and conflict resolution skills.'
        ],
        benefits: ['Housing allowance', 'Travel stipend', 'Project completion bonus']
    }
];

export default function CareerDetailPage() {
    const params = useParams();
    const id = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '1');
    const job = jobDetails.find(j => j.id === id) || jobDetails[0];

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cv: null as File | null
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, cv: e.target.files[0] });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy relative">
            {/* --- HERO / HEADER --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-end overflow-hidden pb-12">
                 <div className="absolute inset-0">
                    <img 
                        src="/images/career-detail.png" 
                        alt="Careers Hero" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/60 to-transparent"></div>
                </div>

                <div className="max-w-[1200px] w-full mx-auto relative z-10 px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/design-x/careers" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 duration-300">
                            <ArrowLeft size={14} /> Back to Careers
                        </Link>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">{job.title}</h1>
                                <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-wide text-white/90">
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Briefcase size={16} className="text-titan-red" /> {job.dept}</span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><MapPin size={16} className="text-titan-red" /> {job.loc}</span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Clock size={16} className="text-titan-red" /> {job.type}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hidden md:flex bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20 items-center gap-2"
                            >
                                Apply Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTENT --- */}
            <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT COLUMN: JOB DETAILS */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Summary */}
                        <div className="prose prose-lg text-titan-navy-subtle max-w-none">
                            <h3 className="text-xl font-black text-titan-navy mb-4 flex items-center gap-2">
                                <Sparkles size={20} className="text-titan-red" /> Role Overview
                            </h3>
                            <p className="text-lg leading-relaxed">{job.summary}</p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <Briefcase size={20} className="text-titan-red" /> Key Responsibilities
                            </h3>
                            <ul className="space-y-4">
                                {job.responsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                        <div className="mt-1.5 w-6 h-6 rounded-full bg-titan-red/10 flex items-center justify-center flex-shrink-0 text-titan-red">
                                            <span className="text-xs font-bold">{i + 1}</span>
                                        </div>
                                        <span className="text-titan-navy-subtle font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <UserCheck size={20} className="text-titan-red" /> Qualifications
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {job.requirements.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                        <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-titan-navy-subtle text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-titan-navy rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
                                <Heart size={20} className="text-titan-red" /> Benefits & Perks
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 relative z-10">
                                {job.benefits.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                        <span className="font-medium text-sm text-white/90">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: APPLICATION FORM (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-6" id="application-form">
                            {/* Application Card */}
                            <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-titan-navy to-titan-red"></div>
                                
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-titan-navy mb-2">Apply Now</h3>
                                    <p className="text-titan-navy-subtle text-sm">Join us as a <span className="font-bold text-titan-navy">{job.title}</span>.</p>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); alert('Application Submitted (Mock)'); }}>
                                    <div className="space-y-5 mb-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">First Name *</label>
                                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="John" required />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Last Name *</label>
                                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="Doe" required />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Email Address *</label>
                                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="john@example.com" required />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Phone Number *</label>
                                            <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="+855 ..." required />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Resume / CV *</label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 hover:border-titan-red/50 transition-colors cursor-pointer relative group">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400 group-hover:text-titan-red group-hover:bg-red-50 transition-colors">
                                                    <Upload size={18} />
                                                </div>
                                                <p className="text-xs font-bold text-titan-navy group-hover:text-titan-red transition-colors">
                                                    {formData.cv ? formData.cv.name : 'Click to Upload CV'}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-1">PDF or DOCX (Max 5MB)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2 text-xs group">
                                        Submit Application <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>

                            {/* Share / Print Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy-subtle hover:text-titan-navy hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    <Share2 size={14} /> Share
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy-subtle hover:text-titan-navy hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    <Printer size={14} /> Print
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
