'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle, Upload, Send } from 'lucide-react';
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
    // Fallback data for other IDs
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
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO / JOB TITLE --- */}
            <section className="pt-40 pb-16 px-6 max-w-[1000px] mx-auto relative z-10 text-center border-b border-gray-100">
                <Link href="/design-x/careers" className="inline-flex items-center gap-2 text-titan-navy-subtle hover:text-titan-red transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                    <ArrowLeft size={14} /> Back to Careers
                </Link>
                <h1 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{job.title}</h1>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-titan-navy-subtle uppercase tracking-wide">
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-sm"><Briefcase size={14} /> {job.dept}</span>
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-sm"><MapPin size={14} /> {job.loc}</span>
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-sm"><Clock size={14} /> {job.type}</span>
                </div>
            </section>

            {/* --- CONTENT --- */}
            <div className="max-w-[800px] mx-auto px-6 py-16">

                {/* Summary */}
                <div className="mb-16">
                    <h2 className="text-xl font-black text-titan-navy mb-4 border-l-4 border-titan-red pl-4">Job Summary</h2>
                    <p className="text-lg text-titan-navy-subtle leading-relaxed">
                        {job.summary}
                    </p>
                </div>

                {/* Responsibilities */}
                <div className="mb-16">
                    <h2 className="text-xl font-black text-titan-navy mb-6 border-l-4 border-titan-red pl-4">Key Responsibilities</h2>
                    <ul className="space-y-4">
                        {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 bg-titan-red rounded-full flex-shrink-0"></div>
                                <span className="text-titan-navy-subtle leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Requirements */}
                <div className="mb-16">
                    <h2 className="text-xl font-black text-titan-navy mb-6 border-l-4 border-titan-red pl-4">Requirements</h2>
                    <ul className="space-y-4">
                        {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <CheckCircle size={16} className="text-titan-navy mt-1 flex-shrink-0" />
                                <span className="text-titan-navy-subtle leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Benefits */}
                <div className="mb-20 bg-titan-bg-alt p-8 rounded-lg">
                    <h2 className="text-xl font-black text-titan-navy mb-6">Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {job.benefits.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-titan-red font-bold text-lg">•</span>
                                <span className="text-titan-navy font-medium text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- APPLY NOW FORM --- */}
                <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-titan-red"></div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h3 className="text-3xl font-black text-titan-navy mb-2">Apply for this Role</h3>
                        <p className="text-titan-navy-subtle mb-10 text-sm">Please fill out the form below. We will review your application and get back to you shortly.</p>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Email Address *</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Phone Number *</label>
                                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="+855 ..." required />
                            </div>
                        </div>

                        <div className="mb-10">
                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Resume / CV *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                <Upload className="mx-auto text-titan-navy-subtle mb-3" size={32} />
                                <p className="text-sm font-bold text-titan-navy">
                                    {formData.cv ? formData.cv.name : 'Click to Upload or Drag & Drop'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                            </div>
                        </div>

                        <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2">
                            Submit Application <Send size={16} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
