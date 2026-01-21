'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, MapPin, Briefcase, Clock, CheckCircle2, DollarSign, Calendar, Zap, UserPlus, ArrowRight
} from 'lucide-react';

// Mock Data (matches the list page for consistency)
const jobData: any = {
    'REQ-01': {
        id: 'REQ-01',
        title: 'Senior Civil Engineer',
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        status: 'Open',
        description: 'We are seeking a seasoned Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing the design, analysis, and execution of high-rise developments.',
        responsibilities: [
            'Lead structural analysis and design for large-scale commercial projects.',
            'Coordinate with architects and MEP engineers to ensure design integrity.',
            'Manage site supervision teams and ensure compliance with safety standards.',
            'Review and approve technical drawings and specifications.',
            'Mentor junior engineers and technical staff.'
        ],
        requirements: [
            'Bachelor’s or Master’s degree in Civil Engineering.',
            'Minimum 8 years of experience in structural design and construction.',
            'Proficiency in AutoCAD, ETABS, and SAFE.',
            'Strong leadership and communication skills.',
            'Professional Engineer (PE) license is preferred.'
        ],
        benefits: [
            'Competitive international salary package ($2,000 - $4,000).',
            'Full family health insurance coverage.',
            'Performance-based project bonuses.',
            'Annual leadership training retreat.'
        ]
    },
    'REQ-02': {
        id: 'REQ-02',
        title: 'Site Operations Manager',
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        status: 'Urgent',
        description: 'Oversee daily on-site operations for our coastal development projects. You will ensure that construction timelines are met while maintaining the highest safety and quality standards.',
        responsibilities: [
            'Manage daily construction site operations and logistics.',
            'Coordinate with subcontractors and supply chain partners.',
            'Enforce rigorous HSE protocols on site.',
            'Report progress and blockers to the central project management office.',
            'Resolve on-site conflicts and operational bottlenecks.'
        ],
        requirements: [
            'Degree in Construction Management or related field.',
            '5+ years of on-site management experience.',
            'Strong problem-solving and conflict resolution skills.',
            'Experience with large-scale coastal or infrastructure projects.'
        ],
        benefits: [
            'High-value contract rates.',
            'Accommodation and transport provided.',
            'Completion bonus upon project handover.',
            'Priority fit for future contract roles.'
        ]
    },
    'REQ-03': {
        id: 'REQ-03',
        title: 'Architectural Designer',
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        status: 'Open',
        description: 'Join our award-winning design studio to create cutting-edge architectural concepts. You will work on initial massing, facade design, and detailed 3D visualizations.',
        responsibilities: [
            'Develop conceptual designs and 3D models for new proposals.',
            'Produce high-quality renderings for client presentations.',
            'Collaborate with engineering teams to ensure buildability.',
            'Participate in design charrettes and workshops.'
        ],
        requirements: [
            'Bachelor’s in Architecture.',
            'Proficiency in Rhino, Revit, and V-Ray/Lumion.',
            'Strong portfolio demonstrating modern / avant-garde aesthetic.',
            'Excellent visual communication skills.'
        ],
        benefits: [
            'Creative and collaborative studio environment.',
            'International design exposure.',
            'Software and hardware allowance.',
            'Flexible working hours.'
        ]
    },
    'REQ-04': {
        id: 'REQ-04',
        title: 'Procurement Specialist',
        dept: 'Supply Chain',
        loc: 'Phnom Penh',
        type: 'Full-time',
        status: 'Filled',
        description: 'Manage the sourcing and purchasing of high-grade construction materials. ensure cost-efficiency without compromising on our strict quality standards.',
        responsibilities: [
            'Source global suppliers for structural steel, glass, and concrete.',
            'Negotiate contracts and payment terms.',
            'Forecast material needs based on project schedules.',
            'Monitor supplier performance and quality.'
        ],
        requirements: [
            'Degree in Business, Logistics, or Supply Chain Management.',
            '3+ years experience in construction procurement.',
            'Strong negotiation skills.',
            'Fluent in English and Mandarin is a plus.'
        ],
        benefits: [
            'Competitive base salary + savings commission.',
            'Quarterly performance reviews.',
            'Mobile phone allowance.',
            'Health insurance.'
        ]
    },
    'REQ-05': {
        id: 'REQ-05',
        title: 'HSE Safety Inspector',
        dept: 'Quality & Safety',
        loc: 'Kampot',
        type: 'Full-time',
        status: 'Open',
        description: 'Ensure zero-harm workplaces across our Kampot regional sites. You will conduct rigorous inspections and training sessions.',
        responsibilities: [
            'Conduct daily safety patrols and risk assessments.',
            'Lead safety induction training for new workers.',
            'Investigate and report near-misses or incidents.',
            'Ensure compliance with ISO 45001 standards.'
        ],
        requirements: [
            'Certified Safety Officer (NEBOSH or equivalent).',
            'Strong knowledge of local and international safety regulations.',
            'Ability to work independently in remote locations.'
        ],
        benefits: [
            'Hazard pay allowance.',
            'Comprehensive life insurance.',
            'Regular safety certification training.',
            'Travel allowance.'
        ]
    },
    'REQ-06': {
        id: 'REQ-06',
        title: 'BIM Coordinator',
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        status: 'Open',
        description: 'Manage the digital twin of our major projects. You will coordinate BIM models across disciplines to detect clashes and improve construction efficiency.',
        responsibilities: [
            'Merge and coordinate architectural, structural, and MEP models.',
            'Run clash detection reports using Navisworks.',
            'Maintain BIM standards and execution plans.',
            'Support project teams with Revit technical issues.'
        ],
        requirements: [
            'Expert proficiency in Revit and Navisworks.',
            'Experience in BIM coordination for complex buildings.',
            'Detail-oriented mindset.'
        ],
        benefits: [
            'High-end workstation provided.',
            'Technical certification sponsorship (Autodesk).',
            'Opportunity to lead BIM implementation strategies.',
            'Competitive salary.'
        ]
    },
    'REQ-07': {
        id: 'REQ-07',
        title: 'Electrical Engineer',
        dept: 'Engineering',
        loc: 'Siem Reap',
        type: 'Contract',
        status: 'Open',
        description: 'Design and supervise electrical systems for hospitality projects in Siem Reap.',
        responsibilities: [
            'Design power distribution, lighting, and ELV systems.',
            'Review shop drawings and material submittals.',
            'Conduct site inspections and witnessed testing.',
            'Coordinate with utility providers.'
        ],
        requirements: [
            'Degree in Electrical Engineering.',
            'Knowledge of hotel/hospitality technical requirements.',
            'Good understanding of local electrical codes.'
        ],
        benefits: [
            'Project-based competitive rates.',
            'Accommodation support in Siem Reap.',
            'Flexible schedule.',
            'Networking with top hospitality developers.'
        ]
    },
    'default': {
        id: 'REQ-XX',
        title: 'Position Details',
        dept: 'General',
        loc: 'Various',
        type: 'Full-time',
        status: 'Open',
        description: 'Detailed job description for this position is currently being updated in our secure database.',
        responsibilities: ['Responsibility 1', 'Responsibility 2', 'Responsibility 3'],
        requirements: ['Requirement 1', 'Requirement 2'],
        benefits: ['Benefit 1', 'Benefit 2']
    }
};

export default function CareerDetailPage() {
    const params = useParams();
    const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
    const job = (id && jobData[id]) ? jobData[id] : jobData['default'];
    // Scroll to form helper
    const scrollToApply = () => {
        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HEADER --- */}
            <div className="relative pt-40 pb-20 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1200px] mx-auto relative z-10">
                    <Link href="/design-y/careers" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-titan-red mb-10 hover:underline hover:-translate-x-1 transition-transform">
                        <ArrowLeft size={12} /> Return to Job Board
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`w-3 h-3 rounded-full animate-pulse ${job.status === 'Urgent' ? 'bg-titan-red' : 'bg-green-500'}`}></span>
                                <span className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest">Protocol ID: {id || job.id}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-titan-navy tracking-tighter leading-[0.9] mb-8">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-titan-navy/60 uppercase tracking-wide">
                                <span className="flex items-center gap-2"><Briefcase size={18} className="text-titan-red" /> {job.dept}</span>
                                <span className="flex items-center gap-2"><MapPin size={18} className="text-titan-red" /> {job.loc}</span>
                                <span className="flex items-center gap-2"><Clock size={18} className="text-titan-red" /> {job.type}</span>
                            </div>
                        </div>

                        <div className="shrink-0 flex flex-col gap-4">
                            <button
                                onClick={scrollToApply}
                                className="bg-titan-navy text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-titan-red transition-all shadow-xl hover:-translate-y-1"
                            >
                                Apply for Position
                            </button>
                            <p className="text-center text-[10px] font-mono uppercase text-titan-navy/40">Secure Applicant Portal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT --- */}
            <main className="max-w-[1200px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Content Column */}
                <div className="lg:col-span-8 space-y-20">

                    {/* 1. Job Summary / Intro */}
                    <section>
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest border-b border-titan-navy/10 pb-4 mb-8">
                            Mission Overview
                        </h3>
                        <p className="text-titan-navy leading-loose text-xl font-light text-pretty">
                            {job.description}
                        </p>
                    </section>

                    {/* 2. Responsibilities */}
                    <section>
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest border-b border-titan-navy/10 pb-4 mb-8">
                            Core Responsibilities
                        </h3>
                        <ul className="space-y-6">
                            {job.responsibilities?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="mt-2 w-1.5 h-1.5 bg-titan-navy rounded-full shrink-0 group-hover:bg-titan-red transition-colors"></div>
                                    <span className="text-titan-navy/80 leading-relaxed text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. Requirements */}
                    <section>
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest border-b border-titan-navy/10 pb-4 mb-8">
                            Technical Requirements
                        </h3>
                        <div className="bg-titan-bg/30 p-8 border border-titan-navy/5">
                            <ul className="space-y-4">
                                {job.requirements?.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 min-w-[20px] text-titan-red">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-titan-navy font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* 4. Benefits */}
                    <section>
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest border-b border-titan-navy/10 pb-4 mb-8">
                            Deployment Benefits
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {job.benefits?.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-white border border-titan-navy/10 p-6 shadow-sm hover:border-titan-red transition-all group">
                                    <div className="w-10 h-10 bg-titan-bg rounded-full flex items-center justify-center shrink-0 group-hover:bg-titan-navy transition-colors">
                                        <Zap size={18} className="text-titan-navy group-hover:text-titan-red" />
                                    </div>
                                    <span className="text-titan-navy font-bold text-sm leading-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. Apply Now Form */}
                    <section id="application-form" className="pt-12 border-t border-titan-navy/10">
                        <h3 className="font-black text-3xl text-titan-navy uppercase tracking-tight mb-2">Initiate Application</h3>
                        <p className="text-titan-navy/60 mb-10">Submit your credentials below. Secure transmission protocol active.</p>

                        <div className="bg-titan-navy text-white p-12 relative overflow-hidden">
                            {/* Decorative BG */}
                            <div className="absolute top-0 right-0 -mr-12 -mt-12 opacity-[0.05] pointer-events-none">
                                <UserPlus size={300} />
                            </div>

                            <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Full Identity</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold focus:border-titan-red focus:outline-none transition-colors" placeholder="First Last Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Contact Uplink</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold focus:border-titan-red focus:outline-none transition-colors" placeholder="email@address.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/60">Operational Experience</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold focus:border-titan-red focus:outline-none transition-colors h-32 resize-none" placeholder="Briefly describe your relevant experience..." />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/60">Credentials (CV/Resume)</label>
                                    <div className="border-2 border-dashed border-white/20 p-8 text-center bg-white/5 hover:bg-white/10 hover:border-titan-red cursor-pointer transition-all">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                <Briefcase size={20} className="text-titan-red" />
                                            </div>
                                            <span className="text-sm font-bold text-white">Click to Upload Document</span>
                                            <span className="text-xs text-white/40 uppercase tracking-widest">PDF, DOCX (Max 5MB)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-titan-red text-white py-6 font-black uppercase tracking-widest hover:bg-white hover:text-titan-navy transition-all shadow-xl text-lg flex items-center justify-center gap-3">
                                        Transmit Application <ArrowRight size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                </div>

                {/* Right Sidebar - Spec Sheet Style */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white border border-titan-navy/10 p-8 shadow-2xl shadow-titan-navy/5 sticky top-40">
                        <div className="mb-8 pb-8 border-b border-titan-navy/10">
                            <h4 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-6">Position Vector</h4>

                            <div className="space-y-6">
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-titan-navy/30 mb-1">Compensation</span>
                                    <div className="flex items-center gap-3 text-titan-navy font-bold text-lg">
                                        <DollarSign size={18} className="text-titan-red" />
                                        <span>Competitive Base</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-titan-navy/30 mb-1">Deployment</span>
                                    <div className="flex items-center gap-3 text-titan-navy font-bold text-lg">
                                        <Calendar size={18} className="text-titan-red" />
                                        <span>Immediate Start</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-titan-navy/30 mb-1">Department</span>
                                    <div className="flex items-center gap-3 text-titan-navy font-bold text-lg">
                                        <Briefcase size={18} className="text-titan-red" />
                                        <span>{job.dept}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-4">Direct Contact</h4>
                            <div className="bg-titan-navy p-4 text-white">
                                <p className="text-sm font-bold opacity-90">careers@kimmex.com</p>
                                <p className="text-xs opacity-50 font-mono mt-1">Ref: {id || job.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}
