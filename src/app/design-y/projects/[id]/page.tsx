'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, ArrowRight, Share2, Maximize, User, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../../data/projectData'; // Import centralized data

// Reuse the central data source. If ID not found, fallback to first item
const getProject = (id: string | number) => {
    const found = projects.find(p => p.id === String(id));
    return found || projects[0];
};

export default function ProjectDetailTechnical() {
    const params = useParams();
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const project = getProject(id || 1);

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HERO: IMMERSIVE ARCHITECTURAL --- */}
            <header className="relative h-screen w-full overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale brightness-90 contrast-110" />
                </motion.div>

                {/* Gradient Overlays for Readability */}
                {/* Top: Light fade ensuring Dark Navbar is visible */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/90 to-transparent z-10"></div>
                {/* Bottom: Dark fade ensuring White Text is visible */}
                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-titan-navy via-titan-navy/60 to-transparent z-10"></div>

                {/* Technical Overlay Grid */}
                <div className="absolute inset-0 z-10 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 text-white">
                    <div className="max-w-[1600px] mx-auto border-t border-white/30 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="font-mono text-xs uppercase tracking-widest border border-white/30 px-2 py-1 bg-titan-navy/20 backdrop-blur-sm">Fig. {project.id.toUpperCase()}</span>
                                    <span className="font-mono text-xs uppercase tracking-widest text-titan-red font-bold bg-white/10 px-2 py-1 backdrop-blur-sm">{project.type}</span>
                                </div>
                                <h1 className="text-5xl md:text-[7vw] font-black leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl">
                                    {project.title.toUpperCase()}
                                </h1>
                            </div>
                            <div className="md:text-right">
                                <p className="font-mono text-xs uppercase tracking-widest mb-1 opacity-70">Location Coordinates</p>
                                <p className="text-xl font-bold">{project.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CONTENT: TECHNICAL SPECIFICATION --- */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-titan-navy/5">

                {/* SIDEBAR: DATA SHEET */}
                <div className="lg:col-span-4 border-r border-titan-navy/5 p-8 md:p-12 sticky top-20 h-fit">
                    <Link href="/design-y/projects" className="inline-flex items-center gap-2 text-titan-red font-bold uppercase tracking-widest text-xs mb-12 hover:underline">
                        <ArrowLeft size={14} /> Back to Index
                    </Link>

                    <div className="mb-12">
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-6 border-b border-titan-navy/10 pb-2">Technical Data</h3>
                        <dl className="space-y-6">
                            {[
                                { label: 'Client', value: 'Government of Cambodia' }, // Mock data enhancement
                                { label: 'Status', value: project.status },
                                { label: 'Year', value: '2023' },
                                { label: 'Area', value: '45,000 sqm' },
                                { label: 'Scope', value: 'Design & Build' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-baseline group">
                                    <dt className="text-sm font-bold text-titan-navy/60 group-hover:text-titan-red transition-colors">{item.label}</dt>
                                    <dd className="font-mono text-sm text-titan-navy text-right">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="bg-titan-navy text-white p-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Inquiries</span>
                            <h4 className="text-xl font-bold mb-6">Interested in a similar project?</h4>
                            <Link href="/design-y/contact" className="inline-flex items-center gap-4 border-b border-white pb-1 hover:text-titan-red hover:border-titan-red transition-colors">
                                <span className="uppercase tracking-widest text-xs font-bold">Contact Engineering</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Share2 size={100} />
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT: NARRATIVE */}
                <div className="lg:col-span-8">
                    {/* Intro */}
                    <div className="p-8 md:p-20 border-b border-titan-navy/5">
                        <h2 className="text-3xl md:text-5xl font-light leading-tight text-titan-navy mb-12">
                            {project.summary}
                        </h2>
                        <div className="prose prose-lg text-titan-navy-subtle max-w-none">
                            <p>
                                This project represents a benchmark in modern Cambodian engineering.
                                Designed to meet the highest standards of safety, sustainability, and functionality,
                                the {project.title} stands as a testament to precision execution.
                                The structural integrity leverages advanced concrete composites,
                                while the façade integrates passive cooling technologies suitable for the tropical climate.
                            </p>
                            <p>
                                From the initial geotechnical surveys to the final M.E.P. commissioning,
                                Kimmex managed every phase with strict adherence to ISO 9001:2015 quality protocols.
                            </p>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {[
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
                            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000',
                            'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000',
                            'https://images.unsplash.com/photo-1590240901242-d64e95ed4ae4?q=80&w=1000'
                        ].map((img, i) => (
                            <div key={i} className="aspect-square relative group overflow-hidden border-b border-r border-titan-navy/5">
                                <img src={img} alt="Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-titan-navy uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Fig. 1.{i + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Project Nav */}
                    {/* Next Project Nav Helper */
                        (() => {
                            const currentIndex = projects.findIndex(p => p.id === project.id);
                            const nextProject = projects[(currentIndex + 1) % projects.length];

                            return (
                                <Link href={`/design-y/projects/${nextProject.id}`} className="block p-20 bg-titan-bg border-b border-titan-navy/5 hover:bg-titan-navy hover:text-white transition-colors group">
                                    <span className="block text-xs font-mono uppercase tracking-widest mb-4 opacity-50">Next Project</span>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-4xl md:text-6xl font-black">{nextProject.title}</h3>
                                        <ArrowRight size={48} className="group-hover:translate-x-4 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })()}
                </div>
            </div>
        </div>
    );
}
