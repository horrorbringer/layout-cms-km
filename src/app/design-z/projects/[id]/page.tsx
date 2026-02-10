'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Building, Activity, Tag, HelpCircle, ArrowRight, Share2, Maximize, User, Calendar, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- MOCK DATA ---
const projectDetails: any = {
    // Government
    'moi': {
        title: 'Ministry of Interior (MOI)',
        subtitle: 'Government Office Building - Phnom Penh',
        location: 'Phnom Penh',
        client: 'Royal Government of Cambodia',
        sector: 'Government',
        area: '45,000 sqm',
        year: '2023',
        status: 'Completed',
        image: '/images/projects/Thumbnail-1.jpg',
        description: {
            background: 'The new Ministry of Interior complex was commissioned to centralize administrative functions and provide a modern, secure facility for government operations.',
            objectives: 'To create a landmark building that reflects Khmer architectural heritage while incorporating state-of-the-art security, energy efficiency, and functional office spaces.',
            concept: 'The design draws inspiration from the lotus flower, symbolizing purity and strength, with a central tiered roof structure and symmetrical wings.'
        },
        services: ['Structural Engineering', 'Architectural Design', 'MEP Installation', 'Interior Fit-out', 'Landscape Architecture'],
        challenges: [
            'Strict security protocols requiring compartmentalized access control.',
            'Integration of advanced IT infrastructure within a traditional aesthetic.',
            'Short timeline requiring 24/7 construction shifts.'
        ],
        gallery: [
            '/images/projects/Thumbnail-2.jpg',
            '/images/projects/Thumbnail-3.jpg',
            '/images/projects/Thumbnail-4.jpg'
        ]
    },
    'mef': {
        title: 'Ministry of Economy & Finance (MEF)',
        subtitle: 'Government Office Building - Phnom Penh',
        location: 'Phnom Penh',
        client: 'Ministry of Economy & Finance',
        sector: 'Government',
        area: '38,000 sqm',
        year: '2022',
        status: 'Completed',
        image: '/images/projects/Thumbnail-2.jpg',
        description: {
            background: 'A dedicated headquarters for the nation\'s financial planning and economic management.',
            objectives: 'Construct a highly functional, secure, and prestigious workspace that accommodates the growing staff of the ministry.',
            concept: 'Modernist solidity combined with traditional Khmer motifs on the facade.'
        },
        services: ['General Construction', 'MEP Works', 'External Infrastructures'],
        challenges: ['Deep basement construction in high water table area.', 'Complex data center cooling requirements.'],
        gallery: ['/images/projects/Thumbnail-5.jpg']
    },

    // Water Treatment
    'kt-wtp': {
        title: 'Khleang Toeuk WTP',
        subtitle: 'Water Treatment Plant',
        location: 'Phnom Penh',
        client: 'Phnom Penh Water Supply Authority',
        sector: 'Infrastructure',
        area: '12 Hectares',
        year: '2024',
        status: 'Under Construction',
        image: '/images/projects/Thumbnail-1.jpg',
        description: {
            background: 'A critical infrastructure project designed to alleviate water shortages in the western districts of Phnom Penh.',
            objectives: 'Increase production capacity by 50,000 m3/day and ensure compliance with WHO water quality standards.',
            concept: 'Industrial efficiency meeting sustainable hydraulic engineering.'
        },
        services: ['Civil Works', 'Pipe Laying', 'Pumping Station Construction', 'Reservoir Building'],
        challenges: ['Soft soil conditions requiring extensive piling.', 'Coordination with existing underground utilities.'],
        gallery: ['/images/projects/Thumbnail-6.jpg']
    },

    // Slope
    'mekong-slope': {
        title: 'Mekong River Bank Protection',
        subtitle: 'Slope Construction',
        location: 'Kandal Province',
        client: 'Ministry of Public Works',
        sector: 'Infrastructure',
        area: '5km Length',
        year: '2021',
        status: 'Completed',
        image: '/images/projects/Thumbnail-3.jpg',
        description: {
            background: 'Severe erosion along the Mekong riverbank threatened local communities and agricultural land.',
            objectives: 'Stabilize the riverbank using sustainable and durable geotechnical solutions.',
            concept: 'Gabion walls combined with vegetation to prevent soil erosion naturally.'
        },
        services: ['Geotechnical Survey', 'Slope Stabilization', 'Gabion Installation'],
        challenges: ['Working against strong river currents.', 'Accessibility for heavy machinery on soft ground.'],
        gallery: ['/images/projects/Thumbnail-7.jpg']
    }
};

export default function ProjectDetailPage() {
    const params = useParams();
    // Safely handle params.id whether it is a string or array
    const idParam = params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    // Use fallback if id is undefined or not found in data
    const project = (id && projectDetails[id]) ? projectDetails[id] : projectDetails['moi'];

    // Determine back link based on status
    const backLink = project.status === 'Completed'
        ? '/design-z/projects/completed'
        : '/design-z/projects/implementation';

    const backLabel = project.status === 'Completed'
        ? 'Back to Done Projects'
        : 'Back to Implementation';

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('kimmex_admin_auth');
        if (auth === 'true') setIsAdmin(true);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- ADMIN QUICK EDIT --- */}
            {isAdmin && (
                <div className="fixed bottom-8 right-8 z-[100]">
                    <Link
                        href={`/admin/projects/${id}`}
                        className="flex items-center gap-3 bg-titan-navy text-white px-6 py-4 rounded-full shadow-2xl hover:bg-titan-red transition-all group scale-100 hover:scale-105 active:scale-95"
                    >
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Shield size={16} className="text-titan-red group-hover:text-white" />
                        </div>
                        <span className="font-black text-sm uppercase tracking-widest">Edit Project</span>
                    </Link>
                </div>
            )}
            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] bg-titan-navy flex items-end">
                <div className="absolute inset-0">
                    <Image src={project.image} alt={project.title} fill className="object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20">
                    <Link href={backLink} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                        <ArrowLeft size={14} /> {backLabel}
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-titan-red text-white px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            {project.sector}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-none">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-light flex items-center gap-3">
                            <MapPin size={20} className="text-titan-red" /> {project.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT SPLIT --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT: CONTENT */}
                    <div className="lg:col-span-8">
                        {/* Description */}
                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <HelpCircle className="text-titan-red" /> Project Overview
                            </h2>
                            <div className="space-y-8 text-lg text-titan-navy-subtle leading-relaxed">
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">The Background</h3>
                                    <p>{project.description.background}</p>
                                </div>
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">Objectives</h3>
                                    <p>{project.description.objectives}</p>
                                </div>
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">Design Concept</h3>
                                    <p>{project.description.concept}</p>
                                </div>
                            </div>
                        </div>

                        {/* Scope */}
                        <div className="mb-16 bg-titan-bg-alt p-10 rounded-xl border border-titan-navy-light/10">
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <Activity className="text-titan-red" /> Scope of Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.services.map((s: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-transparent hover:border-titan-red/20 transition-all">
                                        <CheckCircle2 size={20} className="text-titan-red" />
                                        <span className="font-bold text-titan-navy">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Challenges */}
                        <div>
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <AlertTriangle className="text-titan-red" /> Key Challenges & Solutions
                            </h2>
                            <ul className="space-y-6">
                                {project.challenges.map((c: string, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-titan-navy/5 flex items-center justify-center shrink-0 font-bold text-titan-navy text-sm">{i + 1}</div>
                                        <p className="text-titan-navy-subtle leading-relaxed pt-1">{c}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: KEY FACTS SIDEBAR */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-black text-titan-navy mb-8 pb-4 border-b border-gray-100">Project Data</h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">Client</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <User size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.client}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">Location</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <MapPin size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.location}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">Built Area</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <Maximize size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.area}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">Year & Status</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <Calendar size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.year} <span className={`text-xs px-2 py-1 rounded text-white ${project.status === 'Completed' ? 'bg-green-600' : 'bg-orange-500'}`}>{project.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-colors shadow-lg flex items-center justify-center gap-2">
                                    <Share2 size={18} /> Share Project
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- GALLERY SECTION --- */}
            <section className="bg-titan-navy py-24 px-6 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-3xl font-black mb-12 border-l-4 border-titan-red pl-6">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.gallery.map((img: string, i: number) => (
                            <div key={i} className={`rounded-lg overflow-hidden group cursor-pointer relative ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[4/3]'}`}>
                                <Image src={img} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- RELATED PROJECTS --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-black text-titan-navy">Similar Projects</h2>
                    <Link href={backLink} className="font-bold text-titan-red hover:underline flex items-center gap-2 text-sm uppercase tracking-widest">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Hardcoded related projects for demo */}
                    {[
                        { title: 'MEF Building', cat: 'Government', img: '/images/projects/Thumbnail-2.jpg' },
                        { title: 'Bakheng WTP', cat: 'Infrastructure', img: '/images/projects/Thumbnail-8.jpg' },
                        { title: 'Vattanac Capital', cat: 'Private', img: '/images/projects/Thumbnail-5.jpg' }
                    ].map((p, idx) => (
                        <Link href="#" key={idx} className="block group">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative">
                                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-titan-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">{p.cat}</div>
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy group-hover:text-titan-red transition-colors">{p.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
