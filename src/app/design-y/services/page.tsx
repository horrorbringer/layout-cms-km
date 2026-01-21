'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Building, Ruler, Users, Truck, ArrowRight, CheckCircle2,
    DraftingCompass, HardHat, Hammer, ChevronRight, Briefcase,
    LayoutTemplate, PenTool, Lightbulb, GraduationCap, Landmark,
    Cpu, Activity, Layers, Box
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HERO: CORE CAPABILITIES --- */}
            <header className="relative pt-48 pb-32 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-2 h-2 bg-titan-red animate-pulse"></span>
                            <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">/ Technical Offerings</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-titan-navy leading-[0.85] mb-8">
                            CORE <br /> <span className="text-transparent stroke-text-navy">CAPABILITIES</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-titan-navy font-light max-w-2xl leading-relaxed">
                            Precision engineering. Comprehensive management. <br />
                            We deliver the full spectrum of development services.
                        </p>
                    </div>

                    {/* Stats / Identifiers */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6 font-mono text-xs text-titan-navy/60">
                        <div>
                            <span className="block opacity-50 mb-1">Service_ID</span>
                            <span className="block text-titan-navy text-lg font-bold">KMX-SRV</span>
                        </div>
                        <div>
                            <span className="block opacity-50 mb-1">Categories</span>
                            <span className="block text-titan-navy text-lg font-bold">04</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SERVICE ARCHITECTURE --- */}
            <section className="py-24 px-6 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-end mb-16 border-b border-titan-navy/10 pb-6">
                    <h2 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest">01. Service Architecture</h2>
                    <div className="flex items-center gap-2 text-titan-red">
                        <Activity size={16} />
                        <span className="font-bold text-sm tracking-widest uppercase">System Operational</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. Design & Build */}
                    <div className="group border border-titan-navy/10 p-10 hover:bg-titan-navy hover:text-white transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <PenTool size={120} />
                        </div>
                        <h3 className="text-4xl font-black text-titan-navy mb-6 group-hover:text-white tracking-tight">DESIGN & <br /> BUILD</h3>
                        <p className="text-titan-navy-subtle mb-12 text-lg leading-relaxed group-hover:text-white/70 max-w-md">
                            Seamless integration of conflicting disciplines. We unify architecture and engineering into a singular workflow.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {['Architectural Design', 'Structural Engineering', 'Permit Acquisition', 'Turnkey Construction'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wide border-l-2 border-titan-red/20 pl-3">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/design-y/services/design-build" className="inline-flex items-center gap-4 text-titan-red group-hover:text-white font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                            Explore Protocol <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* 2. Building Renovation */}
                    <div className="group border border-titan-navy/10 p-10 hover:bg-titan-navy hover:text-white transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Hammer size={120} />
                        </div>
                        <h3 className="text-4xl font-black text-titan-navy mb-6 group-hover:text-white tracking-tight">ADAPTIVE <br /> REUSE</h3>
                        <p className="text-titan-navy-subtle mb-12 text-lg leading-relaxed group-hover:text-white/70 max-w-md">
                            Revitalization of existing structures. We modernize aged assets while preserving their structural core.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {['Interior Fit-outs', 'Facade Upgrades', 'Structural Strengthening', 'MEP Retrofitting'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wide border-l-2 border-titan-red/20 pl-3">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/design-y/services/renovation" className="inline-flex items-center gap-4 text-titan-red group-hover:text-white font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                            Explore Protocol <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* 3. Project Management */}
                    <div className="group border border-titan-navy/10 p-10 hover:bg-titan-navy hover:text-white transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Briefcase size={120} />
                        </div>
                        <h3 className="text-4xl font-black text-titan-navy mb-6 group-hover:text-white tracking-tight">PROJECT <br /> OVERSIGHT</h3>
                        <p className="text-titan-navy-subtle mb-12 text-lg leading-relaxed group-hover:text-white/70 max-w-md">
                            Rigorous control over time, cost, and quality. We act as your on-site proxy to mitigate risk.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {['Cost Control', 'Quality Assurance', 'Schedule Management', 'Safety Compliance'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wide border-l-2 border-titan-red/20 pl-3">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/design-y/services/project-management" className="inline-flex items-center gap-4 text-titan-red group-hover:text-white font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                            Explore Protocol <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* 4. Consultants */}
                    <div className="group border border-titan-navy/10 p-10 hover:bg-titan-navy hover:text-white transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Lightbulb size={120} />
                        </div>
                        <h3 className="text-4xl font-black text-titan-navy mb-6 group-hover:text-white tracking-tight">STRATEGIC <br /> CONSULTANCY</h3>
                        <p className="text-titan-navy-subtle mb-12 text-lg leading-relaxed group-hover:text-white/70 max-w-md">
                            Technical audits and financial validation. We ensure your project is viable before ground is broken.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {['Feasibility Studies', 'Value Engineering', 'Technical Audits', 'Regulatory Advice'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wide border-l-2 border-titan-red/20 pl-3">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/design-y/services/consultants" className="inline-flex items-center gap-4 text-titan-red group-hover:text-white font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                            Explore Protocol <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- OPERATIONAL WORKFLOW --- */}
            <section className="py-32 bg-titan-navy text-white overflow-hidden relative border-t border-white/10">
                {/* Blueprint Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                    <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest mb-16">02. Operational Workflow</h3>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-white/20">
                        {[
                            { step: '01', title: 'Consultation', desc: 'Requirement Analysis' },
                            { step: '02', title: 'Design', desc: 'Architectural Drafting' },
                            { step: '03', title: 'Planning', desc: 'Cost & Scheduling' },
                            { step: '04', title: 'Execution', desc: 'Construction Phase' },
                            { step: '05', title: 'Delivery', desc: 'Handover & Support' }
                        ].map((s, i) => (
                            <div key={i} className="pt-8 md:pt-12 md:border-r border-white/10 pr-6 group relative">
                                <span className="absolute top-0 left-0 -mt-[5px] w-2 h-2 bg-titan-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <h4 className="text-4xl font-mono font-black text-white/10 mb-6 group-hover:text-titan-red transition-colors">{s.step}</h4>
                                <h5 className="text-xl font-bold mb-2">{s.title}</h5>
                                <p className="text-sm font-mono text-white/50">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTOR ANALYSIS --- */}
            <section className="py-24 px-6 max-w-[1600px] mx-auto">
                <div className="flex flex-col items-start gap-4 mb-16">
                    <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest">03. Sector Analysis</h3>
                    <h2 className="text-4xl md:text-5xl font-black text-titan-navy">TARGET INDUSTRIES</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { title: 'GOV. INFRASTRUCTURE', icon: Landmark, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop' },
                        { title: 'EDUCATIONAL', icon: GraduationCap, img: 'https://images.unsplash.com/photo-1599687267104-d510688a4e32?q=80&w=1760&auto=format&fit=crop' },
                        { title: 'COMMERCIAL', icon: Building, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop' },
                        { title: 'PUBLIC UTILITIES', icon: Truck, img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2670&auto=format&fit=crop' }
                    ].map((item, i) => (
                        <div key={i} className="relative aspect-[3/4] group overflow-hidden bg-titan-navy">
                            <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt={item.title} />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <item.icon className="text-titan-red mb-4" size={32} />
                                <h3 className="text-2xl font-black text-white leading-none mb-2">{item.title}</h3>
                                <div className="h-[2px] w-12 bg-white/20 group-hover:w-full group-hover:bg-titan-red transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA: INITIALIZATION --- */}
            <section className="py-32 border-t border-titan-navy/10 text-center bg-titan-bg-alt">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-black text-titan-navy mb-8">INITIATE PROJECT</h2>
                    <p className="text-titan-navy-subtle text-xl mb-12 max-w-2xl mx-auto">
                        Ready to mobilize? Our team is standing by to evaluate your technical requirements.
                    </p>
                    <Link href="/design-y/contact" className="inline-flex items-center gap-4 bg-titan-navy text-white px-12 py-6 font-bold uppercase tracking-widest hover:bg-titan-red transition-all shadow-xl group">
                        <span>Begin Consultation</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <style jsx>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
            `}</style>
        </div>
    );
}
